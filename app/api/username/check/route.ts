import { NextRequest, NextResponse } from "next/server";
import { validateUsername } from "@/lib/username";
import { SAMPLE_PROFILES } from "@/seed/sample-profiles";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const username = searchParams.get("username") || "";

  const check = validateUsername(username);
  if (!check.valid) {
    return NextResponse.json({ available: false, error: check.error }, { status: 400 });
  }

  // Check if taken in sample profiles
  const isTakenInSamples = Object.values(SAMPLE_PROFILES).some(
    (p) => p.username.toLowerCase() === username.toLowerCase()
  );

  if (isTakenInSamples) {
    return NextResponse.json({
      available: false,
      error: "Username is already claimed by a verified builder.",
    });
  }

  return NextResponse.json({ available: true, username });
}
