import { useState, useCallback } from 'react';
import { useX402Context } from '../context/X402Context';
import type { PaymentRequest, PaymentResponse, PaymentStatus } from '../types';
import { parsePaymentInstructions, validatePaymentInstructions } from '../utils/paymentInstructions';
import { buildPaymentPayload, validatePaymentPayload } from '../utils/paymentPayload';
import { createFacilitatorClient } from '../utils/facilitatorClient';
import { generatePaymentProof, retryRequestWithProof } from '../utils/paymentProof';
import type { PaymentReceipt } from '../types';

export const useX402Payment = () => {
  const context = useX402Context();
  const [status, setStatus] = useState<PaymentStatus>('idle');
  const [error, setError] = useState<Error | null>(null);
  
  // Create facilitator client instance
  const facilitatorClient = createFacilitatorClient();

  const makePayment = useCallback(
    async (request: PaymentRequest): Promise<PaymentResponse> => {
      setStatus('pending');
      setError(null);

      try {
        setStatus('processing');

        // Step 1: Make the initial request to the endpoint
        const response = await fetch(request.endpoint, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
        });

        // Step 2: Check if we get a 402 Payment Required response
        if (response.status === 402) {
          // Step 3: Parse payment instructions from 402 response
          const instructions = await parsePaymentInstructions(response);
          
          if (!instructions) {
            throw new Error('Failed to parse payment instructions from 402 response');
          }

          // Validate instructions
          if (!validatePaymentInstructions(instructions)) {
            throw new Error('Invalid payment instructions');
          }

          // Step 4: Build payment payload
          const payload = buildPaymentPayload(instructions);
          
          // Validate payload
          const validation = validatePaymentPayload(payload);
          if (!validation.valid) {
            throw new Error(validation.error || 'Invalid payment payload');
          }

          // Step 5: Submit payment to facilitator
          const facilitatorResponse = await facilitatorClient.submitPayment(payload);
          
          if (!facilitatorResponse.success || !facilitatorResponse.receipt) {
            throw new Error(facilitatorResponse.error || 'Payment submission failed');
          }

          const receipt = facilitatorResponse.receipt;

          // Step 6: Wait for payment confirmation (optional, can be async)
          // For now, we'll proceed with the receipt
          // In production, you might want to wait for confirmation

          // Step 7: Retry the original request with payment proof
          const proof = generatePaymentProof(receipt, instructions.facilitator);
          const retryResponse = await retryRequestWithProof(
            request.endpoint,
            proof,
            'GET'
          );

          if (!retryResponse.ok) {
            throw new Error(`Request failed after payment: ${retryResponse.status}`);
          }

          const paymentResponse: PaymentResponse = {
            success: true,
            transactionHash: receipt.transactionHash,
            status: 'success',
            receipt,
          };

          setStatus('success');
          return paymentResponse;
        } else if (response.ok) {
          // Payment not required, request succeeded
          const paymentResponse: PaymentResponse = {
            success: true,
            status: 'success',
          };
          setStatus('success');
          return paymentResponse;
        } else {
          throw new Error(`Request failed with status ${response.status}`);
        }
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Payment failed');
        setError(error);
        setStatus('failed');
        
        const paymentResponse: PaymentResponse = {
          success: false,
          error: error.message,
          status: 'failed',
        };
        
        return paymentResponse;
      }
    },
    [context.network, facilitatorClient]
  );

  const retryPayment = useCallback(
    async (request: PaymentRequest, maxRetries = 3, previousReceipt?: PaymentReceipt): Promise<PaymentResponse> => {
      let lastError: PaymentResponse | null = null;
      
      // If we have a previous receipt, retry with proof
      if (previousReceipt) {
        const proof = generatePaymentProof(previousReceipt, context.facilitator);
        try {
          const retryResponse = await retryRequestWithProof(
            request.endpoint,
            proof,
            'GET'
          );

          if (retryResponse.ok) {
            return {
              success: true,
              transactionHash: previousReceipt.transactionHash,
              status: 'success',
              receipt: previousReceipt,
            };
          }
        } catch (err) {
          // Fall through to normal retry logic
        }
      }
      
      for (let attempt = 1; attempt <= maxRetries; attempt++) {
        if (attempt > 1) {
          setStatus('retrying');
          // Exponential backoff
          await new Promise((resolve) => setTimeout(resolve, Math.pow(2, attempt) * 1000));
        }
        
        const result = await makePayment(request);
        
        if (result.success) {
          return result;
        }
        
        lastError = result;
      }
      
      return lastError || {
        success: false,
        error: 'Payment failed after retries',
        status: 'failed',
      };
    },
    [makePayment, context.facilitator]
  );

  const reset = useCallback(() => {
    setStatus('idle');
    setError(null);
  }, []);

  return {
    makePayment,
    retryPayment,
    status,
    error,
    reset,
    network: context.network,
    setNetwork: context.setNetwork,
  };
};

