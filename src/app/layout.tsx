import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Crypto Job Desk",
  description: "Find jobs among verified people in crypto Twitter",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-full flex flex-col bg-[#0a0a0a] text-[#eaeaea] antialiased">
        {children}
      </body>
    </html>
  );
}
