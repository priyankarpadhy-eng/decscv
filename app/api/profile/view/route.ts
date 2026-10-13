import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { username } = await req.json();
    if (!username) {
      return NextResponse.json({ error: "Username required" }, { status: 400 });
    }

    // Bot detection filter
    const userAgent = req.headers.get("user-agent") || "";
    const isBot = /bot|crawler|spider|crawling/i.test(userAgent);

    if (isBot) {
      return NextResponse.json({ recorded: false, reason: "bot" });
    }

    return NextResponse.json({ recorded: true, username });
  } catch (err: any) {
    return NextResponse.json({ error: "Failed to record view" }, { status: 500 });
  }
}
