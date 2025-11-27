import { useState } from 'react';
import type { PaymentReceiptProps } from '../types';
import { formatAmount } from '../utils/paymentUtils';

export const PaymentReceipt = ({
  receipt,
  showDetails = true,
  onCopyTxHash,
  className = '',
}: PaymentReceiptProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(receipt.transactionHash);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      onCopyTxHash?.();
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'pending':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'failed':
        return 'bg-red-50 text-red-700 border-red-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className={`p-6 border border-gray-200 rounded-lg bg-white shadow-sm ${className}`}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">Payment Receipt</h3>
          <p className="text-sm text-gray-500">
            {receipt.timestamp.toLocaleString()}
          </p>
        </div>
        <span className={`px-3 py-1 rounded-md text-xs font-medium border ${getStatusColor(receipt.status)}`}>
          {receipt.status}
        </span>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Amount:</span>
          <span className="text-sm font-semibold text-gray-900">
            {formatAmount(receipt.amount)} {receipt.currency}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Network:</span>
          <span className="text-sm font-medium text-gray-900 capitalize">{receipt.network}</span>
        </div>
        {showDetails && receipt.blockNumber && (
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Block:</span>
            <span className="text-sm font-mono text-gray-900">{receipt.blockNumber}</span>
          </div>
        )}
      </div>

      <div className="border-t border-gray-200 pt-4">
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="text-xs font-medium text-gray-600">Transaction Hash:</span>
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
          >
            {copied ? (
              <>
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Copied!
              </>
            ) : (
              <>
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Copy
              </>
            )}
          </button>
        </div>
        <p className="text-xs font-mono text-blue-600 break-all bg-gray-50 p-2 rounded border border-gray-200">
          {receipt.transactionHash}
        </p>
      </div>
    </div>
  );
};

