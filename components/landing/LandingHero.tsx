"use client";

import React, { useState } from "react";
import Link from "next/link";
import { StyleId } from "@/lib/types";
import { STYLES_REGISTRY } from "@/styles/registry";
import { slugifyName } from "@/lib/username";
import { DynamicStyleRenderer } from "@/styles/DynamicStyleRenderer";
import { SAMPLE_PROFILES } from "@/seed/sample-profiles";
import { ArrowRight, Sparkle } from "@phosphor-icons/react";

export function LandingHero() {
  const [typedName, setTypedName] = useState("Aarav Sharma");
  const [activeStyle, setActiveStyle] = useState<StyleId>("noir");

  const styleIds = Object.keys(STYLES_REGISTRY) as StyleId[];
  const slug = slugifyName(typedName) || "yourname";

  // Synthesize demo profile for live card
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
  };

  return (
    <section className="max-w-7xl mx-auto px-6 pt-16 pb-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
      {/* Left Column: Headline and Call to Actions */}
      <div className="lg:col-span-7 flex flex-col gap-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-200 bg-purple-50 text-[#6E44FF] text-xs font-semibold w-max shadow-sm">
          <Sparkle size={15} weight="fill" />
          <span>For Indian Students & Tech Grads</span>
        </div>

        <h1 className="font-display font-extrabold text-5xl sm:text-7xl lg:text-8xl tracking-tight text-slate-900 leading-[1.05]">
          Your whole career.{" "}
          <span className="font-serifAccent italic font-normal text-[#6E44FF] relative inline-block">
            One link.
            <svg
              className="absolute -bottom-2 left-0 w-full h-3 text-[#6E44FF]/40"
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

        <p className="text-lg sm:text-xl text-slate-600 max-w-xl font-normal leading-relaxed">
          Fill one simple form. Switch instantly between an ATS-compliant A4 resume PDF and a stunning portfolio website with 8 visual engines. No code required.
        </p>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-3">
          <Link
            href="/editor"
            className="inline-flex items-center justify-center gap-2 text-sm font-semibold px-7 py-3.5 rounded-xl bg-[#6E44FF] text-white shadow-sm shadow-[#6E44FF]/30 hover:bg-[#5E34E8] active:scale-95 transition-all text-center"
          >
            <span>Claim Your Link</span>
            <ArrowRight size={17} weight="bold" />
          </Link>

          <a
            href="#styles"
            className="inline-flex items-center justify-center text-sm font-semibold px-6 py-3.5 rounded-xl bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 hover:border-slate-300 shadow-sm transition-all text-center"
          >
            Explore 8 Styles
          </a>
        </div>

        {/* Public slug preview badge */}
        <div className="flex items-center gap-2 pt-1 text-xs text-slate-500 font-medium">
          <span>PUBLIC URL:</span>
          <span className="px-2.5 py-1 bg-slate-100 rounded-lg border border-slate-200/80 font-mono font-semibold text-slate-800">
            cv.decslab.in/<span className="text-[#6E44FF]">{slug}</span>
          </span>
        </div>
      </div>

      {/* Right Column: Interactive Live Card Styled Like Modern Dashboard (Image 1) */}
      <div className="lg:col-span-5 flex flex-col gap-3">
        <div className="border border-slate-200/90 rounded-2xl bg-white shadow-card p-5 flex flex-col gap-4">
          {/* Interactive Name Input */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-700">
              Interactive Test Drive: Type your name
            </label>
            <input
              type="text"
              value={typedName}
              onChange={(e) => setTypedName(e.target.value)}
              placeholder="e.g. Priyanshu Sharma"
              className="w-full bg-slate-50/70 px-3.5 py-2.5 text-sm font-sans border border-slate-200/90 rounded-xl focus:bg-white focus:outline-none focus:border-[#6E44FF] focus:ring-4 focus:ring-[#6E44FF]/10 text-slate-900"
            />
          </div>

          {/* Style Selector Dots (8 tiny switcher pills) */}
          <div className="flex items-center justify-between border-t border-slate-100 pt-3">
            <span className="text-xs font-semibold text-slate-600">
              Style: <strong className="text-[#6E44FF]">{activeStyle.toUpperCase()}</strong>
            </span>
            <div className="flex items-center gap-1.5">
              {styleIds.map((s) => (
                <button
                  key={s}
                  onClick={() => setActiveStyle(s)}
                  title={s}
                  className={`w-4 h-4 rounded-full border border-black/10 transition-transform ${
                    activeStyle === s
                      ? "scale-125 bg-[#6E44FF] ring-2 ring-[#6E44FF] ring-offset-2"
                      : "bg-slate-200 hover:bg-slate-300"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Scaled Preview Box */}
          <div className="w-full h-80 rounded-xl border border-slate-200 overflow-hidden relative shadow-inner bg-slate-950">
            <div className="w-[800px] h-[640px] origin-top-left scale-[0.4] sm:scale-[0.45] pointer-events-none select-none">
              <DynamicStyleRenderer profile={demoProfile} />
            </div>
          </div>

          {/* Modern URL Bar Preview */}
          <div className="bg-slate-50 px-3.5 py-2.5 border border-slate-200 rounded-xl flex items-center justify-between text-xs">
            <div className="truncate font-mono">
              <span className="text-slate-400">https://cv.decslab.in/</span>
              <span className="text-[#6E44FF] font-semibold">{slug}</span>
              <span className="inline-block w-1.5 h-3.5 bg-[#6E44FF] ml-1 align-middle animate-pulse" />
            </div>
            <span className="text-[10px] font-semibold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-200">
              Ready
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
