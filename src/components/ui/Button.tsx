import { Link } from "react-router-dom";
import { cn } from "../../utils/cn";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "outline" | "dark" | "light";
type Size = "sm" | "md" | "lg";

interface BaseProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
  icon?: ReactNode;
}

type ButtonAsButton = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { to?: undefined };

type ButtonAsLink = BaseProps & {
  to: string;
  onClick?: () => void;
};

type Props = ButtonAsButton | ButtonAsLink;

const variants: Record<Variant, string> = {
  primary:
    "bg-ink text-paper hover:bg-ink/90 shadow-sm",
  secondary:
    "bg-accent text-ink hover:bg-accent-dark",
  ghost:
    "bg-transparent text-ink hover:bg-ink/5",
  outline:
    "bg-transparent border border-ink/15 text-ink hover:border-ink/40 hover:bg-ink/[0.03]",
  dark:
    "bg-white text-ink hover:bg-white/90",
  light:
    "bg-white/10 text-white border border-white/15 hover:bg-white/15",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-xs tracking-wide",
  md: "h-11 px-5 text-sm tracking-wide",
  lg: "h-12 px-7 text-[15px] tracking-wide",
};

export function Button(props: Props) {
  const {
    variant = "primary",
    size = "md",
    className,
    children,
    icon,
  } = props;

  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-300 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap",
    variants[variant],
    sizes[size],
    className
  );

  if ("to" in props && props.to) {
    return (
      <Link to={props.to} onClick={props.onClick} className={classes}>
        {children}
        {icon}
      </Link>
    );
  }

  const { to: _t, icon: _i, variant: _v, size: _s, ...rest } =
    props as ButtonAsButton & BaseProps;

  return (
    <button className={classes} {...rest}>
      {children}
      {icon}
    </button>
  );
}
