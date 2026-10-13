"use client";

import React from "react";
import { useEditorStore, EditorStepId } from "./EditorStore";
import {
  ToggleLeft,
  User,
  Article,
  Briefcase,
  GraduationCap,
  FolderSimple,
  Sparkle,
  Medal,
  PaintBrush,
  PaperPlaneTilt,
  Plus,
} from "@phosphor-icons/react";

interface StepMeta {
  id: EditorStepId;
  label: string;
  num: string;
  icon: React.ReactNode;
}

const STEPS: StepMeta[] = [
  { id: "mode", label: "Mode", num: "00", icon: <ToggleLeft size={20} /> },
  { id: "basics", label: "Basics", num: "01", icon: <User size={20} /> },
  { id: "about", label: "About", num: "02", icon: <Article size={20} /> },
  { id: "experience", label: "Experience", num: "03", icon: <Briefcase size={20} /> },
  { id: "education", label: "Education", num: "04", icon: <GraduationCap size={20} /> },
  { id: "projects", label: "Projects", num: "05", icon: <FolderSimple size={20} /> },
  { id: "skills", label: "Skills", num: "06", icon: <Sparkle size={20} /> },
  { id: "extras", label: "Extras", num: "07", icon: <Medal size={20} /> },
  { id: "style", label: "Style", num: "08", icon: <PaintBrush size={20} /> },
  { id: "publish", label: "Publish", num: "09", icon: <PaperPlaneTilt size={20} /> },
];

export function LeftRail() {
  const { currentStep, setCurrentStep } = useEditorStore();

  return (
    <aside className="w-18 md:w-[72px] shrink-0 border-r border-slate-200/80 bg-white flex flex-col items-center justify-between py-5 select-none z-20">
      {/* Top Brand Mark */}
      <div className="flex flex-col items-center gap-4 w-full">
        <div className="w-9 h-9 rounded-xl bg-[#6E44FF] text-white flex items-center justify-center font-display font-extrabold text-base shadow-sm shadow-[#6E44FF]/30">
          D
        </div>

        {/* Step Navigation Icons */}
        <div className="flex flex-col gap-1.5 w-full px-2.5 mt-2">
          {STEPS.map((step) => {
            const isActive = currentStep === step.id;
            return (
              <button
                key={step.id}
                onClick={() => setCurrentStep(step.id)}
                title={`${step.num} · ${step.label}`}
                className={`group relative flex items-center justify-center w-11 h-11 rounded-xl transition-all duration-150 ${
                  isActive
                    ? "bg-[#6E44FF] text-white shadow-sm shadow-[#6E44FF]/25"
                    : "text-slate-500 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                <span>{step.icon}</span>

                {/* Hover Tooltip Pill */}
                <div className="absolute left-full ml-3 px-2.5 py-1 bg-slate-900 text-white text-[11px] font-medium rounded-lg whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 shadow-md">
                  {step.num} · {step.label}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Floating Purple Action Plus Button (matching Image 2) */}
      <div className="flex flex-col items-center gap-2">
        <button
          onClick={() => setCurrentStep("publish")}
          className="w-10 h-10 rounded-full bg-[#6E44FF] text-white flex items-center justify-center shadow-md shadow-[#6E44FF]/35 hover:bg-[#5E34E8] active:scale-95 transition-all"
          title="Publish"
        >
          <Plus size={20} weight="bold" />
        </button>
      </div>
    </aside>
  );
}
