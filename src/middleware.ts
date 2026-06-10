import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Toutes les routes sauf : API, internes Next, fichiers statiques (avec point),
  // et les routes de métadonnées générées (icônes, OG, sitemap, robots, manifest).
  matcher: [
    "/((?!api|_next|_vercel|opengraph-image|apple-icon|icon|sitemap|robots|manifest|.*\\..*).*)",
  ],
};
