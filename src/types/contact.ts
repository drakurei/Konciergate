export type ContactInput = {
  name: string;
  email: string;
  message: string;
  consent: boolean;
  /** Anti-spam : champ caché qui doit rester vide. */
  company?: string;
};

export type ContactResponse =
  | { ok: true }
  | { ok: false; error: string };
