import { NextResponse } from "next/server";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  let email = "";
  try {
    email = String(((await req.json()) as { email?: unknown }).email ?? "").trim().toLowerCase();
  } catch {
    return NextResponse.json({ status: "error", message: "Invalid request." }, { status: 400 });
  }
  if (!EMAIL.test(email) || email.length > 254) {
    return NextResponse.json({ status: "error", message: "Please enter a valid email." }, { status: 400 });
  }

  const key = process.env.RESEND_API_KEY;
  const audience = process.env.RESEND_AUDIENCE_ID;
  if (!key || !audience) {
    // v1: nothing is stored until Resend is configured.
    return NextResponse.json({ status: "coming_soon", message: "Newsletter signups open very soon. Nothing was stored. Check back next week!" });
  }

  const res = await fetch(`https://api.resend.com/audiences/${audience}/contacts`, {
    method: "POST",
    headers: { authorization: `Bearer ${key}`, "content-type": "application/json" },
    body: JSON.stringify({ email, unsubscribed: false }),
  });
  if (!res.ok) {
    return NextResponse.json({ status: "error", message: "Could not subscribe right now. Please try again later." }, { status: 502 });
  }
  return NextResponse.json({ status: "ok", message: "You're in. See you on Friday." });
}

export function GET() {
  return NextResponse.json({ status: process.env.RESEND_API_KEY && process.env.RESEND_AUDIENCE_ID ? "open" : "coming_soon" });
}
