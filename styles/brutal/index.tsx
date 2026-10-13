"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Profile } from "@/lib/types";
import { ArrowUpRight, Sparkle, CheckCircle, Envelope } from "@phosphor-icons/react";

export default function BrutalStyle({ profile }: { profile: Profile }) {
  const accent = profile.portfolio.accent || "#FFE600";

  return (
    <div
      className="min-h-screen bg-[#FFFDF7] text-slate-950 font-sans selection:bg-[#FFE600] selection:text-black p-4 sm:p-10 lg:p-14 overflow-x-hidden"
      style={
        {
          "--accent": accent,
          "--font-display": "var(--font-archivo)",
          "--font-body": "var(--font-sans)",
        } as React.CSSProperties
      }
    >
      <div className="max-w-5xl mx-auto flex flex-col gap-10 sm:gap-14 relative">
        {/* Top Minimal Tape */}
        <header className="border-2 border-black bg-white rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3 shadow-[4px_4px_0_#000]">
          <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider">
            <span className="w-3 h-3 rounded-full bg-[#FFE600] border border-black inline-block" />
            <span>cv.decslab.in/{profile.username}</span>
          </div>
          {profile.basics.availableForWork && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border-2 border-black bg-[#E6F7F0] text-emerald-900 font-mono text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
              <span>AVAILABLE FOR HIRE</span>
            </div>
          )}
        </header>

        {/* Hero Section */}
        <section className="border-2 border-black bg-white rounded-3xl p-6 sm:p-10 shadow-[6px_6px_0_#000] flex flex-col gap-6 relative overflow-hidden">
          {/* Decorative badge */}
          <div className="inline-flex items-center gap-1.5 border-2 border-black bg-[#FFE600] px-3.5 py-1 rounded-xl font-mono text-xs font-black uppercase w-max shadow-[2px_2px_0_#000]">
            <Sparkle size={14} weight="fill" />
            <span>FULL-STACK BUILDER</span>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-start gap-6">
            <div className="flex flex-col gap-3 max-w-2xl">
              <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight leading-[1.0] text-black">
                {profile.basics.name}
              </h1>
              <p className="text-lg sm:text-2xl font-bold text-slate-800 leading-snug">
                {profile.basics.headline}
              </p>
              {profile.summary && (
                <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed mt-2">
                  {profile.summary}
                </p>
              )}
            </div>

            {profile.basics.photo?.url && (
              <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden border-2 border-black shadow-[4px_4px_0_#000] shrink-0">
                <Image
                  src={profile.basics.photo.url}
                  alt={profile.basics.name}
                  fill
                  className="object-cover"
                />
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-4 border-t-2 border-black/10">
            {profile.basics.email && (
              <a
                href={`mailto:${profile.basics.email}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 border-black bg-[#6E44FF] text-white font-mono text-xs font-bold hover:bg-[#5E34E8] shadow-[3px_3px_0_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all"
              >
                <Envelope size={16} weight="bold" />
                <span>LET&apos;S TALK</span>
              </a>
            )}
            {profile.basics.links.map((link, idx) => (
              <a
                key={idx}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border-2 border-black bg-white hover:bg-slate-50 text-black font-mono text-xs font-bold shadow-[3px_3px_0_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all"
              >
                <span>{link.label}</span>
                <ArrowUpRight size={14} weight="bold" />
              </a>
            ))}
          </div>
        </section>

        {/* Ticker / Skills Banner */}
        <div className="overflow-hidden border-2 border-black bg-[#FFE600] py-3 rounded-2xl shadow-[4px_4px_0_#000]">
          <div className="flex gap-8 whitespace-nowrap font-mono font-bold text-xs uppercase tracking-widest px-4">
            {profile.skills.concat(profile.skills).map((sk, i) => (
              <span key={i} className="flex items-center gap-2">
                <span>★</span>
                <span>{sk.name}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Projects Section */}
        <section className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h2 className="border-2 border-black bg-[#00D1FF] text-black font-display text-xl sm:text-2xl font-black px-4 py-1.5 rounded-xl uppercase shadow-[3px_3px_0_#000]">
              SELECTED PROJECTS
            </h2>
            <span className="font-mono text-xs text-slate-500 font-bold">
              [{profile.projects.length} BUILDS]
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {profile.projects.map((proj, idx) => (
              <div
                key={proj.id}
                className="border-2 border-black bg-white rounded-3xl p-6 shadow-[5px_5px_0_#000] hover:-translate-y-1 hover:shadow-[7px_7px_0_#000] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-3 gap-2">
                    <div>
                      <span className="font-mono text-[11px] font-bold text-slate-400 block mb-1">
                        0{idx + 1} // REPO
                      </span>
                      <h3 className="font-display text-2xl font-black uppercase text-black">
                        {proj.title}
                      </h3>
                    </div>
                    {proj.url && (
                      <a
                        href={proj.url}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 border-2 border-black bg-[#FFE600] rounded-xl hover:bg-black hover:text-white transition-colors shrink-0 shadow-[2px_2px_0_#000]"
                      >
                        <ArrowUpRight size={18} weight="bold" />
                      </a>
                    )}
                  </div>
                  <p className="text-sm font-normal text-slate-700 leading-relaxed mb-4">
                    {proj.desc}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-4 border-t-2 border-black/10">
                  {proj.tech.map((t, i) => (
                    <span
                      key={i}
                      className="border-2 border-black bg-[#FFFDF7] px-2.5 py-0.5 rounded-lg text-xs font-mono font-bold text-slate-800"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Experience Section */}
        {profile.experience.length > 0 && (
          <section className="flex flex-col gap-6">
            <h2 className="border-2 border-black bg-[#FF5CAA] text-black font-display text-xl sm:text-2xl font-black px-4 py-1.5 rounded-xl uppercase shadow-[3px_3px_0_#000] w-max">
              EXPERIENCE
            </h2>
            <div className="space-y-5">
              {profile.experience.map((exp) => (
                <div
                  key={exp.id}
                  className="border-2 border-black bg-white rounded-3xl p-6 shadow-[5px_5px_0_#000]"
                >
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 mb-3">
                    <h4 className="font-display text-xl font-black uppercase text-black">
                      {exp.role} <span className="font-normal text-slate-600">@ {exp.company}</span>
                    </h4>
                    <span className="font-mono text-xs font-bold border-2 border-black bg-[#E6F7F0] text-emerald-900 px-3 py-1 rounded-full w-max">
                      {exp.start} — {exp.current ? "PRESENT" : exp.end}
                    </span>
                  </div>
                  <ul className="list-disc list-outside ml-4 space-y-1.5 text-sm text-slate-700 font-normal leading-relaxed">
                    {exp.bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Footer */}
        <footer className="border-2 border-black bg-black text-white rounded-3xl p-8 shadow-[6px_6px_0_#000] flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="flex flex-col gap-1 text-center sm:text-left">
            <span className="font-display text-2xl font-black uppercase text-[#FFE600]">
              WORK WITH {profile.basics.name.split(" ")[0]}
            </span>
            <span className="font-mono text-xs text-white/70">{profile.basics.email}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {profile.basics.links.map((link, idx) => (
              <a
                key={idx}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="border-2 border-black bg-white text-black font-mono font-bold px-3 py-1.5 rounded-xl text-xs uppercase hover:bg-[#FFE600] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </footer>
      </div>
    </div>
  );
}
