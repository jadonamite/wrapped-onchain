"use client";

import { useState } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { injected } from "wagmi/connectors";
import Button3D from "@/components/ui/Button3D";
import { WrappedSummary } from "@/types/wrapped";
import SlideIntro from "@/components/slides/SlideIntro";
import Stepper from "@/components/ui/Stepper";

export default function Home() {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();
  
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<WrappedSummary | null>(null);

  // Determine current step for the stepper
  const currentStep = !isConnected ? 1 : !data ? 2 : 3;

  const fetchWrapped = async () => {
    if (!address) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/wrapped?address=${address}`);
      const json = await res.json();
      if (json.error) { alert(json.error); return; }
      setData(json);
    } catch (err) { console.error(err); } finally { setLoading(false); }
  };

  return (
    <main className="min-h-screen w-full flex flex-col items-center pt-32 pb-12 px-4 relative">
      
      {/* 1. FIXED HEADER LOGO */}
      <div className="fixed top-0 left-0 w-full flex justify-center z-50 pt-6 pb-4 bg-gradient-to-b from-[#B1E4E3] to-transparent pointer-events-none">
        <h1 className="font-logo text-3xl md:text-5xl text-white uppercase tracking-wider drop-shadow-[3px_3px_0px_rgba(0,0,0,1)] text-stroke-2 pointer-events-auto">
          <span className="text-white">WRAPPED</span>
          <span className="text-[#B1E4E3] ml-2" style={{ textShadow: "3px 3px 0 #000" }}>ONCHAIN</span>
        </h1>
      </div>

      {/* 2. STEPPER */}
      <div className="z-10">
         <Stepper step={currentStep} />
      </div>

      {/* 3. THE BIGGER CARD */}
      {/* Increased max-width to 'max-w-2xl' and padding */}
      <div className="z-10 w-full max-w-2xl bg-white border-[3px] border-black rounded-[2.5rem] shadow-hard p-8 md:p-14 relative transition-all duration-300">
        
        {!data ? (
          /* START SCREEN */
          <div className="flex flex-col items-center text-center space-y-8">
            <div className="space-y-2">
              <h2 className="text-3xl md:text-4xl font-black font-logo tracking-wide text-slate-900">
                CHECK YOUR 2025
              </h2>
              <p className="text-slate-500 font-medium text-lg">
                Connect your wallet to generate your yearly recap.
              </p>
            </div>
             
             {isConnected ? (
               <div className="w-full max-w-xs space-y-4">
                 <Button3D onClick={fetchWrapped} disabled={loading} variant="brand" className="py-5 text-xl">
                   {loading ? "SCANNING..." : "GENERATE WRAPPED 🚀"}
                 </Button3D>
                 <button onClick={() => disconnect()} className="text-sm font-bold text-slate-400 underline decoration-2 underline-offset-4 hover:text-black">
                   Disconnect {address?.slice(0,6)}...
                 </button>
               </div>
             ) : (
               <div className="w-full max-w-xs">
                 <Button3D onClick={() => connect({ connector: injected() })} variant="black" className="py-5 text-xl">
                   CONNECT WALLET
                 </Button3D>
               </div>
             )}
          </div>
        ) : (
          /* RESULTS SCREEN */
          <div>
            <SlideIntro data={data} />
            <div className="mt-8 flex justify-center">
              <button 
                onClick={() => setData(null)} 
                className="text-xs font-bold text-slate-400 hover:text-black uppercase tracking-widest border-b-2 border-transparent hover:border-black transition-all"
              >
                 Start Over
              </button>
            </div>
          </div>
        )}
      </div>
      
      {/* Footer */}
      <div className="mt-12 opacity-40 font-logo text-xs tracking-widest">
        POWERED BY COVALENT
      </div>
    </main>
  );
}