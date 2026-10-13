"use client";

import React from "react";
import { UseFormReturn } from "react-hook-form";
import { Profile } from "@/lib/types";
import { Textarea } from "@/components/ui/textarea";

export function AboutStep({ form }: { form: UseFormReturn<Profile> }) {
  const { register, watch, setValue } = form;
  const summaryValue = watch("summary") || "";

  return (
    <div className="flex flex-col gap-6">
      <div>
        <span className="text-xs font-semibold uppercase tracking-wider text-[#6E44FF]">
          Step 02 · Statement
        </span>
        <h2 className="font-display text-2xl font-bold text-slate-900 mt-1">
          About You
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          A concise overview of your background, core interests, and strengths.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <Textarea
          label="Professional Summary"
          hint="Supports markdown: **bold**, *italic*, and [links](https://...)"
          placeholder="e.g. Final-year Computer Science undergrad building high-concurrency microservices and open source tools. Previously interned at Razorpay..."
          charCount={{ current: summaryValue.length, max: 1200 }}
          rows={6}
          {...register("summary")}
        />

        {/* Fast Starter Templates in soft pastel pills */}
        <div className="flex flex-col gap-2 pt-2">
          <span className="text-xs font-medium text-slate-500">
            Quick Starters:
          </span>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() =>
                setValue(
                  "summary",
                  "Final-year undergrad studying Computer Science with hands-on experience in backend microservices, database tuning, and distributed systems. Passionate about solving high-throughput reliability challenges.",
                  { shouldDirty: true }
                )
              }
              className="text-xs font-medium px-3 py-1.5 rounded-full bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-200/60 transition-colors"
            >
              + Engineering Fresher
            </button>
            <button
              type="button"
              onClick={() =>
                setValue(
                  "summary",
                  "Product designer blending user research, typographic craft, and design systems. Experienced with Figma component architectures, mobile design, and design-to-code pipelines.",
                  { shouldDirty: true }
                )
              }
              className="text-xs font-medium px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200/60 transition-colors"
            >
              + Product Designer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
