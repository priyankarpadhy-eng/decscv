"use client";

import React from "react";
import Link from "next/link";
import { DownloadSimple, CheckSquare, Lightning } from "@phosphor-icons/react";

export function HowItWorksSection() {
  const steps = [
    {
      num: "01",
      title: "Fill once",
      desc: "Fill in your background, projects, college achievements, and links. No repetitive re-typing ever.",
      badge: "GUIDED FORM",
      color: "bg-purple-50 text-[#6E44FF]",
    },
    {
      num: "02",
      title: "Pick your vibe",
      desc: "Switch between Noir, Paper, Terminal, Bento, and 4 other engines in 1 click. Customize colors and font scales.",
      badge: "LIVE PREVIEW",
      color: "bg-emerald-50 text-[#10B981]",
    },
    {
      num: "03",
      title: "Flex your link",
      desc: "Get an auto-assigned public URL (cv.decslab.in/yourname) plus clean A4 PDF export for campus placements.",
      badge: "ONE CLICK",
      color: "bg-orange-50 text-[#FF5722]",
    },
  ];

  return (
    <section className="py-24 bg-slate-50 border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-6 flex flex-col gap-12">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#6E44FF]">
            SIMPLE WORKFLOW
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mt-1">
            How DecsCV Works
          </h2>
          <p className="text-sm text-slate-500 mt-2 leading-relaxed">
            Built from scratch to eliminate tedious resume rebuilding and brittle website templates.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((s, idx) => (
            <div
              key={idx}
              className="p-8 rounded-2xl border border-slate-200/90 bg-white shadow-card hover:shadow-hover transition-all flex flex-col justify-between min-h-[290px]"
            >
              <div>
                <div className="flex justify-between items-center mb-6">
                  <span className={`w-12 h-12 rounded-xl flex items-center justify-center font-mono text-xl font-bold ${s.color}`}>
                    {s.num}
                  </span>
                  <span className="text-[10px] font-semibold uppercase px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600">
                    {s.badge}
                  </span>
                </div>
                <h3 className="font-display text-2xl font-bold text-slate-900 mb-2">{s.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{s.desc}</p>
              </div>

              <div className="pt-6 border-t border-slate-100 flex items-center gap-1.5 text-xs text-[#6E44FF] font-semibold">
                <Lightning size={16} weight="fill" />
                <span>Zero configuration required</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ResumeFeatureSection() {
  return (
    <section className="py-24 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
      {/* Left Feature Description */}
      <div className="lg:col-span-6 flex flex-col gap-6">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#FF5722]">
          PLACEMENT READY
        </span>
        <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Corporate & Campus Placement A4 Resume
        </h2>
        <p className="text-base text-slate-600 leading-relaxed">
          Need a standard document for Indian corporate recruiters, campus placement portals, or ATS parsers? Switch from portfolio to resume mode with one tap.
        </p>

        <ul className="space-y-3 text-xs text-slate-700 font-medium">
          <li className="flex items-center gap-2.5">
            <CheckSquare size={18} weight="fill" className="text-emerald-500 shrink-0" />
            <span>Real selectable text — 100% ATS parser compliant</span>
          </li>
          <li className="flex items-center gap-2.5">
            <CheckSquare size={18} weight="fill" className="text-emerald-500 shrink-0" />
            <span>Built-in Indian context: CGPA, 10th/12th percentages, college societies</span>
          </li>
          <li className="flex items-center gap-2.5">
            <CheckSquare size={18} weight="fill" className="text-emerald-500 shrink-0" />
            <span>One-page dense layout options with customizable font scale</span>
          </li>
        </ul>

        <div className="pt-2">
          <Link
            href="/editor"
            className="inline-flex items-center gap-2 text-xs font-semibold px-6 py-3.5 rounded-xl bg-slate-900 text-white shadow-sm hover:bg-[#6E44FF] transition-colors"
          >
            <DownloadSimple size={16} weight="bold" />
            <span>Create & Download PDF</span>
          </Link>
        </div>
      </div>

      {/* Right Mockup Paper Sheet */}
      <div className="lg:col-span-6 flex justify-center">
        <div className="relative w-full max-w-md p-6 bg-slate-50 border border-slate-200/90 rounded-2xl shadow-card">
          <div className="bg-white border border-slate-200/90 rounded-xl p-6 shadow-sm flex flex-col gap-4 text-xs font-serif text-slate-900">
            <div className="border-b border-slate-200 pb-2.5 text-center">
              <h4 className="text-xl font-bold font-display text-slate-900">Rohit Verma</h4>
              <p className="text-[11px] text-slate-500 font-sans mt-0.5">
                IIIT Hyderabad &apos;25 · rohit.verma@example.com · +91 98765 43210
              </p>
            </div>
            <div>
              <span className="font-sans font-bold text-[10px] uppercase tracking-wider text-slate-400 block border-b border-slate-100 pb-0.5 mb-1">
                EDUCATION
              </span>
              <div className="flex justify-between font-sans text-[11px]">
                <span className="font-semibold text-slate-800">IIIT Hyderabad</span>
                <span className="text-slate-500">CGPA: 9.2 / 10</span>
              </div>
            </div>
            <div>
              <span className="font-sans font-bold text-[10px] uppercase tracking-wider text-slate-400 block border-b border-slate-100 pb-0.5 mb-1">
                EXPERIENCE
              </span>
              <div className="font-sans text-[11px]">
                <div className="font-semibold text-slate-800">Software Engineering Intern — Razorpay</div>
                <div className="text-[10px] text-slate-600">• Optimized merchant webhook queue with Redis Streams (-42% latency).</div>
              </div>
            </div>
            <div>
              <span className="font-sans font-bold text-[10px] uppercase tracking-wider text-slate-400 block border-b border-slate-100 pb-0.5 mb-1">
                TECHNICAL SKILLS
              </span>
              <p className="font-sans text-[10px] text-slate-600">
                Go · Rust · TypeScript · PostgreSQL · Redis · Docker · Linux
              </p>
            </div>
          </div>
          <div className="absolute -top-3 -right-3 bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold px-3 py-1 rounded-full shadow-sm">
            ATS 100% SAFE
          </div>
        </div>
      </div>
    </section>
  );
}
