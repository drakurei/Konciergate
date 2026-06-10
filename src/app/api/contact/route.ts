import { NextResponse } from "next/server";
import { Resend } from "resend";
import { contactServerSchema } from "@/lib/validation";
import { siteConfig } from "@/lib/site";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const parsed = contactServerSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "validation" }, { status: 422 });
  }

  const { name, email, message, company } = parsed.data;

  // Honeypot rempli → robot. On feint le succès sans rien envoyer.
  if (company) {
    return NextResponse.json({ ok: true });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL ?? "contact@konciergate.com";
  const to = process.env.CONTACT_TO_EMAIL ?? siteConfig.contact.email;

  // En l'absence de clé (dev local), on journalise sans bloquer l'UX.
  if (!apiKey) {
    console.warn(
      "[contact] RESEND_API_KEY absente — e-mail non envoyé (mode développement).",
      { name, email },
    );
    return NextResponse.json({ ok: true, dev: true });
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: `Konciergate <${from}>`,
      to: [to],
      replyTo: email,
      subject: `Nouveau message de ${name} — konciergate.com`,
      text: `Nom : ${name}\nE-mail : ${email}\n\n${message}`,
      html: `
        <div style="font-family:Helvetica,Arial,sans-serif;color:#1d1d1f">
          <h2 style="font-weight:600">Nouveau message — Konciergate</h2>
          <p><strong>Nom :</strong> ${escapeHtml(name)}</p>
          <p><strong>E-mail :</strong> ${escapeHtml(email)}</p>
          <p style="white-space:pre-line;border-top:1px solid #e6e6e6;padding-top:16px">${escapeHtml(message)}</p>
        </div>`,
    });

    if (error) {
      console.error("[contact] Resend error:", error);
      return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] unexpected error:", err);
    return NextResponse.json({ ok: false, error: "server_error" }, { status: 500 });
  }
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
