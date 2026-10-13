"use client";

import React from "react";
import { UseFormReturn, useFieldArray } from "react-hook-form";
import { Profile } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Trash } from "@phosphor-icons/react";

export function EducationStep({ form }: { form: UseFormReturn<Profile> }) {
  const { control, register } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "education",
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#6E44FF]">
            Step 04 · Academics
          </span>
          <h2 className="font-display text-2xl font-bold text-slate-900 mt-1">
            Education & Degrees
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Colleges, universities, Class 12, or polytechnic diplomas.
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
              school: "",
              degree: "B.Tech in Computer Science",
              field: "Engineering",
              start: "2021",
              end: "2025",
              current: true,
              gradeType: "CGPA",
              grade: "9.0 / 10",
            })
          }
        >
          Add Degree
        </Button>
      </div>

      <div className="space-y-4">
        {fields.map((field, idx) => (
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
                  Academic Record
                </span>
              </div>
              <button
                type="button"
                onClick={() => remove(idx)}
                className="p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                title="Remove education"
              >
                <Trash size={16} />
              </button>
            </div>

            <Input
              label="Institute / University"
              placeholder="e.g. IIIT Hyderabad / IIT Bombay / Delhi University"
              {...register(`education.${idx}.school` as const)}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <Input
                label="Degree / Certificate"
                placeholder="e.g. B.Tech / B.Des / Class 12 (CBSE)"
                {...register(`education.${idx}.degree` as const)}
              />
              <Input
                label="Major / Field"
                placeholder="e.g. Computer Science / Economics"
                {...register(`education.${idx}.field` as const)}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              <Input
                label="Start Year"
                placeholder="2021"
                {...register(`education.${idx}.start` as const)}
              />
              <Input
                label="End Year"
                placeholder="2025"
                {...register(`education.${idx}.end` as const)}
              />
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-sans font-medium text-slate-700 block mb-1.5">
                    Grading
                  </label>
                  <select
                    className="w-full bg-slate-50/70 px-2 py-2.5 text-xs font-medium text-slate-800 border border-slate-200/90 rounded-xl focus:bg-white focus:outline-none focus:border-[#6E44FF] focus:ring-4 focus:ring-[#6E44FF]/10"
                    {...register(`education.${idx}.gradeType` as const)}
                  >
                    <option value="CGPA">CGPA</option>
                    <option value="Percentage">%</option>
                    <option value="None">None</option>
                  </select>
                </div>
                <Input
                  label="Score"
                  placeholder="9.2 / 10"
                  {...register(`education.${idx}.grade` as const)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
