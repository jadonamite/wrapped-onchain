import type { Metadata } from "next";
import { DM_Sans, Alfa_Slab_One } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

// Load the new chunky font
const alfaSlab = Alfa_Slab_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-alfa", // We'll use this variable in CSS
  display: "swap",
});

export const metadata: Metadata = {
  title: "WrappedOnChain 2025",
  description: "2025 Recap",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      {/* Add both font variables to body */}
      <body className={`${dmSans.variable} ${alfaSlab.variable} antialiased min-h-screen bg-[#B1E4E3]`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}