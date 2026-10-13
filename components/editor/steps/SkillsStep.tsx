"use client";

import React, { useState } from "react";
import { UseFormReturn, useFieldArray } from "react-hook-form";
import { Profile } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Plus, X } from "@phosphor-icons/react";

const BUNDLED_SKILLS = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "Python",
  "Go",
  "Rust",
  "C++",
  "PostgreSQL",
  "Redis",
  "Docker",
  "Kubernetes",
  "AWS",
  "Figma",
  "Design Systems",
  "AutoCAD",
  "STAAD.Pro",
  "Revit",
  "MATLAB",
  "Stata",
  "Econometrics",
  "Godot",
  "Unreal Engine",
  "Pixel Art",
  "eBPF",
  "Linux Kernel",
];

export function SkillsStep({ form }: { form: UseFormReturn<Profile> }) {
  const { control } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "skills",
  });

  const [inputVal, setInputVal] = useState("");

  const handleAddSkill = (name: string) => {
    const clean = name.trim();
    if (!clean) return;
    const exists = fields.some((f) => f.name.toLowerCase() === clean.toLowerCase());
    if (!exists) {
      append({
        id: Math.random().toString(36).substring(2, 9),
        name: clean,
        level: 4,
      });
    }
    setInputVal("");
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <span className="text-xs font-semibold uppercase tracking-wider text-[#6E44FF]">
          Step 06 · Proficiency
        </span>
        <h2 className="font-display text-2xl font-bold text-slate-900 mt-1">
          Skills & Tech Stack
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Add technical frameworks, languages, tools, or domain expertise.
        </p>
      </div>

      {/* Input box */}
      <div className="flex gap-2">
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleAddSkill(inputVal);
            }
          }}
          placeholder="Type skill & press Enter (e.g. Go, AutoCAD, Figma)..."
          className="flex-1 bg-slate-50/70 px-3.5 py-2.5 text-sm font-sans text-slate-900 border border-slate-200/90 rounded-xl focus:bg-white focus:outline-none focus:border-[#6E44FF] focus:ring-4 focus:ring-[#6E44FF]/10"
        />
        <Button
          type="button"
          variant="primary"
          onClick={() => handleAddSkill(inputVal)}
          icon={<Plus size={15} weight="bold" />}
        >
          Add
        </Button>
      </div>

      {/* Active Skills List */}
      <div className="flex flex-col gap-2">
        <span className="text-xs font-semibold text-slate-700">
          Added Skills ({fields.length})
        </span>
        <div className="flex flex-wrap gap-2 p-4 border border-slate-200/90 rounded-2xl bg-slate-50/50 min-h-[96px] items-start content-start">
          {fields.length === 0 ? (
            <span className="text-xs text-slate-400 italic">
              No skills added yet. Tap suggestions below or type your own.
            </span>
          ) : (
            fields.map((f, idx) => (
              <span
                key={f.id}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-purple-700 border border-purple-200/70 text-xs font-semibold shadow-sm"
              >
                <span>{f.name}</span>
                <button
                  type="button"
                  onClick={() => remove(idx)}
                  className="hover:text-purple-900 p-0.5"
                >
                  <X size={12} weight="bold" />
                </button>
              </span>
            ))
          )}
        </div>
      </div>

      {/* Suggested Quick Add Pills */}
      <div className="flex flex-col gap-2 pt-2">
        <span className="text-xs font-medium text-slate-500">
          Popular Suggestions (Tap to add):
        </span>
        <div className="flex flex-wrap gap-1.5">
          {BUNDLED_SKILLS.map((sk) => {
            const added = fields.some((f) => f.name.toLowerCase() === sk.toLowerCase());
            return (
              <button
                key={sk}
                type="button"
                disabled={added}
                onClick={() => handleAddSkill(sk)}
                className={`text-xs font-medium px-3 py-1 rounded-full transition-colors ${
                  added
                    ? "bg-slate-100 text-slate-400 border border-transparent cursor-not-allowed"
                    : "bg-white text-slate-700 border border-slate-200 hover:border-purple-300 hover:bg-purple-50 hover:text-purple-700 shadow-sm"
                }`}
              >
                + {sk}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
