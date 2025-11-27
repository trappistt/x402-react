import { useState, useEffect } from 'react';
import { useX402Payment } from '../hooks/useX402Payment';
import { useX402Context } from '../context/X402Context';
import { PaymentStatusIndicator } from './PaymentStatusIndicator';
import { PaymentReceipt } from './PaymentReceipt';
import { AssetSelector } from './AssetSelector';
import type { X402PaymentModalProps, PaymentResponse, Asset } from '../types';

export const X402PaymentModal = ({
  isOpen,
  onClose,
  endpoint,
  amount,
  network,
  asset,
  onSuccess,
  onError,
  title = 'Complete Payment',
  description,
}: X402PaymentModalProps) => {
  const { makePayment, status, error, reset } = useX402Payment();
  const { network: contextNetwork, asset: contextAsset, setNetwork, setAsset, addPaymentToHistory } = useX402Context();
  const [paymentResponse, setPaymentResponse] = useState<PaymentResponse | null>(null);
  const [selectedNetwork, setSelectedNetwork] = useState(network || contextNetwork);
  const [selectedAsset, setSelectedAsset] = useState<typeof asset>(asset || contextAsset || 'USDC');

  useEffect(() => {
    if (isOpen) {
      reset();
      setPaymentResponse(null);
    }
  }, [isOpen, reset]);

  const handlePayment = async () => {
    try {
      const response = await makePayment({
        amount,
        endpoint,
        network: selectedNetwork,
      });

      setPaymentResponse(response);

      if (response.success && response.receipt) {
        addPaymentToHistory({
          id: `payment-${Date.now()}`,
          amount,
          endpoint,
          network: selectedNetwork,
          status: 'success',
          timestamp: new Date(),
          transactionHash: response.transactionHash,
        });
        onSuccess?.(response);
      } else {
        onError?.(new Error(response.error || 'Payment failed'));
      }
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Payment failed');
      onError?.(error);
    }
  };

  const handleNetworkChange = (newNetwork: typeof selectedNetwork) => {
    setSelectedNetwork(newNetwork);
    setNetwork(newNetwork);
  };

  const handleAssetChange = (newAsset: Asset) => {
    setSelectedAsset(newAsset);
    setAsset?.(newAsset);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
            {description && (
              <p className="text-sm text-gray-600 mt-1">{description}</p>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Payment Amount */}
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-1">Amount</p>
            <p className="text-3xl font-bold text-gray-900">{amount}</p>
          </div>

          {/* Network Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Network
            </label>
            <div className="flex gap-2">
              <button
                onClick={() => handleNetworkChange('base')}
                className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  selectedNetwork === 'base'
                    ? 'bg-black text-white'
                    : 'border border-gray-300 bg-white text-gray-900 hover:bg-gray-50'
                }`}
              >
                Base
              </button>
              <button
                onClick={() => handleNetworkChange('solana')}
                className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  selectedNetwork === 'solana'
                    ? 'bg-black text-white'
                    : 'border border-gray-300 bg-white text-gray-900 hover:bg-gray-50'
                }`}
              >
                Solana
              </button>
            </div>
          </div>

          {/* Asset Selection */}
          {selectedAsset && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Asset
              </label>
              <AssetSelector
                network={selectedNetwork}
                selectedAsset={selectedAsset}
                onSelect={handleAssetChange}
              />
            </div>
          )}

          {/* Status */}
          {(status !== 'idle' || error) && (
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Status:</span>
                <PaymentStatusIndicator status={status} size="sm" />
              </div>
              {error && (
                <p className="text-sm text-red-600 mt-2">{error.message}</p>
              )}
            </div>
          )}

          {/* Payment Receipt */}
          {paymentResponse?.success && paymentResponse.receipt && (
            <PaymentReceipt receipt={paymentResponse.receipt} />
          )}

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              {paymentResponse?.success ? 'Close' : 'Cancel'}
            </button>
            {!paymentResponse?.success && (
              <button
                onClick={handlePayment}
                disabled={status === 'processing' || status === 'pending'}
                className="flex-1 px-4 py-2 bg-black text-white rounded-md text-sm font-medium hover:bg-gray-900 disabled:opacity-50 disabled:pointer-events-none transition-colors"
              >
                {status === 'processing' || status === 'pending'
                  ? 'Processing...'
                  : 'Pay Now'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

