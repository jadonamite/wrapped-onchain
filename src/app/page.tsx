"use client";

import { useState } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { injected } from "wagmi/connectors";
import SlideIntro from "@/components/slides/SlideIntro";
import { WrappedSummary } from "@/types/wrapped";

export default function Home() {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();
  
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<WrappedSummary | null>(null);

  const fetchWrapped = async () => {
    if (!address) return;
    setLoading(true);
    try {
      // Call our API Engine
      const res = await fetch(`/api/wrapped?address=${address}`);
      const json = await res.json();
      
      if (json.error) {
        alert("Error: " + json.error);
        return;
      }
      setData(json);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-black text-white">
      
      {/* Header / Connect Button */}
      <div className="absolute top-6 right-6 z-10">
        {isConnected ? (
          <button 
            onClick={() => disconnect()} 
            className="text-xs font-mono text-zinc-500 hover:text-red-400 transition"
          >
            DISCONNECT {address?.slice(0,6)}...
          </button>
        ) : (
          <button 
            onClick={() => connect({ connector: injected() })}
            className="px-6 py-2 bg-white text-black font-bold rounded-full hover:scale-105 transition"
          >
            Connect Wallet
          </button>
        )}
      </div>

      <div className="w-full max-w-md aspect-[9/16] relative">
        
        {/* STATE 1: Not Connected / Start Screen */}
        {!data && (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-8 animate-in fade-in zoom-in">
            <div className="space-y-2">
              <h1 className="text-6xl font-black tracking-tighter bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
                WALLET<br/>WRAPPED
              </h1>
              <p className="text-zinc-500 font-medium">Your 2024 On-Chain Recap</p>
            </div>
            
            {isConnected ? (
              <button 
                onClick={fetchWrapped}
                disabled={loading}
                className="px-8 py-4 bg-white text-black rounded-full font-bold text-xl hover:bg-zinc-200 transition disabled:opacity-50 flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
                    Scanning...
                  </>
                ) : (
                  "Generate Wrapped 🚀"
                )}
              </button>
            ) : (
              <p className="text-sm text-zinc-600 border border-zinc-800 px-4 py-2 rounded-lg bg-zinc-900/50">
                Connect your wallet to start
              </p>
            )}
          </div>
        )}

        {/* STATE 2: Data Loaded (Slides) */}
        {data && (
          <SlideIntro data={data} />
        )}

      </div>
    </main>
  );
}