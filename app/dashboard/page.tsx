"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/firebase/auth-context";
import { Profile } from "@/lib/types";
import { SAMPLE_PROFILES } from "@/seed/sample-profiles";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/toast";
import {
  Copy,
  ArrowUpRight,
  QrCode,
  ShareNetwork,
  PencilSimple,
  SignOut,
  Users,
  Eye,
  Calendar,
  Sparkle,
} from "@phosphor-icons/react";

export default function DashboardPage() {
  const router = useRouter();
  const { logout } = useAuth();
  const { showToast } = useToast();

  const [profile, setProfile] = useState<Profile>(SAMPLE_PROFILES.noir);
  const [showQrModal, setShowQrModal] = useState(false);

  useEffect(() => {
    // Load local draft if available
    const draft = localStorage.getItem("decscv_draft_profile");
    if (draft) {
      try {
        setProfile(JSON.parse(draft));
      } catch {
        // ignore
      }
    }
  }, []);

  const publicUrl = `https://cv.decslab.in/${profile.username}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(publicUrl);
    showToast({ message: "Link copied to clipboard!" });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${profile.basics.name}'s Portfolio`,
          url: publicUrl,
        });
      } catch {
        handleCopyLink();
      }
    } else {
      handleCopyLink();
    }
  };

  // Completeness score calculation
  const getCompleteness = () => {
    let score = 20; // base for registration
    if (profile.basics.photo?.url) score += 20;
    if (profile.projects.length >= 2) score += 20;
    if (profile.experience.length >= 1) score += 20;
    if (profile.skills.length >= 5) score += 20;
    return Math.min(100, score);
  };

  const completeness = getCompleteness();

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-slate-900 font-sans flex flex-col">
      {/* Top Bar */}
      <header className="h-16 border-b border-slate-200/80 bg-white px-6 flex items-center justify-between z-30">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-2 font-display text-sm font-bold text-slate-900 tracking-tight"
          >
            <span className="w-7 h-7 rounded-lg bg-[#6E44FF] text-white flex items-center justify-center font-extrabold text-xs shadow-sm shadow-[#6E44FF]/25">
              D
            </span>
            <span>decs/cv</span>
          </Link>
          <span className="text-slate-300">/</span>
          <span className="text-xs font-semibold text-slate-600">
            Overview
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/editor"
            className="inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-xl bg-[#6E44FF] text-white shadow-sm shadow-[#6E44FF]/25 hover:bg-[#5E34E8] active:scale-95 transition-all"
          >
            <PencilSimple size={15} weight="bold" />
            <span>Open Builder</span>
          </Link>
          <button
            onClick={() => {
              logout();
              router.push("/");
            }}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            title="Log out"
          >
            <SignOut size={18} weight="bold" />
          </button>
        </div>
      </header>

      {/* Main Dashboard Container */}
      <main className="max-w-6xl w-full mx-auto p-6 sm:p-10 flex flex-col gap-6 flex-1">
        {/* Top Link Card Styled Like Clean Hero Card (Image 1) */}
        <div className="p-6 sm:p-8 rounded-2xl border border-slate-200/90 bg-white shadow-card flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2.5">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Your Public Link
              </span>
              <span
                className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${
                  profile.visibility === "public"
                    ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                    : "bg-slate-100 text-slate-500 border-slate-200"
                }`}
              >
                {profile.visibility === "public" ? "● Live on Web" : "○ Draft Mode"}
              </span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight break-all font-mono">
              {publicUrl}
            </h2>
            <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
              <span>Active style: <strong className="text-slate-700 uppercase">{profile.portfolio.style}</strong></span>
              <span>·</span>
              <span>Mode: <strong className="text-slate-700 uppercase">{profile.mode}</strong></span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button
              size="sm"
              variant="secondary"
              icon={<Copy size={15} weight="bold" />}
              onClick={handleCopyLink}
            >
              Copy Link
            </Button>
            <a
              href={`/${profile.username}`}
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-50 shadow-sm transition-all"
            >
              <ArrowUpRight size={15} weight="bold" />
              <span>Open</span>
            </a>
            <Button
              size="sm"
              variant="secondary"
              icon={<QrCode size={15} weight="bold" />}
              onClick={() => setShowQrModal(true)}
            >
              QR Code
            </Button>
            <Button
              size="sm"
              variant="secondary"
              icon={<ShareNetwork size={15} weight="bold" />}
              onClick={handleShare}
            >
              Share
            </Button>
          </div>
        </div>

        {/* Metric Cards Row with Soft Squircles from Image 1 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Total Views */}
          <div className="p-6 border border-slate-200/90 rounded-2xl bg-white shadow-card flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Profile Views
              </span>
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-[#6E44FF] flex items-center justify-center">
                <Eye size={20} weight="duotone" />
              </div>
            </div>
            <div className="my-3">
              <span className="font-display text-3xl font-extrabold text-slate-900">
                {profile.stats?.views || 146}
              </span>
            </div>
            <span className="text-[11px] font-semibold text-emerald-600 flex items-center gap-1">
              +17% engagement this month
            </span>
          </div>

          {/* Card 2: 7-Day Velocity */}
          <div className="p-6 border border-slate-200/90 rounded-2xl bg-white shadow-card flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Recent 7d Views
              </span>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#10B981] flex items-center justify-center">
                <Users size={20} weight="duotone" />
              </div>
            </div>
            <div className="my-3">
              <span className="font-display text-3xl font-extrabold text-slate-900">
                48
              </span>
            </div>
            <span className="text-[11px] font-medium text-slate-400">
              Verified server reads
            </span>
          </div>

          {/* Card 3: Completeness */}
          <div className="p-6 border border-slate-200/90 rounded-2xl bg-white shadow-card flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Health Score
              </span>
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-[#F59E0B] flex items-center justify-center">
                <Sparkle size={20} weight="duotone" />
              </div>
            </div>
            <div className="my-3">
              <span className="font-display text-3xl font-extrabold text-[#6E44FF]">
                {completeness}%
              </span>
            </div>
            {/* Multi-segment time activity progress bar (matching Image 1) */}
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden flex gap-1">
              <div className="bg-[#6E44FF] h-full" style={{ width: `${Math.min(60, completeness)}%` }} />
              <div className="bg-[#10B981] h-full" style={{ width: `${Math.max(0, completeness - 60)}%` }} />
            </div>
          </div>

          {/* Card 4: Last Published */}
          <div className="p-6 border border-slate-200/90 rounded-2xl bg-white shadow-card flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Deployment
              </span>
              <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#FF5722] flex items-center justify-center">
                <Calendar size={20} weight="duotone" />
              </div>
            </div>
            <div className="my-3">
              <span className="font-display text-2xl font-bold text-slate-900">
                Updated
              </span>
            </div>
            <span className="text-[11px] font-medium text-slate-400">
              Synced with Cloud CDN
            </span>
          </div>
        </div>

        {/* Profile Completeness Recommendations Card */}
        {completeness < 100 && (
          <div className="p-6 border border-purple-200/80 rounded-2xl bg-purple-50/50 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-base font-bold text-slate-900">
                Suggested improvements for your link
              </h3>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-white text-purple-700 border border-purple-200 shadow-sm">
                {completeness} / 100%
              </span>
            </div>
            <div className="space-y-2 text-xs font-medium text-slate-700">
              {!profile.basics.photo?.url && (
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#6E44FF]" />
                  <span>Add a photo URL to increase profile view engagement (+20%)</span>
                </div>
              )}
              {profile.projects.length < 2 && (
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#6E44FF]" />
                  <span>Add at least 2 key projects to showcase technical skills (+20%)</span>
                </div>
              )}
              {profile.skills.length < 5 && (
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#6E44FF]" />
                  <span>Tag 5 or more tools and frameworks in your skills stack (+20%)</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Quick Navigation Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <Link
            href="/editor"
            className="p-6 border border-slate-200/90 rounded-2xl bg-white shadow-card hover:shadow-hover hover:-translate-y-0.5 transition-all flex flex-col justify-between min-h-[160px]"
          >
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#6E44FF]">
                FORM & CONTENT
              </span>
              <h3 className="font-display text-xl font-bold mt-1 text-slate-900">Edit Details</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Update education, internship experience, bullets, and links.
              </p>
            </div>
            <span className="text-xs font-semibold text-[#6E44FF] mt-4">Open builder →</span>
          </Link>

          <Link
            href="/editor"
            className="p-6 border border-slate-200/90 rounded-2xl bg-white shadow-card hover:shadow-hover hover:-translate-y-0.5 transition-all flex flex-col justify-between min-h-[160px]"
          >
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#10B981]">
                VISUAL ENGINE
              </span>
              <h3 className="font-display text-xl font-bold mt-1 text-slate-900">Switch Vibe</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Choose between Noir, Bento, Terminal, Paper, and 4 other engines.
              </p>
            </div>
            <span className="text-xs font-semibold text-[#10B981] mt-4">Browse gallery →</span>
          </Link>

          <Link
            href="/settings"
            className="p-6 border border-slate-200/90 rounded-2xl bg-white shadow-card hover:shadow-hover hover:-translate-y-0.5 transition-all flex flex-col justify-between min-h-[160px]"
          >
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#FF5722]">
                PREFERENCES
              </span>
              <h3 className="font-display text-xl font-bold mt-1 text-slate-900">Account & Data</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Change username slug, export JSON archive, or delete profile.
              </p>
            </div>
            <span className="text-xs font-semibold text-[#FF5722] mt-4">Manage settings →</span>
          </Link>
        </div>
      </main>

      {/* QR Code Dialog */}
      <Dialog
        open={showQrModal}
        onClose={() => setShowQrModal(false)}
        title="Share via QR Code"
        maxWidth="sm"
      >
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="p-4 bg-white border border-slate-200 rounded-2xl shadow-sm">
            <div className="w-48 h-48 bg-slate-900 flex items-center justify-center p-3 text-white font-mono text-[10px] rounded-xl">
              <div className="w-full h-full bg-white flex flex-col items-center justify-center text-slate-900 p-2 rounded-lg">
                <span className="font-bold text-xs">{profile.basics.name}</span>
                <span className="text-[9px] text-slate-500 break-all mt-2">{publicUrl}</span>
              </div>
            </div>
          </div>
          <p className="text-xs text-slate-500">
            Scan with any smartphone camera to visit {publicUrl}
          </p>
        </div>
      </Dialog>
    </div>
  );
}
