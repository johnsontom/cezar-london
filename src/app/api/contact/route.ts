import { NextResponse } from "next/server";

export const runtime = "nodejs";

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  message?: unknown;
  company?: unknown;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Enquiry endpoint.
 *
 * Validation runs here as well as in the browser. Delivery happens only when a
 * destination is configured, so the interface never reports a false success.
 * Set CONTACT_WEBHOOK_URL (any endpoint that accepts a JSON POST: a form
 * service, a CRM, a serverless function or an email API) to enable delivery.
 */
export async function POST(request: Request) {
  let payload: ContactPayload;
  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid-json" }, { status: 400 });
  }

  const name = typeof payload.name === "string" ? payload.name.trim() : "";
  const email = typeof payload.email === "string" ? payload.email.trim() : "";
  const message = typeof payload.message === "string" ? payload.message.trim() : "";
  const company = typeof payload.company === "string" ? payload.company.trim() : "";

  // Honeypot: a filled field means a bot. Respond without delivering.
  if (company) {
    return NextResponse.json({ ok: true, delivered: false, reason: "filtered" });
  }

  const errors: Record<string, string> = {};
  if (name.length < 2 || name.length > 80) {
    errors.name = "Please enter your name.";
  }
  if (!EMAIL_PATTERN.test(email) || email.length > 160) {
    errors.email = "Please enter a valid email address.";
  }
  if (message.length < 10 || message.length > 2000) {
    errors.message = "Please add a little more detail (10 characters minimum).";
  }

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, error: "validation", errors }, { status: 422 });
  }

  const destination =
    process.env.CONTACT_WEBHOOK_URL ?? process.env.NEXT_PUBLIC_CONTACT_WEBHOOK_URL;

  if (!destination) {
    return NextResponse.json(
      {
        ok: false,
        error: "not-configured",
        message:
          "This form is not connected to a studio mailbox yet, so your message was not sent. Please email us directly and we will reply.",
      },
      { status: 503 },
    );
  }

  try {
    const response = await fetch(destination, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        message,
        source: "cezarlondon.com/contact",
        receivedAt: new Date().toISOString(),
      }),
    });
    if (!response.ok) {
      throw new Error(`Destination responded with ${response.status}`);
    }
  } catch {
    return NextResponse.json(
      {
        ok: false,
        error: "delivery-failed",
        message:
          "We could not deliver your message just now. Please email us directly and we will pick it up.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true, delivered: true });
}
