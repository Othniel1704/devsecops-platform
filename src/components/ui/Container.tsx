import { ReactNode } from "react";

const sizes = {
  default: "max-w-5xl",
  narrow: "max-w-3xl",
  wide: "max-w-6xl",
};

export default function Container({
  children,
  size = "default",
  className = "",
}: {
  children: ReactNode;
  size?: keyof typeof sizes;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full px-4 ${sizes[size]} ${className}`}>
      {children}
    </div>
  );
}
