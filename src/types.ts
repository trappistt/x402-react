export type Network = 'base' | 'solana';

export type PaymentStatus = 
  | 'idle'
  | 'pending'
  | 'processing'
  | 'success'
  | 'failed'
  | 'retrying';

export type Asset = 'USDC' | 'USDT' | 'ETH';

export interface PaymentRequest {
  amount: string; // e.g., "$0.01" or "0.01"
  endpoint: string;
  network?: Network;
  metadata?: Record<string, unknown>;
}

export interface PaymentResponse {
  success: boolean;
  transactionHash?: string;
  error?: string;
  status: PaymentStatus;
  receipt?: PaymentReceipt;
}

// Payment Instructions from HTTP 402 response
export interface PaymentInstructions {
  amount: string;
  currency: string;
  facilitator: string;
  network: Network;
  recipient: string;
  asset?: Asset;
  metadata?: Record<string, unknown>;
  expiresAt?: Date;
  nonce?: string;
}

// Payment Payload for facilitator submission
export interface PaymentPayload {
  amount: string;
  currency: string;
  recipient: string;
  facilitator: string;
  network: Network;
  asset?: Asset;
  metadata?: Record<string, unknown>;
  nonce?: string;
}

// Payment Proof for retry requests
export interface PaymentProof {
  transactionHash: string;
  network: Network;
  timestamp: Date;
  signature?: string;
  facilitator?: string;
}

// Payment Receipt from facilitator
export interface PaymentReceipt {
  transactionHash: string;
  network: Network;
  amount: string;
  currency: string;
  recipient: string;
  timestamp: Date;
  status: 'pending' | 'confirmed' | 'failed';
  blockNumber?: number;
  blockHash?: string;
}

// Facilitator API Response
export interface FacilitatorResponse {
  success: boolean;
  receipt?: PaymentReceipt;
  error?: string;
  errorCode?: string;
}

// Asset Configuration
export interface AssetConfig {
  symbol: Asset;
  name: string;
  decimals: number;
  network: Network;
  contractAddress?: string;
}

import type { ReactNode } from 'react';

export interface X402ProviderProps {
  facilitator: string; // Coinbase facilitator address
  network?: Network;
  defaultNetwork?: Network;
  children: ReactNode;
  onPaymentSuccess?: (response: PaymentResponse) => void;
  onPaymentError?: (error: Error) => void;
}

export interface X402ButtonProps {
  amount: string;
  endpoint: string;
  network?: Network;
  disabled?: boolean;
  className?: string;
  onSuccess?: (response: PaymentResponse) => void;
  onError?: (error: Error) => void;
  children?: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

export interface PaymentHistoryEntry {
  id: string;
  amount: string;
  endpoint: string;
  network: Network;
  status: PaymentStatus;
  timestamp: Date;
  transactionHash?: string;
  error?: string;
}

export interface X402ContextValue {
  facilitator: string;
  network: Network;
  setNetwork: (network: Network) => void;
  paymentHistory: PaymentHistoryEntry[];
  addPaymentToHistory: (entry: PaymentHistoryEntry) => void;
  clearPaymentHistory: () => void;
  asset?: Asset;
  setAsset?: (asset: Asset) => void;
}

// Payment Modal Props
export interface X402PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  endpoint: string;
  amount: string;
  network?: Network;
  asset?: Asset;
  onSuccess?: (response: PaymentResponse) => void;
  onError?: (error: Error) => void;
  title?: string;
  description?: string;
}

// Payment Status Indicator Props
export interface PaymentStatusIndicatorProps {
  status: PaymentStatus;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

// Payment Receipt Props
export interface PaymentReceiptProps {
  receipt: PaymentReceipt;
  showDetails?: boolean;
  onCopyTxHash?: () => void;
  className?: string;
}

// Asset Selector Props
export interface AssetSelectorProps {
  network: Network;
  selectedAsset?: Asset;
  onSelect: (asset: Asset) => void;
  className?: string;
}

