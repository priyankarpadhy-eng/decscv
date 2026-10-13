"use client";

import React, { useState } from "react";
import Link from "next/link";
import { SAMPLE_PROFILES } from "@/seed/sample-profiles";
import { ArrowUpRight, CaretDown, CaretUp } from "@phosphor-icons/react";

export function ExamplesWall() {
  const profileKeys = ["noir", "bento", "paper", "brutal", "arcade", "blueprint"];

  return (
    <section className="py-24 max-w-7xl mx-auto px-6 flex flex-col gap-12">
      <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4 border-b border-slate-200 pb-6">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#6E44FF]">
            COMMUNITY & EXAMPLES
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mt-1">
            Built by Indian Grads
          </h2>
        </div>
        <span className="text-sm text-slate-500">
          Sample profiles across tech, design, economics & civil engineering
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {profileKeys.map((key) => {
          const p = SAMPLE_PROFILES[key];
          return (
            <Link
              key={key}
              href={`/demo/${key}`}
              className="p-6 border border-slate-200/90 rounded-2xl bg-white shadow-card hover:-translate-y-1 hover:shadow-hover transition-all duration-200 flex flex-col justify-between min-h-[220px] group"
            >
              <div>
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-display text-lg font-bold text-slate-900 group-hover:text-[#6E44FF] transition-colors">
                      {p.basics.name}
                    </h3>
                    <span className="text-xs text-slate-400 font-mono">
                      @{p.username}
                    </span>
                  </div>
                  <span className="text-[10px] font-semibold uppercase px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200/70">
                    {p.portfolio.style}
                  </span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                  {p.basics.headline}
                </p>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-slate-100 text-xs font-medium text-slate-700">
                <span>{p.projects.length} Projects · {p.skills.length} Skills</span>
                <span className="inline-flex items-center gap-1 text-[#6E44FF] font-semibold group-hover:translate-x-1 transition-transform">
                  View Demo <ArrowUpRight size={14} weight="bold" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: "Is DecsCV completely free to use?",
      a: "Yes. Creating an account, designing your portfolio, choosing from all 8 visual engines, claiming your public link (cv.decslab.in/yourname), and exporting ATS-compliant A4 resume PDFs is 100% free.",
    },
    {
      q: "Will I lose my data if I switch styles or from portfolio to resume?",
      a: "Never. Your career information lives in a single unified profile schema. You can switch between Noir, Paper, Terminal, Bento, and A4 resume mode at any time without re-typing anything.",
    },
    {
      q: "Can I use my own custom domain?",
      a: "By default, every profile receives a free public link at cv.decslab.in/{username}. Custom domain routing can be easily mapped on your own Vercel or Cloudflare DNS.",
    },
    {
      q: "Does the resume PDF pass ATS scanners in campus placements?",
      a: "Yes. Our A4 resume engine produces selectable text with standard semantic sections and zero hidden graphics, ensuring high ATS parsing accuracy.",
    },
    {
      q: "Can I delete or export my account data?",
      a: "Yes. From your Settings dashboard, you can export your entire profile as clean JSON or permanently delete your account, Firestore documents, and Storage assets in one click.",
    },
  ];

  return (
    <section className="py-24 bg-white border-t border-slate-200/80">
      <div className="max-w-4xl mx-auto px-6 flex flex-col gap-10">
        <div className="text-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#6E44FF]">
            FREQUENTLY ASKED
          </span>
          <h2 className="font-display text-4xl font-extrabold text-slate-900 tracking-tight mt-1">
            Questions & Answers
          </h2>
        </div>

        <div className="space-y-3.5">
          {faqs.map((f, i) => {
            const isOpen = openIdx === i;
            return (
              <div
                key={i}
                className="border border-slate-200/90 rounded-2xl bg-slate-50/60 overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : i)}
                  className="w-full p-5 flex items-center justify-between text-left font-display text-base font-bold text-slate-900 select-none hover:bg-slate-50"
                >
                  <span>{f.q}</span>
                  {isOpen ? <CaretUp size={18} weight="bold" /> : <CaretDown size={18} weight="bold" />}
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-sm text-slate-600 leading-relaxed font-sans border-t border-slate-200/60 pt-3">
                    {f.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-6">
        <div className="flex flex-col gap-1 text-center sm:text-left">
          <span className="font-display text-base font-bold tracking-tight text-slate-900">
            decs/cv
          </span>
          <span className="text-xs text-slate-500 font-sans">
            One form → resume or portfolio website.
          </span>
        </div>

        <div className="flex items-center gap-6 text-xs text-slate-500 font-medium">
          <Link href="/login" className="hover:text-slate-900 transition-colors">
            Log in
          </Link>
          <Link href="/editor" className="hover:text-slate-900 transition-colors">
            Editor
          </Link>
          <a
            href="https://decslab.in"
            target="_blank"
            rel="noreferrer"
            className="hover:text-[#6E44FF] font-semibold transition-colors"
          >
            Built by Clawcode
          </a>
        </div>
      </div>
    </footer>
  );
}
