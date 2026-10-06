import { NextResponse } from "next/server";

export const runtime = "nodejs";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Newsletter signup.
 * Delivery requires NEWSLETTER_WEBHOOK_URL (or CONTACT_WEBHOOK_URL). Until one
 * is configured the endpoint reports honestly rather than pretending to save.
 */
export async function POST(request: Request) {
  let payload: { email?: unknown };
  try {
    payload = (await request.json()) as { email?: unknown };
  } catch {
    return NextResponse.json({ ok: false, error: "invalid-json" }, { status: 400 });
  }

  const email = typeof payload.email === "string" ? payload.email.trim() : "";

  if (!EMAIL_PATTERN.test(email) || email.length > 160) {
    return NextResponse.json(
      { ok: false, error: "validation", message: "Please enter a valid email address." },
      { status: 422 },
    );
  }

  const destination =
    process.env.NEWSLETTER_WEBHOOK_URL ?? process.env.CONTACT_WEBHOOK_URL;

  if (!destination) {
    return NextResponse.json(
      {
        ok: false,
        error: "not-configured",
        message:
          "The mailing list is not connected yet, so you have not been added. Email us and we will add you by hand.",
      },
      { status: 503 },
    );
  }

  try {
    const response = await fetch(destination, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        type: "newsletter",
        source: "cezarlondon.com",
        receivedAt: new Date().toISOString(),
      }),
    });
    if (!response.ok) throw new Error(`Destination responded with ${response.status}`);
  } catch {
    return NextResponse.json(
      {
        ok: false,
        error: "delivery-failed",
        message: "Something went wrong on our side. Please try again shortly.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true, subscribed: true });
}
