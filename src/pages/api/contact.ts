import type { APIRoute } from "astro";

// Contact form endpoint. Runs on the server; sends the message with Resend.
// Needs RESEND_API_KEY. CONTACT_TO and CONTACT_FROM are optional overrides.
export const prerender = false;

const json = (status: number, body: Record<string, unknown>) =>
  new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });

const clean = (value: unknown, max: number) =>
  typeof value === "string" ? value.replace(/[\r\n]+/g, " ").trim().slice(0, max) : "";

export const POST: APIRoute = async ({ request }) => {
  let data: Record<string, unknown>;
  try {
    data = await request.json();
  } catch {
    return json(400, { error: "invalid_body" });
  }

  // Bots fill the hidden field or submit instantly. Answer "ok" so they move on.
  if (clean(data.website, 200) || Number(data.elapsed) < 2500) return json(200, { ok: true });

  const name = clean(data.name, 120);
  const email = clean(data.email, 200);
  const company = clean(data.company, 120);
  const topic = clean(data.topic, 80);
  const kind = clean(data.kind, 80);
  const message = typeof data.message === "string" ? data.message.trim().slice(0, 5000) : "";
  if (!name || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return json(400, { error: "invalid_fields" });

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return json(503, { error: "not_configured" });

  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Company: ${company || "-"}`,
    `Help with: ${topic || "-"}`,
    `Kind of help: ${kind || "-"}`,
    "",
    message,
  ].join("\n");

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM ?? "mcorte.com <website@mcorte.com>",
      to: [process.env.CONTACT_TO ?? "hello@mcorte.com"],
      reply_to: email,
      subject: `[mcorte.com] ${topic || "New message"} — ${name}`,
      text,
    }),
  });

  if (!response.ok) {
    console.error("Resend rejected the message", response.status, await response.text());
    return json(502, { error: "send_failed" });
  }
  return json(200, { ok: true });
};
