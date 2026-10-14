"use client";

import React, { useState } from "react";
import Link from "next/link";
import { StyleId } from "@/lib/types";
import { STYLES_REGISTRY } from "@/styles/registry";
import { SAMPLE_PROFILES } from "@/seed/sample-profiles";
import { DynamicStyleRenderer } from "@/styles/DynamicStyleRenderer";
import { Dialog } from "@/components/ui/dialog";
import { ArrowRight } from "@phosphor-icons/react";

export function MarqueeStrip() {
  const items = [
    "ATS-COMPLIANT RESUME",
    "8 PORTFOLIO STYLES",
    "FREE PUBLIC LINK",
    "ONE GUIDED FORM",
    "PDF EXPORT",
    "CAMPUS & INDUSTRY READY",
    "INSTANT LIVE PREVIEW",
  ];

  return (
    <div className="w-full bg-slate-900 text-slate-100 py-3.5 border-y border-slate-800 overflow-hidden select-none">
      <div className="animate-marquee whitespace-nowrap font-sans text-xs uppercase tracking-widest font-semibold flex gap-8">
        {items.concat(items).map((txt, idx) => (
          <span key={idx} className="flex items-center gap-6">
            <span>{txt}</span>
            <span className="text-slate-500">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export function StyleGallerySection() {
  const styleIds = Object.keys(STYLES_REGISTRY) as StyleId[];
  const [previewStyle, setPreviewStyle] = useState<StyleId | null>(null);

  return (
    <section id="styles" className="py-24 max-w-7xl mx-auto px-6 flex flex-col gap-12">
      <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4 border-b border-slate-200 pb-6">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#6E44FF]">
            Portfolio styles
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mt-1">
            Eight distinct portfolio styles
          </h2>
        </div>
        <p className="text-sm text-slate-500 max-w-md font-sans leading-relaxed">
          Choose a layout tailored to your discipline, from clean minimalist engineering to interactive terminal and bento grids.
        </p>
      </div>

      {/* Horizontal Gallery Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {styleIds.map((sId) => {
          const meta = STYLES_REGISTRY[sId];
          const sample = SAMPLE_PROFILES[sId];

          return (
            <div
              key={sId}
              className="group border border-slate-200/90 rounded-2xl bg-white shadow-card hover:-translate-y-1 hover:shadow-hover transition-all duration-200 flex flex-col overflow-hidden"
            >
              {/* Mini render box */}
              <div className="relative w-full h-52 bg-slate-950 overflow-hidden border-b border-slate-100">
                <div className="w-[800px] h-[550px] origin-top-left scale-[0.34] sm:scale-[0.38] pointer-events-none select-none">
                  <DynamicStyleRenderer profile={sample} />
                </div>
                <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <button
                    onClick={() => setPreviewStyle(sId)}
                    className="px-3.5 py-2 rounded-xl bg-white text-slate-900 font-semibold text-xs shadow-md hover:bg-slate-50 transition-all"
                  >
                    Inspect Fullscreen
                  </button>
                </div>
              </div>

              {/* Card Meta */}
              <div className="p-5 flex flex-col justify-between flex-1 gap-4">
                <div>
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-display text-lg font-bold text-slate-900">{meta.name}</h3>
                    <span className="text-[10px] font-mono font-semibold text-slate-400 uppercase">
                      {sId}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">{meta.vibe}</p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                  <div className="flex gap-1.5">
                    {meta.tags.slice(0, 2).map((tg, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-600"
                      >
                        {tg}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={`/editor`}
                    className="text-xs font-semibold text-[#6E44FF] hover:underline inline-flex items-center gap-1"
                  >
                    <span>Use Vibe</span>
                    <ArrowRight size={13} weight="bold" />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Fullscreen Preview Dialog */}
      {previewStyle && (
        <Dialog
          open={Boolean(previewStyle)}
          onClose={() => setPreviewStyle(null)}
          title={`Vibe Preview: ${STYLES_REGISTRY[previewStyle].name}`}
          maxWidth="xl"
        >
          <div className="h-[550px] w-full overflow-y-auto border border-slate-200 rounded-xl shadow-inner">
            <DynamicStyleRenderer profile={SAMPLE_PROFILES[previewStyle]} />
          </div>
          <div className="mt-4 flex justify-between items-center">
            <span className="text-xs text-slate-500">
              Sample profile: {SAMPLE_PROFILES[previewStyle].basics.name}
            </span>
            <Link
              href="/editor"
              className="px-4 py-2 rounded-xl bg-[#6E44FF] text-white text-xs font-semibold hover:bg-[#5E34E8] shadow-sm shadow-[#6E44FF]/25"
            >
              Build with this style →
            </Link>
          </div>
        </Dialog>
      )}
    </section>
  );
}
