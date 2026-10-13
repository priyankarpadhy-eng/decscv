"use client";

import React, { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Profile } from "@/lib/types";
import { ProfileSchema, DefaultSections } from "@/lib/schema";
import { SAMPLE_PROFILES } from "@/seed/sample-profiles";
import { useEditorStore, EditorStepId } from "./EditorStore";
import { LeftRail } from "./LeftRail";
import { PreviewFrame } from "./PreviewFrame";
import { ModeStep } from "./steps/ModeStep";
import { BasicsStep } from "./steps/BasicsStep";
import { AboutStep } from "./steps/AboutStep";
import { ExperienceStep } from "./steps/ExperienceStep";
import { EducationStep } from "./steps/EducationStep";
import { ProjectsStep } from "./steps/ProjectsStep";
import { SkillsStep } from "./steps/SkillsStep";
import { ExtrasStep } from "./steps/ExtrasStep";
import { StyleStep } from "./steps/StyleStep";
import { PublishStep } from "./steps/PublishStep";
import { Dialog } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/toast";
import {
  DotsThreeVertical,
  ArrowRight,
  ArrowLeft,
  Eye,
  PencilSimple,
  Sparkle,
} from "@phosphor-icons/react";

interface EditorContainerProps {
  initialProfile?: Profile;
  onSave?: (profile: Profile) => Promise<void>;
}

