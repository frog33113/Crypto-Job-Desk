import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Crypto Job Desk — Jobs, filtered by on-chain trust",
  description: "A job board for crypto Twitter. Every candidate is verified through Ethos Network.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-full bg-[#07070a] text-[#eaeaea] antialiased">
        {children}
      </body>
    </html>
  );
}
