import Link from "next/link";

export function EthosMark({ size = 14 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-label="Ethos"
      style={{ display: "inline-block", verticalAlign: "middle" }}
    >
      <rect width="24" height="24" rx="6" fill="#1d9bf0" />
      <path
        d="M7 7h8M7 12h6M7 17h8"
        stroke="#fff"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function EthosBadge({
  score,
  verified,
}: {
  score: number | null;
  verified: string | null;
}) {
  if (score == null) return null;
  return (
    <span className="inline-flex items-center gap-1.5 mono text-xs px-2 py-0.5 rounded-full border border-[#26262b] text-[#8a8a93]">
      <EthosMark size={13} />
      Ethos {score}
      {verified === "VERIFIED" ? " ✓" : ""}
    </span>
  );
}
