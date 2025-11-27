// Import styles
import './styles.css';

// Core components
export { X402Provider, useX402Context } from './context/X402Context';
export { X402Button } from './components/X402Button';
export { X402PaymentModal } from './components/X402PaymentModal';
export { PaymentStatusIndicator } from './components/PaymentStatusIndicator';
export { PaymentReceipt } from './components/PaymentReceipt';
export { AssetSelector } from './components/AssetSelector';

// Hooks
export { useX402Payment } from './hooks/useX402Payment';

// Types
export type {
  Network,
  PaymentStatus,
  Asset,
  PaymentRequest,
  PaymentResponse,
  PaymentInstructions,
  PaymentPayload,
  PaymentProof,
  PaymentReceipt as PaymentReceiptType,
  FacilitatorResponse,
  AssetConfig,
  X402ProviderProps,
  X402ButtonProps,
  X402PaymentModalProps,
  PaymentStatusIndicatorProps,
  PaymentReceiptProps,
  AssetSelectorProps,
  PaymentHistoryEntry,
  X402ContextValue,
} from './types';

// Utilities
export {
  formatAmount,
  parseAmount,
  getNetworkDisplayName,
  filterPaymentHistory,
  getTotalSpent,
} from './utils/paymentUtils';

// Payment utilities
export {
  parsePaymentInstructions,
  validatePaymentInstructions,
} from './utils/paymentInstructions';

export {
  createFacilitatorClient,
  FacilitatorClient,
} from './utils/facilitatorClient';

export {
  buildPaymentPayload,
  validatePaymentPayload,
  normalizeAmount,
} from './utils/paymentPayload';

export {
  generatePaymentProof,
  formatPaymentProofHeader,
  parsePaymentProofHeader,
  validatePaymentProof,
  retryRequestWithProof,
} from './utils/paymentProof';

