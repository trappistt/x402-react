import React, { useState } from 'react';
import {
  X402Button,
  X402PaymentModal,
  PaymentStatusIndicator,
  PaymentReceipt,
  AssetSelector,
  useX402Payment,
  useX402Context,
  formatAmount,
  getTotalSpent,
  filterPaymentHistory,
  type PaymentResponse,
} from '../../src';

function CopyButton({ text, label }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
      title={label || 'Copy to clipboard'}
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
  );
}

function NetworkSwitcher() {
  const { network, setNetwork } = useX402Context();

  return (
    <div className="mb-8 p-6 border border-gray-200 rounded-lg bg-white shadow-sm">
      <h3 className="text-sm font-medium text-gray-900 mb-4">Network Selection</h3>
      <div className="flex gap-2">
        <button
          onClick={() => setNetwork('base')}
          className={`inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-all duration-200 ${
            network === 'base'
              ? 'bg-black text-white shadow-md'
              : 'border border-gray-300 bg-white text-gray-900 hover:bg-gray-50 hover:border-gray-400'
          }`}
        >
          Base
        </button>
        <button
          onClick={() => setNetwork('solana')}
          className={`inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-all duration-200 ${
            network === 'solana'
              ? 'bg-black text-white shadow-md'
              : 'border border-gray-300 bg-white text-gray-900 hover:bg-gray-50 hover:border-gray-400'
          }`}
        >
          Solana
        </button>
      </div>
      <p className="mt-4 text-sm text-gray-500">
        Current network: <span className="font-medium text-gray-900 capitalize">{network}</span>
      </p>
    </div>
  );
}

function ButtonVariants() {
  return (
    <section id="button-variants" className="mb-20 scroll-mt-20">
      <h2 className="text-2xl font-semibold text-gray-900 mb-3 tracking-tight">Button Variants</h2>
      <p className="text-gray-600 mb-8 text-base leading-7">Choose from three distinct button styles to match your design</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 border border-gray-200 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow">
          <h3 className="text-sm font-medium text-gray-900 mb-4">Primary</h3>
          <X402Button
            amount="$0.01"
            endpoint="/api/test"
            variant="primary"
            size="md"
          />
        </div>
        <div className="p-6 border border-gray-200 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow">
          <h3 className="text-sm font-medium text-gray-900 mb-4">Secondary</h3>
          <X402Button
            amount="$0.01"
            endpoint="/api/test"
            variant="secondary"
            size="md"
          />
        </div>
        <div className="p-6 border border-gray-200 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow">
          <h3 className="text-sm font-medium text-gray-900 mb-4">Outline</h3>
          <X402Button
            amount="$0.01"
            endpoint="/api/test"
            variant="outline"
            size="md"
          />
        </div>
      </div>
    </section>
  );
}

function ButtonSizes() {
  return (
    <section id="button-sizes" className="mb-20 scroll-mt-20">
      <h2 className="text-2xl font-semibold text-gray-900 mb-3 tracking-tight">Button Sizes</h2>
      <p className="text-gray-600 mb-8 text-base leading-7">Three size options for different use cases</p>
      <div className="p-6 border border-gray-200 rounded-lg bg-white shadow-sm space-y-6">
        <div className="flex items-center gap-4">
          <span className="w-28 text-sm text-gray-600">Small:</span>
          <X402Button
            amount="$0.01"
            endpoint="/api/test"
            variant="primary"
            size="sm"
          />
        </div>
        <div className="flex items-center gap-4">
          <span className="w-28 text-sm text-gray-600">Medium:</span>
          <X402Button
            amount="$0.01"
            endpoint="/api/test"
            variant="primary"
            size="md"
          />
        </div>
        <div className="flex items-center gap-4">
          <span className="w-28 text-sm text-gray-600">Large:</span>
          <X402Button
            amount="$0.01"
            endpoint="/api/test"
            variant="primary"
            size="lg"
          />
        </div>
      </div>
    </section>
  );
}

