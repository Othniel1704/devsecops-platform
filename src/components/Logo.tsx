export default function Logo() {
  return (
    <span className="inline-flex items-center gap-2.5" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700 }}>
      {/* Shield + AI spark icon */}
      <svg
        width="28"
        height="28"
        viewBox="0 0 32 32"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="logo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="#a78bfa" />
          </linearGradient>
        </defs>
        {/* Shield */}
        <path
          d="M16 3L4 7.5V15C4 21.5 9.2 27.3 16 29C22.8 27.3 28 21.5 28 15V7.5L16 3Z"
          fill="url(#logo-grad)"
          opacity="0.9"
        />
        {/* Checkmark */}
        <path
          d="M11 16L14.5 19.5L21 12.5"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* AI spark dot */}
        <circle cx="24" cy="8" r="3" fill="#22d3ee" opacity="0.8" />
        <circle cx="24" cy="8" r="1.5" fill="white" />
      </svg>
      <span style={{ color: "var(--text-primary)", fontSize: "1rem", letterSpacing: "-0.01em" }}>
        DevSec<span style={{ color: "var(--cyan)" }}>AI</span>
      </span>
    </span>
  );
}