export function EditorContainer({ initialProfile, onSave }: EditorContainerProps) {
  const {
    currentStep,
    setCurrentStep,
    mobileView,
    setMobileView,
    saveStatus,
    setSaveStatus,
    lastSavedTime,
    setLastSavedTime,
    showShortcutsModal,
    setShowShortcutsModal,
  } = useEditorStore();

  const { showToast } = useToast();
  const [showKebabMenu, setShowKebabMenu] = useState(false);

  // Default initial profile fallback
  const defaultProfile: Profile = initialProfile || {
    ...SAMPLE_PROFILES.noir,
    uid: "user_active",
    username: "rohit-codes",
  };

  const form = useForm<Profile>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: defaultProfile,
    mode: "onChange",
  });

  const { control, reset } = form;
  const watchedProfile = useWatch({ control }) as Profile;

  // Debounced Autosave (1.5s)
  useEffect(() => {
    const subscription = form.watch((value) => {
      setSaveStatus("saving");
      const timer = setTimeout(async () => {
        try {
          if (onSave && value) {
            await onSave(value as Profile);
          } else if (typeof window !== "undefined") {
            localStorage.setItem("decscv_draft_profile", JSON.stringify(value));
          }
          setSaveStatus("saved");
          const now = new Date();
          setLastSavedTime(
            now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
          );
        } catch {
          setSaveStatus("unsaved");
        }
      }, 1500);

      return () => clearTimeout(timer);
    });

    return () => subscription.unsubscribe();
  }, [form, onSave, setSaveStatus, setLastSavedTime]);

  // Keyboard shortcuts (Cmd+S, Cmd+Enter, ?)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "s") {
        e.preventDefault();
        setSaveStatus("saving");
        const vals = form.getValues();
        localStorage.setItem("decscv_draft_profile", JSON.stringify(vals));
        setTimeout(() => {
          setSaveStatus("saved");
          showToast({ message: "Changes saved successfully." });
        }, 300);
      } else if (e.key === "?" && !(e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement)) {
        e.preventDefault();
        setShowShortcutsModal(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [form, setSaveStatus, setShowShortcutsModal, showToast]);

  const handleFillSample = () => {
    reset(SAMPLE_PROFILES.noir);
    showToast({ message: "Loaded sample profile data!" });
    setShowKebabMenu(false);
  };

  const handleReset = () => {
    reset({
      uid: "user_active",
      username: "user-" + Math.floor(Math.random() * 1000),
      schemaVersion: 1,
      mode: "portfolio",
      portfolio: {
        style: "noir",
        accent: "#6E44FF",
        fontPair: 0,
        colorMode: "dark",
        motion: "full",
      },
      resume: {
        template: "modern",
        accent: "#6E44FF",
        scale: "M",
        showPhoto: false,
      },
      basics: {
        name: "",
        headline: "",
        email: "",
        availableForWork: true,
        links: [],
      },
      summary: "",
      experience: [],
      education: [],
      projects: [],
      skills: [],
      achievements: [],
      certifications: [],
      sections: DefaultSections,
      seo: {},
      visibility: "draft",
      stats: { views: 0 },
    });
    showToast({ message: "Form cleared." });
    setShowKebabMenu(false);
  };

  const stepOrder: EditorStepId[] = [
    "mode",
    "basics",
    "about",
    "experience",
    "education",
    "projects",
    "skills",
    "extras",
    "style",
    "publish",
  ];

  const currentStepIdx = stepOrder.indexOf(currentStep);

  const goNext = () => {
    if (currentStepIdx < stepOrder.length - 1) {
      setCurrentStep(stepOrder[currentStepIdx + 1]);
    }
  };

  const goPrev = () => {
    if (currentStepIdx > 0) {
      setCurrentStep(stepOrder[currentStepIdx - 1]);
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case "mode":
        return <ModeStep form={form} />;
      case "basics":
        return <BasicsStep form={form} />;
      case "about":
        return <AboutStep form={form} />;
      case "experience":
        return <ExperienceStep form={form} />;
      case "education":
        return <EducationStep form={form} />;
      case "projects":
        return <ProjectsStep form={form} />;
      case "skills":
        return <SkillsStep form={form} />;
      case "extras":
        return <ExtrasStep form={form} />;
      case "style":
        return <StyleStep form={form} />;
      case "publish":
        return (
          <PublishStep
            form={form}
            onPublishSuccess={async () => {
              if (onSave) await onSave(form.getValues());
            }}
          />
        );
      default:
        return <BasicsStep form={form} />;
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col bg-[#F8F9FA] text-slate-900 overflow-hidden font-sans">
      {/* Top Header Bar */}
      <header className="h-14 border-b border-slate-200/80 bg-white px-5 flex items-center justify-between shrink-0 select-none z-30">
        <div className="flex items-center gap-3">
          <a
            href="/"
            className="flex items-center gap-2 font-display text-sm font-bold text-slate-900 tracking-tight"
          >
            <span className="w-7 h-7 rounded-lg bg-[#6E44FF] text-white flex items-center justify-center font-extrabold text-xs">
              D
            </span>
            <span>decs/cv</span>
          </a>
          <span className="text-slate-300">/</span>
          <span className="text-xs font-medium text-slate-600 truncate max-w-[200px]">
            {watchedProfile?.basics?.name || "Untitled Profile"}
          </span>
        </div>

        <div className="flex items-center gap-2.5">
          {/* Pastel Autosave Status Pill */}
          <div className="flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/80">
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                saveStatus === "saving"
                  ? "bg-amber-500 animate-ping"
                  : "bg-emerald-500"
              }`}
            />
            <span>
              {saveStatus === "saving"
                ? "Saving…"
                : lastSavedTime
                ? `Saved ${lastSavedTime}`
                : "Saved"}
            </span>
          </div>

          {/* Kebab Dropdown Menu */}
          <div className="relative">
            <button
              onClick={() => setShowKebabMenu(!showKebabMenu)}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              title="Menu"
            >
              <DotsThreeVertical size={18} weight="bold" />
            </button>
            {showKebabMenu && (
              <div className="absolute right-0 top-11 w-48 bg-white border border-slate-200/90 rounded-2xl shadow-float p-1.5 z-50 flex flex-col gap-1">
                <button
                  onClick={handleFillSample}
                  className="w-full text-left px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-[#6E44FF] rounded-xl transition-colors"
                >
                  Fill with sample data
                </button>
                <button
                  onClick={handleReset}
                  className="w-full text-left px-3 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                >
                  Reset fields
                </button>
                <button
                  onClick={() => {
                    setShowKebabMenu(false);
                    setShowShortcutsModal(true);
                  }}
                  className="w-full text-left px-3 py-2 text-xs font-medium text-slate-500 hover:bg-slate-50 rounded-xl border-t border-slate-100 mt-1 pt-1.5 transition-colors"
                >
                  Shortcuts (?)
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main 3-Column Work Area */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Left Rail (72px) - Desktop only */}
        <div className="hidden md:flex">
          <LeftRail />
        </div>

        {/* Middle Form Column (480px / flex on mobile) */}
        <main
          className={`w-full md:w-[480px] shrink-0 border-r border-slate-200/80 bg-white flex flex-col h-full overflow-hidden ${
            mobileView === "preview" ? "hidden md:flex" : "flex"
          }`}
        >
          {/* Scrollable Form Body */}
          <div className="flex-1 overflow-y-auto p-6 sm:p-7">{renderCurrentStep()}</div>

          {/* Stepper Footer Controls */}
          <div className="h-16 border-t border-slate-200/80 bg-white px-6 flex items-center justify-between shrink-0 select-none">
            <button
              type="button"
              disabled={currentStepIdx === 0}
              onClick={goPrev}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 px-3 py-2 rounded-xl disabled:opacity-30 disabled:pointer-events-none transition-colors"
            >
              <ArrowLeft size={16} weight="bold" />
              <span>Back</span>
            </button>

            <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-500">
              {currentStepIdx + 1} of {stepOrder.length}
            </span>

            <button
              type="button"
              disabled={currentStepIdx === stepOrder.length - 1}
              onClick={goNext}
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-xl bg-[#6E44FF] text-white hover:bg-[#5E34E8] shadow-sm shadow-[#6E44FF]/25 disabled:opacity-30 disabled:pointer-events-none active:scale-95 transition-all"
            >
              <span>Next Step</span>
              <ArrowRight size={16} weight="bold" />
            </button>
          </div>
        </main>

        {/* Right Preview Frame (Flex) */}
        <div
          className={`flex-1 h-full overflow-hidden ${
            mobileView === "form" ? "hidden md:flex" : "flex"
          }`}
        >
          <PreviewFrame profile={watchedProfile || defaultProfile} />
        </div>
      </div>

      {/* Mobile Bottom Tab Bar */}
      <div className="md:hidden h-14 border-t border-slate-200 bg-white px-6 flex items-center justify-around shrink-0 select-none">
        <button
          onClick={() => setMobileView("form")}
          className={`flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-xl transition-all ${
            mobileView === "form"
              ? "bg-[#6E44FF] text-white shadow-sm"
              : "text-slate-500"
          }`}
        >
          <PencilSimple size={16} weight="bold" />
          <span>Editor</span>
        </button>

        <button
          onClick={() => setMobileView("preview")}
          className={`flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-xl transition-all ${
            mobileView === "preview"
              ? "bg-[#6E44FF] text-white shadow-sm"
              : "text-slate-500"
          }`}
        >
          <Eye size={16} weight="bold" />
          <span>Preview</span>
        </button>
      </div>

      {/* Keyboard Shortcuts Dialog */}
      <Dialog
        open={showShortcutsModal}
        onClose={() => setShowShortcutsModal(false)}
        title="Keyboard Shortcuts"
      >
        <div className="space-y-3 text-xs">
          <div className="flex justify-between items-center py-2 border-b border-slate-100">
            <span className="text-slate-600">Force Save Profile</span>
            <kbd className="bg-slate-100 px-2 py-1 rounded-lg text-slate-700 font-mono text-[11px]">⌘ / Ctrl + S</kbd>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-slate-100">
            <span className="text-slate-600">Next Form Step</span>
            <kbd className="bg-slate-100 px-2 py-1 rounded-lg text-slate-700 font-mono text-[11px]">⌘ / Ctrl + Enter</kbd>
          </div>
          <div className="flex justify-between items-center py-2">
            <span className="text-slate-600">Open Shortcuts Help</span>
            <kbd className="bg-slate-100 px-2 py-1 rounded-lg text-slate-700 font-mono text-[11px]">?</kbd>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
