"use client";

import React, { useState } from "react";
import { UseFormReturn, useFieldArray } from "react-hook-form";
import { Profile } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import {
  Plus,
  Trash,
  Copy,
  CaretDown,
  CaretUp,
  Lightbulb,
} from "@phosphor-icons/react";

export function ExperienceStep({ form }: { form: UseFormReturn<Profile> }) {
  const { control, register, watch, setValue } = form;
  const { fields, append, remove, insert } = useFieldArray({
    control,
    name: "experience",
  });
  const { showToast } = useToast();

  const [expandedIndices, setExpandedIndices] = useState<Record<number, boolean>>({
    0: true,
  });

  const toggleExpand = (idx: number) => {
    setExpandedIndices((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const handleDuplicate = (idx: number) => {
    const item = form.getValues(`experience.${idx}`);
    insert(idx + 1, {
      ...item,
      id: Math.random().toString(36).substring(2, 9),
      role: `${item.role} (Copy)`,
    });
    showToast({ message: "Experience entry duplicated." });
  };

  const handleDelete = (idx: number) => {
    const item = form.getValues(`experience.${idx}`);
    remove(idx);
    showToast({
      message: "Experience entry removed.",
      undoAction: () => {
        insert(idx, item);
      },
    });
  };

  const addBullet = (expIdx: number) => {
    const bullets = form.getValues(`experience.${expIdx}.bullets`) || [];
    if (bullets.length < 6) {
      setValue(`experience.${expIdx}.bullets`, [...bullets, ""], { shouldDirty: true });
    }
  };

  const removeBullet = (expIdx: number, bulletIdx: number) => {
    const bullets = form.getValues(`experience.${expIdx}.bullets`) || [];
    setValue(
      `experience.${expIdx}.bullets`,
      bullets.filter((_, i) => i !== bulletIdx),
      { shouldDirty: true }
    );
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#6E44FF]">
            Step 03 · Career
          </span>
          <h2 className="font-display text-2xl font-bold text-slate-900 mt-1">
            Work & Internships
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Student internships, part-time roles, freelance gigs, and leadership.
          </p>
        </div>
        <Button
          type="button"
          size="sm"
          variant="primary"
          icon={<Plus size={15} weight="bold" />}
          onClick={() => {
            append({
              id: Math.random().toString(36).substring(2, 9),
              company: "",
              role: "",
              type: "Internship",
              start: "",
              end: "",
              current: false,
              location: "",
              bullets: [""],
            });
            setExpandedIndices((prev) => ({ ...prev, [fields.length]: true }));
          }}
        >
          Add Role
        </Button>
      </div>

      <div className="flex flex-col gap-4">
        {fields.map((field, idx) => {
          const isExpanded = expandedIndices[idx] !== false;
          const currentRole = watch(`experience.${idx}.role`);
          const currentCompany = watch(`experience.${idx}.company`);
          const bullets = watch(`experience.${idx}.bullets`) || [];
          const isCurrent = watch(`experience.${idx}.current`);
          const currentType = watch(`experience.${idx}.type`);

          return (
            <div
              key={field.id}
              className="border border-slate-200/90 rounded-2xl bg-white shadow-card overflow-hidden transition-all"
            >
              {/* Card Header Bar */}
              <div
                onClick={() => toggleExpand(idx)}
                className="bg-slate-50/70 p-4 flex items-center justify-between cursor-pointer border-b border-slate-100 select-none hover:bg-slate-50"
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-lg bg-slate-200/60 text-slate-600 font-mono text-xs font-bold flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <div>
                    <h4 className="font-display text-sm font-bold text-slate-900">
                      {currentRole || "New Experience"}
                      {currentCompany && (
                        <span className="font-normal text-slate-500"> at {currentCompany}</span>
                      )}
                    </h4>
                  </div>
                  {currentType && (
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200/60">
                      {currentType}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                  <button
                    type="button"
                    onClick={() => handleDuplicate(idx)}
                    title="Duplicate position"
                    className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-lg transition-colors"
                  >
                    <Copy size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(idx)}
                    title="Delete position"
                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                  >
                    <Trash size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={() => toggleExpand(idx)}
                    className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg"
                  >
                    {isExpanded ? <CaretUp size={16} /> : <CaretDown size={16} />}
                  </button>
                </div>
              </div>

              {/* Form Content */}
              {isExpanded && (
                <div className="p-5 flex flex-col gap-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <Input
                      label="Company / Organization"
                      placeholder="e.g. Razorpay, IIT Lab"
                      {...register(`experience.${idx}.company` as const)}
                    />
                    <Input
                      label="Role Title"
                      placeholder="e.g. Backend Engineering Intern"
                      {...register(`experience.${idx}.role` as const)}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                    <div>
                      <label className="text-xs font-sans font-medium text-slate-700 block mb-1.5">
                        Engagement Type
                      </label>
                      <select
                        className="w-full bg-slate-50/70 px-3 py-2.5 text-sm font-sans border border-slate-200/90 rounded-xl focus:bg-white focus:outline-none focus:border-[#6E44FF] focus:ring-4 focus:ring-[#6E44FF]/10"
                        {...register(`experience.${idx}.type` as const)}
                      >
                        <option value="Internship">Internship</option>
                        <option value="Full-time">Full-time</option>
                        <option value="Freelance">Freelance</option>
                        <option value="Part-time">Part-time</option>
                        <option value="Volunteer">Volunteer</option>
                      </select>
                    </div>

                    <Input
                      label="Start Date"
                      placeholder="e.g. May 2024"
                      {...register(`experience.${idx}.start` as const)}
                    />

                    <div>
                      <Input
                        label="End Date"
                        placeholder="e.g. Jul 2024"
                        disabled={isCurrent}
                        {...register(`experience.${idx}.end` as const)}
                      />
                      <label className="inline-flex items-center gap-1.5 mt-1.5 text-xs text-slate-600 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          className="w-3.5 h-3.5 accent-[#6E44FF] rounded"
                          {...register(`experience.${idx}.current` as const)}
                        />
                        <span>Currently active</span>
                      </label>
                    </div>
                  </div>

                  {/* Bullet Highlights */}
                  <div className="flex flex-col gap-2.5 pt-3 border-t border-slate-100">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-slate-700">
                          Bullet Highlights ({bullets.length}/6)
                        </span>
                        <span className="hidden sm:inline-flex items-center gap-1 text-[11px] bg-amber-50 text-amber-700 border border-amber-200/70 px-2 py-0.5 rounded-full font-medium">
                          <Lightbulb size={12} weight="bold" /> Start with a verb + add a number
                        </span>
                      </div>
                      {bullets.length < 6 && (
                        <button
                          type="button"
                          onClick={() => addBullet(idx)}
                          className="text-xs font-semibold text-[#6E44FF] hover:underline"
                        >
                          + Add Bullet
                        </button>
                      )}
                    </div>

                    <div className="space-y-2">
                      {bullets.map((bullet, bIdx) => (
                        <div key={bIdx} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-300 shrink-0 ml-1" />
                          <input
                            className="flex-1 text-sm bg-slate-50/70 px-3.5 py-2 border border-slate-200/90 rounded-xl focus:bg-white focus:outline-none focus:border-[#6E44FF] focus:ring-4 focus:ring-[#6E44FF]/10 text-slate-900"
                            placeholder="e.g. Optimized merchant webhook queue with Redis Streams, slashing latency by 42%."
                            maxLength={220}
                            {...register(`experience.${idx}.bullets.${bIdx}` as const)}
                          />
                          <button
                            type="button"
                            onClick={() => removeBullet(idx, bIdx)}
                            className="p-1.5 text-slate-400 hover:text-rose-500 rounded-lg transition-colors"
                          >
                            <Trash size={15} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
