"use client";

import Link from "next/link";
import { ReactNode, CSSProperties } from "react";

type Variant = "primary" | "secondary" | "ghost" | "outline";

const variantStyles: Record<Variant, string> = {
  primary:   "btn btn-primary",
  secondary: "btn btn-secondary",
  outline:   "btn btn-outline",
  ghost:     "btn btn-ghost",
};

export function Button({
  href,
  variant = "primary",
  children,
  type = "button",
  disabled,
  onClick,
  className = "",
  style,
}: {
  href?: string;
  variant?: Variant;
  children: ReactNode;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  style?: CSSProperties;
}) {
  const cls = `${variantStyles[variant]} ${disabled ? "btn-disabled" : ""} ${className}`;

  if (href) {
    return (
      <Link href={href} className={cls} style={style}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} disabled={disabled} onClick={onClick} className={cls} style={style}>
      {children}
    </button>
  );
}
