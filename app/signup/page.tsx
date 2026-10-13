"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/firebase/auth-context";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { GoogleLogo, Sparkle, Globe, Check } from "@phosphor-icons/react";

export default function SignupPage() {
  const router = useRouter();
  const { signInWithGoogle, signUpWithEmail } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const calculateStrength = (pass: string) => {
    let score = 0;
    if (pass.length >= 8) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;
    return score;
  };

  const strength = calculateStrength(password);
  const strengthLabels = ["TOO WEAK", "WEAK", "FAIR", "STRONG", "VERY STRONG"];

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await signUpWithEmail(email, password);
      router.push("/onboarding");
    } catch (err: any) {
      setError(err?.message || "Failed to create account.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setLoading(true);
    setError("");
    try {
      await signInWithGoogle();
      router.push("/onboarding");
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
              One account powers your live portfolio site and PDF placement resume.
            </p>

            <button
              onClick={handleGoogleSignup}
              disabled={loading}
              className="w-full py-3 px-4 border border-slate-200 rounded-xl bg-white hover:bg-slate-50 text-slate-800 text-xs font-semibold shadow-sm flex items-center justify-center gap-2.5 mb-6 transition-all"
            >
              <GoogleLogo size={18} weight="bold" className="text-slate-800" />
              <span>Sign up with Google</span>
            </button>

            <div className="flex items-center gap-3 my-6">
              <div className="flex-1 border-t border-slate-200" />
              <span className="text-[11px] text-slate-400 uppercase font-semibold">Or with email</span>
              <div className="flex-1 border-t border-slate-200" />
            </div>

            <form onSubmit={handleSignup} className="flex flex-col gap-4">
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

              {/* Password strength meter */}
              {password && (
                <div className="flex flex-col gap-1.5 text-xs">
                  <div className="flex justify-between items-center text-[10px] text-slate-500 font-medium">
                    <span>SECURITY: {strengthLabels[strength]}</span>
                    <span>{strength * 25}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden flex">
                    <div
                      className={`h-full transition-all ${
                        strength <= 1
                          ? "bg-rose-500"
                          : strength <= 2
                          ? "bg-amber-500"
                          : "bg-emerald-500"
                      }`}
                      style={{ width: `${Math.max(10, strength * 25)}%` }}
                    />
                  </div>
                </div>
              )}

              {error && <span className="text-xs text-rose-500 font-medium">{error}</span>}

              <Button
                type="submit"
                variant="primary"
                loading={loading}
                className="w-full mt-2"
              >
                Create Account →
              </Button>
            </form>
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
              Ready in 3 Minutes
            </span>
            <h3 className="font-display text-2xl font-bold text-slate-900">100% Free Forever</h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Designed specifically for engineering students, designers, and fresh grads in India.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
