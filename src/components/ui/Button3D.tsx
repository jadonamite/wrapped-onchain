import { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface Button3DProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "brand" | "black";
}

export default function Button3D({ 
  className, 
  variant = "brand", 
  children, 
  ...props 
}: Button3DProps) {
  return (
    <button 
      className={cn(
        "relative w-full px-6 py-4 rounded-xl font-bold text-xl uppercase tracking-widest transition-all border-[3px] border-black font-heading",
        // The 3D Shadow Logic
        "shadow-[var(--shadow-hard)] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_#0F172A]",
        "active:translate-y-[2px] active:shadow-none",
        variant === "brand" ? "bg-[var(--brand)] text-black" : "bg-black text-white hover:bg-zinc-800",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}