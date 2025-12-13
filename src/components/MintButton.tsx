// src/components/MintButton.tsx
'use client';

import { useState } from 'react';
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseEther } from 'viem';
import { SparklesIcon } from "@heroicons/react/24/solid"; // Matching your icon usage
import { WrappedSummary } from '@/types/wrapped';
import Button3D from './ui/Button3D';
import { PERSONA_CONTRACT_ABI, PERSONA_CONTRACT_ADDRESS } from '../constants/contracts';

export default function MintButton({ data }: { data: WrappedSummary }) {
  // State management
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');

  // Wagmi Hooks
  const { 
    data: hash, 
    isPending: isWalletLoading, 
    error: walletError, 
    writeContract 
  } = useWriteContract();

  const { 
    isLoading: isConfirming, 
    isSuccess: isConfirmed 
  } = useWaitForTransactionReceipt({ hash });

  const handleMint = async () => {
    setUploadError('');
    setIsUploading(true);

    try {
      // 1. Prepare Metadata from your WrappedSummary type
      // We map your frontend data to standard NFT Metadata format
      const metadataPayload = {
        name: data.persona.title, // e.g., "The Diamond Hand"
        description: data.persona.description,
        attributes: [
          { trait_type: "Year", value: data.year },
          { trait_type: "Total Transactions", value: data.summary.total_tx },
          { trait_type: "Peak Month", value: data.summary.peak_month },
          { trait_type: "Top Chain", value: data.favorites.top_chain },
          { trait_type: "Gas Burned (USD)", value: data.summary.total_gas_usd },
        ],
        // You can add a default image here if you haven't generated one dynamically yet
        image: "ipfs://QmYourDefaultPlaceholderImage" 
      };

      // 2. Upload to Pinata
      const response = await fetch('/api/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(metadataPayload),
      });

      const resData = await response.json();
      if (!resData.success) throw new Error('IPFS Upload Failed');

      // 3. Trigger Wallet
      writeContract({
        address: PERSONA_CONTRACT_ADDRESS,
        abi: PERSONA_CONTRACT_ABI,
        functionName: 'mintNft',
        args: [resData.ipfsUri],
        value: parseEther('0.0001'), 
      });

    } catch (err) {
      console.error(err);
      setUploadError('Failed to prepare metadata.');
    } finally {
      setIsUploading(false);
    }
  };

  // --- RENDER STATES ---

  // 1. Success State (Replaces button with Success Message)
  if (isConfirmed) {
    return (
      <div className="w-full text-center animate-in fade-in zoom-in duration-300">
        <div className="bg-green-100 border-[3px] border-black p-4 rounded-xl shadow-[4px_4px_0px_0px_#000]">
          <h3 className="text-xl font-black text-black uppercase">Minted! 🏆</h3>
          <a 
            href={`https://sepolia.basescan.org/tx/${hash}`} 
            target="_blank" 
            rel="noreferrer"
            className="text-xs font-bold underline mt-1 block hover:text-green-700"
          >
            View Transaction
          </a>
        </div>
      </div>
    );
  }

  // 2. Logic to determine button text
  const buttonText = isUploading ? 'Uploading...' 
                   : isWalletLoading ? 'Check Wallet...' 
                   : isConfirming ? 'Minting...' 
                   : 'MINT CARD';

  return (
    <div className="w-full">
      {/* Error Bubble */}
      {(uploadError || walletError) && (
        <div className="absolute -top-16 left-0 right-0 mx-auto w-max max-w-[90%] text-center text-xs font-bold bg-red-100 text-red-600 border-2 border-red-500 p-2 rounded mb-2">
          ⚠️ {uploadError || (walletError as any)?.shortMessage || 'Transaction Failed'}
        </div>
      )}

      {/* The 3D Button */}
      <Button3D 
        onClick={handleMint}
        disabled={isUploading || isWalletLoading || isConfirming}
        variant="brand" // Keeping your "Brand" style
        className="w-full"
      >
        <span className="flex items-center gap-2 justify-center">
          {buttonText} <SparklesIcon className="w-5 h-5" />
        </span>
      </Button3D>
    </div>
  );
}