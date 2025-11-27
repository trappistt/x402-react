import type { PaymentPayload, FacilitatorResponse, PaymentReceipt, Network } from '../types';

/**
 * FacilitatorClient - Handles communication with x402 facilitator API
 * This is a placeholder implementation that should be replaced with actual facilitator integration
 */
export class FacilitatorClient {
  private baseUrl: string;
  private apiKey?: string;

  constructor(baseUrl?: string, apiKey?: string) {
    // Default to Coinbase CDP facilitator if not provided
    this.baseUrl = baseUrl || 'https://api.cdp.coinbase.com/x402/facilitator';
    this.apiKey = apiKey;
  }

  /**
   * Submit payment to facilitator
   */
  async submitPayment(payload: PaymentPayload): Promise<FacilitatorResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/payments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(this.apiKey && { 'Authorization': `Bearer ${this.apiKey}` }),
        },
        body: JSON.stringify({
          amount: payload.amount,
          currency: payload.currency,
          recipient: payload.recipient,
          network: payload.network,
          asset: payload.asset || 'USDC',
          metadata: payload.metadata,
          nonce: payload.nonce,
        }),
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({ error: 'Unknown error' }));
        return {
          success: false,
          error: error.error || error.message || `HTTP ${response.status}`,
          errorCode: error.code,
        };
      }

      const data = await response.json();
      
      const receipt: PaymentReceipt = {
        transactionHash: data.transactionHash || data.txHash,
        network: payload.network,
        amount: payload.amount,
        currency: payload.currency,
        recipient: payload.recipient,
        timestamp: new Date(data.timestamp || Date.now()),
        status: data.status || 'pending',
        blockNumber: data.blockNumber,
        blockHash: data.blockHash,
      };

      return {
        success: true,
        receipt,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to submit payment',
      };
    }
  }

  /**
   * Verify payment proof
   */
  async verifyPayment(transactionHash: string, _network: Network): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/payments/${transactionHash}/verify`, {
        method: 'GET',
        headers: {
          ...(this.apiKey && { 'Authorization': `Bearer ${this.apiKey}` }),
        },
        // Add network as query param
        // Note: This is a placeholder - actual API may differ
      });

      if (!response.ok) {
        return false;
      }

      const data = await response.json();
      return data.verified === true || data.status === 'confirmed';
    } catch (error) {
      console.error('Payment verification failed:', error);
      return false;
    }
  }

  /**
   * Get payment status
   */
  async getPaymentStatus(transactionHash: string, network: Network): Promise<PaymentReceipt | null> {
    try {
      const response = await fetch(`${this.baseUrl}/payments/${transactionHash}`, {
        method: 'GET',
        headers: {
          ...(this.apiKey && { 'Authorization': `Bearer ${this.apiKey}` }),
        },
      });

      if (!response.ok) {
        return null;
      }

      const data = await response.json();
      return {
        transactionHash: data.transactionHash || transactionHash,
        network,
        amount: data.amount,
        currency: data.currency || 'USDC',
        recipient: data.recipient,
        timestamp: new Date(data.timestamp),
        status: data.status || 'pending',
        blockNumber: data.blockNumber,
        blockHash: data.blockHash,
      };
    } catch (error) {
      console.error('Failed to get payment status:', error);
      return null;
    }
  }

  /**
   * Wait for payment confirmation
   */
  async waitForConfirmation(
    transactionHash: string,
    network: Network,
    timeout: number = 30000,
    pollInterval: number = 2000
  ): Promise<PaymentReceipt | null> {
    const startTime = Date.now();

    while (Date.now() - startTime < timeout) {
      const receipt = await this.getPaymentStatus(transactionHash, network);
      
      if (receipt && receipt.status === 'confirmed') {
        return receipt;
      }

      if (receipt && receipt.status === 'failed') {
        return null;
      }

      await new Promise((resolve) => setTimeout(resolve, pollInterval));
    }

    // Timeout - return pending receipt if available
    return await this.getPaymentStatus(transactionHash, network);
  }
}

/**
 * Create a default facilitator client instance
 */
export function createFacilitatorClient(baseUrl?: string, apiKey?: string): FacilitatorClient {
  return new FacilitatorClient(baseUrl, apiKey);
}

