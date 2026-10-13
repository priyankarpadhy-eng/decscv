"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { validateUsername, generateUsernameSuggestions } from "@/lib/username";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle } from "@phosphor-icons/react";

export default function OnboardingPage() {
  const router = useRouter();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [roleType, setRoleType] = useState<string>("Student");
  const [field, setField] = useState<string>("Developer");
  const [name, setName] = useState<string>("Aarav Sharma");
  const [username, setUsername] = useState<string>("aarav-dev");

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
    <div className="min-h-screen bg-[#F8F9FA] text-slate-900 font-sans flex flex-col justify-between p-6 sm:p-12 max-w-3xl mx-auto select-none">
      {/* Top Header */}
      <header className="flex items-center justify-between border-b border-slate-200 pb-4">
        <span className="font-display text-sm font-bold tracking-tight text-slate-900">
          decs/cv
        </span>
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600">
            Step {step} of 3
          </span>
          <button
            onClick={() => router.push("/editor")}
            className="text-xs font-semibold text-slate-400 hover:text-slate-800 transition-colors ml-2"
          >
            Skip →
          </button>
        </div>
      </header>

      {/* Screen 1: What are you? */}
      {step === 1 && (
        <div className="py-12 flex flex-col gap-8 animate-in fade-in duration-200">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#6E44FF]">
              Step 01 · Identity
            </span>
            <h1 className="font-display text-3xl sm:text-4xl font-extrabold mt-1 text-slate-900">
              What describes you best?
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Helps us personalize your sections, templates, and guidance.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {["College Student", "Fresher / Grad", "Working Pro", "Freelancer"].map((item) => (
              <div
                key={item}
                onClick={() => setRoleType(item)}
                className={`p-6 border rounded-2xl cursor-pointer transition-all duration-150 text-center flex flex-col justify-center min-h-[120px] text-sm font-semibold ${
                  roleType === item
                    ? "bg-white border-[#6E44FF] text-slate-900 shadow-md ring-4 ring-[#6E44FF]/10"
                    : "bg-white border-slate-200/90 text-slate-600 hover:border-slate-300 hover:shadow-card"
                }`}
              >
                {item}
              </div>
            ))}
          </div>

          <Button
            variant="primary"
            onClick={() => setStep(2)}
            className="w-full sm:w-auto self-end mt-4"
          >
            Next: What do you build? →
          </Button>
        </div>
      )}

      {/* Screen 2: What do you do? */}
      {step === 2 && (
        <div className="py-12 flex flex-col gap-8 animate-in fade-in duration-200">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#6E44FF]">
              Step 02 · Domain
            </span>
            <h1 className="font-display text-3xl sm:text-4xl font-extrabold mt-1 text-slate-900">
              What do you do?
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Sets your recommended starting style engine and skill suggestions.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {[
              { id: "Developer", icon: "DEV", rec: "Noir / Terminal" },
              { id: "Designer", icon: "DESIGN", rec: "Bento / Paper" },
              { id: "Civil/Mech/Elec", icon: "ENGINEER", rec: "Blueprint" },
              { id: "Commerce / Finance", icon: "BUSINESS", rec: "Gazette" },
              { id: "Indie Creator", icon: "MAKER", rec: "Brutal" },
              { id: "Game Programmer", icon: "GAME", rec: "Arcade" },
            ].map((f) => (
              <div
                key={f.id}
                onClick={() => setField(f.id)}
                className={`p-5 border rounded-2xl cursor-pointer transition-all duration-150 flex flex-col justify-between min-h-[120px] ${
                  field === f.id
                    ? "bg-white border-[#6E44FF] text-slate-900 shadow-md ring-4 ring-[#6E44FF]/10"
                    : "bg-white border-slate-200/90 text-slate-700 hover:border-slate-300 hover:shadow-card"
                }`}
              >
                <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 w-max">
                  {f.icon}
                </span>
                <span className="font-display text-base font-bold text-slate-900 mt-2">{f.id}</span>
                <span className="text-[10px] text-slate-400 mt-1">Rec: {f.rec}</span>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center mt-4">
            <button
              onClick={() => setStep(1)}
              className="text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors"
            >
              ← Back
            </button>
            <Button variant="primary" onClick={() => setStep(3)}>
              Next: Pick your link →
            </Button>
          </div>
        </div>
      )}

      {/* Screen 3: Pick your link */}
      {step === 3 && (
        <div className="py-12 flex flex-col gap-8 animate-in fade-in duration-200">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#6E44FF]">
              Step 03 · Public URL
            </span>
            <h1 className="font-display text-3xl sm:text-4xl font-extrabold mt-1 text-slate-900">
              Pick your public link
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Your link to share with recruiters and on social profiles.
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
                onChange={(e) => setName(e.target.value)}
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
                  className="flex-1 bg-slate-50/70 px-3.5 py-2.5 text-sm font-mono border border-slate-200/90 rounded-xl focus:bg-white focus:outline-none focus:border-[#6E44FF] focus:ring-4 focus:ring-[#6E44FF]/10 text-slate-900"
                />
                {validation.valid ? (
                  <CheckCircle size={26} weight="fill" className="text-emerald-500 shrink-0" />
                ) : (
                  <XCircle size={26} weight="fill" className="text-rose-500 shrink-0" />
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
                  Available Suggestions (Tap to pick):
                </span>
                <div className="flex flex-wrap gap-2">
                  {suggestions.map((sug) => (
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
            <div className="p-4 rounded-2xl border border-slate-200 bg-white shadow-sm flex items-center justify-between text-xs font-mono mt-2">
              <span className="text-slate-400">Full Public URL:</span>
              <span className="font-bold text-[#6E44FF]">
                https://cv.decslab.in/{username}
              </span>
            </div>
          </div>

          <div className="flex justify-between items-center mt-4">
            <button
              onClick={() => setStep(2)}
              className="text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors"
            >
              ← Back
            </button>
            <Button
              variant="primary"
              disabled={!validation.valid}
              onClick={handleFinish}
            >
              Launch Builder →
            </Button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-slate-200 pt-4 text-xs text-slate-400 text-center">
        DecsCV Onboarding · Your link can always be changed in Settings.
      </footer>
    </div>
  );
}
