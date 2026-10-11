import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "ghost" | "quiet";
type Size = "md" | "lg";

const base =
  "group/btn inline-flex min-h-11 items-center justify-center gap-2 rounded-full font-medium tracking-tight whitespace-nowrap transition-[background-color,border-color,color,transform] duration-200 ease-out-expo active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary: "bg-accent text-accent-ink hover:bg-[color-mix(in_srgb,var(--accent)_86%,var(--fg))]",
  ghost: "border border-line-strong text-fg hover:border-fg hover:bg-surface-2",
  quiet: "text-fg underline-offset-4 hover:underline px-0!",
};

const sizes: Record<Size, string> = {
  md: "px-5 text-sm",
  lg: "px-6 text-[0.95rem] min-h-12",
};

export function buttonClasses(variant: Variant = "primary", size: Size = "md", className?: string) {
  return cn(base, variants[variant], sizes[size], className);
}

type CommonProps = { variant?: Variant; size?: Size; icon?: ReactNode; children: ReactNode };

export function LinkButton({
  variant,
  size,
  icon,
  children,
  className,
  external,
  ...props
}: CommonProps & ComponentProps<typeof Link> & { external?: boolean }) {
  return (
    <Link
      className={buttonClasses(variant, size, className)}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...props}
    >
      {children}
      {icon && <span className="transition-transform duration-200 group-hover/btn:translate-x-0.5" aria-hidden>{icon}</span>}
      {external && <span className="sr-only"> (nouvel onglet)</span>}
    </Link>
  );
}

export function Button({ variant, size, icon, children, className, ...props }: CommonProps & ComponentProps<"button">) {
  return (
    <button className={buttonClasses(variant, size, className)} {...props}>
      {children}
      {icon && <span aria-hidden>{icon}</span>}
    </button>
  );
}
