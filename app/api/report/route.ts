import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { username, reason } = await req.json();
    if (!username || !reason) {
      return NextResponse.json({ error: "Username and reason required" }, { status: 400 });
    }

    if (reason.length > 1000) {
      return NextResponse.json({ error: "Reason too long" }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      message: "Report received. Our safety team will review this handle.",
    });
  } catch (err: any) {
    return NextResponse.json({ error: "Failed to submit report" }, { status: 500 });
  }
}
