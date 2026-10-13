"use client";

import React from "react";
import { UseFormReturn } from "react-hook-form";
import { Profile, StyleId, ResumeTemplateId } from "@/lib/types";
import { STYLES_REGISTRY } from "@/styles/registry";
import { ensureContrast } from "@/lib/contrast";
import { DiceFive, Check } from "@phosphor-icons/react";

const CURATED_ACCENTS = [
  "#6E44FF", // Royal Violet
  "#FF5722", // Coral Red
  "#10B981", // Emerald
  "#F59E0B", // Amber Sunshine
  "#3B82F6", // Royal Blue
  "#EC4899", // Neon Rose
  "#00D1FF", // Electric Cyan
  "#14B8A6", // Teal
  "#8B5CF6", // Purple
  "#0F172A", // Slate Dark
  "#475569", // Cool Gray
  "#F8FAFC", // Pure Light
];

export function StyleStep({ form }: { form: UseFormReturn<Profile> }) {
  const { watch, setValue } = form;

  const mode = watch("mode");
  const currentStyleId = watch("portfolio.style") || "noir";
  const currentAccent = watch("portfolio.accent") || "#6E44FF";
  const resumeTemplate = watch("resume.template") || "modern";
  const resumeScale = watch("resume.scale") || "M";

  const handleShuffle = () => {
    const styleKeys = Object.keys(STYLES_REGISTRY) as StyleId[];
    const randomStyle = styleKeys[Math.floor(Math.random() * styleKeys.length)];
    const randomAccent = CURATED_ACCENTS[Math.floor(Math.random() * CURATED_ACCENTS.length)];
    setValue("portfolio.style", randomStyle, { shouldDirty: true });
    setValue("portfolio.accent", randomAccent, { shouldDirty: true });
  };

  const currentStyleMeta = STYLES_REGISTRY[currentStyleId] || STYLES_REGISTRY.noir;

  if (mode === "resume") {
    return (
      <div className="flex flex-col gap-6">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#6E44FF]">
            Step 08 · Resume Theme
          </span>
          <h2 className="font-display text-2xl font-bold text-slate-900 mt-1">
            Resume Template & Styling
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Choose an ATS-compliant template and typography scale for your A4 PDF.
          </p>
        </div>

        {/* Template Choice */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { id: "modern", name: "Modern", desc: "Clean sidebar accent bar, 2-column skills" },
            { id: "classic", name: "Classic", desc: "Traditional serif, single-column rules" },
            { id: "compact", name: "Compact", desc: "Dense one-pager, small caps labels" },
          ].map((t) => (
            <div
              key={t.id}
              onClick={() => setValue("resume.template", t.id as ResumeTemplateId, { shouldDirty: true })}
              className={`p-4 rounded-2xl border cursor-pointer transition-all duration-150 ${
                resumeTemplate === t.id
                  ? "bg-white border-[#6E44FF] shadow-md ring-4 ring-[#6E44FF]/10"
                  : "bg-white border-slate-200 hover:border-slate-300 hover:shadow-card"
              }`}
            >
              <h3 className="font-display font-bold text-slate-900">{t.name}</h3>
              <p className="text-xs text-slate-500 mt-1">{t.desc}</p>
            </div>
          ))}
        </div>

        {/* Scale Picker */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-medium text-slate-700">
            Font Scale
          </label>
          <div className="flex gap-2">
            {(["S", "M", "L"] as const).map((sc) => (
              <button
                key={sc}
                type="button"
                onClick={() => setValue("resume.scale", sc, { shouldDirty: true })}
                className={`px-4 py-2 rounded-xl border text-xs font-semibold transition-all ${
                  resumeScale === sc
                    ? "bg-[#6E44FF] text-white border-[#6E44FF] shadow-sm"
                    : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                }`}
              >
                Scale {sc}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#6E44FF]">
            Step 08 · Visual Vibe
          </span>
          <h2 className="font-display text-2xl font-bold text-slate-900 mt-1">
            Pick Your Portfolio Engine
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            8 distinct visual engines. Instant live update in the preview pane.
          </p>
        </div>

        {/* Shuffle Button */}
        <button
          type="button"
          onClick={handleShuffle}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 shadow-sm transition-all"
        >
          <DiceFive size={17} weight="bold" />
          <span>Shuffle</span>
        </button>
      </div>

      {/* 8 Styles Gallery Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {(Object.keys(STYLES_REGISTRY) as StyleId[]).map((sId) => {
          const meta = STYLES_REGISTRY[sId];
          const isSelected = currentStyleId === sId;

          return (
            <div
              key={sId}
              onClick={() => {
                setValue("portfolio.style", sId, { shouldDirty: true });
                setValue("portfolio.accent", meta.defaultAccent, { shouldDirty: true });
              }}
              className={`p-3.5 rounded-2xl border cursor-pointer transition-all duration-150 flex flex-col justify-between min-h-[114px] ${
                isSelected
                  ? "bg-purple-50/70 border-[#6E44FF] shadow-sm ring-4 ring-[#6E44FF]/10 text-slate-900"
                  : "bg-white border-slate-200/90 text-slate-800 hover:border-slate-300 hover:shadow-card"
              }`}
            >
              <div>
                <div className="flex justify-between items-center">
                  <span className="font-display text-sm font-bold">{meta.name}</span>
                  {isSelected && (
                    <span className="w-5 h-5 rounded-full bg-[#6E44FF] text-white flex items-center justify-center">
                      <Check size={12} weight="bold" />
                    </span>
                  )}
                </div>
                <p className="text-[10px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">{meta.vibe}</p>
              </div>
              <div className="flex gap-1 mt-2.5">
                {meta.tags.slice(0, 2).map((tg, i) => (
                  <span
                    key={i}
                    className="text-[9px] font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-600"
                  >
                    {tg}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Accent Color Palette */}
      <div className="flex flex-col gap-2.5 pt-3 border-t border-slate-100">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-slate-700">
            Accent Highlight Color
          </label>
          <span className="text-xs font-mono font-medium text-slate-500">{currentAccent}</span>
        </div>
        <div className="flex flex-wrap gap-2 items-center">
          {CURATED_ACCENTS.map((hex) => (
            <button
              key={hex}
              type="button"
              onClick={() => {
                const checked = ensureContrast(hex, currentStyleMeta.defaultBg, 3);
                setValue("portfolio.accent", checked, { shouldDirty: true });
              }}
              style={{ backgroundColor: hex }}
              className={`w-7 h-7 rounded-full border border-black/10 transition-transform ${
                currentAccent.toLowerCase() === hex.toLowerCase()
                  ? "scale-125 ring-2 ring-[#6E44FF] ring-offset-2"
                  : "hover:scale-110"
              }`}
            />
          ))}
          <input
            type="color"
            value={currentAccent}
            onChange={(e) => setValue("portfolio.accent", e.target.value, { shouldDirty: true })}
            className="w-7 h-7 rounded-full border border-slate-200 cursor-pointer bg-transparent p-0 overflow-hidden"
          />
        </div>
      </div>
    </div>
  );
}
