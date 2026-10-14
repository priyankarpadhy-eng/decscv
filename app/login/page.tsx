"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/firebase/auth-context";
import { GoogleLogo, Globe, FileText, CircleNotch, ShieldCheck, Check } from "@phosphor-icons/react";

export default function LoginPage() {
  const router = useRouter();
  const { signInWithGoogle } = useAuth();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      await signInWithGoogle();
      router.push("/dashboard");
    } catch (err: any) {
      setError(err?.message || "Failed to sign in with Google.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-slate-900 font-sans flex flex-col md:flex-row select-none">
      {/* Left Column: Form Container */}
      <div className="w-full md:w-1/2 p-6 sm:p-12 lg:p-16 flex flex-col justify-between border-b md:border-b-0 md:border-r border-slate-200/90 bg-white">
        <div>
          <Link
            href="/"
            className="flex items-center gap-2 font-display text-sm font-bold text-slate-900 tracking-tight mb-10"
          >
            <span className="w-7 h-7 rounded-lg bg-[#6E44FF] text-white flex items-center justify-center font-extrabold text-xs shadow-2xs">
              D
            </span>
            <span>decs/cv</span>
          </Link>

          <div className="max-w-md mx-auto md:mx-0">
            <h1 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-2">
              Sign in to your account
            </h1>
            <p className="text-sm text-slate-500 mb-8 leading-relaxed">
              Continue with Google to manage your live portfolio website or update your placement resume.
            </p>

            {error && (
              <div className="p-3.5 mb-5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 font-medium leading-relaxed">
                {error}
              </div>
            )}

            {/* Google Authentication Button */}
            <button
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full py-3.5 px-4 border border-slate-200/90 rounded-xl bg-white hover:bg-slate-50 hover:border-slate-300 text-slate-800 text-sm font-semibold shadow-2xs flex items-center justify-center gap-3 transition-all active:scale-98 disabled:opacity-60"
            >
              {loading ? (
                <CircleNotch size={18} className="animate-spin text-[#6E44FF]" />
              ) : (
                <GoogleLogo size={19} weight="bold" className="text-slate-900" />
              )}
              <span>{loading ? "Authenticating with Google…" : "Continue with Google"}</span>
            </button>

            {/* Security Guarantee */}
            <div className="flex items-center justify-center gap-1.5 mt-5 text-[11px] text-slate-400">
              <ShieldCheck size={15} weight="fill" className="text-emerald-500" />
              <span>Official Google OAuth · Zero passwords stored</span>
            </div>
          </div>
        </div>

        <div className="pt-8 text-xs text-slate-500 text-center md:text-left">
          Looking to explore first?{" "}
          <Link href="/editor" className="text-[#6E44FF] font-semibold hover:underline">
            Open the free builder
          </Link>
        </div>
      </div>

      {/* Right Column: Value Showcase Panel */}
      <div className="w-full md:w-1/2 bg-[#F8F9FA] p-8 sm:p-12 lg:p-16 flex flex-col justify-center items-center">
        <div className="max-w-md w-full space-y-4">
          <div className="p-6 border border-slate-200/90 rounded-2xl bg-white shadow-card">
            <div className="flex items-center justify-between mb-3">
              <span className="w-9 h-9 rounded-xl bg-purple-50 text-[#6E44FF] flex items-center justify-center">
                <Globe size={18} weight="duotone" />
              </span>
              <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                ● Realtime Sync
              </span>
            </div>
            <h3 className="font-display text-xl font-bold text-slate-900">One Profile · Two Formats</h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Your career facts remain synchronized across an ATS-safe A4 resume and a stunning portfolio website with 8 visual engines.
            </p>
          </div>

          <div className="p-5 border border-slate-200/90 rounded-2xl bg-white shadow-card flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#FF5722] flex items-center justify-center shrink-0">
              <FileText size={20} weight="duotone" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">Placement-Tested PDF</h4>
              <p className="text-xs text-slate-500">Structured for Harvard and Indian campus recruitment drives.</p>
            </div>
          </div>

          {/* Quick Bullet Checklist */}
          <div className="p-5 border border-slate-200/80 rounded-2xl bg-white/70 space-y-2 text-xs text-slate-600 font-medium">
            <div className="flex items-center gap-2">
              <Check size={14} weight="bold" className="text-emerald-500 shrink-0" />
              <span>Realtime autosave to Google Cloud Firestore</span>
            </div>
            <div className="flex items-center gap-2">
              <Check size={14} weight="bold" className="text-emerald-500 shrink-0" />
              <span>Instant public link at cv.decslab.in/username</span>
            </div>
            <div className="flex items-center gap-2">
              <Check size={14} weight="bold" className="text-emerald-500 shrink-0" />
              <span>Full ownership: 1-click JSON export or account purge</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
