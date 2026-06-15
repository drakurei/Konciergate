import { cn } from "@/lib/utils";

type LogoProps = {
  /** Affiche le cadre carré autour du monogramme. */
  framed?: boolean;
  className?: string;
  /** Couleur du trait/lettre. Le point reste doré. */
  tone?: "light" | "dark";
  title?: string;
};

/**
 * Monogramme officiel Konciergate « K. » recréé en vectoriel
 * d'après le logo source (logo.jpeg). Le point est doré (or Konciergate).
 */
export function Logo({
  framed = true,
  className,
  tone = "light",
  title = "Konciergate",
}: LogoProps) {
  const stroke = tone === "light" ? "#ffffff" : "#1d1d1f";
  return (
    <svg
      viewBox="0 0 100 100"
      role="img"
      aria-label={title}
      className={cn("block", className)}
      fill="none"
    >
      <title>{title}</title>
      {framed && (
        <rect
          x="9"
          y="9"
          width="82"
          height="82"
          stroke={stroke}
          strokeWidth="2.25"
        />
      )}
      <text
        x="47"
        y="64"
        textAnchor="middle"
        fontFamily="-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', Arial, sans-serif"
        fontSize="48"
        fontWeight="500"
        letterSpacing="-1"
        fill={stroke}
      >
        K
      </text>
      <circle cx="68" cy="60" r="4.4" fill={stroke} />
    </svg>
  );
}
