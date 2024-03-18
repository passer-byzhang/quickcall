import metaMask from "../assets/images/wallets/metaMask.png";
import walletConnnect from "../assets/images/wallets/walletConnect.svg";
import { ChainConfig, ChainId, WalletConfig, WalletId } from "./models";

// Chain configs
export const SUPPORTED_CHAIN_IDS = [ChainId.Holesky];

export const CHAIN_CONFIGS: Record<ChainId, ChainConfig> = {
  [ChainId.Holesky]: {
    name: "Holesky",
  },
  [ChainId.Polygon]: {
    name: "Polygon",
  },
};

// Wallet configs
export const SUPPORTED_WALLET_IDS = [WalletId.MetaMask, WalletId.WalletConnect];

export const WALLET_CONFIGS: Record<WalletId, WalletConfig> = {
  [WalletId.MetaMask]: {
    name: "MetaMask",
    icon: metaMask,
  },
  [WalletId.WalletConnect]: {
    name: "WalletConnect",
    icon: walletConnnect,
  },
};
