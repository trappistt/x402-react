import type { PaymentHistoryEntry, Network } from '../types';

export const formatAmount = (amount: string): string => {
  // Ensure amount has proper formatting
  if (amount.startsWith('$')) {
    return amount;
  }
  const numAmount = parseFloat(amount);
  if (isNaN(numAmount)) {
    return amount;
  }
  return `$${numAmount.toFixed(2)}`;
};

export const parseAmount = (amount: string): number => {
  const cleaned = amount.replace(/[^0-9.]/g, '');
  return parseFloat(cleaned) || 0;
};

export const getNetworkDisplayName = (network: Network): string => {
  const names: Record<Network, string> = {
    base: 'Base',
    solana: 'Solana',
  };
  return names[network] || network;
};

export const filterPaymentHistory = (
  history: PaymentHistoryEntry[],
  filters: {
    network?: Network;
    status?: string;
    startDate?: Date;
    endDate?: Date;
  }
): PaymentHistoryEntry[] => {
  return history.filter((entry) => {
    if (filters.network && entry.network !== filters.network) {
      return false;
    }
    if (filters.status && entry.status !== filters.status) {
      return false;
    }
    if (filters.startDate && entry.timestamp < filters.startDate) {
      return false;
    }
    if (filters.endDate && entry.timestamp > filters.endDate) {
      return false;
    }
    return true;
  });
};

export const getTotalSpent = (history: PaymentHistoryEntry[]): number => {
  return history
    .filter((entry) => entry.status === 'success')
    .reduce((total, entry) => total + parseAmount(entry.amount), 0);
};

