import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "light";
type Size = "md" | "lg";

const base =
  "group relative inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-[-0.01em] transition-all duration-500 ease-[var(--ease-luxe)] focus-visible:outline-none disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-ink text-white hover:bg-gold hover:text-white shadow-[0_1px_2px_rgba(0,0,0,0.08)]",
  secondary:
    "border border-ink/20 text-ink hover:border-gold hover:text-gold bg-transparent",
  ghost: "text-ink hover:text-gold bg-transparent",
  light:
    "border border-white/35 text-white hover:bg-white hover:text-ink bg-transparent backdrop-blur-sm",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-6 text-sm",
  lg: "h-14 px-8 text-base",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

type ButtonAsLink = CommonProps & { href: string };
type ButtonAsButton = CommonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button(props: ButtonAsLink | ButtonAsButton) {
  const variant = props.variant ?? "primary";
  const size = props.size ?? "md";
  const classes = cn(base, variants[variant], sizes[size], props.className);

  if ("href" in props) {
    return (
      <Link href={props.href} className={classes}>
        {props.children}
      </Link>
    );
  }

  const { variant: _v, size: _s, className: _c, children, ...rest } = props;
  void _v;
  void _s;
  void _c;
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
