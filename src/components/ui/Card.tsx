import { ReactNode } from "react";

export default function Card({
  children,
  className = "",
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={`card-hover ${className}`}
      style={{
        borderRadius: "16px",
        border: "1px solid var(--border)",
        background: "rgba(13, 18, 32, 0.7)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        padding: "1.5rem",
        boxShadow: "0 1px 3px rgba(0,0,0,0.3), 0 4px 16px rgba(0,0,0,0.2)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
