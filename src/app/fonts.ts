import localFont from "next/font/local";

/**
 * General Sans (Fontshare — libre pour usage commercial), auto-hébergée.
 * Typographie premium moderne avec du caractère.
 */
export const generalSans = localFont({
  src: [
    { path: "./fonts/GeneralSans-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/GeneralSans-500.woff2", weight: "500", style: "normal" },
    { path: "./fonts/GeneralSans-600.woff2", weight: "600", style: "normal" },
    { path: "./fonts/GeneralSans-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-general",
  display: "swap",
  fallback: [
    "-apple-system",
    "BlinkMacSystemFont",
    "Helvetica Neue",
    "Arial",
    "sans-serif",
  ],
});
