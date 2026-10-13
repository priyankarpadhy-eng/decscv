"use client";

import React, { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { Profile } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import confetti from "canvas-confetti";
import {
  CheckCircle,
  WarningCircle,
  Copy,
  WhatsappLogo,
  LinkedinLogo,
  DownloadSimple,
} from "@phosphor-icons/react";

export function PublishStep({
  form,
  onPublishSuccess,
}: {
  form: UseFormReturn<Profile>;
  onPublishSuccess: () => Promise<void>;
}) {
  const { watch, register, setValue } = form;
  const { showToast } = useToast();

  const [publishing, setPublishing] = useState(false);
  const [published, setPublished] = useState(watch("visibility") === "public");

  const username = watch("username") || "my-link";
  const name = watch("basics.name");
  const headline = watch("basics.headline");
  const experience = watch("experience") || [];
  const projects = watch("projects") || [];
  const education = watch("education") || [];
  const visibility = watch("visibility");

  const publicUrl = `https://cv.decslab.in/${username}`;

  // Pre-flight validation checks
  const checks = [
    { label: "Full Name provided", ok: Boolean(name?.trim()) },
    { label: "Professional headline provided", ok: Boolean(headline?.trim()) },
    { label: "Valid username slug claimed", ok: Boolean(username?.trim()) },
    {
      label: "At least 1 project, experience, or education",
      ok: projects.length > 0 || experience.length > 0 || education.length > 0,
    },
  ];

  const allPassed = checks.every((c) => c.ok);

  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#6E44FF", "#10B981", "#FF5722", "#F59E0B"],
    });
  };

  const handlePublish = async () => {
    setPublishing(true);
    try {
      setValue("visibility", "public", { shouldDirty: true });
      await onPublishSuccess();
      setPublished(true);
      triggerConfetti();
      showToast({ message: "Your portfolio is live! Flex it." });
    } catch (err: any) {
      showToast({ message: err?.message || "Failed to publish.", type: "error" });
    } finally {
      setPublishing(false);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(publicUrl);
    showToast({ message: "Public link copied to clipboard!" });
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <span className="text-xs font-semibold uppercase tracking-wider text-[#6E44FF]">
          Step 09 · Launch
        </span>
        <h2 className="font-display text-2xl font-bold text-slate-900 mt-1">
          Publish & Share
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Review your checklist and push your profile to the live web.
        </p>
      </div>

      {/* Pre-flight checklist card */}
      <div className="p-5 border border-slate-200/90 rounded-2xl bg-slate-50/60 flex flex-col gap-3">
        <span className="text-xs font-semibold text-slate-700">
          Pre-flight Quality Checklist
        </span>
        <div className="space-y-2">
          {checks.map((chk, i) => (
            <div key={i} className="flex items-center gap-2.5 text-xs">
              {chk.ok ? (
                <CheckCircle size={17} weight="fill" className="text-emerald-500 shrink-0" />
              ) : (
                <WarningCircle size={17} weight="fill" className="text-rose-500 shrink-0" />
              )}
              <span className={chk.ok ? "text-slate-700 font-medium" : "text-rose-600 font-medium"}>
                {chk.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* SEO Settings */}
      <div className="flex flex-col gap-3 pt-2">
        <span className="text-xs font-semibold text-slate-700">
          SEO & Social Preview
        </span>
        <Input
          label="Custom Page Title (Optional)"
          placeholder={`${name || "Developer"} · Portfolio & Resume`}
          {...register("seo.title")}
        />
        <Input
          label="Meta Description (Optional)"
          placeholder={`Explore ${name || "this"}'s career, projects, and contact info.`}
          {...register("seo.description")}
        />
      </div>

      {/* Visibility Radio */}
      <div className="flex flex-col gap-2 pt-2">
        <span className="text-xs font-semibold text-slate-700">
          Visibility Mode
        </span>
        <div className="grid grid-cols-3 gap-2 p-1 bg-slate-100 rounded-xl">
          {(["public", "unlisted", "draft"] as const).map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => setValue("visibility", v, { shouldDirty: true })}
              className={`py-2 rounded-lg text-xs font-semibold capitalize transition-all ${
                visibility === v
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      {/* Big Publish CTA */}
      <Button
        type="button"
        size="lg"
        variant="primary"
        loading={publishing}
        disabled={!allPassed}
        onClick={handlePublish}
        className="w-full mt-2"
      >
        {published ? "Update Live Profile →" : "Publish to cv.decslab.in →"}
      </Button>

      {/* Success Drawer */}
      {published && (
        <div className="p-6 border border-emerald-200 rounded-2xl bg-emerald-50/50 flex flex-col gap-4 animate-in fade-in duration-200">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-800">
              Your link is live!
            </span>
            <div className="text-sm font-bold text-[#6E44FF] break-all mt-1 font-mono">
              {publicUrl}
            </div>
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            <Button
              type="button"
              size="sm"
              variant="secondary"
              onClick={handleCopyLink}
              icon={<Copy size={15} weight="bold" />}
            >
              Copy Link
            </Button>

            <a
              href={`https://wa.me/?text=${encodeURIComponent(`Check out my resume & portfolio at ${publicUrl}`)}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-700 shadow-sm hover:bg-slate-50 transition-colors"
            >
              <WhatsappLogo size={16} weight="bold" className="text-emerald-600" />
              <span>WhatsApp</span>
            </a>

            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(publicUrl)}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-700 shadow-sm hover:bg-slate-50 transition-colors"
            >
              <LinkedinLogo size={16} weight="bold" className="text-blue-600" />
              <span>LinkedIn</span>
            </a>

            <a
              href={`/${username}/resume`}
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-700 shadow-sm hover:bg-slate-50 transition-colors"
            >
              <DownloadSimple size={16} weight="bold" className="text-[#FF5722]" />
              <span>PDF Resume</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
