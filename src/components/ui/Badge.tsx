import { ReactNode } from "react";

const tones = {
  cyan:    { bg: "rgba(34,211,238,0.1)",  color: "var(--cyan)",    border: "rgba(34,211,238,0.25)"  },
  violet:  { bg: "rgba(167,139,250,0.1)", color: "var(--violet)",  border: "rgba(167,139,250,0.25)" },
  emerald: { bg: "rgba(52,211,153,0.1)",  color: "var(--emerald)", border: "rgba(52,211,153,0.25)"  },
  amber:   { bg: "rgba(251,191,36,0.1)",  color: "var(--amber)",   border: "rgba(251,191,36,0.25)"  },
  slate:   { bg: "rgba(255,255,255,0.06)", color: "var(--text-secondary)", border: "var(--border-strong)" },
};

type Tone = keyof typeof tones;

export default function Badge({
  children,
  tone = "cyan",
}: {
  children: ReactNode;
  tone?: Tone;
}) {
  const t = tones[tone];
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        borderRadius: "9999px",
        padding: "0.25rem 0.75rem",
        fontSize: "0.6875rem",
        fontWeight: 600,
        letterSpacing: "0.04em",
        textTransform: "uppercase",
        background: t.bg,
        color: t.color,
        border: `1px solid ${t.border}`,
        fontFamily: "'Space Grotesk', sans-serif",
      }}
    >
      {children}
    </span>
  );
}
