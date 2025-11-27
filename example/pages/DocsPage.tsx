import React, { useState } from 'react';
import { 
  X402Button, 
  X402Provider, 
  X402PaymentModal,
  PaymentStatusIndicator,
  PaymentReceipt,
  AssetSelector,
  useX402Payment 
} from '../../src';

function CopyCodeButton({ text }: { text: string }) {
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
      className="absolute top-3 right-3 inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
      title="Copy to clipboard"
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

export function DocsPage() {
  return (
    <div>
      <div id="introduction" className="mb-16 scroll-mt-20">
        <h1 className="text-4xl font-semibold text-gray-900 mb-4 tracking-tight">
          Getting Started
        </h1>
        <p className="text-base text-gray-600 leading-7">
          Learn how to integrate @micropay/react into your React application for seamless Coinbase x402 payments.
        </p>
      </div>

      <div className="space-y-20">
        {/* Installation */}
        <section id="installation" className="scroll-mt-20">
          <h2 className="text-2xl font-semibold text-gray-900 mb-3 tracking-tight">Installation</h2>
          <div className="relative border border-gray-200 rounded-lg bg-gray-900 p-4 mb-4">
            <CopyCodeButton text="npm install @micropay/react" />
            <code className="text-sm text-gray-100 font-mono">
              npm install @micropay/react
            </code>
          </div>
          <p className="text-gray-600 mb-4">
            Or using yarn or pnpm:
          </p>
          <div className="relative border border-gray-200 rounded-lg bg-gray-900 p-4 mb-4">
            <CopyCodeButton text="yarn add @micropay/react\npnpm add @micropay/react" />
            <code className="text-sm text-gray-100 font-mono whitespace-pre">
              yarn add @micropay/react{'\n'}pnpm add @micropay/react
            </code>
          </div>
        </section>

        {/* Quick Start */}
        <section id="quick-start" className="scroll-mt-20">
          <h2 className="text-2xl font-semibold text-gray-900 mb-3 tracking-tight">Quick Start</h2>
          <p className="text-gray-600 mb-6 text-base leading-7">
            Wrap your application with the <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">X402Provider</code> and start using payment components.
          </p>
          <div className="relative border border-gray-200 rounded-lg bg-gray-900 p-4 mb-4 overflow-x-auto">
            <CopyCodeButton text={`import { X402Provider, X402Button } from '@micropay/react';
import '@micropay/react/styles';

function App() {
  return (
    <X402Provider facilitator="your-facilitator-address">
      <X402Button
        amount="$0.01"
        endpoint="/api/premium-content"
        onSuccess={(response) => {
          console.log('Payment successful!', response);
        }}
      />
    </X402Provider>
  );
}`} />
            <pre className="text-sm text-gray-100 font-mono">
{`import { X402Provider, X402Button } from '@micropay/react';
import '@micropay/react/styles';

function App() {
  return (
    <X402Provider facilitator="your-facilitator-address">
      <X402Button
        amount="$0.01"
        endpoint="/api/premium-content"
        onSuccess={(response) => {
          console.log('Payment successful!', response);
        }}
      />
    </X402Provider>
  );
}`}
            </pre>
          </div>
        </section>

        {/* Provider Setup */}
        <section className="scroll-mt-20">
          <h2 className="text-2xl font-semibold text-gray-900 mb-3 tracking-tight">Provider Setup</h2>
          <p className="text-gray-600 mb-6 text-base leading-7">
            The <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">X402Provider</code> manages payment state across your application. It requires a facilitator address from Coinbase.
          </p>
          <div className="relative border border-gray-200 rounded-lg bg-gray-900 p-4 mb-4 overflow-x-auto">
            <CopyCodeButton text={`<X402Provider
  facilitator="0x..." // Coinbase facilitator address
  network="base"      // Optional: 'base' | 'solana'
  defaultNetwork="base"
  onPaymentSuccess={(response) => {}}
  onPaymentError={(error) => {}}
>
  {children}
</X402Provider>`} />
            <pre className="text-sm text-gray-100 font-mono">
{`<X402Provider
  facilitator="0x..." // Coinbase facilitator address
  network="base"      // Optional: 'base' | 'solana'
  defaultNetwork="base"
  onPaymentSuccess={(response) => {}}
  onPaymentError={(error) => {}}
>
  {children}
</X402Provider>`}
            </pre>
          </div>
        </section>

        {/* Basic Usage */}
        <section className="scroll-mt-20">
          <h2 className="text-2xl font-semibold text-gray-900 mb-3 tracking-tight">Basic Usage</h2>
          <p className="text-gray-600 mb-6 text-base leading-7">
            Use the <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">X402Button</code> component for one-click payments.
          </p>
          <div className="relative border border-gray-200 rounded-lg bg-gray-900 p-4 mb-4 overflow-x-auto">
            <CopyCodeButton text={`<X402Button
  amount="$0.01"
  endpoint="/api/premium-content"
  onSuccess={(response) => {
    // Handle successful payment
  }}
  onError={(error) => {
    // Handle payment error
  }}
/>`} />
            <pre className="text-sm text-gray-100 font-mono">
{`<X402Button
  amount="$0.01"
  endpoint="/api/premium-content"
  onSuccess={(response) => {
    // Handle successful payment
  }}
  onError={(error) => {
    // Handle payment error
  }}
/>`}
            </pre>
          </div>
        </section>

        {/* Payment Modal */}
        <section className="scroll-mt-20">
          <h2 className="text-2xl font-semibold text-gray-900 mb-3 tracking-tight">Payment Modal</h2>
          <p className="text-gray-600 mb-6 text-base leading-7">
            Use the <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">X402PaymentModal</code> component for full-featured payment flows with network and asset selection.
          </p>
          <div className="relative border border-gray-200 rounded-lg bg-gray-900 p-4 mb-4 overflow-x-auto">
            <CopyCodeButton text={`import { X402PaymentModal } from '@micropay/react';

function MyComponent() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Pay Now</button>
      <X402PaymentModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        endpoint="/api/premium-content"
        amount="$0.01"
        network="base"
        asset="USDC"
        onSuccess={(response) => {
          console.log('Payment successful!', response);
        }}
      />
    </>
  );
}`} />
            <pre className="text-sm text-gray-100 font-mono">
{`import { X402PaymentModal } from '@micropay/react';

function MyComponent() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Pay Now</button>
      <X402PaymentModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        endpoint="/api/premium-content"
        amount="$0.01"
        network="base"
        asset="USDC"
        onSuccess={(response) => {
          console.log('Payment successful!', response);
        }}
      />
    </>
  );
}`}
            </pre>
          </div>
        </section>

        {/* Payment Status Indicator */}
        <section className="scroll-mt-20">
          <h2 className="text-2xl font-semibold text-gray-900 mb-3 tracking-tight">Payment Status Indicator</h2>
          <p className="text-gray-600 mb-6 text-base leading-7">
            Display payment status visually with the <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">PaymentStatusIndicator</code> component.
          </p>
          <div className="relative border border-gray-200 rounded-lg bg-gray-900 p-4 mb-4 overflow-x-auto">
            <CopyCodeButton text={`import { PaymentStatusIndicator } from '@micropay/react';

function PaymentStatus({ status }) {
  return (
    <PaymentStatusIndicator
      status={status}
      size="md"
      showLabel={true}
    />
  );
}`} />
            <pre className="text-sm text-gray-100 font-mono">
{`import { PaymentStatusIndicator } from '@micropay/react';

function PaymentStatus({ status }) {
  return (
    <PaymentStatusIndicator
      status={status}
      size="md"
      showLabel={true}
    />
  );
}`}
            </pre>
          </div>
        </section>

        {/* Payment Receipt */}
        <section className="scroll-mt-20">
          <h2 className="text-2xl font-semibold text-gray-900 mb-3 tracking-tight">Payment Receipt</h2>
          <p className="text-gray-600 mb-6 text-base leading-7">
            Display payment confirmations with the <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">PaymentReceipt</code> component.
          </p>
          <div className="relative border border-gray-200 rounded-lg bg-gray-900 p-4 mb-4 overflow-x-auto">
            <CopyCodeButton text={`import { PaymentReceipt } from '@micropay/react';

function PaymentConfirmation({ receipt }) {
  return (
    <PaymentReceipt
      receipt={receipt}
      showDetails={true}
      onCopyTxHash={() => {
        console.log('Transaction hash copied');
      }}
    />
  );
}`} />
            <pre className="text-sm text-gray-100 font-mono">
{`import { PaymentReceipt } from '@micropay/react';

function PaymentConfirmation({ receipt }) {
  return (
    <PaymentReceipt
      receipt={receipt}
      showDetails={true}
      onCopyTxHash={() => {
        console.log('Transaction hash copied');
      }}
    />
  );
}`}
            </pre>
          </div>
        </section>

        {/* Asset Selector */}
        <section className="scroll-mt-20">
          <h2 className="text-2xl font-semibold text-gray-900 mb-3 tracking-tight">Asset Selection</h2>
          <p className="text-gray-600 mb-6 text-base leading-7">
            Allow users to select payment assets with the <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">AssetSelector</code> component.
          </p>
          <div className="relative border border-gray-200 rounded-lg bg-gray-900 p-4 mb-4 overflow-x-auto">
            <CopyCodeButton text={`import { AssetSelector } from '@micropay/react';

function AssetSelection({ network, selectedAsset, onSelect }) {
  return (
    <AssetSelector
      network={network}
      selectedAsset={selectedAsset}
      onSelect={onSelect}
    />
  );
}`} />
            <pre className="text-sm text-gray-100 font-mono">
{`import { AssetSelector } from '@micropay/react';

function AssetSelection({ network, selectedAsset, onSelect }) {
  return (
    <AssetSelector
      network={network}
      selectedAsset={selectedAsset}
      onSelect={onSelect}
    />
  );
}`}
            </pre>
          </div>
        </section>

        {/* Programmatic Payments */}
        <section className="scroll-mt-20">
          <h2 className="text-2xl font-semibold text-gray-900 mb-3 tracking-tight">Programmatic Payments</h2>
          <p className="text-gray-600 mb-6 text-base leading-7">
            Use the <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">useX402Payment</code> hook for programmatic payment handling.
          </p>
          <div className="relative border border-gray-200 rounded-lg bg-gray-900 p-4 mb-4 overflow-x-auto">
            <CopyCodeButton text={`import { useX402Payment } from '@micropay/react';

function MyComponent() {
  const { makePayment, status, error } = useX402Payment();

  const handlePayment = async () => {
    const response = await makePayment({
      amount: '$0.01',
      endpoint: '/api/premium-content',
    });

    if (response.success) {
      console.log('Transaction:', response.transactionHash);
    }
  };

  return (
    <button onClick={handlePayment} disabled={status === 'processing'}>
      {status === 'processing' ? 'Processing...' : 'Pay $0.01'}
    </button>
  );
}`} />
            <pre className="text-sm text-gray-100 font-mono">
{`import { useX402Payment } from '@micropay/react';

function MyComponent() {
  const { makePayment, status, error } = useX402Payment();

  const handlePayment = async () => {
    const response = await makePayment({
      amount: '$0.01',
      endpoint: '/api/premium-content',
    });

    if (response.success) {
      console.log('Transaction:', response.transactionHash);
    }
  };

  return (
    <button onClick={handlePayment} disabled={status === 'processing'}>
      {status === 'processing' ? 'Processing...' : 'Pay $0.01'}
    </button>
  );
}`}
            </pre>
          </div>
        </section>

        {/* Next Steps */}
        <section className="scroll-mt-20">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 tracking-tight">Next Steps</h2>
          <div className="space-y-4">
            <div className="p-4 border border-gray-200 rounded-lg bg-white hover:shadow-md transition-shadow">
              <p className="text-gray-700">
                Explore the <button onClick={() => window.location.hash = '#components'} className="text-blue-600 hover:text-blue-800 font-semibold underline">Components</button> page to see all available components
              </p>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg bg-white hover:shadow-md transition-shadow">
              <p className="text-gray-700">
                Check out the <a href="https://www.coinbase.com/developer-platform/products/x402" className="text-blue-600 hover:text-blue-800 font-semibold underline" target="_blank" rel="noopener noreferrer">Coinbase x402 documentation</a> for protocol details
              </p>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg bg-white hover:shadow-md transition-shadow">
              <p className="text-gray-700">Use <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">PaymentStatusIndicator</code> for visual status feedback</p>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg bg-white hover:shadow-md transition-shadow">
              <p className="text-gray-700">Display payment receipts with <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">PaymentReceipt</code> component</p>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg bg-white hover:shadow-md transition-shadow">
              <p className="text-gray-700">Implement asset selection with <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">AssetSelector</code></p>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg bg-white hover:shadow-md transition-shadow">
              <p className="text-gray-700">Review payment history tracking and management</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

