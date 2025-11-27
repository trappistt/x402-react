import React, { useState } from 'react';
import {
  X402Provider,
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
} from '../src';
import '../src/styles.css';

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

function ButtonVariants() {
  return (
    <section id="button-variants" className="mb-16 scroll-mt-20">
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
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Secondary</h3>
          <X402Button
            amount="$0.01"
            endpoint="/api/test"
            variant="secondary"
            size="md"
          />
        </div>
        <div className="p-6 border border-gray-200 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Outline</h3>
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
    <section id="button-sizes" className="mb-16 scroll-mt-20">
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

function CustomButtons() {
  return (
    <section id="custom-buttons" className="mb-16 scroll-mt-20">
      <h2 className="text-2xl font-semibold text-gray-900 mb-3 tracking-tight">Custom Button Text</h2>
      <p className="text-gray-600 mb-8 text-base leading-7">Customize button text for your specific use cases</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-6 border border-gray-200 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow">
          <X402Button
            amount="$0.10"
            endpoint="/api/unlock-article"
            variant="primary"
            size="lg"
            className="w-full"
          >
            Unlock Premium Article
          </X402Button>
        </div>
        <div className="p-6 border border-gray-200 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow">
          <X402Button
            amount="$0.05"
            endpoint="/api/download-file"
            variant="outline"
            size="lg"
            className="w-full"
          >
            Download File
          </X402Button>
        </div>
        <div className="p-6 border border-gray-200 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow">
          <X402Button
            amount="$0.25"
            endpoint="/api/ai-inference"
            variant="primary"
            size="lg"
            className="w-full"
          >
            Run AI Inference
          </X402Button>
        </div>
        <div className="p-6 border border-gray-200 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow">
          <X402Button
            amount="$0.50"
            endpoint="/api/premium-feature"
            variant="secondary"
            size="lg"
            className="w-full"
          >
            Access Premium Feature
          </X402Button>
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
    <section id="programmatic-payments" className="mb-16 scroll-mt-20">
      <h2 className="text-2xl font-semibold text-gray-900 mb-3 tracking-tight">Programmatic Payments</h2>
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
  const successfulPayments = paymentHistory.filter((p: any) => p.status === 'success').length;

  return (
    <section id="payment-history" className="mb-16 scroll-mt-20">
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
          {filteredHistory.map((payment: any) => (
            <div
              key={payment.id}
              className="p-5 border border-gray-200 rounded-lg bg-white hover:border-gray-300 hover:shadow-md transition-all"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start gap-3 mb-3">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="text-xl font-semibold text-gray-900">{payment.amount}</span>
                    <span
                      className={`px-2.5 py-1 rounded-md text-xs font-medium ${
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

function UseCases() {
  return (
    <section id="use-cases" className="mb-16 scroll-mt-20">
      <h2 className="text-2xl font-semibold text-gray-900 mb-3 tracking-tight">Use Cases</h2>
      <p className="text-gray-600 mb-8 text-base leading-7">Real-world examples of x402 payments in action</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 border border-gray-200 rounded-lg bg-white shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900">Pay-per-Article</h3>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Unlock premium articles with micropayments
          </p>
          <X402Button
            amount="$0.10"
            endpoint="/api/unlock-article/123"
            variant="primary"
            size="md"
          >
            Read Premium Article
          </X402Button>
        </div>

        <div className="p-6 border border-gray-200 rounded-lg bg-white shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-purple-50 rounded-lg">
              <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900">AI API Access</h3>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Pay per API call or AI inference
          </p>
          <X402Button
            amount="$0.05"
            endpoint="/api/ai/generate"
            variant="primary"
            size="md"
          >
            Generate with AI
          </X402Button>
        </div>

        <div className="p-6 border border-gray-200 rounded-lg bg-white shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-green-50 rounded-lg">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900">File Downloads</h3>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Charge for premium file downloads
          </p>
          <X402Button
            amount="$0.25"
            endpoint="/api/download/premium"
            variant="primary"
            size="md"
          >
            Download Premium File
          </X402Button>
        </div>

        <div className="p-6 border border-gray-200 rounded-lg bg-white shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-orange-50 rounded-lg">
              <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900">Game Features</h3>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Unlock game features or items
          </p>
          <X402Button
            amount="$0.50"
            endpoint="/api/game/unlock-feature"
            variant="primary"
            size="md"
          >
            Unlock Feature
          </X402Button>
        </div>
      </div>
    </section>
  );
}

function DisabledStates() {
  return (
    <section id="disabled-states" className="mb-16 scroll-mt-20">
      <h2 className="text-2xl font-semibold text-gray-900 mb-3 tracking-tight">Disabled States</h2>
      <p className="text-gray-600 mb-8 text-base leading-7">Buttons can be disabled when needed</p>
      <div className="p-6 border border-gray-200 rounded-lg bg-white shadow-sm space-y-6">
        <div>
          <p className="text-sm text-gray-600 mb-3">Disabled Primary Button:</p>
          <X402Button
            amount="$0.01"
            endpoint="/api/test"
            variant="primary"
            disabled={true}
          />
        </div>
        <div>
          <p className="text-sm text-gray-600 mb-3">Disabled Outline Button:</p>
          <X402Button
            amount="$0.01"
            endpoint="/api/test"
            variant="outline"
            disabled={true}
          />
        </div>
      </div>
    </section>
  );
}

function PaymentModalDemo() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section id="payment-modal" className="mb-16 scroll-mt-20">
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
    <section id="status-indicator" className="mb-16 scroll-mt-20">
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
    <section id="payment-receipt" className="mb-16 scroll-mt-20">
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
    <section id="asset-selector" className="mb-16 scroll-mt-20">
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

function NavigationSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const sections = [
    { id: 'button-variants', label: 'Button Variants' },
    { id: 'button-sizes', label: 'Button Sizes' },
    { id: 'custom-buttons', label: 'Custom Buttons' },
    { id: 'payment-modal', label: 'Payment Modal' },
    { id: 'status-indicator', label: 'Status Indicator' },
    { id: 'payment-receipt', label: 'Payment Receipt' },
    { id: 'asset-selector', label: 'Asset Selector' },
    { id: 'use-cases', label: 'Use Cases' },
    { id: 'disabled-states', label: 'Disabled States' },
    { id: 'programmatic-payments', label: 'Programmatic Payments' },
    { id: 'payment-history', label: 'Payment History' },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 right-4 z-50 p-2 bg-white border border-gray-300 rounded-md shadow-md hover:bg-gray-50 transition-colors"
        aria-label="Toggle navigation"
      >
        <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-200 z-40 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Navigation</h2>
        </div>
        <nav className="p-4 overflow-y-auto h-[calc(100vh-80px)]">
          <ul className="space-y-1">
            {sections.map((section) => (
              <li key={section.id}>
                <button
                  onClick={() => scrollToSection(section.id)}
                  className="w-full text-left px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100 hover:text-gray-900 transition-colors"
                >
                  {section.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}

function Showcase() {
  return (
    <X402Provider facilitator="0x1234567890123456789012345678901234567890">
      <div className="min-h-screen bg-gray-50">
        <NavigationSidebar />
        
        <div className="lg:pl-64">
          <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="text-center mb-16">
            <h1 className="text-4xl font-semibold text-gray-900 mb-4 tracking-tight">
              x402-react
            </h1>
            <p className="text-base text-gray-600 mb-2 leading-7">
              React Component Library for Coinbase x402 Payments
            </p>
            <p className="text-sm text-gray-500">
              Complete showcase of all components and features
            </p>
            </div>

            {/* Network Switcher */}
            <NetworkSwitcher />

            {/* All Sections */}
            <ButtonVariants />
            <ButtonSizes />
            <CustomButtons />
            <PaymentModalDemo />
            <StatusIndicatorDemo />
            <PaymentReceiptDemo />
            <AssetSelectorDemo />
            <UseCases />
            <DisabledStates />
            <ProgrammaticPayment />
            <PaymentHistory />

            {/* Footer */}
            <div className="mt-16 p-8 border border-gray-200 rounded-lg bg-white text-center shadow-sm">
              <p className="text-gray-600 mb-3 text-base font-medium">
                Built for the Coinbase x402 ecosystem
              </p>
              <p className="text-sm text-gray-600">
                Install: <code className="bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-md text-sm font-mono text-gray-900">npm install x402-react</code>
              </p>
            </div>
          </div>
        </div>
      </div>
    </X402Provider>
  );
}

export default Showcase;

