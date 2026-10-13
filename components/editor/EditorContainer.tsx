"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Profile } from "@/lib/types";
import { ProfileSchema, DefaultSections } from "@/lib/schema";
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
import { useAuth } from "@/lib/firebase/auth-context";
import {
  DotsThreeVertical,
  ArrowRight,
  ArrowLeft,
  Eye,
  PencilSimple,
  GoogleLogo,
  Check,
  SignOut,
  User as UserIcon,
} from "@phosphor-icons/react";
import Image from "next/image";

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
  const { user, profile: authProfile, signInWithGoogle, logout, saveProfileToFirestore } = useAuth();
  const [showKebabMenu, setShowKebabMenu] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);

  // Clean empty initial profile (NO hardcoded dummy details)
  const getInitialProfile = (): Profile => {
    if (initialProfile) return initialProfile;
    if (authProfile) return authProfile;

    return {
      uid: user?.uid || "guest",
      username: user?.email ? user.email.split("@")[0] : "yourname",
      schemaVersion: 1,
      mode: "portfolio",
      portfolio: {
        style: "bento",
        accent: "#6E44FF",
        fontPair: 0,
        colorMode: "light",
        motion: "full",
      },
      resume: {
        template: "modern",
        accent: "#6E44FF",
        scale: "M",
        showPhoto: !!user?.photoURL,
      },
      basics: {
        name: user?.displayName || "",
        headline: "",
        email: user?.email || "",
        photo: user?.photoURL ? { url: user.photoURL } : undefined,
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
    };
  };

  const form = useForm<Profile>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: getInitialProfile(),
    mode: "onChange",
  });

  const { control, reset, setValue } = form;
  const watchedProfile = useWatch({ control }) as Profile;

  // When user signs in with Google, update form with their real details if fields are empty
  useEffect(() => {
    if (user) {
      if (authProfile) {
        reset(authProfile);
      } else {
        if (!form.getValues("basics.name") && user.displayName) {
          setValue("basics.name", user.displayName);
        }
        if (!form.getValues("basics.email") && user.email) {
          setValue("basics.email", user.email);
        }
        if (!form.getValues("basics.photo?.url") && user.photoURL) {
          setValue("basics.photo", { url: user.photoURL });
        }
        setValue("uid", user.uid);
      }
    }
  }, [user, authProfile, reset, setValue, form]);

  // Debounced Autosave (1.5s) to Firestore & localStorage
  const handleAutosave = useCallback(
    async (values: Profile) => {
      setSaveStatus("saving");
      try {
        if (onSave) {
          await onSave(values);
        }
        await saveProfileToFirestore(values);
        setSaveStatus("saved");
        const now = new Date();
        setLastSavedTime(
          now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        );
      } catch (err) {
        console.error("Autosave error:", err);
        setSaveStatus("unsaved");
      }
    },
    [onSave, saveProfileToFirestore, setSaveStatus, setLastSavedTime]
  );

  useEffect(() => {
    const subscription = form.watch((value) => {
      setSaveStatus("saving");
      const timer = setTimeout(() => {
        if (value) handleAutosave(value as Profile);
      }, 1500);

      return () => clearTimeout(timer);
    });

    return () => subscription.unsubscribe();
  }, [form, handleAutosave, setSaveStatus]);

  // Keyboard shortcuts (Cmd+S, ?)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "s") {
        e.preventDefault();
        const vals = form.getValues();
        handleAutosave(vals);
        showToast({ message: "Saved to cloud." });
      } else if (e.key === "?" && !(e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement)) {
        e.preventDefault();
        setShowShortcutsModal(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [form, handleAutosave, setShowShortcutsModal, showToast]);

  const handleGoogleAuth = async () => {
    setAuthLoading(true);
    try {
      const loggedUser = await signInWithGoogle();
      if (loggedUser) {
        showToast({ message: `Signed in as ${loggedUser.displayName || loggedUser.email}` });
      }
    } catch (err: any) {
      showToast({ message: err?.message || "Google sign-in failed." });
    } finally {
      setAuthLoading(false);
    }
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
              await handleAutosave(form.getValues());
            }}
          />
        );
      default:
        return <BasicsStep form={form} />;
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col bg-[#F4F5F7] text-slate-900 overflow-hidden font-sans">
      {/* Top Header Bar - Optimized for Mobile & Desktop */}
      <header className="h-14 border-b border-slate-200/90 bg-white px-3 sm:px-6 flex items-center justify-between shrink-0 select-none z-30 shadow-2xs">
        <div className="flex items-center gap-2 sm:gap-3.5">
          <a
            href="/"
            className="flex items-center gap-2 font-display text-sm font-bold text-slate-900 tracking-tight"
          >
            <span className="w-7 h-7 rounded-lg bg-[#6E44FF] text-white flex items-center justify-center font-extrabold text-xs shadow-sm shadow-[#6E44FF]/30">
              D
            </span>
            <span className="hidden sm:inline">decs/cv</span>
          </a>
          <span className="text-slate-300 hidden sm:inline">/</span>
          <span className="text-xs font-semibold text-slate-600 truncate max-w-[140px] sm:max-w-[220px]">
            {watchedProfile?.basics?.name || "New Profile"}
          </span>
        </div>

        {/* Right Section: Cloud Autosave & Google Account */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Status Pill */}
          <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-medium px-2.5 py-1 rounded-full bg-slate-50 border border-slate-200/80 text-slate-600">
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                saveStatus === "saving"
                  ? "bg-amber-500 animate-ping"
                  : "bg-emerald-500"
              }`}
            />
            <span className="hidden sm:inline">
              {saveStatus === "saving"
                ? "Saving to Cloud…"
                : lastSavedTime
                ? `Saved ${lastSavedTime}`
                : "Cloud Synced"}
            </span>
            <span className="sm:hidden">
              {saveStatus === "saving" ? "Saving…" : "Saved"}
            </span>
          </div>

          {/* Real Google Account / Login Button */}
          {user ? (
            <div className="flex items-center gap-2 pl-1 border-l border-slate-200">
              {user.photoURL ? (
                <div className="relative w-7 h-7 rounded-full overflow-hidden border border-slate-200 shadow-2xs">
                  <Image
                    src={user.photoURL}
                    alt={user.displayName || "User"}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="w-7 h-7 rounded-full bg-purple-100 text-[#6E44FF] font-bold text-xs flex items-center justify-center">
                  {(user.displayName || user.email || "U").charAt(0).toUpperCase()}
                </div>
              )}
              <button
                onClick={logout}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg transition-colors"
                title="Log out"
              >
                <SignOut size={16} weight="bold" />
              </button>
            </div>
          ) : (
            <button
              onClick={handleGoogleAuth}
              disabled={authLoading}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-800 shadow-2xs transition-all active:scale-95"
            >
              <GoogleLogo size={15} weight="bold" className="text-slate-700" />
              <span className="hidden sm:inline">Google Login</span>
              <span className="sm:hidden">Login</span>
            </button>
          )}

          {/* Kebab Dropdown Menu */}
          <div className="relative">
            <button
              onClick={() => setShowKebabMenu(!showKebabMenu)}
              className="p-1.5 sm:p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              title="Menu"
            >
              <DotsThreeVertical size={18} weight="bold" />
            </button>
            {showKebabMenu && (
              <div className="absolute right-0 top-11 w-44 bg-white border border-slate-200/90 rounded-2xl shadow-float p-1.5 z-50 flex flex-col gap-1">
                <button
                  onClick={() => {
                    setShowKebabMenu(false);
                    setShowShortcutsModal(true);
                  }}
                  className="w-full text-left px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50 rounded-xl transition-colors"
                >
                  Shortcuts (?)
                </button>
                <a
                  href="/dashboard"
                  className="w-full text-left px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50 rounded-xl transition-colors"
                >
                  Go to Dashboard
                </a>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Work Area - Fluid & Non-Congested */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Left Rail (72px) - Desktop only */}
        <div className="hidden lg:flex">
          <LeftRail />
        </div>

        {/* Middle Form Column - Responsive width for Laptop & Big Screens */}
        <main
          className={`w-full lg:w-[460px] xl:w-[500px] 2xl:w-[540px] shrink-0 border-r border-slate-200/80 bg-white flex flex-col h-full overflow-hidden ${
            mobileView === "preview" ? "hidden lg:flex" : "flex"
          }`}
        >
          {/* Horizontal Step Nav on Mobile & Tablet */}
          <div className="lg:hidden flex items-center gap-1.5 overflow-x-auto px-4 py-2 border-b border-slate-100 shrink-0 bg-slate-50/50">
            {stepOrder.map((step, idx) => {
              const isActive = currentStep === step;
              return (
                <button
                  key={step}
                  onClick={() => setCurrentStep(step)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold whitespace-nowrap uppercase tracking-wider transition-colors ${
                    isActive
                      ? "bg-[#6E44FF] text-white shadow-2xs"
                      : "text-slate-500 hover:bg-slate-200/60"
                  }`}
                >
                  {idx + 1}. {step}
                </button>
              );
            })}
          </div>

          {/* Scrollable Form Body with Comfortable Padding */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-7 xl:p-8">
            {renderCurrentStep()}
          </div>

          {/* Stepper Footer Controls */}
          <div className="h-15 border-t border-slate-200/80 bg-white px-4 sm:px-6 flex items-center justify-between shrink-0 select-none">
            <button
              type="button"
              disabled={currentStepIdx === 0}
              onClick={goPrev}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 px-3 py-2 rounded-xl disabled:opacity-30 disabled:pointer-events-none transition-colors"
            >
              <ArrowLeft size={16} weight="bold" />
              <span>Back</span>
            </button>

            <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-500">
              {currentStepIdx + 1} / {stepOrder.length}
            </span>

            <button
              type="button"
              disabled={currentStepIdx === stepOrder.length - 1}
              onClick={goNext}
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-xl bg-[#6E44FF] text-white hover:bg-[#5E34E8] shadow-sm shadow-[#6E44FF]/25 disabled:opacity-30 disabled:pointer-events-none active:scale-95 transition-all"
            >
              <span>Next</span>
              <ArrowRight size={16} weight="bold" />
            </button>
          </div>
        </main>

        {/* Right Preview Frame - Fluid Flex Panel */}
        <div
          className={`flex-1 h-full overflow-hidden ${
            mobileView === "form" ? "hidden lg:flex" : "flex"
          }`}
        >
          <PreviewFrame profile={watchedProfile || getInitialProfile()} />
        </div>
      </div>

      {/* Mobile Bottom Tab Bar (Toggle Form vs Preview) */}
      <div className="lg:hidden h-14 border-t border-slate-200 bg-white px-6 flex items-center justify-around shrink-0 select-none z-20">
        <button
          onClick={() => setMobileView("form")}
          className={`flex items-center gap-2 text-xs font-bold px-5 py-2 rounded-xl transition-all ${
            mobileView === "form"
              ? "bg-[#6E44FF] text-white shadow-sm"
              : "text-slate-500 hover:text-slate-900"
          }`}
        >
          <PencilSimple size={16} weight="bold" />
          <span>Edit Form</span>
        </button>

        <button
          onClick={() => setMobileView("preview")}
          className={`flex items-center gap-2 text-xs font-bold px-5 py-2 rounded-xl transition-all ${
            mobileView === "preview"
              ? "bg-[#6E44FF] text-white shadow-sm"
              : "text-slate-500 hover:text-slate-900"
          }`}
        >
          <Eye size={16} weight="bold" />
          <span>Live Preview</span>
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
