import type { Metadata } from "next";
import { DM_Sans } from "next/font/google"; // We use Next.js font optimizer for DM Sans
import "./globals.css";
import { Providers } from "./providers";

// Initialize DM Sans
const dmSans = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "WrappedOnChain",
  description: "Your 2024 On-Chain Recap",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Bitcount Prop Single (Custom Font) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Bitcount+Prop+Single:wght@100..900&display=swap" rel="stylesheet" />
      </head>
      <body className={dmSans.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}