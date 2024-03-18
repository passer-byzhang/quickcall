export enum ChainId {
  Holesky = 17000,
  Polygon = 137,
}

export type ChainConfig = {
  name: string;
};

export enum WalletId {
  MetaMask = 'injected',
  WalletConnect = 'walletConnect',
}

export type WalletConfig = {
  name: string;
  icon: string;
};

