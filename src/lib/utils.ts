import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Fusionne des classes Tailwind de manière intelligente (résout les conflits). */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Préfixe de base : "/Konciergate" en export statique (GitHub Pages), "" sinon.
 * next/image n'ajoute pas le basePath aux src en chaîne — on le fait nous-mêmes.
 */
export const BASE_PATH =
  process.env.NEXT_PUBLIC_STATIC_EXPORT === "true" ? "/Konciergate" : "";

/** Préfixe un chemin d'asset public avec le basePath (images, vidéos, icônes). */
export function asset(path: string): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${BASE_PATH}${clean}`;
}
