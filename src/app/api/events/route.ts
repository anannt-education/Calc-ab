import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = (await req.json()) as { name?: string; payload?: Record<string, string | number | boolean | null> };
  return NextResponse.json({
    ok: true,
    stored: "client-authoritative in this demo; server acknowledged the event type.",
    name: body.name ?? "unknown",
  });
}
