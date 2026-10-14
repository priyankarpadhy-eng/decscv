"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/firebase/auth-context";
import { validateUsername, generateUsernameSuggestions, slugifyName } from "@/lib/username";
import { Button } from "@/components/ui/button";
import {
  CheckCircle,
  XCircle,
  Code,
  Palette,
  Gear,
  ChartLineUp,
  Sparkle,
  GameController,
  ArrowRight,
  ArrowLeft,
  Student,
  GraduationCap,
  Briefcase,
  Laptop,
} from "@phosphor-icons/react";

export default function OnboardingPage() {
  const router = useRouter();
  const { user, profile } = useAuth();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [roleType, setRoleType] = useState<string>("Student");
  const [field, setField] = useState<string>("Developer");
  const [name, setName] = useState<string>("");
  const [username, setUsername] = useState<string>("");

  useEffect(() => {
    if (user?.displayName && !name) {
      setName(user.displayName);
      const generatedSlug = slugifyName(user.displayName) || "user";
      setUsername(generatedSlug);
    } else if (!name) {
      setName("Aarav Sharma");
      setUsername("aarav-dev");
    }
  }, [user, name]);

  const validation = validateUsername(username);
  const suggestions = generateUsernameSuggestions(name);

  const handleFinish = () => {
    const draft = {
      username,
      basics: {
        name,
        headline: `${field} · ${roleType}`,
      },
      portfolio: {
        style: field === "Developer" ? "noir" : field === "Designer" ? "bento" : "paper",
      },
    };
    if (typeof window !== "undefined") {
      localStorage.setItem("decscv_onboarding_draft", JSON.stringify(draft));
    }
    router.push("/editor");
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-slate-900 font-sans flex flex-col justify-between p-4 sm:p-8 lg:p-12 max-w-3xl mx-auto select-none">
      {/* Top Header & Stepper Bar */}
      <header className="flex flex-col gap-4 border-b border-slate-200/80 pb-5">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 font-display text-sm font-bold tracking-tight text-slate-900"
          >
            <span className="w-7 h-7 rounded-lg bg-[#6E44FF] text-white flex items-center justify-center font-extrabold text-xs shadow-2xs">
              D
            </span>
            <span>decs/cv</span>
          </Link>
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
              Step {step} of 3
            </span>
            <button
              onClick={() => router.push("/editor")}
              className="text-xs font-semibold text-slate-400 hover:text-slate-800 transition-colors ml-2"
            >
              Skip to editor →
            </button>
          </div>
        </div>

        {/* Multi-segment Progress Bar */}
        <div className="w-full bg-slate-200/80 h-1.5 rounded-full overflow-hidden flex gap-1">
          <div
            className="bg-[#6E44FF] h-full transition-all duration-300"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>
      </header>

      {/* Screen 1: Role Type */}
      {step === 1 && (
        <div className="py-8 sm:py-12 flex flex-col gap-8 animate-in fade-in duration-200">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#6E44FF]">
              Step 01 · Identity
            </span>
            <h1 className="font-display text-3xl sm:text-4xl font-extrabold mt-1 text-slate-900 tracking-tight">
              What describes your current stage?
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Customizes your resume structure and template defaults.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
            {[
              { label: "College Student", icon: Student, desc: "Pre-final / Final year" },
              { label: "Fresher / Grad", icon: GraduationCap, desc: "Batch of 2024-2026" },
              { label: "Working Pro", icon: Briefcase, desc: "0-3 years experience" },
              { label: "Freelancer", icon: Laptop, desc: "Independent builder" },
            ].map(({ label, icon: Icon, desc }) => (
              <div
                key={label}
                onClick={() => setRoleType(label)}
                className={`p-5 rounded-2xl cursor-pointer transition-all duration-150 flex flex-col justify-between min-h-[140px] text-left border ${
                  roleType === label
                    ? "bg-white border-[#6E44FF] shadow-card ring-4 ring-[#6E44FF]/10"
                    : "bg-white border-slate-200/90 text-slate-600 hover:border-slate-300 hover:shadow-2xs"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                    roleType === label ? "bg-purple-50 text-[#6E44FF]" : "bg-slate-100 text-slate-600"
                  }`}
                >
                  <Icon size={20} weight="duotone" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">{label}</h3>
                  <p className="text-[11px] text-slate-400 mt-0.5">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          <Button
            variant="primary"
            onClick={() => setStep(2)}
            className="w-full sm:w-auto self-end mt-2"
            icon={<ArrowRight size={15} weight="bold" />}
          >
            Continue to domain
          </Button>
        </div>
      )}

      {/* Screen 2: Domain */}
      {step === 2 && (
        <div className="py-8 sm:py-12 flex flex-col gap-8 animate-in fade-in duration-200">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#6E44FF]">
              Step 02 · Domain
            </span>
            <h1 className="font-display text-3xl sm:text-4xl font-extrabold mt-1 text-slate-900 tracking-tight">
              What do you craft or build?
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Selects the recommended initial portfolio style engine.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
            {[
              { id: "Developer", icon: Code, rec: "Noir / Terminal", desc: "Software & Web" },
              { id: "Designer", icon: Palette, rec: "Bento / Paper", desc: "UI/UX & Product" },
              { id: "Engineer", icon: Gear, rec: "Blueprint", desc: "Core / Hardware" },
              { id: "Analytics", icon: ChartLineUp, rec: "Gazette", desc: "Data & Finance" },
              { id: "Creator", icon: Sparkle, rec: "Brutal", desc: "Media & Indie" },
              { id: "Game Dev", icon: GameController, rec: "Arcade", desc: "Graphics & 3D" },
            ].map(({ id, icon: Icon, rec, desc }) => (
              <div
                key={id}
                onClick={() => setField(id)}
                className={`p-5 rounded-2xl cursor-pointer transition-all duration-150 flex flex-col justify-between min-h-[140px] border ${
                  field === id
                    ? "bg-white border-[#6E44FF] shadow-card ring-4 ring-[#6E44FF]/10"
                    : "bg-white border-slate-200/90 text-slate-700 hover:border-slate-300 hover:shadow-2xs"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                      field === id ? "bg-purple-50 text-[#6E44FF]" : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    <Icon size={18} weight="duotone" />
                  </div>
                  <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-500">
                    {rec.split(" ")[0]}
                  </span>
                </div>
                <div>
                  <h3 className="font-display text-base font-bold text-slate-900 mt-3">{id}</h3>
                  <p className="text-[11px] text-slate-400 mt-0.5">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center mt-2">
            <button
              onClick={() => setStep(1)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors"
            >
              <ArrowLeft size={14} weight="bold" />
              <span>Back</span>
            </button>
            <Button
              variant="primary"
              onClick={() => setStep(3)}
              icon={<ArrowRight size={15} weight="bold" />}
            >
              Continue to username
            </Button>
          </div>
        </div>
      )}

      {/* Screen 3: Pick your link */}
      {step === 3 && (
        <div className="py-8 sm:py-12 flex flex-col gap-8 animate-in fade-in duration-200">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#6E44FF]">
              Step 03 · Public Handle
            </span>
            <h1 className="font-display text-3xl sm:text-4xl font-extrabold mt-1 text-slate-900 tracking-tight">
              Reserve your permanent link
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              This will be your live URL for recruiter messages and social profiles.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-700">
                Your Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (!username || username === slugifyName(name)) {
                    setUsername(slugifyName(e.target.value));
                  }
                }}
                placeholder="e.g. Aarav Sharma"
                className="w-full bg-slate-50/70 px-3.5 py-2.5 text-sm font-sans border border-slate-200/90 rounded-xl focus:bg-white focus:outline-none focus:border-[#6E44FF] focus:ring-4 focus:ring-[#6E44FF]/10 text-slate-900"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-700">
                Desired Username Slug
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value.toLowerCase().trim())}
                  placeholder="your-name"
                  className="flex-1 bg-slate-50/70 px-3.5 py-2.5 text-sm font-mono border border-slate-200/90 rounded-xl focus:bg-white focus:outline-none focus:border-[#6E44FF] focus:ring-4 focus:ring-[#6E44FF]/10 text-slate-900"
                />
                {validation.valid ? (
                  <CheckCircle size={24} weight="fill" className="text-emerald-500 shrink-0" />
                ) : (
                  <XCircle size={24} weight="fill" className="text-rose-500 shrink-0" />
                )}
              </div>
              {!validation.valid && (
                <span className="text-xs text-rose-500 font-medium">{validation.error}</span>
              )}
            </div>

            {/* Suggestions */}
            {suggestions.length > 0 && (
              <div className="flex flex-col gap-1.5 pt-1">
                <span className="text-xs font-medium text-slate-500">
                  Tap to use suggestion:
                </span>
                <div className="flex flex-wrap gap-2">
                  {suggestions.slice(0, 4).map((sug) => (
                    <button
                      key={sug}
                      type="button"
                      onClick={() => setUsername(sug)}
                      className="px-3 py-1 rounded-full bg-purple-50 text-purple-700 border border-purple-200/70 font-mono text-xs font-semibold hover:bg-purple-100 transition-colors"
                    >
                      {sug}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Live URL bar preview */}
            <div className="p-4 rounded-2xl border border-slate-200 bg-white shadow-2xs flex items-center justify-between text-xs font-mono mt-2">
              <span className="text-slate-400">Public Address:</span>
              <span className="font-bold text-[#6E44FF]">
                cv.decslab.in/{username || "..."}
              </span>
            </div>
          </div>

          <div className="flex justify-between items-center mt-2">
            <button
              onClick={() => setStep(2)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors"
            >
              <ArrowLeft size={14} weight="bold" />
              <span>Back</span>
            </button>
            <Button
              variant="primary"
              disabled={!validation.valid}
              onClick={handleFinish}
              icon={<ArrowRight size={15} weight="bold" />}
            >
              Launch Builder
            </Button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-slate-200/80 pt-4 text-xs text-slate-400 text-center">
        DecsCV Onboarding · You can change your username anytime in Settings.
      </footer>
    </div>
  );
}
