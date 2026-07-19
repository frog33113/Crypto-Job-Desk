export function EthosMark({ size = 14 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      aria-label="Ethos"
      style={{ display: "inline-block", verticalAlign: "middle", flexShrink: 0 }}
    >
      <rect width="32" height="32" rx="8" fill="#1d9bf0" />
      {/* Ethos "E": vertical stem + three horizontal bars */}
      <rect x="9" y="8" width="3.2" height="16" rx="1.2" fill="#fff" />
      <rect x="9" y="8" width="13" height="3.2" rx="1.2" fill="#fff" />
      <rect x="9" y="14.4" width="10" height="3.2" rx="1.2" fill="#fff" />
      <rect x="9" y="20.8" width="13" height="3.2" rx="1.2" fill="#fff" />
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
