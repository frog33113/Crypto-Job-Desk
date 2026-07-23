import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jobs — Crypto Job Desk",
  description: "Crypto-native job listings. Roles at protocols, DAOs, funds, and infra projects.",
  openGraph: {
    title: "Jobs — Crypto Job Desk",
    description: "Crypto-native job listings. Roles at protocols, DAOs, funds, and infra projects.",
    url: "https://cryptojobdesk.xyz/jobs",
    images: ["https://cryptojobdesk.xyz/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jobs — Crypto Job Desk",
    description: "Crypto-native job listings from crypto Twitter.",
    images: ["https://cryptojobdesk.xyz/og.png"],
  },
};

export default function JobsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
