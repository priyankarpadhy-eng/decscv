"use client";

import React from "react";
import { UseFormReturn, useFieldArray } from "react-hook-form";
import { Profile } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus, Trash, Star } from "@phosphor-icons/react";

export function ProjectsStep({ form }: { form: UseFormReturn<Profile> }) {
  const { control, register, watch, setValue } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "projects",
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#6E44FF]">
            Step 05 · Works
          </span>
          <h2 className="font-display text-2xl font-bold text-slate-900 mt-1">
            Projects & Builds
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Side projects, open-source repos, hackathons, or commercial work.
          </p>
        </div>
        <Button
          type="button"
          size="sm"
          variant="primary"
          icon={<Plus size={15} weight="bold" />}
          onClick={() =>
            append({
              id: Math.random().toString(36).substring(2, 9),
              title: "",
              desc: "",
              tech: ["React", "TypeScript"],
              images: [],
              featured: true,
            })
          }
        >
          Add Project
        </Button>
      </div>

      <div className="space-y-4">
        {fields.map((field, idx) => {
          const isFeatured = watch(`projects.${idx}.featured`);

          return (
            <div
              key={field.id}
              className="p-5 border border-slate-200/90 rounded-2xl bg-white shadow-card flex flex-col gap-3.5 transition-all"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-slate-100 text-slate-600 font-mono text-xs font-bold flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <span className="text-xs font-semibold text-slate-700">
                    Project Card
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      setValue(`projects.${idx}.featured`, !isFeatured, { shouldDirty: true })
                    }
                    className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full transition-colors ${
                      isFeatured
                        ? "bg-amber-50 text-amber-700 border border-amber-200/80"
                        : "bg-slate-100 text-slate-500 hover:text-slate-700"
                    }`}
                  >
                    <Star size={13} weight={isFeatured ? "fill" : "regular"} />
                    <span>Featured</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => remove(idx)}
                    className="p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                    title="Remove project"
                  >
                    <Trash size={16} />
                  </button>
                </div>
              </div>

              <Input
                label="Project Title"
                placeholder="e.g. KiteStream, ChaiTab"
                {...register(`projects.${idx}.title` as const)}
              />

              <Textarea
                label="Summary / Impact"
                placeholder="What did it do? What was the scale or user outcome?"
                rows={3}
                {...register(`projects.${idx}.desc` as const)}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <Input
                  label="Live Product URL"
                  placeholder="https://..."
                  {...register(`projects.${idx}.url` as const)}
                />
                <Input
                  label="GitHub / Repository URL"
                  placeholder="https://github.com/..."
                  {...register(`projects.${idx}.repo` as const)}
                />
              </div>

              <div>
                <label className="text-xs font-sans font-medium text-slate-700 block mb-1.5">
                  Technologies Used (Comma separated)
                </label>
                <input
                  type="text"
                  className="w-full bg-slate-50/70 px-3.5 py-2 text-sm font-sans border border-slate-200/90 rounded-xl focus:bg-white focus:outline-none focus:border-[#6E44FF] focus:ring-4 focus:ring-[#6E44FF]/10 text-slate-900"
                  placeholder="e.g. Go, Next.js, Redis, WebSockets"
                  defaultValue={watch(`projects.${idx}.tech`)?.join(", ") || ""}
                  onChange={(e) => {
                    const parsed = e.target.value
                      .split(",")
                      .map((t) => t.trim())
                      .filter(Boolean);
                    setValue(`projects.${idx}.tech`, parsed, { shouldDirty: true });
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
