import type { AssetSelectorProps, Asset, Network } from '../types';

const ASSET_CONFIG: Record<Network, Asset[]> = {
  base: ['USDC', 'ETH'],
  solana: ['USDC', 'USDT'],
};

const ASSET_NAMES: Record<Asset, string> = {
  USDC: 'USD Coin',
  USDT: 'Tether',
  ETH: 'Ethereum',
};

export const AssetSelector = ({
  network,
  selectedAsset,
  onSelect,
  className = '',
}: AssetSelectorProps) => {
  const availableAssets = ASSET_CONFIG[network] || ['USDC'];

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {availableAssets.map((asset) => (
        <button
          key={asset}
          onClick={() => onSelect(asset)}
          className={`inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-all duration-200 ${
            selectedAsset === asset
              ? 'bg-black text-white shadow-md'
              : 'border border-gray-300 bg-white text-gray-900 hover:bg-gray-50 hover:border-gray-400'
          }`}
        >
          {asset}
          <span className="ml-2 text-xs opacity-70">
            ({ASSET_NAMES[asset]})
          </span>
        </button>
      ))}
    </div>
  );
};

