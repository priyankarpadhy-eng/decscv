"use client";

import React from "react";
import { UseFormReturn } from "react-hook-form";
import { Profile } from "@/lib/types";
import { FileText, Globe, Check } from "@phosphor-icons/react";

export function ModeStep({ form }: { form: UseFormReturn<Profile> }) {
  const currentMode = form.watch("mode");

  return (
    <div className="flex flex-col gap-6">
      <div>
        <span className="text-xs font-semibold uppercase tracking-wider text-[#6E44FF]">
          Step 00 · Output Format
        </span>
        <h2 className="font-display text-2xl font-bold text-slate-900 mt-1">
          Pick your output mode
        </h2>
        <p className="text-sm text-slate-500 mt-1 leading-relaxed">
          The same career data powers both formats. Toggle between them anytime with zero data loss.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Mode: Portfolio */}
        <div
          onClick={() => form.setValue("mode", "portfolio", { shouldDirty: true })}
          className={`p-6 rounded-2xl border cursor-pointer transition-all duration-150 flex flex-col justify-between ${
            currentMode === "portfolio"
              ? "bg-white border-[#6E44FF] shadow-md ring-4 ring-[#6E44FF]/10"
              : "bg-white border-slate-200 hover:border-slate-300 hover:shadow-card"
          }`}
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-purple-50 text-[#6E44FF] flex items-center justify-center">
                <Globe size={26} weight="duotone" />
              </div>
              {currentMode === "portfolio" && (
                <span className="w-6 h-6 rounded-full bg-[#6E44FF] text-white flex items-center justify-center">
                  <Check size={14} weight="bold" />
                </span>
              )}
            </div>
            <h3 className="font-display text-lg font-bold text-slate-900">Portfolio Website</h3>
            <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
              A high-performance live portfolio website at your own link (e.g. cv.decslab.in/yourname) with 8 visual engines.
            </p>
          </div>
          <div className="mt-5 pt-4 border-t border-slate-100 flex items-center gap-2">
            <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-700">
              Interactive
            </span>
            <span className="text-[11px] text-slate-400">8 Engines</span>
          </div>
        </div>

        {/* Mode: Resume */}
        <div
          onClick={() => form.setValue("mode", "resume", { shouldDirty: true })}
          className={`p-6 rounded-2xl border cursor-pointer transition-all duration-150 flex flex-col justify-between ${
            currentMode === "resume"
              ? "bg-white border-[#FF5722] shadow-md ring-4 ring-[#FF5722]/10"
              : "bg-white border-slate-200 hover:border-slate-300 hover:shadow-card"
          }`}
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-orange-50 text-[#FF5722] flex items-center justify-center">
                <FileText size={26} weight="duotone" />
              </div>
              {currentMode === "resume" && (
                <span className="w-6 h-6 rounded-full bg-[#FF5722] text-white flex items-center justify-center">
                  <Check size={14} weight="bold" />
                </span>
              )}
            </div>
            <h3 className="font-display text-lg font-bold text-slate-900">A4 Resume PDF</h3>
            <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
              Clean, ATS-compliant single-column and multi-column templates ready for campus drives and corporate applications.
            </p>
          </div>
          <div className="mt-5 pt-4 border-t border-slate-100 flex items-center gap-2">
            <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-orange-50 text-orange-700">
              ATS Compliant
            </span>
            <span className="text-[11px] text-slate-400">Print Ready</span>
          </div>
        </div>
      </div>
    </div>
  );
}
