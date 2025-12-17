"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider, cookieToInitialState, type State } from "wagmi";
import { createAppKit } from '@reown/appkit/react'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { base, celo } from "@reown/appkit/networks";
import { ReactNode, useEffect, useState } from "react";

// --- NEW IMPORTS ---
import { farcasterFrame } from "@farcaster/frame-wagmi-connector";
import sdk from "@farcaster/frame-sdk";

export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID || "YOUR_PROJECT_ID_HERE";

export const networks = [base, celo];

// --- MODIFIED ADAPTER ---
// We inject the farcasterFrame connector here.
export const wagmiAdapter = new WagmiAdapter({
  networks,
  projectId,
  ssr: true,
  connectors: [
    farcasterFrame() 
  ]
});

const metadata = {
  name: 'WrappedOnChain',
  description: 'Your 2025 Onchain Year in Review',
  url: 'https://wrapped-onchain.vercel.app', 
  icons: ['https://wrapped-onchain.vercel.app/favicon.ico'],
}

createAppKit({
  adapters: [wagmiAdapter],
  networks: [base, celo],
  projectId,
  metadata,
  features: {
    analytics: true 
  }
});

const queryClient = new QueryClient();

// --- NEW COMPONENT: Initialize Farcaster SDK ---
function FarcasterInit() {
  useEffect(() => {
    const load = async () => {
      // This tells the Farcaster client "We are loaded, stop the spinner"
      sdk.actions.ready();
    };
    if (sdk && sdk.actions) {
        load();
    }
  }, []);

  return null;
}

export function Providers({ children, initialState }: { children: ReactNode, initialState?: State }) {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig} initialState={initialState}>
      <QueryClientProvider client={queryClient}>
        <FarcasterInit /> 
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
}