"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { StyleId } from "@/lib/types";
import { STYLES_REGISTRY } from "@/styles/registry";
import { slugifyName } from "@/lib/username";
import { DynamicStyleRenderer } from "@/styles/DynamicStyleRenderer";
import { ModernResume } from "@/resume/ResumeView";
import { SAMPLE_PROFILES } from "@/seed/sample-profiles";
import { ArrowRight, Sparkle, Globe, FileText } from "@phosphor-icons/react";

export function LandingHero() {
  const [typedName, setTypedName] = useState("Aarav Sharma");
  const [activeStyle, setActiveStyle] = useState<StyleId>("bento");
  const [previewMode, setPreviewMode] = useState<"portfolio" | "resume">("portfolio");
  const previewBoxRef = useRef<HTMLDivElement>(null);
  const [boxWidth, setBoxWidth] = useState(420);

  useEffect(() => {
    if (!previewBoxRef.current) return;
    const updateWidth = () => {
      if (previewBoxRef.current) {
        setBoxWidth(previewBoxRef.current.clientWidth);
      }
    };
    updateWidth();
    const observer = new ResizeObserver(updateWidth);
    observer.observe(previewBoxRef.current);
    return () => observer.disconnect();
  }, []);

  const styleIds = Object.keys(STYLES_REGISTRY) as StyleId[];
  const slug = slugifyName(typedName) || "yourname";

  // Synthesize demo profile for live interactive card
  const demoProfile = {
    ...SAMPLE_PROFILES[activeStyle],
    basics: {
      ...SAMPLE_PROFILES[activeStyle].basics,
      name: typedName || "Your Name",
    },
    username: slug,
    portfolio: {
      ...SAMPLE_PROFILES[activeStyle].portfolio,
      style: activeStyle,
    },
    resume: {
      template: "modern" as const,
      accent: "#6E44FF",
      scale: "M" as const,
      showPhoto: false,
    },
  };

  const scaleFactor = Math.max(0.3, Math.min(0.55, boxWidth / 820));

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 sm:pt-16 pb-16 sm:pb-20 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
      {/* Left Column: Benefit-Driven Headline and CTAs */}
      <div className="lg:col-span-7 flex flex-col gap-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-purple-200 bg-purple-50 text-[#6E44FF] text-xs font-semibold w-max shadow-2xs">
          <Sparkle size={15} weight="fill" />
          <span>Built for campus placements and engineering portfolios</span>
        </div>

        <h1 className="font-display font-extrabold text-4xl sm:text-6xl lg:text-7xl tracking-[-0.03em] text-slate-900 leading-[1.08]">
          One guided form.{" "}
          <span className="font-serifAccent italic font-normal text-[#6E44FF] relative inline-block">
            resume or portfolio.
            <svg
              className="absolute -bottom-1.5 left-0 w-full h-2.5 text-[#6E44FF]/40"
              viewBox="0 0 200 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 9C50 3 150 2 197 8"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </h1>

        <p className="text-base sm:text-lg text-slate-600 max-w-xl font-normal leading-relaxed">
          Input your education, projects, and achievements once. Switch freely between an ATS-verified A4 placement resume PDF and a standout portfolio with 8 visual engines.
        </p>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
          <Link
            href="/editor"
            className="inline-flex items-center justify-center gap-2 text-sm font-semibold px-6 py-3.5 rounded-xl bg-[#6E44FF] text-white shadow-sm shadow-[#6E44FF]/25 hover:bg-[#5E34E8] active:scale-97 transition-all text-center"
          >
            <span>Start building free</span>
            <ArrowRight size={16} weight="bold" />
          </Link>

          <a
            href="#styles"
            className="inline-flex items-center justify-center text-sm font-semibold px-6 py-3.5 rounded-xl bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 shadow-2xs transition-all text-center"
          >
            Explore 8 engines
          </a>
        </div>

        {/* Public slug preview badge */}
        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 font-medium pt-1">
          <span>Your permanent link:</span>
          <span className="px-2.5 py-1 bg-white rounded-lg border border-slate-200 font-mono text-slate-800 shadow-2xs">
            cv.decslab.in/<span className="text-[#6E44FF] font-semibold">{slug}</span>
          </span>
        </div>
      </div>

      {/* Right Column: Interactive Test-Drive Dashboard Card */}
      <div className="lg:col-span-5 flex flex-col gap-3">
        <div className="border border-slate-200/90 rounded-2xl bg-white shadow-card p-4 sm:p-6 flex flex-col gap-4">
          {/* Dual Output Mode Switcher */}
          <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-3">
            <div className="flex items-center p-1 bg-slate-100 rounded-xl">
              <button
                type="button"
                onClick={() => setPreviewMode("portfolio")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  previewMode === "portfolio"
                    ? "bg-white text-slate-900 shadow-2xs"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                <Globe size={15} weight={previewMode === "portfolio" ? "bold" : "regular"} />
                <span>Portfolio</span>
              </button>
              <button
                type="button"
                onClick={() => setPreviewMode("resume")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  previewMode === "resume"
                    ? "bg-white text-slate-900 shadow-2xs"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                <FileText size={15} weight={previewMode === "resume" ? "bold" : "regular"} />
                <span>A4 Resume</span>
              </button>
            </div>

            <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
              Interactive
            </span>
          </div>

          {/* Interactive Name Input */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-700">
              Type your name to preview:
            </label>
            <input
              type="text"
              value={typedName}
              onChange={(e) => setTypedName(e.target.value)}
              placeholder="e.g. Aarav Sharma"
              className="w-full bg-slate-50/70 px-3.5 py-2.5 text-sm font-sans border border-slate-200/90 rounded-xl focus:bg-white focus:outline-none focus:border-[#6E44FF] focus:ring-4 focus:ring-[#6E44FF]/10 text-slate-900 transition-all"
            />
          </div>

          {/* Style Selector Chips (Only in Portfolio mode) */}
          {previewMode === "portfolio" ? (
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-slate-500">Visual Engine:</span>
                <span className="font-mono font-semibold text-[#6E44FF] uppercase">
                  {activeStyle}
                </span>
              </div>
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
                {styleIds.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setActiveStyle(s)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-medium uppercase border transition-all whitespace-nowrap ${
                      activeStyle === s
                        ? "bg-[#6E44FF] text-white border-[#6E44FF] shadow-2xs"
                        : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between text-xs py-1 text-slate-500">
              <span>Standard Harvard / Placement Format</span>
              <span className="text-emerald-600 font-semibold">100% ATS-Compliant</span>
            </div>
          )}

          {/* Fluid Responsive Scaled Preview Box */}
          <div
            ref={previewBoxRef}
            className="w-full h-72 sm:h-80 rounded-xl border border-slate-200 overflow-hidden relative shadow-inner bg-slate-900"
          >
            <div
              className="origin-top-left pointer-events-none select-none transition-transform duration-200"
              style={{
                width: "800px",
                height: "640px",
                transform: `scale(${scaleFactor})`,
              }}
            >
              {previewMode === "portfolio" ? (
                <DynamicStyleRenderer profile={demoProfile} />
              ) : (
                <div className="p-4 bg-white min-h-[640px]">
                  <ModernResume profile={demoProfile} />
                </div>
              )}
            </div>
          </div>

          {/* URL Status Bar */}
          <div className="bg-slate-50 px-3.5 py-2.5 border border-slate-200 rounded-xl flex items-center justify-between text-xs">
            <div className="truncate font-mono">
              <span className="text-slate-400">cv.decslab.in/</span>
              <span className="text-[#6E44FF] font-semibold">{slug}</span>
            </div>
            <Link
              href="/editor"
              className="text-[11px] font-semibold text-[#6E44FF] hover:underline"
            >
              Claim handle →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
