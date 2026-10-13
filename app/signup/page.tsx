"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/firebase/auth-context";
import { GoogleLogo, Sparkle, Globe, Check } from "@phosphor-icons/react";

export default function SignupPage() {
  const router = useRouter();
  const { signInWithGoogle } = useAuth();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGoogleSignup = async () => {
    setLoading(true);
    setError("");
    try {
      await signInWithGoogle();
      router.push("/editor");
    } catch (err: any) {
      setError(err?.message || "Failed to sign up with Google.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-slate-900 font-sans flex flex-col md:flex-row">
      <div className="w-full md:w-1/2 p-8 sm:p-16 flex flex-col justify-between border-r border-slate-200/80 bg-white">
        <div>
          <Link
            href="/"
            className="flex items-center gap-2 font-display text-sm font-bold text-slate-900 tracking-tight mb-12"
          >
            <span className="w-7 h-7 rounded-lg bg-[#6E44FF] text-white flex items-center justify-center font-extrabold text-xs shadow-sm shadow-[#6E44FF]/25">
              D
            </span>
            <span>decs/cv</span>
          </Link>
          <div className="max-w-md">
            <h1 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-2">
              Claim your identity
            </h1>
            <p className="text-sm text-slate-500 mb-8 leading-relaxed">
              Sign up with Google to automatically create and sync your career portfolio website and placement resume.
            </p>

            {error && (
              <div className="p-3 mb-4 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-600 font-medium">
                {error}
              </div>
            )}

            <button
              onClick={handleGoogleSignup}
              disabled={loading}
              className="w-full py-3.5 px-4 border border-slate-200 rounded-xl bg-white hover:bg-slate-50 text-slate-800 text-sm font-semibold shadow-sm flex items-center justify-center gap-3 transition-all active:scale-98"
            >
              <GoogleLogo size={20} weight="bold" className="text-slate-800" />
              <span>{loading ? "Connecting Google Account…" : "Sign up with Google"}</span>
            </button>
          </div>
        </div>

        <div className="pt-8 text-xs text-slate-500">
          Already have an account?{" "}
          <Link href="/login" className="text-[#6E44FF] font-semibold hover:underline">
            Log in
          </Link>
        </div>
      </div>

      <div className="w-full md:w-1/2 bg-slate-50 p-12 hidden md:flex flex-col justify-center items-center relative overflow-hidden select-none">
        <div className="max-w-md w-full space-y-5">
          <div className="p-6 border border-slate-200/90 rounded-2xl bg-white shadow-card">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#6E44FF] block mb-2">
              Instant Cloud Sync
            </span>
            <h3 className="font-display text-2xl font-bold text-slate-900">Google Login & Firestore</h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Your data is safely stored in Google Cloud Firestore with realtime autosave and zero dummy placeholders.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