function ProgrammaticPayment() {
  const { makePayment, retryPayment, status, error, reset } = useX402Payment();
  const [lastResponse, setLastResponse] = useState<PaymentResponse | null>(null);
  const [customAmount, setCustomAmount] = useState('0.01');
  const [customEndpoint, setCustomEndpoint] = useState('/api/custom-payment');

  const handlePayment = async () => {
    const response = await makePayment({
      amount: `$${customAmount}`,
      endpoint: customEndpoint,
      metadata: { source: 'showcase-demo' },
    });
    setLastResponse(response);
  };

  const handleRetry = async () => {
    if (lastResponse && !lastResponse.success) {
      const response = await retryPayment(
        {
          amount: `$${customAmount}`,
          endpoint: customEndpoint,
        },
        3
      );
      setLastResponse(response);
    }
  };

  return (
    <section id="programmatic-payments" className="mb-20 scroll-mt-20">
      <h2 className="text-2xl font-semibold text-gray-900 mb-3 tracking-tight">useX402Payment Hook</h2>
      <p className="text-gray-600 mb-8 text-base leading-7">Use the hook directly for custom payment flows</p>
      <div className="p-6 border border-gray-200 rounded-lg bg-white shadow-sm">
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Amount ($)
            </label>
            <input
              type="number"
              step="0.01"
              min="0.01"
              value={customAmount}
              onChange={(e) => setCustomAmount(e.target.value)}
              className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition-all"
              placeholder="0.01"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Endpoint
            </label>
            <input
              type="text"
              value={customEndpoint}
              onChange={(e) => setCustomEndpoint(e.target.value)}
              className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition-all"
              placeholder="/api/payment"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={handlePayment}
            disabled={status === 'processing' || status === 'pending'}
            className="inline-flex items-center justify-center rounded-md h-10 px-4 text-sm font-medium bg-black text-white hover:bg-gray-900 disabled:opacity-50 disabled:pointer-events-none transition-colors"
          >
            {status === 'processing' || status === 'pending'
              ? 'Processing...'
              : 'Make Payment'}
          </button>
          {lastResponse && !lastResponse.success && (
            <button
              onClick={handleRetry}
              className="inline-flex items-center justify-center rounded-md h-10 px-4 text-sm font-medium border border-gray-300 bg-white text-gray-900 hover:bg-gray-50 transition-colors"
            >
              Retry Payment
            </button>
          )}
          <button
            onClick={reset}
            className="inline-flex items-center justify-center rounded-md h-10 px-4 text-sm font-medium border border-gray-300 bg-white text-gray-900 hover:bg-gray-50 transition-colors"
          >
            Reset
          </button>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">Status:</span>
            <span
              className={`px-3 py-1 rounded-md text-sm font-medium border ${
                status === 'success'
                  ? 'bg-green-50 text-green-700 border-green-200'
                  : status === 'failed'
                  ? 'bg-red-50 text-red-700 border-red-200'
                  : status === 'processing' || status === 'pending'
                  ? 'bg-yellow-50 text-yellow-700 border-yellow-200'
                  : 'bg-gray-50 text-gray-700 border-gray-200'
              }`}
            >
              {status}
            </span>
          </div>
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-900 text-sm">
              <span className="font-medium">Error:</span> {error.message}
            </div>
          )}
          {lastResponse && (
            <div
              className={`p-4 rounded-md text-sm border ${
                lastResponse.success
                  ? 'bg-green-50 border-green-200 text-green-900'
                  : 'bg-red-50 border-red-200 text-red-900'
              }`}
            >
              {lastResponse.success ? (
                <div>
                  <p className="font-medium mb-2">Payment Successful</p>
                  {lastResponse.transactionHash && (
                    <div className="mt-2 p-2 bg-white rounded border border-green-200">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-xs font-mono text-green-700 break-all">
                          {lastResponse.transactionHash}
                        </p>
                        <CopyButton text={lastResponse.transactionHash} label="Copy transaction hash" />
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <p className="font-medium">Payment Failed</p>
                  <p className="mt-1 text-sm">{lastResponse.error}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function PaymentHistory() {
  const { paymentHistory, clearPaymentHistory } = useX402Context();
  const [filter, setFilter] = useState<'all' | 'success' | 'failed'>('all');

  const filteredHistory =
    filter === 'all'
      ? paymentHistory
      : filterPaymentHistory(paymentHistory, { status: filter });

  const totalSpent = getTotalSpent(paymentHistory);
  const successfulPayments = paymentHistory.filter((p) => p.status === 'success').length;

  return (
    <section id="payment-history" className="mb-20 scroll-mt-20">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-3 tracking-tight">Payment History</h2>
          <p className="text-gray-600 text-base leading-7">Track all your payment transactions</p>
        </div>
        <div className="flex gap-2">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
            className="flex h-10 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition-all"
          >
            <option value="all">All</option>
            <option value="success">Success</option>
            <option value="failed">Failed</option>
          </select>
          {paymentHistory.length > 0 && (
            <button
              onClick={clearPaymentHistory}
              className="inline-flex items-center justify-center rounded-md h-10 px-4 text-sm font-medium border border-gray-300 bg-white text-gray-900 hover:bg-gray-50 transition-colors"
            >
              Clear
            </button>
          )}
        </div>
      </div>

          <div className="p-6 border border-gray-200 rounded-lg bg-white mb-6 shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div>
            <p className="text-sm text-gray-500 mb-2">Total Payments</p>
            <p className="text-3xl font-semibold text-gray-900">{paymentHistory.length}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-2">Successful</p>
            <p className="text-3xl font-semibold text-green-600">
              {successfulPayments}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-2">Total Spent</p>
            <p className="text-3xl font-semibold text-gray-900">{formatAmount(`$${totalSpent}`)}</p>
          </div>
        </div>
      </div>

      {filteredHistory.length === 0 ? (
        <div className="p-12 border border-gray-200 rounded-lg bg-white text-center shadow-sm">
          <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p className="text-gray-500 text-lg font-medium mb-1">
            {paymentHistory.length === 0
              ? 'No payments yet'
              : 'No payments match the current filter'}
          </p>
          <p className="text-sm text-gray-400">
            {paymentHistory.length === 0
              ? 'Try making a payment above to see it here!'
              : 'Try changing the filter to see more payments.'}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredHistory.map((payment) => (
            <div
              key={payment.id}
              className="p-5 border border-gray-200 rounded-lg bg-white hover:border-gray-300 hover:shadow-md transition-all"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start gap-3 mb-3">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="text-xl font-semibold text-gray-900">{payment.amount}</span>
                    <span
                      className={`px-2.5 py-1 rounded-md text-xs font-semibold ${
                        payment.status === 'success'
                          ? 'bg-green-50 text-green-700 border border-green-200'
                          : payment.status === 'failed'
                          ? 'bg-red-50 text-red-700 border border-red-200'
                          : 'bg-yellow-50 text-yellow-700 border border-yellow-200'
                      }`}
                    >
                      {payment.status}
                    </span>
                    <span className="px-2.5 py-1 bg-gray-50 text-gray-700 border border-gray-200 rounded-md text-xs font-medium capitalize">
                      {payment.network}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 font-mono break-all">{payment.endpoint}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {payment.timestamp.toLocaleString()}
                  </p>
                </div>
              </div>
              {payment.transactionHash && (
                <div className="mt-3 p-3 bg-gray-50 rounded-md border border-gray-200">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <p className="text-xs font-medium text-gray-600">Transaction Hash:</p>
                    <CopyButton text={payment.transactionHash} label="Copy transaction hash" />
                  </div>
                  <p className="text-xs font-mono text-blue-600 break-all">
                    {payment.transactionHash}
                  </p>
                </div>
              )}
              {payment.error && (
                <div className="mt-3 p-3 bg-red-50 rounded-md border border-red-200">
                    <p className="text-xs font-medium text-red-700 mb-1">Error:</p>
                  <p className="text-xs text-red-600">{payment.error}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

function PaymentModalDemo() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section id="payment-modal" className="mb-20 scroll-mt-20">
      <h2 className="text-2xl font-semibold text-gray-900 mb-3 tracking-tight">Payment Modal</h2>
      <p className="text-gray-600 mb-8 text-base leading-7">Full-featured payment modal with network and asset selection</p>
      <div className="p-6 border border-gray-200 rounded-lg bg-white shadow-sm">
        <button
          onClick={() => setIsOpen(true)}
          className="inline-flex items-center justify-center rounded-md h-10 px-4 text-sm font-medium bg-black text-white hover:bg-gray-900 transition-colors"
        >
          Open Payment Modal
        </button>
        <X402PaymentModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          endpoint="/api/premium-content"
          amount="$0.01"
          title="Complete Payment"
          description="Pay to access premium content"
        />
      </div>
    </section>
  );
}

function StatusIndicatorDemo() {
  const statuses = ['idle', 'pending', 'processing', 'success', 'failed', 'retrying'] as const;

  return (
    <section id="status-indicator" className="mb-20 scroll-mt-20">
      <h2 className="text-2xl font-semibold text-gray-900 mb-3 tracking-tight">Payment Status Indicator</h2>
      <p className="text-gray-600 mb-8 text-base leading-7">Visual status indicators for payment states</p>
      <div className="p-6 border border-gray-200 rounded-lg bg-white shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {statuses.map((status) => (
            <div key={status} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <span className="text-sm font-medium text-gray-700 capitalize">{status}:</span>
              <PaymentStatusIndicator status={status} size="md" showLabel={true} />
            </div>
          ))}
        </div>
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h3 className="text-sm font-medium text-gray-900 mb-4">Different Sizes</h3>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-600">Small:</span>
              <PaymentStatusIndicator status="success" size="sm" showLabel={true} />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-600">Medium:</span>
              <PaymentStatusIndicator status="success" size="md" showLabel={true} />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-600">Large:</span>
              <PaymentStatusIndicator status="success" size="lg" showLabel={true} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PaymentReceiptDemo() {
  const mockReceipt = {
    transactionHash: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
    network: 'base' as const,
    amount: '0.01',
    currency: 'USDC',
    recipient: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
    timestamp: new Date(),
    status: 'confirmed' as const,
    blockNumber: 12345678,
    blockHash: '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890',
  };

  return (
    <section id="payment-receipt" className="mb-20 scroll-mt-20">
      <h2 className="text-2xl font-semibold text-gray-900 mb-3 tracking-tight">Payment Receipt</h2>
      <p className="text-gray-600 mb-8 text-base leading-7">Display payment confirmations and transaction details</p>
      <div className="p-6 border border-gray-200 rounded-lg bg-white shadow-sm">
        <PaymentReceipt receipt={mockReceipt} showDetails={true} />
      </div>
    </section>
  );
}

function AssetSelectorDemo() {
  const { network } = useX402Context();
  const [selectedAsset, setSelectedAsset] = useState<'USDC' | 'USDT' | 'ETH'>('USDC');

  return (
    <section id="asset-selector" className="mb-20 scroll-mt-20">
      <h2 className="text-2xl font-semibold text-gray-900 mb-3 tracking-tight">Asset Selector</h2>
      <p className="text-gray-600 mb-8 text-base leading-7">Select payment assets based on network</p>
      <div className="p-6 border border-gray-200 rounded-lg bg-white shadow-sm space-y-6">
        <div>
          <p className="text-sm font-medium text-gray-700 mb-3">Base Network Assets:</p>
          <AssetSelector
            network="base"
            selectedAsset={network === 'base' ? selectedAsset : undefined}
            onSelect={(asset) => setSelectedAsset(asset)}
          />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-700 mb-3">Solana Network Assets:</p>
          <AssetSelector
            network="solana"
            selectedAsset={network === 'solana' ? selectedAsset : undefined}
            onSelect={(asset) => setSelectedAsset(asset)}
          />
        </div>
        <div className="pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            Selected asset: <span className="font-medium text-gray-900">{selectedAsset}</span>
          </p>
        </div>
      </div>
    </section>
  );
}

export function ComponentsPage() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-16">
        <h1 className="text-4xl font-semibold text-gray-900 mb-4 tracking-tight">
          Components
        </h1>
        <p className="text-base text-gray-600 leading-7">
          Comprehensive collection of x402 payment components with production-ready features.
        </p>
      </div>

      {/* Payment Components Section */}
      <section className="mb-20">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-3 tracking-tight">Payment Components</h2>
          <p className="text-gray-600">
            Professional payment components designed for seamless x402 integration and optimal user experience.
          </p>
        </div>
        <div className="border border-gray-200 rounded-lg bg-white overflow-hidden shadow-sm">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">
                  Component
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">
                  Description
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr className="hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => scrollToSection('button-variants')}>
                <td className="px-6 py-4">
                  <span className="text-sm font-medium text-blue-600 hover:text-blue-800">
                    X402Button
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  One-click payment button with customizable variants and sizes
                </td>
              </tr>
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <span className="text-sm font-medium text-gray-900">
                    X402Provider
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  Context provider for managing payment state across your application
                </td>
              </tr>
              <tr className="hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => scrollToSection('programmatic-payments')}>
                <td className="px-6 py-4">
                  <span className="text-sm font-medium text-blue-600 hover:text-blue-800">
                    useX402Payment
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  Hook for programmatic payment handling with retry logic and status tracking
                </td>
              </tr>
              <tr className="hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => scrollToSection('payment-modal')}>
                <td className="px-6 py-4">
                  <span className="text-sm font-medium text-blue-600 hover:text-blue-800">
                    X402PaymentModal
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  Full-featured payment modal with network and asset selection
                </td>
              </tr>
              <tr className="hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => scrollToSection('status-indicator')}>
                <td className="px-6 py-4">
                  <span className="text-sm font-medium text-blue-600 hover:text-blue-800">
                    PaymentStatusIndicator
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  Visual status indicator component for payment states
                </td>
              </tr>
              <tr className="hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => scrollToSection('payment-receipt')}>
                <td className="px-6 py-4">
                  <span className="text-sm font-medium text-blue-600 hover:text-blue-800">
                    PaymentReceipt
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  Payment confirmation and receipt display component
                </td>
              </tr>
              <tr className="hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => scrollToSection('asset-selector')}>
                <td className="px-6 py-4">
                  <span className="text-sm font-medium text-blue-600 hover:text-blue-800">
                    AssetSelector
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  Component for selecting payment assets (USDC, USDT, ETH)
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Management Components Section */}
      <section className="mb-20">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-3 tracking-tight">Payment Management</h2>
          <p className="text-gray-600">
            Comprehensive payment management interfaces for tracking transactions and payment history.
          </p>
        </div>
        <div className="border border-gray-200 rounded-lg bg-white overflow-hidden shadow-sm">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">
                  Component
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">
                  Description
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr className="hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => scrollToSection('payment-history')}>
                <td className="px-6 py-4">
                  <span className="text-sm font-medium text-blue-600 hover:text-blue-800">
                    Payment History
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  Complete payment dashboard with transaction history and filtering
                </td>
              </tr>
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <span className="text-sm font-medium text-gray-900">
                    Network Switcher
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  Network selection component for switching between Base and Solana
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Interactive Demos */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-900 mb-6 tracking-tight">Interactive Demos</h2>
        <div className="space-y-16">
          <NetworkSwitcher />
          {/* Sidebar order: 1. X402Button */}
          <ButtonVariants />
          <ButtonSizes />
          {/* New Components */}
          <PaymentModalDemo />
          <StatusIndicatorDemo />
          <PaymentReceiptDemo />
          <AssetSelectorDemo />
          {/* Sidebar order: 3. useX402Payment */}
          <ProgrammaticPayment />
          {/* Sidebar order: 4. Payment History */}
          <PaymentHistory />
        </div>
      </section>
    </div>
  );
}

