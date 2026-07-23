import type { Metadata } from "next";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Crypto Job Desk",
    description: "A job board for crypto Twitter. Every candidate is verified through Ethos Network.",
    icons: {
      icon: "/icon.svg",
    },
    openGraph: {
      title: "Crypto Job Desk",
      description: "A job board for crypto Twitter. Every candidate is verified through Ethos Network.",
      images: ["/api/og"],
    },
    twitter: {
      card: "summary_large_image",
      title: "Crypto Job Desk",
      description: "A job board for crypto Twitter. Every candidate is verified through Ethos Network.",
      images: ["/api/og"],
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
