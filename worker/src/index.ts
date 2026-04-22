/**
 * So'Relax — contact form worker.
 *
 * POST JSON: { name, email, phone?, message, company? }
 *   - `company` is a honeypot. If filled, respond 200 without sending.
 *   - other fields required and trimmed; email must contain "@".
 *
 * Secrets / vars (wrangler):
 *   RESEND_API_KEY     secret — Resend API key
 *   CONTACT_FORM_TO    var    — destination mailbox
 *   CONTACT_FORM_FROM  var    — "Display <from@domain>" (must be a verified Resend sender)
 *   ALLOWED_ORIGIN     var    — e.g. https://sorelaxmassage.be (comma-sep list or "*")
 */

export interface Env {
  RESEND_API_KEY: string;
  CONTACT_FORM_TO: string;
  CONTACT_FORM_FROM: string;
  ALLOWED_ORIGIN: string;
}

type Payload = {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  company?: string;
};

const MAX_FIELD = 5000;

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const cors = buildCorsHeaders(request, env.ALLOWED_ORIGIN);

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: cors });
    }

    if (request.method !== "POST") {
      return json({ error: "Method not allowed" }, 405, cors);
    }

    let body: Payload;
    try {
      body = (await request.json()) as Payload;
    } catch {
      return json({ error: "Ongeldige aanvraag." }, 400, cors);
    }

    // Honeypot: silently succeed so bots can't tell.
    if (body.company && body.company.trim().length > 0) {
      return json({ ok: true }, 200, cors);
    }

    const name = sanitize(body.name);
    const email = sanitize(body.email);
    const phone = sanitize(body.phone);
    const message = sanitize(body.message);

    if (!name || !email || !message) {
      return json({ error: "Vul naam, e-mail en bericht in." }, 400, cors);
    }
    if (!email.includes("@") || email.length > 320) {
      return json({ error: "Geen geldig e-mailadres." }, 400, cors);
    }

    const subject = `Nieuw bericht via So'Relax — ${name}`;
    const html = renderHtml({ name, email, phone, message });
    const text = renderText({ name, email, phone, message });

    const resendRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: env.CONTACT_FORM_FROM,
        to: [env.CONTACT_FORM_TO],
        reply_to: email,
        subject,
        html,
        text,
      }),
    });

    if (!resendRes.ok) {
      const detail = await resendRes.text();
      console.error("Resend error", resendRes.status, detail);
      return json(
        { error: "Verzenden mislukt. Probeer het later opnieuw." },
        502,
        cors,
      );
    }

    return json({ ok: true }, 200, cors);
  },
};

function sanitize(v: unknown): string {
  if (typeof v !== "string") return "";
  return v.trim().slice(0, MAX_FIELD);
}

function buildCorsHeaders(request: Request, allowed: string): Record<string, string> {
  const origin = request.headers.get("Origin") ?? "";
  const allowList = (allowed ?? "*")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  const allowedOrigin =
    allowList.includes("*") || allowList.includes(origin) ? origin || "*" : allowList[0] ?? "*";
  return {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  };
}

function json(body: unknown, status: number, cors: Record<string, string>): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      ...cors,
    },
  });
}

function renderText(p: { name: string; email: string; phone: string; message: string }): string {
  return [
    `Naam: ${p.name}`,
    `E-mail: ${p.email}`,
    p.phone ? `Telefoon: ${p.phone}` : "",
    "",
    p.message,
  ]
    .filter(Boolean)
    .join("\n");
}

function renderHtml(p: { name: string; email: string; phone: string; message: string }): string {
  const esc = (s: string) =>
    s
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  return `<div style="font:15px/1.6 -apple-system,Segoe UI,Helvetica,Arial,sans-serif;color:#1f2a2e">
  <h2 style="font-family:Georgia,serif;margin:0 0 16px">Nieuw bericht via So'Relax</h2>
  <p><strong>Naam:</strong> ${esc(p.name)}<br>
  <strong>E-mail:</strong> <a href="mailto:${esc(p.email)}">${esc(p.email)}</a>${
    p.phone ? `<br><strong>Telefoon:</strong> ${esc(p.phone)}` : ""
  }</p>
  <hr style="border:none;border-top:1px solid #e5dfd4;margin:16px 0">
  <p style="white-space:pre-wrap">${esc(p.message)}</p>
</div>`;
}
