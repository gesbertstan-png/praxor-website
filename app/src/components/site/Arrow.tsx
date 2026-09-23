/** Hairline arrow. The shaft stretches and the head slides on hover (see .arrow in styles.css). */
export function Arrow({ className }: { className?: string }) {
  return (
    <svg className={`arrow ${className ?? ""}`} viewBox="0 0 26 12" aria-hidden="true" focusable="false">
      <path className="arrow__shaft" d="M0 6h24" />
      <path className="arrow__head" d="M19 1l5 5-5 5" />
    </svg>
  );
}
