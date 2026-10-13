"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/firebase/auth-context";
import { Profile } from "@/lib/types";
import { SAMPLE_PROFILES } from "@/seed/sample-profiles";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  Trash,
  DownloadSimple,
  Warning,
  ShieldCheck,
} from "@phosphor-icons/react";

export default function DashboardPage() {
  const router = useRouter();
  const { user, profile: authProfile, logout, deleteAccount, loading: authLoading } = useAuth();
  const { showToast } = useToast();

  const [profile, setProfile] = useState<Profile | null>(null);
  const [showQrModal, setShowQrModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (authProfile) {
      setProfile(authProfile);
      return;
    }

    // Load local draft if available
    const draft = localStorage.getItem("decscv_draft_profile");
    if (draft) {
      try {
        setProfile(JSON.parse(draft));
      } catch {
        // ignore
      }
    } else if (user) {
      // Clean profile with user's real credentials
      setProfile({
        uid: user.uid,
        username: user.email ? user.email.split("@")[0] : "user",
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
          showPhoto: !!user.photoURL,
        },
        basics: {
          name: user.displayName || "Your Name",
          headline: "",
          email: user.email || "",
          photo: user.photoURL ? { url: user.photoURL } : undefined,
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
        sections: [],
        seo: {},
        visibility: "draft",
        stats: { views: 0 },
      });
    }
  }, [authProfile, user]);

  const activeProfile = profile || {
    username: user?.email ? user.email.split("@")[0] : "yourname",
    visibility: "draft",
    mode: "portfolio",
    portfolio: { style: "bento" },
    basics: { name: user?.displayName || "My Profile", photo: user?.photoURL ? { url: user.photoURL } : undefined },
    projects: [],
    experience: [],
    skills: [],
    stats: { views: 0 },
  } as unknown as Profile;

  const publicUrl = `https://cv.decslab.in/${activeProfile.username}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(publicUrl);
    showToast({ message: "Link copied to clipboard!" });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${activeProfile.basics.name}'s Portfolio`,
          url: publicUrl,
        });
      } catch {
        handleCopyLink();
      }
    } else {
      handleCopyLink();
    }
  };

  const handleExportJson = () => {
    const data = activeProfile || authProfile;
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `decscv_${activeProfile.username || "profile"}_backup.json`;
    a.click();
    showToast({ message: "Downloaded profile archive as JSON." });
  };

  const handleDeleteAccount = async () => {
    const matchTarget = activeProfile.username;
    if (deleteConfirmText !== "DELETE" && deleteConfirmText !== matchTarget) {
      showToast({ message: "Confirmation does not match. Type DELETE to proceed.", type: "error" });
      return;
    }

    try {
      setIsDeleting(true);
      await deleteAccount();
      showToast({ message: "Your account and all portfolio data have been permanently erased." });
      setShowDeleteModal(false);
      router.push("/");
    } catch (err: any) {
      showToast({
        message: err.message || "Failed to delete account. Please try again.",
        type: "error",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  // Completeness score calculation
  const getCompleteness = () => {
    let score = 20; // base for registration
    if (activeProfile.basics?.photo?.url) score += 20;
    if (activeProfile.projects?.length >= 2) score += 20;
    if (activeProfile.experience?.length >= 1) score += 20;
    if (activeProfile.skills?.length >= 5) score += 20;
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
                  activeProfile.visibility === "public"
                    ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                    : "bg-slate-100 text-slate-500 border-slate-200"
                }`}
              >
                {activeProfile.visibility === "public" ? "● Live on Web" : "○ Draft Mode"}
              </span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight break-all font-mono">
              {publicUrl}
            </h2>
            <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
              <span>Active style: <strong className="text-slate-700 uppercase">{activeProfile.portfolio.style}</strong></span>
              <span>·</span>
              <span>Mode: <strong className="text-slate-700 uppercase">{activeProfile.mode}</strong></span>
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
              href={`/${activeProfile.username}`}
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
                {activeProfile.stats?.views || 0}
              </span>
            </div>
            <span className="text-[11px] font-semibold text-emerald-600 flex items-center gap-1">
              Synced with Firestore
            </span>
          </div>

          {/* Card 2: 7-Day Velocity */}
          <div className="p-6 border border-slate-200/90 rounded-2xl bg-white shadow-card flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Showcase Projects
              </span>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#10B981] flex items-center justify-center">
                <Users size={20} weight="duotone" />
              </div>
            </div>
            <div className="my-3">
              <span className="font-display text-3xl font-extrabold text-slate-900">
                {activeProfile.projects?.length || 0}
              </span>
            </div>
            <span className="text-[11px] font-medium text-slate-400">
              Verified showcase builds
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
                {activeProfile.visibility === "public" ? "Published" : "Draft"}
              </span>
            </div>
            <span className="text-[11px] font-medium text-slate-400">
              Realtime Firestore Sync
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
              {!activeProfile.basics?.photo?.url && (
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#6E44FF]" />
                  <span>Add a photo URL to increase profile view engagement (+20%)</span>
                </div>
              )}
              {activeProfile.projects?.length < 2 && (
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#6E44FF]" />
                  <span>Add at least 2 key projects to showcase technical skills (+20%)</span>
                </div>
              )}
              {activeProfile.skills?.length < 5 && (
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
                Change username slug, export JSON archive, or configure settings.
              </p>
            </div>
            <span className="text-xs font-semibold text-[#FF5722] mt-4">Manage settings →</span>
          </Link>
        </div>

        {/* Account Privacy & Danger Zone Card */}
        <div className="p-6 sm:p-8 rounded-2xl border border-slate-200/90 bg-white shadow-card flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Privacy & Data Ownership
              </span>
              <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                DPDP Act Compliant
              </span>
            </div>
            <h3 className="font-display text-xl font-bold text-slate-900">
              Account Controls & Data Deletion
            </h3>
            <p className="text-xs text-slate-500 max-w-xl leading-relaxed">
              You maintain 100% ownership of your resume and portfolio data. You can download an offline JSON backup or permanently purge your account, public URL, and all records from Firestore.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <Button
              size="sm"
              variant="secondary"
              icon={<DownloadSimple size={15} weight="bold" />}
              onClick={handleExportJson}
            >
              Export Data
            </Button>
            <Button
              size="sm"
              variant="danger"
              icon={<Trash size={15} weight="bold" />}
              onClick={() => {
                setDeleteConfirmText("");
                setShowDeleteModal(true);
              }}
            >
              Delete Account
            </Button>
          </div>
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
                <span className="font-bold text-xs">{activeProfile.basics.name}</span>
                <span className="text-[9px] text-slate-500 break-all mt-2">{publicUrl}</span>
              </div>
            </div>
          </div>
          <p className="text-xs text-slate-500">
            Scan with any smartphone camera to visit {publicUrl}
          </p>
        </div>
      </Dialog>

      {/* Delete Account Confirmation Dialog */}
      <Dialog
        open={showDeleteModal}
        onClose={() => {
          if (!isDeleting) setShowDeleteModal(false);
        }}
        title="Permanently Delete Account"
        maxWidth="md"
      >
        <div className="flex flex-col gap-4 text-left">
          <div className="p-3.5 bg-rose-50 border border-rose-200/80 rounded-xl text-rose-800 text-xs leading-relaxed flex items-start gap-2.5">
            <Warning size={18} weight="bold" className="shrink-0 mt-0.5 text-rose-600" />
            <div>
              <p className="font-semibold">This action cannot be undone.</p>
              <p className="mt-0.5 text-rose-700">
                Deleting your account will immediately unpublish your portfolio at{" "}
                <strong className="font-mono text-rose-900">{publicUrl}</strong>, release your username handle, and purge all your resume drafts, experiences, skills, and Firestore records.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-slate-700">
              To confirm, type <span className="font-mono font-bold text-slate-900 select-all">DELETE</span> or your username{" "}
              <span className="font-mono font-bold text-slate-900 select-all">{activeProfile.username}</span> below:
            </label>
            <Input
              value={deleteConfirmText}
              onChange={(e) => setDeleteConfirmText(e.target.value.trim())}
              placeholder="DELETE"
              disabled={isDeleting}
              autoFocus
            />
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setShowDeleteModal(false)}
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              size="sm"
              icon={<Trash size={15} weight="bold" />}
              onClick={handleDeleteAccount}
              loading={isDeleting}
              disabled={
                isDeleting ||
                (deleteConfirmText !== "DELETE" && deleteConfirmText !== activeProfile.username)
              }
            >
              {isDeleting ? "Deleting..." : "Permanently Delete Account"}
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
