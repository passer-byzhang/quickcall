/* eslint-disable @typescript-eslint/no-explicit-any */
import { Chain, polygon } from "@wagmi/chains";
import { injected, walletConnect } from "@wagmi/connectors";
import { createConfig, CreateConnectorFn } from "@wagmi/core";
import { createClient, http, BaseError as ViemBaseError } from "viem";
import {
  CHAIN_CONFIGS,
  SUPPORTED_CHAIN_IDS,
  SUPPORTED_WALLET_IDS,
} from "./configs";
import { WalletError } from "./errors";
import { ChainId, WalletId } from "./models";

export const CHAINS: Record<ChainId, Chain> = {
  [ChainId.Holesky]: {
    id: ChainId.Holesky,
    name: CHAIN_CONFIGS[ChainId.Holesky].name,
    network: "Holesky",
    nativeCurrency: {
      name: "Ether",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: {
      default: {
        http: ["https://ethereum-holesky.blockpi.network/v1/rpc/public"],
      },
      public: {
        http: ["https://ethereum-holesky.blockpi.network/v1/rpc/public"],
      },
    },
    blockExplorers: {
      default: {
        name: "Open Source Ethereum Explorer",
        url: "https://holesky.beaconcha.in",
      },
    },
    contracts: {
      multicall3: {
        address: "0xca11bde05977b3631167028862be2a173976ca11",
        blockCreated: 77,
      },
    },
    testnet: true,
  },
  [ChainId.Polygon]: polygon,
};

export const CONNECTORS: Record<WalletId, CreateConnectorFn> = {
  [WalletId.MetaMask]: injected(),
  [WalletId.WalletConnect]: walletConnect({
    projectId: "6fc6f515daaa4b001616766bc028bffa",
  }),
};

export function convertMaybeViemError(error: unknown): unknown {
  if (error instanceof ViemBaseError) {
    if (
      error.name === "UserRejectedRequestError" ||
      (error as any).cause?.name === "UserRejectedRequestError"
    ) {
      return new WalletError(error.shortMessage, {
        code: WalletError.Codes.UserRejected,
        cause: error,
      });
    }
    if (
      error.name === "ChainMismatchError" ||
      (error as any).cause?.name === "ChainMismatchError"
    ) {
      return new WalletError(error.shortMessage, {
        code: WalletError.Codes.IncorrectNetwork,
        cause: error,
      });
    }
    return new WalletError(error.shortMessage, {
      code: WalletError.Codes.UnknownError,
      cause: error,
    });
  }
  return error;
}

export const config = createConfig({
  chains: SUPPORTED_CHAIN_IDS.map((chainId) => CHAINS[chainId]) as [
    Chain,
    ...Chain[]
  ],
  connectors: SUPPORTED_WALLET_IDS.map((walletId) => CONNECTORS[walletId]),
  client({ chain }) {
    return createClient({
      chain,
      transport: http(CHAINS[chain.id as ChainId].rpcUrls.default.http[0]),
    });
  },
  syncConnectedChain: true,
});
