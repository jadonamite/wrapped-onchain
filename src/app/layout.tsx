import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

// 1. Configure font with variable
const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans", // Matches globals.css
  display: "swap",
});

export const metadata: Metadata = {
  title: "WrappedOnChain",
  description: "2024 Recap",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Retro Font Link */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Bitcount+Prop+Single:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      {/* 2. Apply variable to body */}
      <body className={dmSans.variable}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}