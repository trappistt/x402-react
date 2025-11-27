# x402-react

A React component library specifically for Coinbase x402, making HTTP 402 payments easy.

## Why it stands out

- **Early adoption of x402** - Built for the future of micropayments
- **Focus on developer experience** - Simple API, TypeScript support, great DX
- **Micropayment UX patterns** - Optimized for small, frequent payments
- **Web3 payment integration** - Seamless blockchain payment handling

## Documentation

📚 **[Full Documentation & Examples](https://x402-react.vercel.app/)**

## Installation

```bash
npm install x402-react
# or
yarn add x402-react
# or
pnpm add x402-react
```

## Quick Start

```tsx
import { X402Provider, X402Button } from 'x402-react';
import 'x402-react/styles';

function App() {
  return (
    <X402Provider facilitator="your-facilitator-address">
      <X402Button
        amount="$0.01"
        endpoint="/api/premium-content"
        onSuccess={(response) => console.log('Payment successful!', response)}
      />
    </X402Provider>
  );
}
```

## Core Components

### `<X402Provider>`

Context provider that manages payment state across your application.

```tsx
<X402Provider
  facilitator="0x..." // Coinbase facilitator address
  network="base"      // Optional: 'base' | 'solana'
  defaultNetwork="base"
  onPaymentSuccess={(response) => {}}
  onPaymentError={(error) => {}}
>
  {children}
</X402Provider>
```

**Props:**
- `facilitator` (required): Coinbase facilitator address
- `network` (optional): Initial network ('base' | 'solana')
- `defaultNetwork` (optional): Default network if not specified
- `onPaymentSuccess` (optional): Callback when payment succeeds
- `onPaymentError` (optional): Callback when payment fails

### `<X402Button>`

One-click micropayment button component.

```tsx
<X402Button
  amount="$0.01"
  endpoint="/api/premium-content"
  network="base"              // Optional: overrides provider network
  onSuccess={(response) => {}} // Optional: success callback
  onError={(error) => {}}      // Optional: error callback
  variant="primary"            // Optional: 'primary' | 'secondary' | 'outline'
  size="md"                    // Optional: 'sm' | 'md' | 'lg'
  disabled={false}             // Optional: disable button
  className="custom-class"     // Optional: additional CSS classes
>
  Custom Button Text
</X402Button>
```

**Props:**
- `amount` (required): Payment amount (e.g., "$0.01" or "0.01")
- `endpoint` (required): API endpoint that returns 402 Payment Required
- `network` (optional): Network to use for this payment
- `onSuccess` (optional): Callback when payment succeeds
- `onError` (optional): Callback when payment fails
- `variant` (optional): Button style variant
- `size` (optional): Button size
- `disabled` (optional): Disable the button
- `className` (optional): Additional CSS classes
- `children` (optional): Custom button text

### `<X402PaymentModal>`

Full-featured payment modal component for complete payment flows.

```tsx
<X402PaymentModal
  isOpen={boolean}
  onClose={() => void}
  endpoint="/api/premium-content"
  amount="$0.01"
  network="base"              // Optional: overrides provider network
  asset="USDC"                // Optional: asset selection
  onSuccess={(response) => {}} // Optional: success callback
  onError={(error) => {}}      // Optional: error callback
  title="Complete Payment"     // Optional: modal title
  description="Pay to access"  // Optional: modal description
/>
```

**Props:**
- `isOpen` (required): Controls modal visibility
- `onClose` (required): Callback when modal is closed
- `endpoint` (required): API endpoint that returns 402 Payment Required
- `amount` (required): Payment amount
- `network` (optional): Network to use for this payment
- `asset` (optional): Asset to use (USDC, USDT, ETH)
- `onSuccess` (optional): Callback when payment succeeds
- `onError` (optional): Callback when payment fails
- `title` (optional): Modal title
- `description` (optional): Modal description

### `<PaymentStatusIndicator>`

Visual status indicator component for payment states.

```tsx
<PaymentStatusIndicator
  status={status}        // PaymentStatus
  size="md"             // Optional: 'sm' | 'md' | 'lg'
  showLabel={true}      // Optional: show status label
  className="..."       // Optional: additional CSS classes
/>
```

### `<PaymentReceipt>`

Display payment confirmation and receipt.

```tsx
<PaymentReceipt
  receipt={receipt}           // PaymentReceipt object
  showDetails={true}          // Optional: show detailed info
  onCopyTxHash={() => {}}     // Optional: callback when tx hash is copied
  className="..."             // Optional: additional CSS classes
/>
```

### `<AssetSelector>`

Component for selecting payment assets.

```tsx
<AssetSelector
  network="base"              // Network to show assets for
  selectedAsset="USDC"       // Optional: currently selected asset
  onSelect={(asset) => {}}   // Callback when asset is selected
  className="..."             // Optional: additional CSS classes
/>
```

### `useX402Payment()`

Hook for programmatic payments.

```tsx
import { useX402Payment } from 'x402-react';

function MyComponent() {
  const { makePayment, retryPayment, status, error, reset, network, setNetwork } = useX402Payment();

  const handlePayment = async () => {
    const response = await makePayment({
      amount: '$0.01',
      endpoint: '/api/premium-content',
      network: 'base', // Optional
      metadata: { userId: '123' }, // Optional
    });

    if (response.success) {
      console.log('Transaction hash:', response.transactionHash);
    }
  };

  const handleRetry = async () => {
    const response = await retryPayment(
      {
        amount: '$0.01',
        endpoint: '/api/premium-content',
      },
      3 // max retries
    );
  };

  return (
    <div>
      <button onClick={handlePayment} disabled={status === 'processing'}>
        {status === 'processing' ? 'Processing...' : 'Pay $0.01'}
      </button>
      {error && <p>Error: {error.message}</p>}
    </div>
  );
}
```

**Returns:**
- `makePayment(request)`: Initiate a payment
- `retryPayment(request, maxRetries)`: Retry a failed payment
- `status`: Current payment status ('idle' | 'pending' | 'processing' | 'success' | 'failed' | 'retrying')
- `error`: Error object if payment failed
- `reset()`: Reset payment state
- `network`: Current network
- `setNetwork(network)`: Switch networks

## Core Utilities

### Payment Instructions Parser

Parse HTTP 402 responses according to x402 protocol:

```tsx
import { parsePaymentInstructions, validatePaymentInstructions } from 'x402-react';

const instructions = await parsePaymentInstructions(response);
if (instructions && validatePaymentInstructions(instructions)) {
  // Use instructions
}
```

### Facilitator Client

Interact with x402 facilitator API:

```tsx
import { createFacilitatorClient } from 'x402-react';

const client = createFacilitatorClient(baseUrl, apiKey);
const result = await client.submitPayment(payload);
const receipt = await client.waitForConfirmation(txHash, network);
```

### Payment Payload Builder

Build payment payloads from instructions:

```tsx
import { buildPaymentPayload, validatePaymentPayload } from 'x402-react';

const payload = buildPaymentPayload(instructions, walletAddress);
const validation = validatePaymentPayload(payload);
```

### Payment Proof Handler

Handle payment proofs and retry requests:

```tsx
import { generatePaymentProof, retryRequestWithProof } from 'x402-react';

const proof = generatePaymentProof(receipt);
const response = await retryRequestWithProof(endpoint, proof, 'GET');
```

## Advanced Features

### Payment History

Access payment history through the context:

```tsx
import { useX402Context } from 'x402-react';

function PaymentHistory() {
  const { paymentHistory, clearPaymentHistory } = useX402Context();

  return (
    <div>
      <h2>Payment History</h2>
      {paymentHistory.map((payment) => (
        <div key={payment.id}>
          <p>Amount: {payment.amount}</p>
          <p>Status: {payment.status}</p>
          <p>Date: {payment.timestamp.toLocaleString()}</p>
          {payment.transactionHash && (
            <p>Tx: {payment.transactionHash}</p>
          )}
        </div>
      ))}
      <button onClick={clearPaymentHistory}>Clear History</button>
    </div>
  );
}
```

### Network Switching

Switch between networks dynamically:

```tsx
import { useX402Payment } from 'x402-react';

function NetworkSwitcher() {
  const { network, setNetwork } = useX402Payment();

  return (
    <div>
      <button
        onClick={() => setNetwork('base')}
        className={network === 'base' ? 'active' : ''}
      >
        Base
      </button>
      <button
        onClick={() => setNetwork('solana')}
        className={network === 'solana' ? 'active' : ''}
      >
        Solana
      </button>
    </div>
  );
}
```

### Payment Utilities

Use utility functions for payment operations:

```tsx
import {
  formatAmount,
  parseAmount,
  getNetworkDisplayName,
  filterPaymentHistory,
  getTotalSpent,
} from 'x402-react';

// Format amount for display
const formatted = formatAmount('0.01'); // "$0.01"

// Parse amount to number
const amount = parseAmount('$0.01'); // 0.01

// Get network display name
const name = getNetworkDisplayName('base'); // "Base"

// Filter payment history
const filtered = filterPaymentHistory(history, {
  network: 'base',
  status: 'success',
  startDate: new Date('2024-01-01'),
});

// Get total spent
const total = getTotalSpent(history);
```

## Payment Status

Payment status can be one of:
- `idle`: No payment in progress
- `pending`: Payment initiated, waiting for confirmation
- `processing`: Payment is being processed
- `success`: Payment completed successfully
- `failed`: Payment failed
- `retrying`: Retrying a failed payment

## Examples

### Basic Payment Button

```tsx
<X402Provider facilitator="0x...">
  <X402Button
    amount="$0.01"
    endpoint="/api/unlock-article"
    onSuccess={() => alert('Article unlocked!')}
  />
</X402Provider>
```

### Custom Styled Button

```tsx
<X402Button
  amount="$0.05"
  endpoint="/api/download-file"
  variant="outline"
  size="lg"
  className="w-full"
>
  Download Premium File
</X402Button>
```

### Programmatic Payment with Retry

```tsx
function PremiumFeature() {
  const { makePayment, retryPayment, status } = useX402Payment();

  const unlockFeature = async () => {
    const response = await makePayment({
      amount: '$0.10',
      endpoint: '/api/unlock-feature',
    });

    if (!response.success) {
      // Retry up to 3 times
      await retryPayment(
        { amount: '$0.10', endpoint: '/api/unlock-feature' },
        3
      );
    }
  };

  return (
    <button onClick={unlockFeature} disabled={status === 'processing'}>
      Unlock Feature
    </button>
  );
}
```

### Payment with Metadata

```tsx
const response = await makePayment({
  amount: '$0.01',
  endpoint: '/api/ai-inference',
  metadata: {
    model: 'gpt-4',
    tokens: 1000,
    userId: 'user-123',
  },
});
```

## TypeScript Support

Full TypeScript support with exported types:

```tsx
import type {
  Network,
  PaymentStatus,
  PaymentRequest,
  PaymentResponse,
  X402ProviderProps,
  X402ButtonProps,
} from 'x402-react';
```

## Styling

The library uses Tailwind CSS. Make sure to import the styles:

```tsx
import 'x402-react/styles';
```

You can customize the button appearance using the `variant`, `size`, and `className` props.

## x402 Protocol Support

This library implements the full x402 payment protocol:

✅ **HTTP 402 Response Parsing** - Supports both header and body-based payment instructions  
✅ **Facilitator Integration** - Direct integration with x402 facilitator API  
✅ **Payment Proof Handling** - Automatic retry with payment proof headers  
✅ **Multi-Network Support** - Base and Solana networks  
✅ **Multi-Asset Support** - USDC, USDT, ETH  
✅ **Payment Validation** - Comprehensive validation of instructions and payloads  
✅ **Error Handling** - Robust error handling and retry logic  

## Roadmap

- [x] Core x402 protocol implementation
- [x] Payment instructions parser
- [x] Facilitator client integration
- [x] Payment proof handling
- [x] Payment modal component
- [x] Status indicators
- [x] Asset selection
- [ ] Batch payments support
- [ ] Payment subscriptions
- [ ] Payment analytics dashboard component
- [ ] Webhook integration helpers
- [ ] Service discovery (Bazaar integration)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT

## Resources

- [x402-react Documentation](https://x402-react.vercel.app/) - Full documentation and examples
- [Coinbase x402 Documentation](https://www.coinbase.com/en-ca/developer-platform/products/x402)
- [Coinbase Developer Platform](https://docs.cdp.coinbase.com/)

