import type { PaymentReceipt, PaymentProof, Network } from '../types';

/**
 * Generates payment proof from payment receipt
 */
export function generatePaymentProof(receipt: PaymentReceipt, facilitator?: string): PaymentProof {
  const facilitatorAddress = facilitator || receipt.recipient || '';
  return {
    transactionHash: receipt.transactionHash,
    network: receipt.network,
    timestamp: receipt.timestamp,
    facilitator: facilitatorAddress, // Facilitator is typically the recipient in x402
  };
}

/**
 * Formats payment proof for HTTP header
 * Format: X-Payment-Proof: txHash=<hash>;network=<network>;timestamp=<timestamp>
 */
export function formatPaymentProofHeader(proof: PaymentProof): string {
  const parts = [
    `txHash=${proof.transactionHash}`,
    `network=${proof.network}`,
    `timestamp=${proof.timestamp.toISOString()}`,
  ];

  if (proof.facilitator && proof.facilitator.length > 0) {
    parts.push(`facilitator=${proof.facilitator}`);
  }

  if (proof.signature) {
    parts.push(`signature=${proof.signature}`);
  }

  return parts.join(';');
}

/**
 * Parses payment proof from HTTP header
 */
export function parsePaymentProofHeader(header: string): PaymentProof | null {
  try {
    const params = new URLSearchParams(header.replace(/;/g, '&'));
    const transactionHash = params.get('txHash');
    const network = params.get('network') as Network | null;
    const timestamp = params.get('timestamp');
    const facilitator = params.get('facilitator');
    const signature = params.get('signature');

    if (!transactionHash || !network || !timestamp) {
      return null;
    }

    return {
      transactionHash,
      network: network as Network,
      timestamp: new Date(timestamp),
      facilitator: facilitator || undefined,
      signature: signature || undefined,
    } as PaymentProof;
  } catch (error) {
    console.error('Failed to parse payment proof header:', error);
    return null;
  }
}

/**
 * Validates payment proof
 */
export function validatePaymentProof(proof: PaymentProof): boolean {
  if (!proof.transactionHash || !proof.network || !proof.timestamp) {
    return false;
  }

  // Validate transaction hash format (0x followed by 64 hex characters)
  if (!/^0x[a-fA-F0-9]{64}$/.test(proof.transactionHash)) {
    return false;
  }

  // Validate timestamp is not in the future
  if (proof.timestamp > new Date()) {
    return false;
  }

  return true;
}

/**
 * Creates retry request with payment proof header
 */
export async function retryRequestWithProof(
  endpoint: string,
  proof: PaymentProof,
  originalMethod: string = 'GET',
  originalBody?: unknown
): Promise<Response> {
  const proofHeader = formatPaymentProofHeader(proof);

  const headers: HeadersInit = {
    'X-Payment-Proof': proofHeader,
    'Accept': 'application/json',
  };

  const options: RequestInit = {
    method: originalMethod,
    headers,
  };

  if (originalBody && (originalMethod === 'POST' || originalMethod === 'PUT' || originalMethod === 'PATCH')) {
    headers['Content-Type'] = 'application/json';
    options.body = JSON.stringify(originalBody);
  }

  return fetch(endpoint, options);
}

