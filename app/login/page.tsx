"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/firebase/auth-context";
import { GoogleLogo, Globe, FileText } from "@phosphor-icons/react";

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
    <div className="min-h-screen bg-[#F8F9FA] text-slate-900 font-sans flex flex-col md:flex-row">
      {/* Left Column: Form */}
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
              Welcome back
            </h1>
            <p className="text-sm text-slate-500 mb-8 leading-relaxed">
              Sign in with your Google account to edit your career portfolio or download your placement resume.
            </p>

            {error && (
              <div className="p-3 mb-4 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-600 font-medium">
                {error}
              </div>
            )}

            {/* Google Button */}
            <button
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full py-3.5 px-4 border border-slate-200 rounded-xl bg-white hover:bg-slate-50 text-slate-800 text-sm font-semibold shadow-sm flex items-center justify-center gap-3 transition-all active:scale-98"
            >
              <GoogleLogo size={20} weight="bold" className="text-slate-800" />
              <span>{loading ? "Signing in…" : "Continue with Google"}</span>
            </button>
          </div>
        </div>

        <div className="pt-8 text-xs text-slate-500">
          New to DecsCV?{" "}
          <Link href="/editor" className="text-[#6E44FF] font-semibold hover:underline">
            Try the free builder
          </Link>
        </div>
      </div>

      {/* Right Column: Modern Preview Card Wall */}
      <div className="w-full md:w-1/2 bg-slate-50 p-12 hidden md:flex flex-col justify-center items-center relative overflow-hidden select-none">
        <div className="max-w-md w-full space-y-5">
          <div className="p-6 border border-slate-200/90 rounded-2xl bg-white shadow-card">
            <div className="flex items-center justify-between mb-3">
              <span className="w-8 h-8 rounded-lg bg-purple-50 text-[#6E44FF] flex items-center justify-center">
                <Globe size={18} weight="duotone" />
              </span>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700">
                ● Live
              </span>
            </div>
            <h3 className="font-display text-xl font-bold text-slate-900">One Form → Dual Output</h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Fill once. Switch instantly between a portfolio website and an A4 placement resume PDF.
            </p>
          </div>

          <div className="p-5 border border-slate-200/90 rounded-2xl bg-white shadow-card flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#FF5722] flex items-center justify-center shrink-0">
              <FileText size={20} weight="duotone" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">ATS Placement Resume</h4>
              <p className="text-xs text-slate-500">Clean selectable typography with 100% parser accuracy.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
