"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/firebase/auth-context";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { GoogleLogo, ArrowRight, Sparkle, Globe, FileText } from "@phosphor-icons/react";

export default function LoginPage() {
  const router = useRouter();
  const { signInWithGoogle, signInWithEmail, loginAsDemoUser } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await signInWithEmail(email, password);
      router.push("/dashboard");
    } catch (err: any) {
      setError(err?.message || "Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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
              Log in to update your career portfolio or download your placement resume.
            </p>

            {/* Google Button */}
            <button
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full py-3 px-4 border border-slate-200 rounded-xl bg-white hover:bg-slate-50 text-slate-800 text-xs font-semibold shadow-sm flex items-center justify-center gap-2.5 mb-6 transition-all"
            >
              <GoogleLogo size={18} weight="bold" className="text-slate-800" />
              <span>Continue with Google</span>
            </button>

            <div className="flex items-center gap-3 my-6">
              <div className="flex-1 border-t border-slate-200" />
              <span className="text-[11px] text-slate-400 uppercase font-semibold">Or with email</span>
              <div className="flex-1 border-t border-slate-200" />
            </div>

            <form onSubmit={handleEmailLogin} className="flex flex-col gap-4">
              <Input
                label="Email"
                type="email"
                placeholder="rohit@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <Input
                label="Password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              {error && <span className="text-xs text-rose-500 font-medium">{error}</span>}

              <Button
                type="submit"
                variant="primary"
                loading={loading}
                className="w-full mt-2"
              >
                Sign In →
              </Button>
            </form>

            <button
              type="button"
              onClick={() => {
                loginAsDemoUser();
                router.push("/dashboard");
              }}
              className="w-full mt-4 py-2.5 border border-dashed border-slate-300 text-xs font-semibold text-slate-600 hover:border-[#6E44FF] hover:text-[#6E44FF] text-center rounded-xl transition-colors"
            >
              Try Instant Demo Mode (No signup needed)
            </button>
          </div>
        </div>

        <div className="pt-8 text-xs text-slate-500">
          Don&apos;t have an account yet?{" "}
          <Link href="/signup" className="text-[#6E44FF] font-semibold hover:underline">
            Sign up here
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
            <h3 className="font-display text-xl font-bold text-slate-900">cv.decslab.in/rohit-codes</h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              One form automatically generates your live portfolio link and A4 placement PDF.
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
