import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { action, text, context } = await req.json();

    if (!action || !text) {
      return NextResponse.json({ error: "Action and text required" }, { status: 400 });
    }

    let suggestion = "";

    switch (action) {
      case "improve_bullet":
        // Transforms a passive bullet into an active, metric-focused statement
        if (text.toLowerCase().includes("worked on") || text.toLowerCase().includes("helped")) {
          suggestion = text
            .replace(/worked on/i, "Engineered")
            .replace(/helped with/i, "Spearheaded") + ", improving pipeline efficiency by 35%.";
        } else {
          suggestion = `Architected ${text}, delivering reliable execution across 10,000+ daily events.`;
        }
        break;

      case "suggest_headline":
        suggestion = `${text} · Final-Year Engineering Scholar & Open-Source Builder`;
        break;

      case "write_summary":
        suggestion = `Undergrad scholar in ${context?.degree || "Engineering"} with hands-on expertise in ${
          context?.skills || "modern systems"
        }. Proven track record of building production-grade projects and high-throughput pipelines.`;
        break;

      default:
        suggestion = text;
    }

    return NextResponse.json({
      success: true,
      original: text,
      suggestion,
    });
  } catch (err: any) {
    return NextResponse.json({ error: "AI assistant service error" }, { status: 500 });
  }
}
