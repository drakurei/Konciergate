import { z } from "zod";

/**
 * Schéma serveur (messages neutres). Côté client, le formulaire construit
 * un schéma équivalent avec messages traduits (next-intl).
 */
export const contactServerSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(200),
  message: z.string().trim().min(10).max(4000),
  consent: z.literal(true),
  // Honeypot anti-spam : doit rester vide.
  company: z.string().max(0).optional().or(z.literal("")),
});

export type ContactServerInput = z.infer<typeof contactServerSchema>;
