import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { ProfileSchema } from "@/lib/schema";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = ProfileSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, errors: parsed.error.format() },
        { status: 400 }
      );
    }

    const profile = parsed.data;
    // Revalidate public path on publish
    revalidatePath(`/${profile.username}`);
    revalidatePath(`/${profile.username}/resume`);

    return NextResponse.json({
      success: true,
      url: `https://cv.decslab.in/${profile.username}`,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err?.message || "Server error" },
      { status: 500 }
    );
  }
}
