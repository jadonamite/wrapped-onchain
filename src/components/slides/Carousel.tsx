"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WrappedSummary } from "@/types/wrapped";
import Button3D from "@/components/ui/Button3D";
import { 
  ArrowRightIcon, 
  ArrowLeftIcon, 
  FireIcon, 
  TrophyIcon,
  CalendarDaysIcon,
  MapPinIcon,
  SparklesIcon
} from "@heroicons/react/24/solid";

// Helper to get chain colors
const getChainColor = (chain: string) => {
  const map: Record<string, string> = {
    "Ethereum": "bg-blue-100 text-blue-600",
    "Base": "bg-blue-500 text-white",
    "Polygon": "bg-purple-100 text-purple-600",
    "Optimism": "bg-red-100 text-red-600",
    "Arbitrum": "bg-cyan-100 text-cyan-600",
  };
  return map[chain] || "bg-gray-100 text-gray-600";
};

export default function Carousel({ data }: { data: WrappedSummary }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const totalSlides = 6;

  const nextSlide = () => {
    if (currentSlide < totalSlides - 1) setCurrentSlide(curr => curr + 1);
  };

  const prevSlide = () => {
    if (currentSlide > 0) setCurrentSlide(curr => curr - 1);
  };

  // SLIDE CONTENT DEFINITIONS
  const renderSlide = () => {
    switch (currentSlide) {
      // SLIDE 0: INTRO
      case 0:
        return (
          <div className="flex flex-col items-center text-center space-y-6">
            <span className="text-6xl animate-bounce">👋</span>
            <h2 className="text-4xl md:text-5xl font-logo uppercase leading-none text-slate-900">
              Your 2025<br/><span className="text-[#B1E4E3] text-stroke-sm">Unwrapped</span>
            </h2>
            <p className="text-slate-500 font-medium text-lg px-8">
              It's been a wild year on-chain. Let's see what you've been up to.
            </p>
          </div>
        );

      // SLIDE 1: THE HUSTLE (Tx Count)
      case 1:
        return (
          <div className="flex flex-col items-center text-center space-y-8">
            <div className="w-20 h-20 bg-[#B1E4E3] rounded-full flex items-center justify-center border-4 border-black shadow-[4px_4px_0px_0px_#000]">
              <SparklesIcon className="w-10 h-10 text-black" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Total Transactions</h3>
              <div className="text-7xl font-logo text-slate-900 drop-shadow-sm">
                {data.summary.total_tx.toLocaleString()}
              </div>
            </div>
            <p className="text-slate-500 font-medium">
              That's top {data.summary.total_tx > 100 ? "10%" : "50%"} percentile behavior right there.
            </p>
          </div>
        );

      // SLIDE 2: GAS GUZZLER
      case 2:
        return (
          <div className="flex flex-col items-center text-center space-y-8">
            <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center border-4 border-black shadow-[4px_4px_0px_0px_#000]">
              <FireIcon className="w-10 h-10 text-orange-500" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Gas Burned</h3>
              <div className="text-6xl font-logo text-slate-900">
                ${data.summary.total_gas_usd}
              </div>
            </div>
            <p className="text-slate-500 font-medium px-6">
               Fees paid to the network gods. Thank you for your service. 🫡
            </p>
          </div>
        );

      // SLIDE 3: THE HABITAT (Top Chain)
      case 3:
        return (
          <div className="flex flex-col items-center text-center space-y-8">
            <div className={`w-24 h-24 rounded-3xl flex items-center justify-center border-4 border-black shadow-[4px_4px_0px_0px_#000] ${getChainColor(data.favorites.top_chain)}`}>
              <MapPinIcon className="w-12 h-12" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Your Home Base</h3>
              <div className="text-5xl font-logo text-slate-900 uppercase">
                {data.favorites.top_chain}
              </div>
            </div>
            <div className="bg-slate-100 px-4 py-2 rounded-lg font-bold text-slate-600 border border-slate-200">
              {data.favorites.top_chain_count} Transactions here
            </div>
          </div>
        );

      // SLIDE 4: THE PEAK (Busiest Month)
      case 4:
        return (
          <div className="flex flex-col items-center text-center space-y-8">
            <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center border-4 border-black shadow-[4px_4px_0px_0px_#000]">
              <CalendarDaysIcon className="w-10 h-10 text-purple-600" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Peak Performance</h3>
              <div className="text-5xl font-logo text-slate-900 uppercase">
                {data.summary.peak_month}
              </div>
            </div>
            <p className="text-slate-500 font-medium px-8">
              You were absolutely locked in during {data.summary.peak_month}.
            </p>
          </div>
        );

      // SLIDE 5: PERSONA (The Card)
      case 5:
        return (
          <div className="flex flex-col items-center text-center w-full">
            <div className="relative w-full max-w-xs aspect-[3/4] rounded-2xl border-[3px] border-black shadow-[8px_8px_0px_0px_#000] overflow-hidden flex flex-col items-center justify-center p-6 bg-gradient-to-br from-white to-slate-100">
              {/* Card Header */}
              <div className="absolute top-4 right-4">
                <TrophyIcon className="w-8 h-8 text-yellow-400 drop-shadow-sm" />
              </div>
              
              {/* Avatar Placeholder */}
              <div className="w-24 h-24 bg-[#B1E4E3] rounded-full border-2 border-black mb-6 flex items-center justify-center text-3xl">
                👻
              </div>

              <h2 className="text-3xl font-logo uppercase leading-none mb-2 text-center text-slate-900">
                {data.persona.title}
              </h2>
              <div className="w-12 h-1 bg-black mb-4 rounded-full"></div>
              <p className="text-slate-500 font-medium text-sm px-4">
                "{data.persona.description}"
              </p>
              
              <div className="absolute bottom-0 left-0 w-full h-12 bg-black flex items-center justify-center">
                 <span className="text-white font-logo text-xs tracking-widest">WRAPPED ONCHAIN 2025</span>
              </div>
            </div>
            <p className="mt-6 text-xs font-bold text-slate-400 uppercase tracking-widest">
              This is your on-chain soul.
            </p>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-between min-h-[450px]">
      {/* 1. PROGRESS BAR */}
      <div className="flex gap-2 mb-6">
        {Array.from({ length: totalSlides }).map((_, i) => (
          <div 
            key={i} 
            className={`h-1.5 rounded-full flex-1 transition-all duration-300 ${i <= currentSlide ? 'bg-black' : 'bg-slate-200'}`}
          />
        ))}
      </div>

      {/* 2. SLIDE CONTENT (Animated) */}
      <div className="flex-grow flex items-center justify-center py-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="w-full"
          >
            {renderSlide()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 3. NAVIGATION BUTTONS */}
      <div className="flex gap-4 mt-4">
        {currentSlide > 0 ? (
          <button 
            onClick={prevSlide}
            className="w-14 h-14 rounded-full border-2 border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors"
          >
            <ArrowLeftIcon className="w-6 h-6 text-slate-400" />
          </button>
        ) : (
          <div className="w-14" /> /* Spacer */
        )}

        <Button3D 
          onClick={currentSlide === totalSlides - 1 ? () => alert("Mint Coming Soon!") : nextSlide} 
          variant="brand"
        >
          <span className="flex items-center gap-2 justify-center">
            {currentSlide === totalSlides - 1 ? (
              <>MINT PERSONA <SparklesIcon className="w-5 h-5" /></>
            ) : (
              <>NEXT <ArrowRightIcon className="w-5 h-5" /></>
            )}
          </span>
        </Button3D>
      </div>
    </div>
  );
}