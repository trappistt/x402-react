import type { PaymentInstructions, Network, Asset } from '../types';

/**
 * Parses HTTP 402 Payment Required response according to x402 protocol
 * Supports both header-based and body-based payment instructions
 */
export async function parsePaymentInstructions(response: Response): Promise<PaymentInstructions | null> {
  if (response.status !== 402) {
    return null;
  }

  try {
    // Try to parse from X-Payment-Required header first
    const headerInstructions = parseHeaderInstructions(response);
    if (headerInstructions) {
      return headerInstructions;
    }

    // Fall back to JSON body
    return await parseBodyInstructions(response);
  } catch (error) {
    console.error('Failed to parse payment instructions:', error);
    return null;
  }
}

/**
 * Parse payment instructions from X-Payment-Required header
 * Format: X-Payment-Required: amount=0.01;currency=USDC;facilitator=0x...;network=base;recipient=0x...
 */
function parseHeaderInstructions(response: Response): PaymentInstructions | null {
  const header = response.headers.get('X-Payment-Required');
  if (!header) {
    return null;
  }

  const params = new URLSearchParams(header.replace(/;/g, '&'));
  const amount = params.get('amount');
  const currency = params.get('currency') || 'USDC';
  const facilitator = params.get('facilitator');
  const network = params.get('network') as Network | null;
  const recipient = params.get('recipient');
  const expiresAt = params.get('expiresAt');
  const nonce = params.get('nonce');

  if (!amount || !facilitator || !network || !recipient) {
    return null;
  }

  // Parse metadata if present
  let metadata: Record<string, unknown> | undefined;
  const metadataStr = params.get('metadata');
  if (metadataStr) {
    try {
      metadata = JSON.parse(metadataStr);
    } catch {
      // Ignore parse errors
    }
  }

  return {
    amount,
    currency,
    facilitator,
    network: network as Network,
    recipient,
    asset: currency as Asset,
    expiresAt: expiresAt ? new Date(expiresAt) : undefined,
    nonce: nonce || undefined,
    metadata,
  };
}

/**
 * Parse payment instructions from JSON response body
 */
async function parseBodyInstructions(response: Response): Promise<PaymentInstructions | null> {
  try {
    const body = await response.json();
    
    // Support multiple possible formats
    const instructions: PaymentInstructions = {
      amount: body.amount || body.payment?.amount,
      currency: body.currency || body.payment?.currency || 'USDC',
      facilitator: body.facilitator || body.payment?.facilitator,
      network: (body.network || body.payment?.network) as Network,
      recipient: body.recipient || body.payment?.recipient,
      asset: (body.asset || body.currency || 'USDC') as Asset,
      metadata: body.metadata || body.payment?.metadata,
      expiresAt: body.expiresAt ? new Date(body.expiresAt) : undefined,
      nonce: body.nonce || body.payment?.nonce,
    };

    // Validate required fields
    if (!instructions.amount || !instructions.facilitator || !instructions.network || !instructions.recipient) {
      return null;
    }

    return instructions;
  } catch (error) {
    console.error('Failed to parse JSON body:', error);
    return null;
  }
}

/**
 * Validates payment instructions
 */
export function validatePaymentInstructions(instructions: PaymentInstructions): boolean {
  if (!instructions.amount || !instructions.facilitator || !instructions.network || !instructions.recipient) {
    return false;
  }

  // Check expiration if present
  if (instructions.expiresAt && instructions.expiresAt < new Date()) {
    return false;
  }

  // Validate amount is a positive number
  const amount = parseFloat(instructions.amount);
  if (isNaN(amount) || amount <= 0) {
    return false;
  }

  return true;
}

