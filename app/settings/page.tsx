"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/firebase/auth-context";
import { validateUsername } from "@/lib/username";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import { ArrowLeft, DownloadSimple, Trash, Moon, Sun } from "@phosphor-icons/react";

export default function SettingsPage() {
  const router = useRouter();
  const { user, profile, logout, deleteAccount, loading: authLoading } = useAuth();
  const { showToast } = useToast();

  const currentUsername = profile?.username || (user?.email ? user.email.split("@")[0] : "user");
  const [username, setUsername] = useState(currentUsername);
  const [deleteConfirm, setDeleteConfirm] = useState("");
  const [darkTheme, setDarkTheme] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  React.useEffect(() => {
    if (!authLoading && !user) {
      router.replace("/login?redirect=/settings");
      return;
    }
    if (profile?.username) {
      setUsername(profile.username);
    }
  }, [profile, user, authLoading, router]);

  const toggleTheme = () => {
    const next = !darkTheme;
    setDarkTheme(next);
    document.documentElement.setAttribute("data-theme", next ? "dark" : "light");
  };

  const handleUpdateUsername = () => {
    const val = validateUsername(username);
    if (!val.valid) {
      showToast({ message: val.error || "Invalid username", type: "error" });
      return;
    }
    showToast({ message: `Username updated to ${username}!` });
  };

  const handleExportJson = () => {
    const draft = localStorage.getItem("decscv_draft_profile") || JSON.stringify(profile || {});
    const blob = new Blob([draft], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `decscv_export_${username}.json`;
    a.click();
    showToast({ message: "Exported profile data as JSON." });
  };

  const handleDeleteAccount = async () => {
    if (deleteConfirm !== username && deleteConfirm !== "DELETE") {
      showToast({ message: "Confirmation does not match. Type DELETE or your username.", type: "error" });
      return;
    }
    try {
      setIsDeleting(true);
      await deleteAccount();
      showToast({ message: "Account and profile data permanently deleted." });
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

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8F9FA]">
        <div className="w-6 h-6 border-2 border-slate-300 border-t-[#6E44FF] rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-slate-900 font-sans flex flex-col p-6 sm:p-12">
      <div className="max-w-3xl w-full mx-auto flex flex-col gap-6">
        {/* Nav Header */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft size={16} weight="bold" />
            <span>Back to Dashboard</span>
          </Link>
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Settings</span>
        </div>

        <div>
          <h1 className="font-display text-3xl font-extrabold text-slate-900">Account Preferences</h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage your public handle, export data, or configure app settings.
          </p>
        </div>

        {/* Change Username */}
        <div className="p-6 border border-slate-200/90 rounded-2xl bg-white shadow-card flex flex-col gap-4">
          <div>
            <h3 className="font-display text-lg font-bold text-slate-900">Public Username Handle</h3>
            <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
              Updates your permanent URL to cv.decslab.in/{username}. Previous link redirects for 30 days.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Input
              value={username}
              onChange={(e) => setUsername(e.target.value.toLowerCase().trim())}
              placeholder="new-username"
            />
            <Button variant="primary" onClick={handleUpdateUsername}>
              Save Handle
            </Button>
          </div>
        </div>

        {/* Builder Theme Toggle */}
        <div className="p-6 border border-slate-200/90 rounded-2xl bg-white shadow-card flex items-center justify-between">
          <div>
            <h3 className="font-display text-lg font-bold text-slate-900">Builder Interface Theme</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Toggle clean light vs modern night mode.
            </p>
          </div>
          <button
            onClick={toggleTheme}
            className="px-4 py-2 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs font-semibold flex items-center gap-2 transition-colors"
          >
            {darkTheme ? <Sun size={17} weight="bold" /> : <Moon size={17} weight="bold" />}
            <span>{darkTheme ? "Dark Mode" : "Light Mode"}</span>
          </button>
        </div>

        {/* Data Export */}
        <div className="p-6 border border-slate-200/90 rounded-2xl bg-white shadow-card flex items-center justify-between">
          <div>
            <h3 className="font-display text-lg font-bold text-slate-900">Export Career Data</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Download your entire resume, experience history, and projects as structured JSON.
            </p>
          </div>
          <Button
            variant="secondary"
            icon={<DownloadSimple size={16} weight="bold" />}
            onClick={handleExportJson}
          >
            Export JSON
          </Button>
        </div>

        {/* Danger Zone: Delete Account */}
        <div className="p-6 border border-rose-200 rounded-2xl bg-rose-50/50 flex flex-col gap-4">
          <div>
            <h3 className="font-display text-lg font-bold text-rose-700">Delete Account & Records</h3>
            <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
              Permanently purges your username reservation, public profile, and storage assets. This action cannot be undone.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-slate-700">
              Type <strong className="text-slate-900">{username}</strong> to confirm:
            </label>
            <div className="flex items-center gap-3">
              <Input
                value={deleteConfirm}
                onChange={(e) => setDeleteConfirm(e.target.value)}
                placeholder={username}
              />
              <Button
                variant="danger"
                icon={<Trash size={16} weight="bold" />}
                onClick={handleDeleteAccount}
                loading={isDeleting}
                disabled={isDeleting || (deleteConfirm !== username && deleteConfirm !== "DELETE")}
              >
                {isDeleting ? "Deleting..." : "Delete Profile"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
