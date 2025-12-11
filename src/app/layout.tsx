import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers"; // Import the file we just made

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Wallet Wrapped 2024",
  description: "Your on-chain year in review",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Wrap the children with Providers */}
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}