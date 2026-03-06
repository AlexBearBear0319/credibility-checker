import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

// 1. Separate viewport configurations
export const viewport: Viewport = {
  themeColor: "#3b82f6",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1, // Prevents auto-zooming on inputs for elderly users
};

// 2. Add the Apple PWA specific tags
export const metadata: Metadata = {
  title: "Credibility Checker",
  description: "Instantly verify WhatsApp messages and news.",
  manifest: "/manifest.webmanifest", // Next.js automatically routes your manifest.ts here
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "TruthCheck",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
