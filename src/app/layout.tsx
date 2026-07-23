import type { Metadata } from "next";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const url = "https://cryptojobdesk.xyz";
  const imageUrl = "https://cryptojobdesk.xyz/og.png";
  return {
    title: "Crypto Job Desk",
    description: "A job board for crypto Twitter. Every candidate is verified through Ethos Network.",
    icons: {
      icon: "/icon.svg",
    },
    openGraph: {
      title: "Crypto Job Desk",
      description: "A job board for crypto Twitter. Every candidate is verified through Ethos Network.",
      url,
      images: [imageUrl],
    },
    twitter: {
      card: "summary_large_image",
      title: "Crypto Job Desk",
      description: "A job board for crypto Twitter. Every candidate is verified through Ethos Network.",
      images: [imageUrl],
    },
  };
}

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
