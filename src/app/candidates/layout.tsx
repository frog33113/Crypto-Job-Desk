import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Candidates — Crypto Job Desk",
  description: "Browse crypto-native talent verified through Ethos Network. Developers, researchers, designers, and more.",
  openGraph: {
    title: "Candidates — Crypto Job Desk",
    description: "Browse crypto-native talent verified through Ethos Network.",
    url: "https://cryptojobdesk.xyz/candidates",
    images: ["https://cryptojobdesk.xyz/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Candidates — Crypto Job Desk",
    description: "Browse crypto-native talent verified through Ethos Network.",
    images: ["https://cryptojobdesk.xyz/og.png"],
  },
};

export default function CandidatesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
