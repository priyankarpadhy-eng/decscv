"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/lib/firebase/auth-context";
import { GoogleLogo, Globe, FileText, CircleNotch, ShieldCheck, Check } from "@phosphor-icons/react";

function SignupContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams?.get("redirect") || "/editor";
  const { user, loading: authLoading, signInWithGoogle } = useAuth();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!authLoading && user) {
      router.replace(redirectTo);
    }
  }, [user, authLoading, router, redirectTo]);

  const handleGoogleSignup = async () => {
    setLoading(true);
    setError("");
    try {
      await signInWithGoogle();
      router.push(redirectTo);
    } catch (err: any) {
      setError(err?.message || "Failed to sign up with Google.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-slate-900 font-sans flex flex-col md:flex-row select-none">
      {/* Left Column: Sign Up Container */}
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
              Claim your public handle
            </h1>
            <p className="text-sm text-slate-500 mb-8 leading-relaxed">
              Connect your Google account to get an instant public URL at cv.decslab.in/username with zero configuration.
            </p>

            {error && (
              <div className="p-3.5 mb-5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 font-medium leading-relaxed">
                {error}
              </div>
            )}

            {/* Google Authentication Button */}
            <button
              onClick={handleGoogleSignup}
              disabled={loading}
              className="w-full py-3.5 px-4 border border-slate-200/90 rounded-xl bg-white hover:bg-slate-50 hover:border-slate-300 text-slate-800 text-sm font-semibold shadow-2xs flex items-center justify-center gap-3 transition-all active:scale-98 disabled:opacity-60"
            >
              {loading ? (
                <CircleNotch size={18} className="animate-spin text-[#6E44FF]" />
              ) : (
                <GoogleLogo size={19} weight="bold" className="text-slate-900" />
              )}
              <span>{loading ? "Connecting Google Account…" : "Continue with Google"}</span>
            </button>

            {/* Security Guarantee */}
            <div className="flex items-center justify-center gap-1.5 mt-5 text-[11px] text-slate-400">
              <ShieldCheck size={15} weight="fill" className="text-emerald-500" />
              <span>Official Google OAuth · Zero passwords stored</span>
            </div>
          </div>
        </div>

        <div className="pt-8 text-xs text-slate-500 text-center md:text-left">
          Already have a saved profile?{" "}
          <Link href="/login" className="text-[#6E44FF] font-semibold hover:underline">
            Sign in
          </Link>
        </div>
      </div>

      {/* Right Column: Information Panel */}
      <div className="w-full md:w-1/2 bg-[#F8F9FA] p-8 sm:p-12 lg:p-16 flex flex-col justify-center items-center">
        <div className="max-w-md w-full space-y-4">
          <div className="p-6 border border-slate-200/90 rounded-2xl bg-white shadow-card">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#6E44FF] block mb-2">
              INSTANT SETUP
            </span>
            <h3 className="font-display text-2xl font-bold text-slate-900">One Form, Two Outputs</h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Fill in your background details once. Switch effortlessly between an ATS-safe placement resume and a portfolio website with 8 visual engines.
            </p>
          </div>

          <div className="p-5 border border-slate-200/80 rounded-2xl bg-white/70 space-y-2 text-xs text-slate-600 font-medium">
            <div className="flex items-center gap-2">
              <Check size={14} weight="bold" className="text-emerald-500 shrink-0" />
              <span>Free public link: cv.decslab.in/{`<username>`}</span>
            </div>
            <div className="flex items-center gap-2">
              <Check size={14} weight="bold" className="text-emerald-500 shrink-0" />
              <span>A4 PDF export formatted for Indian placements</span>
            </div>
            <div className="flex items-center gap-2">
              <Check size={14} weight="bold" className="text-emerald-500 shrink-0" />
              <span>Realtime cloud backup via Firestore</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SignupPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#F8F9FA]">
          <div className="w-6 h-6 border-2 border-slate-300 border-t-[#6E44FF] rounded-full animate-spin" />
        </div>
      }
    >
      <SignupContent />
    </Suspense>
  );
}
