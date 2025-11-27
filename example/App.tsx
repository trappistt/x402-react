import React from 'react';
import { X402Provider, X402Button, useX402Payment, useX402Context } from '../src';
import '../src/styles.css';

function PaymentHistory() {
  const { paymentHistory, clearPaymentHistory } = useX402Context();

  return (
    <div className="mt-8 p-4 bg-gray-100 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Payment History</h2>
        {paymentHistory.length > 0 && (
          <button
            onClick={clearPaymentHistory}
            className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
          >
            Clear
          </button>
        )}
      </div>
      {paymentHistory.length === 0 ? (
        <p className="text-gray-500">No payments yet</p>
      ) : (
        <div className="space-y-2">
          {paymentHistory.map((payment) => (
            <div key={payment.id} className="p-3 bg-white rounded">
              <div className="flex justify-between">
                <span className="font-medium">{payment.amount}</span>
                <span className={`px-2 py-1 rounded text-xs ${
                  payment.status === 'success' ? 'bg-green-100 text-green-800' :
                  payment.status === 'failed' ? 'bg-red-100 text-red-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {payment.status}
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-1">{payment.endpoint}</p>
              <p className="text-xs text-gray-400 mt-1">
                {payment.timestamp.toLocaleString()}
              </p>
              {payment.transactionHash && (
                <p className="text-xs text-blue-600 mt-1 font-mono">
                  {payment.transactionHash.substring(0, 20)}...
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function NetworkSwitcher() {
  const { network, setNetwork } = useX402Context();

  return (
    <div className="flex gap-2 mb-4">
      <button
        onClick={() => setNetwork('base')}
        className={`px-4 py-2 rounded ${
          network === 'base'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        Base
      </button>
      <button
        onClick={() => setNetwork('solana')}
        className={`px-4 py-2 rounded ${
          network === 'solana'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        Solana
      </button>
    </div>
  );
}

function ProgrammaticPayment() {
  const { makePayment, status, error } = useX402Payment();

  const handlePayment = async () => {
    const response = await makePayment({
      amount: '$0.05',
      endpoint: '/api/premium-content',
      metadata: { feature: 'premium-access' },
    });

    if (response.success) {
      alert(`Payment successful! Tx: ${response.transactionHash}`);
    } else {
      alert(`Payment failed: ${response.error}`);
    }
  };

  return (
    <div className="mt-6 p-4 border rounded-lg">
      <h3 className="font-bold mb-2">Programmatic Payment</h3>
      <button
        onClick={handlePayment}
        disabled={status === 'processing'}
        className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 disabled:opacity-50"
      >
        {status === 'processing' ? 'Processing...' : 'Pay $0.05 Programmatically'}
      </button>
      {error && (
        <p className="mt-2 text-red-600 text-sm">Error: {error.message}</p>
      )}
    </div>
  );
}

function App() {
  return (
    <X402Provider facilitator="0x1234567890123456789012345678901234567890">
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">x402-react</h1>
          <p className="text-gray-600 mb-8">
            React component library for Coinbase x402 HTTP 402 payments
          </p>

          <NetworkSwitcher />

          <div className="space-y-4">
            <div className="p-4 bg-white rounded-lg shadow">
              <h2 className="font-bold mb-2">Basic Payment Button</h2>
              <X402Button
                amount="$0.01"
                endpoint="/api/premium-content"
                onSuccess={(response) => {
                  console.log('Payment successful!', response);
                }}
                onError={(error) => {
                  console.error('Payment error:', error);
                }}
              />
            </div>

            <div className="p-4 bg-white rounded-lg shadow">
              <h2 className="font-bold mb-2">Styled Buttons</h2>
              <div className="flex gap-4 flex-wrap">
                <X402Button
                  amount="$0.02"
                  endpoint="/api/download"
                  variant="primary"
                  size="md"
                />
                <X402Button
                  amount="$0.03"
                  endpoint="/api/download"
                  variant="secondary"
                  size="md"
                />
                <X402Button
                  amount="$0.04"
                  endpoint="/api/download"
                  variant="outline"
                  size="md"
                />
              </div>
            </div>

            <div className="p-4 bg-white rounded-lg shadow">
              <h2 className="font-bold mb-2">Custom Button Text</h2>
              <X402Button
                amount="$0.10"
                endpoint="/api/unlock-feature"
                variant="primary"
                size="lg"
                className="w-full"
              >
                Unlock Premium Feature
              </X402Button>
            </div>

            <ProgrammaticPayment />
            <PaymentHistory />
          </div>
        </div>
      </div>
    </X402Provider>
  );
}

export default App;

