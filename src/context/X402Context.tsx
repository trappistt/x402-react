import { createContext, useContext, useState, useCallback } from 'react';
import type { Network, PaymentHistoryEntry, X402ContextValue, X402ProviderProps, Asset } from '../types';

const X402Context = createContext<X402ContextValue | null>(null);

export const useX402Context = () => {
  const context = useContext(X402Context);
  if (!context) {
    throw new Error('useX402Context must be used within X402Provider');
  }
  return context;
};

export const X402Provider = ({
  facilitator,
  network: initialNetwork = 'base',
  defaultNetwork = 'base',
  children,
}: X402ProviderProps) => {
  const [network, setNetworkState] = useState<Network>(initialNetwork || defaultNetwork);
  const [asset, setAssetState] = useState<Asset>('USDC');
  const [paymentHistory, setPaymentHistory] = useState<PaymentHistoryEntry[]>([]);

  const setNetwork = useCallback((newNetwork: Network) => {
    setNetworkState(newNetwork);
  }, []);

  const setAsset = useCallback((newAsset: Asset) => {
    setAssetState(newAsset);
  }, []);

  const addPaymentToHistory = useCallback((entry: PaymentHistoryEntry) => {
    setPaymentHistory((prev) => [entry, ...prev]);
  }, []);

  const clearPaymentHistory = useCallback(() => {
    setPaymentHistory([]);
  }, []);

  const value: X402ContextValue = {
    facilitator,
    network,
    setNetwork,
    paymentHistory,
    addPaymentToHistory,
    clearPaymentHistory,
    asset,
    setAsset,
  };

  return (
    <X402Context.Provider value={value}>
      {children}
    </X402Context.Provider>
  );
};

