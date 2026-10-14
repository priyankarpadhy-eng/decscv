"use client";

import React, { useState, useEffect } from "react";
import { notFound } from "next/navigation";
import { SAMPLE_PROFILES } from "@/seed/sample-profiles";
import { Profile } from "@/lib/types";
import { ResumeView } from "@/resume/ResumeView";
import { Printer, Copy, ArrowLeft } from "@phosphor-icons/react";

import { db } from "@/lib/firebase/client";
import { doc, getDoc } from "firebase/firestore";

export default function PublicResumePage({ params }: { params: { username: string } }) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProfile() {
      const clean = params.username.toLowerCase().trim();

      // 1. Try Firestore
      if (db) {
        try {
          const snap = await getDoc(doc(db, "profiles", clean));
          if (snap.exists()) {
            setProfile(snap.data() as Profile);
            setLoading(false);
            return;
          }
        } catch (err) {
          console.warn("Error fetching resume profile:", err);
        }
      }

      // 2. Check sample demo profiles
      for (const key of Object.keys(SAMPLE_PROFILES)) {
        if (SAMPLE_PROFILES[key].username.toLowerCase() === clean) {
          setProfile(SAMPLE_PROFILES[key]);
          setLoading(false);
          return;
        }
      }

      setLoading(false);
    }

    loadProfile();
  }, [params.username]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-6 h-6 border-2 border-slate-300 border-t-[#6E44FF] rounded-full animate-spin" />
      </div>
    );
  }

  if (!profile) {
    notFound();
  }

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
