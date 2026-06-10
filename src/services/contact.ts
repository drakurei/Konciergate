import type { ContactInput, ContactResponse } from "@/types/contact";

/** Envoie le formulaire de contact vers la route API. */
export async function sendContact(input: ContactInput): Promise<ContactResponse> {
  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
    if (!res.ok) {
      const data = (await res.json().catch(() => null)) as ContactResponse | null;
      return { ok: false, error: data && "error" in data ? data.error : "request_failed" };
    }
    return { ok: true };
  } catch {
    return { ok: false, error: "network_error" };
  }
}
