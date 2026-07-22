export function EthosMark({ size = 14 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 1 30 30"
      fill="none"
      aria-label="Ethos"
      style={{ display: "inline-block", verticalAlign: "middle", flexShrink: 0 }}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.505 2.6h4.998v9.054l8.453-2.746L27.5 13.66l-8.453 2.746 5.322 7.326-4.043 2.937-5.322-7.325-5.322 7.325-4.044-2.937 5.323-7.326-8.454-2.746 1.545-4.753 8.453 2.746zm6.513 13.798-1.533-4.72h-4.963l-1.533 4.72 4.015 2.917z"
        fill="#5b9dd9"
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
    <span className="inline-flex items-center gap-1.5 mono text-xs px-2.5 py-1 rounded-full border border-[#2a2a32] bg-[#0c0c10]/60 text-[#b5b5bd]">
      <EthosMark size={13} />
      <span className="text-white font-medium">{score}</span>
      {verified === "VERIFIED" && (
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" style={{ marginLeft: -2 }}>
          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" fill="#5b9dd9" />
        </svg>
      )}
    </span>
  );
}
