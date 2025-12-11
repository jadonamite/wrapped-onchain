"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider, createConfig, http } from "wagmi";
import { mainnet, base, celo } from "wagmi/chains";
import { injected } from "wagmi/connectors";
import { ReactNode } from "react";

const config = createConfig({
  chains: [mainnet, base, celo],
  transports: {
    [mainnet.id]: http(),
    [base.id]: http(),
    [celo.id]: http(),
  },
  connectors: [
    injected(), // This connects MetaMask / Coinbase Wallet
  ],
});

const queryClient = new QueryClient();

export function Providers({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
}