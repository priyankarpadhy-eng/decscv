"use client";

import React from "react";
import Link from "next/link";
import { DownloadSimple, CheckSquare, Lightning } from "@phosphor-icons/react";

export function HowItWorksSection() {
  const steps = [
    {
      num: "01",
      title: "Fill once",
      desc: "Enter your background, projects, education, and links in one guided form.",
      badge: "Guided form",
      color: "bg-purple-50 text-[#6E44FF]",
    },
    {
      num: "02",
      title: "Choose style",
      desc: "Switch between 8 portfolio styles with live preview and custom font sizing.",
      badge: "Live preview",
      color: "bg-emerald-50 text-[#10B981]",
    },
    {
      num: "03",
      title: "Share link or PDF",
      desc: "Get a live public web link and export an ATS-compliant A4 PDF resume anytime.",
      badge: "One click",
      color: "bg-orange-50 text-[#FF5722]",
    },
  ];

  return (
    <section className="py-20 sm:py-24 bg-slate-50 border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col gap-12">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#6E44FF]">
            Workflow
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-1">
            How DecsCV works
          </h2>
          <p className="text-sm text-slate-500 mt-2 leading-relaxed">
            Eliminates repetitive resume editing and brittle website templates.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((s, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-8 rounded-2xl border border-slate-200/90 bg-white shadow-card hover:shadow-hover transition-all flex flex-col justify-between min-h-[260px]"
            >
              <div>
                <div className="flex justify-between items-center mb-5">
                  <span className={`w-11 h-11 rounded-xl flex items-center justify-center font-mono text-lg font-bold ${s.color}`}>
                    {s.num}
                  </span>
                  <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200/80">
                    {s.badge}
                  </span>
                </div>
                <h3 className="font-display text-xl font-bold text-slate-900 mb-1.5">{s.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{s.desc}</p>
              </div>

              <div className="pt-5 border-t border-slate-100 flex items-center gap-1.5 text-xs text-[#6E44FF] font-semibold">
                <Lightning size={15} weight="fill" />
                <span>Synchronized in realtime</span>
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
    <section className="py-20 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
      {/* Left Feature Description */}
      <div className="lg:col-span-6 flex flex-col gap-6">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#FF5722]">
          Standardized output
        </span>
        <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
          A4 placement resume for campus & off-campus drives
        </h2>
        <p className="text-base text-slate-600 leading-relaxed">
          Need a standard document for recruitment drives, company portals, or ATS parsers? Switch from portfolio to resume mode with one click.
        </p>

        <ul className="space-y-3 text-xs text-slate-700 font-medium">
          <li className="flex items-center gap-2.5">
            <CheckSquare size={17} weight="fill" className="text-emerald-500 shrink-0" />
            <span>Selectable text — 100% ATS parser compliant</span>
          </li>
          <li className="flex items-center gap-2.5">
            <CheckSquare size={17} weight="fill" className="text-emerald-500 shrink-0" />
            <span>Support for CGPA, percentages, projects, and societies</span>
          </li>
          <li className="flex items-center gap-2.5">
            <CheckSquare size={17} weight="fill" className="text-emerald-500 shrink-0" />
            <span>Single-page A4 layout with print-tested typography</span>
          </li>
        </ul>

        <div className="pt-1">
          <Link
            href="/editor"
            className="inline-flex items-center gap-2 text-xs font-semibold px-6 py-3 rounded-xl bg-slate-900 text-white shadow-2xs hover:bg-[#6E44FF] transition-colors"
          >
            <DownloadSimple size={16} weight="bold" />
            <span>Open builder & download PDF</span>
          </Link>
        </div>
      </div>

      {/* Right Mockup Paper Sheet */}
      <div className="lg:col-span-6 flex justify-center">
        <div className="relative w-full max-w-md p-5 sm:p-6 bg-slate-50 border border-slate-200/90 rounded-2xl shadow-card">
          <div className="bg-white border border-slate-200/90 rounded-xl p-5 sm:p-6 shadow-2xs flex flex-col gap-3.5 text-xs font-serif text-slate-900">
            <div className="border-b border-slate-200 pb-2.5 text-center">
              <h4 className="text-lg sm:text-xl font-bold font-display text-slate-900">Full Name</h4>
              <p className="text-[11px] text-slate-500 font-sans mt-0.5">
                Software Engineer · candidate@example.com · Bengaluru, India
              </p>
            </div>
            <div>
              <span className="font-sans font-bold text-[10px] uppercase tracking-wider text-slate-400 block border-b border-slate-100 pb-0.5 mb-1">
                Education
              </span>
              <div className="flex justify-between font-sans text-[11px]">
                <span className="font-semibold text-slate-800">Bachelor of Technology · Computer Science</span>
                <span className="text-slate-500">CGPA: 8.9 / 10</span>
              </div>
            </div>
            <div>
              <span className="font-sans font-bold text-[10px] uppercase tracking-wider text-slate-400 block border-b border-slate-100 pb-0.5 mb-1">
                Experience
              </span>
              <div className="font-sans text-[11px]">
                <div className="font-semibold text-slate-800">Software Engineering Intern</div>
                <div className="text-[10px] text-slate-600">• Engineered backend microservices and optimized database queries.</div>
              </div>
            </div>
            <div>
              <span className="font-sans font-bold text-[10px] uppercase tracking-wider text-slate-400 block border-b border-slate-100 pb-0.5 mb-1">
                Skills
              </span>
              <p className="font-sans text-[10px] text-slate-600">
                TypeScript · Python · PostgreSQL · Docker · Git · Linux
              </p>
            </div>
          </div>
          <div className="absolute -top-3 -right-3 bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-2xs">
            ATS-Safe Format
          </div>
        </div>
      </div>
    </section>
  );
}
