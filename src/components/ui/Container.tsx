import { ReactNode, CSSProperties } from "react";

const sizes = {
  default: "max-w-5xl",
  narrow: "max-w-3xl",
  wide: "max-w-6xl",
};

export default function Container({
  children,
  size = "default",
  className = "",
  style,
}: {
  children: ReactNode;
  size?: keyof typeof sizes;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      className={`mx-auto w-full px-4 sm:px-6 ${sizes[size]} ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}
