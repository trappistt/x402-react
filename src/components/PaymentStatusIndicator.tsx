import type { PaymentStatusIndicatorProps, PaymentStatus } from '../types';

export const PaymentStatusIndicator = ({
  status,
  size = 'md',
  showLabel = true,
  className = '',
}: PaymentStatusIndicatorProps) => {
  const getStatusConfig = (status: PaymentStatus) => {
    switch (status) {
      case 'success':
        return {
          color: 'bg-green-500',
          textColor: 'text-green-700',
          label: 'Success',
          icon: (
            <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          ),
        };
      case 'failed':
        return {
          color: 'bg-red-500',
          textColor: 'text-red-700',
          label: 'Failed',
          icon: (
            <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ),
        };
      case 'processing':
      case 'pending':
        return {
          color: 'bg-yellow-500',
          textColor: 'text-yellow-700',
          label: status === 'processing' ? 'Processing' : 'Pending',
          icon: (
            <svg className="w-full h-full animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          ),
        };
      case 'retrying':
        return {
          color: 'bg-blue-500',
          textColor: 'text-blue-700',
          label: 'Retrying',
          icon: (
            <svg className="w-full h-full animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          ),
        };
      default:
        return {
          color: 'bg-gray-400',
          textColor: 'text-gray-700',
          label: 'Idle',
          icon: (
            <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ),
        };
    }
  };

  const sizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  const textSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };

  const config = getStatusConfig(status);

  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      <div className={`${sizeClasses[size]} ${config.color} rounded-full flex items-center justify-center text-white`}>
        {config.icon}
      </div>
      {showLabel && (
        <span className={`${textSizeClasses[size]} ${config.textColor} font-medium`}>
          {config.label}
        </span>
      )}
    </div>
  );
};

