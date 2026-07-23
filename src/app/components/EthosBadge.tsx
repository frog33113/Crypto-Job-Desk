export function EthosMark({ size = 14 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      aria-label="Ethos"
      style={{ display: "inline-block", verticalAlign: "middle", flexShrink: 0 }}
    >
      <path
        d="M19.92 19.96C19.92 21.3282 19.8351 22.6765 19.6703 24H0V32H17.606C16.444 34.8973 14.875 39.5876 12.9697 40H40V32H17.606C18.6188 29.475 19.3225 26.7927 19.6703 24H40V16H19.6801C19.3395 13.208 18.6432 10.5257 17.638 8H40V0H13.0327C14.927 2.4141 16.4855 5.10421 17.638 8H0V16H19.6801C19.8385 17.2978 19.92 18.6194 19.92 19.96Z"
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
