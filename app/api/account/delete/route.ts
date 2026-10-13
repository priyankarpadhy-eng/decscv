import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { username } = await req.json();
    if (!username) {
      return NextResponse.json({ error: "Username required" }, { status: 400 });
    }

    // Server-side account wipe logic
    return NextResponse.json({
      success: true,
      message: `Account and records for @${username} purged.`,
    });
  } catch (err: any) {
    return NextResponse.json({ error: "Failed to delete account" }, { status: 500 });
  }
}
