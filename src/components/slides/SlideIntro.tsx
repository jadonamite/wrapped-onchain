import { WrappedSummary } from "@/types/wrapped";
import { FireIcon, BoltIcon } from "@heroicons/react/24/outline";

export default function SlideIntro({ data }: { data: WrappedSummary }) {
  // Convert string "$0.00" to a number to check if it's real
  const gasValue = parseFloat(data.summary.total_gas_usd);
  const showGas = gasValue > 0;

  return (
    <div className="flex flex-col items-center justify-center h-full space-y-8 text-center p-6 bg-zinc-900 border border-zinc-800 rounded-3xl shadow-2xl animate-in fade-in zoom-in duration-500">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-white">2024 At A Glance</h2>
        <p className="text-zinc-400">You were busy this year.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 w-full">
        {/* Transaction Card */}
        <div className="bg-zinc-800/50 p-6 rounded-2xl border border-zinc-700/50 flex flex-col items-center hover:bg-zinc-800 transition">
          <BoltIcon className="w-10 h-10 text-yellow-400 mb-2" />
          <span className="text-5xl font-black text-white tracking-tighter">
            {data.summary.total_tx.toLocaleString()}
          </span>
          <span className="text-sm font-medium text-zinc-400 uppercase tracking-widest mt-2">
            Total Transactions
          </span>
        </div>

        {/* Gas Card - Only show if > 0 */}
        {showGas && (
          <div className="bg-zinc-800/50 p-6 rounded-2xl border border-zinc-700/50 flex flex-col items-center hover:bg-zinc-800 transition">
            <FireIcon className="w-10 h-10 text-orange-500 mb-2" />
            <span className="text-4xl font-bold text-white">
              ${data.summary.total_gas_usd}
            </span>
            <span className="text-sm font-medium text-zinc-400 uppercase tracking-widest mt-2">
              Gas Burned
            </span>
          </div>
        )}
      </div>
    </div>
  );
}