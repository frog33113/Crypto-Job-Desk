"use client";
import { useState } from "react";

export default function ShareButton({ username }: { username: string }) {
  const [copied, setCopied] = useState(false);
  const url = typeof window !== "undefined" ? window.location.origin + `/u/${encodeURIComponent(username)}` : "";

  return (
    <button
      onClick={() => {
        if (!url) return;
        if (navigator.share) {
          navigator
            .share({ title: `@${username} on Crypto Job Desk`, url })
            .catch(() => {});
          return;
        }
        navigator.clipboard.writeText(url).then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        });
      }}
      className="text-[13px] text-[#8a8a93] hover:text-white transition-colors inline-flex items-center gap-1"
    >
      {copied ? (
        <>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
            <polyline points="20 6 9 17 4 12" stroke="#5b9dd9" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Copied
        </>
      ) : (
        <>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
            <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <polyline points="16 6 12 2 8 6" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
            <line x1="12" y1="2" x2="12" y2="15" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
          </svg>
          Share
        </>
      )}
    </button>
  );
}
