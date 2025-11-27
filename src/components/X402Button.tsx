import { useState } from 'react';
import { useX402Payment } from '../hooks/useX402Payment';
import { useX402Context } from '../context/X402Context';
import type { X402ButtonProps, PaymentResponse } from '../types';

export const X402Button = ({
  amount,
  endpoint,
  network,
  disabled = false,
  className = '',
  onSuccess,
  onError,
  children,
  variant = 'primary',
  size = 'md',
}: X402ButtonProps) => {
  const { makePayment, status } = useX402Payment();
  const { addPaymentToHistory } = useX402Context();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleClick = async () => {
    if (isProcessing || disabled) return;

    setIsProcessing(true);
    
    try {
      const response: PaymentResponse = await makePayment({
        amount,
        endpoint,
        network,
      });

      if (response.success) {
        // Add to payment history
        addPaymentToHistory({
          id: `payment-${Date.now()}`,
          amount,
          endpoint,
          network: network || 'base',
          status: 'success',
          timestamp: new Date(),
          transactionHash: response.transactionHash,
        });

        onSuccess?.(response);
      } else {
        const error = new Error(response.error || 'Payment failed');
        onError?.(error);
      }
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Payment failed');
      onError?.(error);
    } finally {
      setIsProcessing(false);
    }
  };

  const getButtonClasses = () => {
    const baseClasses = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';
    
    const variantClasses: Record<typeof variant, string> = {
      primary: 'bg-black text-white hover:bg-gray-900 focus-visible:ring-gray-950',
      secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 focus-visible:ring-gray-950',
      outline: 'border border-gray-300 bg-white text-gray-900 hover:bg-gray-50 focus-visible:ring-gray-950',
    };

    const sizeClasses: Record<typeof size, string> = {
      sm: 'h-9 px-3 text-sm',
      md: 'h-10 px-4 text-sm',
      lg: 'h-11 px-8 text-base',
    };

    return `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;
  };

  const getButtonText = () => {
    if (isProcessing || status === 'processing') {
      return 'Processing...';
    }
    if (status === 'pending') {
      return 'Pending...';
    }
    if (status === 'retrying') {
      return 'Retrying...';
    }
    if (children) {
      return children;
    }
    return `Pay ${amount}`;
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled || isProcessing}
      className={getButtonClasses()}
      type="button"
    >
      {getButtonText()}
    </button>
  );
};

