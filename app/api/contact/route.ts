import { NextResponse } from "next/server";
import { Resend } from "resend";
import { siteConfig } from "@/lib/site";

const MAX = { name: 200, email: 320, company: 200, message: 10000 };

function trimField(v: unknown, max: number): string | undefined {
  if (typeof v !== "string") return undefined;
  const t = v.trim().slice(0, max);
  return t.length ? t : undefined;
}

function isEmail(s: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  const raw = body as Record<string, unknown>;
  const name = trimField(raw.name, MAX.name);
  const email = trimField(raw.email, MAX.email)?.toLowerCase();
  const company = trimField(raw.company, MAX.company);
  const message = trimField(raw.message, MAX.message);

  if (!name || !email || !message) {
    return NextResponse.json({ error: "validation" }, { status: 422 });
  }
  if (!isEmail(email)) {
    return NextResponse.json({ error: "validation" }, { status: 422 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_EMAIL_FROM;
  const to = process.env.CONTACT_EMAIL_TO ?? siteConfig.email;

  if (!apiKey || !from) {
    return NextResponse.json(
      { error: "not_configured", code: "EMAIL_NOT_CONFIGURED" },
      { status: 503 }
    );
  }

  const lines = [`Name: ${name}`, `Email: ${email}`];
  if (company) lines.push(`Company / Practice: ${company}`);
  lines.push("", message);
  const text = lines.join("\n");

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from,
    to: [to],
    replyTo: email,
    subject: `Website contact: ${name}`,
    text,
  });

  if (error) {
    console.error("[contact]", error.message);
    return NextResponse.json({ error: "send_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
