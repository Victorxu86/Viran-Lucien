import Link from "next/link";
import { type ComponentProps } from "react";

type ButtonProps = ComponentProps<"button"> & {
  variant?: "outline" | "text";
  asChild?: boolean;
  href?: string;
};

export function Button({
  variant = "outline",
  asChild = false,
  href,
  className = "",
  children,
  ...rest
}: ButtonProps) {
  const base = `btn ${variant === "text" ? "btn--text" : ""} ${className}`;
  if (asChild && href) {
    return (
      <Link href={href} className={base}>
        {children}
      </Link>
    );
  }
  return (
    <button className={base} {...rest}>
      {children}
    </button>
  );
}


