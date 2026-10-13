import React from "react";
import { notFound } from "next/navigation";
import { SAMPLE_PROFILES } from "@/seed/sample-profiles";
import { DynamicStyleRenderer } from "@/styles/DynamicStyleRenderer";
import { StyleId } from "@/lib/types";

export default function DemoStylePage({ params }: { params: { styleId: string } }) {
  const styleId = params.styleId as StyleId;
  const sample = SAMPLE_PROFILES[styleId];

  if (!sample) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      {/* Floating Demo Badge Bar */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 bg-paper border-2 border-ink rounded-card shadow-hard px-4 py-2 flex items-center gap-4 text-xs font-mono select-none">
        <span className="font-bold text-ink uppercase">
          DEMO MODE: {styleId.toUpperCase()}
        </span>
        <a
          href="/editor"
          className="px-3 py-1 rounded bg-signal text-paper font-bold uppercase hover:opacity-90"
        >
          Use this style →
        </a>
      </div>
      <DynamicStyleRenderer profile={sample} />
    </div>
  );
}
