"use client";

import React, { useState, useEffect } from "react";
import { notFound } from "next/navigation";
import { SAMPLE_PROFILES } from "@/seed/sample-profiles";
import { Profile } from "@/lib/types";
import { ResumeView } from "@/resume/ResumeView";
import { Printer, Copy, ArrowLeft } from "@phosphor-icons/react";

export default function PublicResumePage({ params }: { params: { username: string } }) {
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    const clean = params.username.toLowerCase().trim();
    for (const key of Object.keys(SAMPLE_PROFILES)) {
      if (SAMPLE_PROFILES[key].username.toLowerCase() === clean) {
        setProfile(SAMPLE_PROFILES[key]);
        return;
      }
    }
    // Fallback to sample profile with this username
    const sample = SAMPLE_PROFILES.noir;
    setProfile({
      ...sample,
      username: clean,
    });
  }, [params.username]);

  if (!profile) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Resume link copied to clipboard!");
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 sm:py-12 print:bg-white print:p-0">
      {/* Floating Toolbar (hidden in print) */}
      <div className="no-print max-w-[210mm] mx-auto px-4 mb-6 flex justify-between items-center select-none">
        <a
          href={`/${profile.username}`}
          className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-gray-700 hover:text-black uppercase"
        >
          <ArrowLeft size={16} weight="bold" />
          <span>View Interactive Portfolio</span>
        </a>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-300 rounded font-mono text-xs font-semibold text-gray-700 hover:bg-gray-50 shadow-sm"
          >
            <Copy size={16} />
            <span>Copy Link</span>
          </button>
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-black text-white rounded font-mono text-xs font-bold uppercase shadow-sm hover:bg-gray-800"
          >
            <Printer size={16} />
            <span>Print / Save PDF</span>
          </button>
        </div>
      </div>

      {/* Printable Sheet */}
      <div className="print-page">
        <ResumeView profile={profile} />
      </div>
    </div>
  );
}
