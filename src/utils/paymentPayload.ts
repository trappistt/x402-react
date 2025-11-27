import type { PaymentInstructions, PaymentPayload, Asset } from '../types';

/**
 * Builds payment payload from payment instructions
 */
export function buildPaymentPayload(
  instructions: PaymentInstructions,
  walletAddress?: string
): PaymentPayload {
  const payload: PaymentPayload = {
    amount: instructions.amount,
    currency: instructions.currency,
    recipient: instructions.recipient,
    facilitator: instructions.facilitator,
    network: instructions.network,
    asset: instructions.asset || (instructions.currency as Asset) || 'USDC',
    metadata: {
      ...instructions.metadata,
      ...(walletAddress && { payer: walletAddress }),
    },
    nonce: instructions.nonce,
  };

  return payload;
}

/**
 * Validates payment payload before submission
 */
export function validatePaymentPayload(payload: PaymentPayload): { valid: boolean; error?: string } {
  if (!payload.amount || parseFloat(payload.amount) <= 0) {
    return { valid: false, error: 'Invalid payment amount' };
  }

  if (!payload.recipient || !payload.recipient.startsWith('0x')) {
    return { valid: false, error: 'Invalid recipient address' };
  }

  if (!payload.facilitator || !payload.facilitator.startsWith('0x')) {
    return { valid: false, error: 'Invalid facilitator address' };
  }

  if (!payload.network) {
    return { valid: false, error: 'Network is required' };
  }

  if (!payload.currency && !payload.asset) {
    return { valid: false, error: 'Currency or asset is required' };
  }

  return { valid: true };
}

/**
 * Normalizes amount to string format
 */
export function normalizeAmount(amount: string | number): string {
  if (typeof amount === 'number') {
    return amount.toFixed(2);
  }
  
  // Remove currency symbols and normalize
  const cleaned = amount.replace(/[^0-9.]/g, '');
  const parsed = parseFloat(cleaned);
  
  if (isNaN(parsed)) {
    throw new Error(`Invalid amount: ${amount}`);
  }
  
  return parsed.toFixed(2);
}

