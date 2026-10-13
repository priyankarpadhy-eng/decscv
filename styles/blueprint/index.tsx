"use client";

import React from "react";
import Image from "next/image";
import { Profile } from "@/lib/types";

export default function BlueprintStyle({ profile }: { profile: Profile }) {
  const accent = profile.portfolio.accent || "#FFD166";

  return (
    <div
      className="min-h-screen bg-[#0D3B66] text-[#F4F9FF] font-mono p-6 sm:p-12 relative selection:bg-[#FFD166] selection:text-black overflow-x-hidden"
      style={
        {
          "--accent": accent,
          "--font-display": "var(--font-syne)",
          "--font-body": "var(--font-ibm-plex)",
          backgroundImage: `
            linear-gradient(to right, rgba(191, 227, 255, 0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(191, 227, 255, 0.08) 1px, transparent 1px),
            linear-gradient(to right, rgba(191, 227, 255, 0.2) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(191, 227, 255, 0.2) 1px, transparent 1px)
          `,
          backgroundSize: "20px 20px, 20px 20px, 100px 100px, 100px 100px",
        } as React.CSSProperties
      }
    >
      {/* Outer Technical Frame & Registration Marks */}
      <div className="max-w-6xl mx-auto border-2 border-[#BFE3FF]/40 p-6 sm:p-10 relative flex flex-col gap-16">
        {/* Corner registration marks */}
        <div className="absolute -top-3 -left-3 text-xs text-[#BFE3FF]/70 font-mono">✛ REG-01</div>
        <div className="absolute -top-3 -right-3 text-xs text-[#BFE3FF]/70 font-mono">✛ REG-02</div>
        <div className="absolute -bottom-3 -left-3 text-xs text-[#BFE3FF]/70 font-mono">✛ REG-03</div>
        <div className="absolute -bottom-3 -right-3 text-xs text-[#BFE3FF]/70 font-mono">✛ REG-04</div>

        {/* Section Cut Line A-A */}
        <div className="flex items-center gap-4 text-xs text-[#FFD166] font-mono tracking-widest border-b border-dashed border-[#BFE3FF]/40 pb-3">
          <span>SECTION A — A</span>
          <div className="flex-1 border-t border-dashed border-[#BFE3FF]/30" />
          <span>PROJECT ARCHIVE SHEET 01 / 05</span>
        </div>

        {/* Hero with Architectural Dimension Lines */}
        <section className="flex flex-col md:flex-row justify-between items-start gap-8">
          <div className="flex flex-col gap-4 max-w-2xl">
            <span className="text-xs text-[#FFD166] uppercase tracking-widest">
              [ SPECIFICATION SPEC-2026 // PRINCIPAL ]
            </span>
            <h1 className="font-display text-4xl sm:text-6xl font-extrabold uppercase tracking-tight text-white leading-tight">
              {profile.basics.name}
            </h1>
            <p className="text-base sm:text-lg text-[#BFE3FF] leading-relaxed border-l-2 border-[#FFD166] pl-4">
              {profile.basics.headline}
            </p>
            {profile.summary && (
              <p className="text-sm text-white/80 leading-relaxed mt-2">{profile.summary}</p>
            )}
          </div>

          {/* Photo with dimension calipers */}
          {profile.basics.photo && (
            <div className="relative p-4 border border-[#BFE3FF]/50 bg-[#0A2E50]/60 shrink-0">
              <span className="absolute -top-3 left-4 bg-[#0D3B66] px-1 text-[10px] text-[#FFD166]">
                WIDTH: 200mm
              </span>
              <div className="relative w-40 h-40 overflow-hidden border border-[#BFE3FF]">
                <Image
                  src={profile.basics.photo.url}
                  alt={profile.basics.name}
                  fill
                  className="object-cover"
                />
              </div>
              <span className="absolute -bottom-3 right-4 bg-[#0D3B66] px-1 text-[10px] text-[#FFD166]">
                HEIGHT: 200mm
              </span>
            </div>
          )}
        </section>

        {/* Section Cut Line B-B */}
        <div className="flex items-center gap-4 text-xs text-[#FFD166] font-mono tracking-widest border-b border-dashed border-[#BFE3FF]/40 pb-2">
          <span>SECTION B — B</span>
          <div className="flex-1 border-t border-dashed border-[#BFE3FF]/30" />
          <span>STRUCTURAL DRAWINGS & DELIVERABLES</span>
        </div>

        {/* Technical Drawings (Projects) */}
        <section className="flex flex-col gap-6">
          <h2 className="text-xs uppercase tracking-widest text-[#FFD166]">
            [ SCHEDULE OF FABRICATED WORKS ]
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {profile.projects.map((proj, idx) => (
              <div
                key={proj.id}
                className="border border-[#BFE3FF]/40 bg-[#0A2E50]/40 p-5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-baseline mb-2 text-xs text-[#FFD166]">
                    <span className="font-bold">DWG NO. 0{idx + 1}</span>
                    <span>REV 1.0</span>
                  </div>
                  <h3 className="font-display text-xl font-bold text-white mb-2">{proj.title}</h3>
                  <p className="text-xs text-[#BFE3FF] leading-relaxed mb-4">{proj.desc}</p>
                </div>
                <div className="pt-3 border-t border-[#BFE3FF]/20 flex justify-between items-center text-[11px]">
                  <span className="text-white/60">{proj.tech.join(" · ")}</span>
                  {proj.url && (
                    <a
                      href={proj.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#FFD166] underline font-bold"
                    >
                      VIEW CAD ↗
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Skills Legend Table */}
        <section className="flex flex-col gap-4">
          <h2 className="text-xs uppercase tracking-widest text-[#FFD166]">
            [ COMPONENT SCHEDULE / SKILLS LEGEND ]
          </h2>
          <div className="border border-[#BFE3FF]/40 overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[#BFE3FF]/40 bg-[#0A2E50] text-[#FFD166]">
                  <th className="p-2.5 border-r border-[#BFE3FF]/40">TAG</th>
                  <th className="p-2.5 border-r border-[#BFE3FF]/40">DISCIPLINE / MODULE</th>
                  <th className="p-2.5 border-r border-[#BFE3FF]/40">GRADE</th>
                  <th className="p-2.5">CLASSIFICATION</th>
                </tr>
              </thead>
              <tbody>
                {profile.skills.map((sk, idx) => (
                  <tr key={sk.id} className="border-b border-[#BFE3FF]/20 hover:bg-[#0A2E50]/60">
                    <td className="p-2 border-r border-[#BFE3FF]/40 text-[#FFD166]">SK-0{idx + 1}</td>
                    <td className="p-2 border-r border-[#BFE3FF]/40 font-bold text-white">{sk.name}</td>
                    <td className="p-2 border-r border-[#BFE3FF]/40">LVL {sk.level || 4}/5</td>
                    <td className="p-2 text-[#BFE3FF]">{sk.group || "Core Competency"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Career Positions */}
        {profile.experience.length > 0 && (
          <section className="flex flex-col gap-4">
            <h2 className="text-xs uppercase tracking-widest text-[#FFD166]">
              [ PROFESSIONAL EXPERIENCE LOG ]
            </h2>
            <div className="space-y-4">
              {profile.experience.map((e) => (
                <div key={e.id} className="border-l-2 border-[#FFD166] pl-4 text-xs">
                  <div className="text-sm font-bold text-white">
                    {e.role} — <span className="text-[#FFD166]">{e.company}</span>
                  </div>
                  <div className="text-white/60 mb-2">{e.start} – {e.current ? "ACTIVE" : e.end}</div>
                  <ul className="list-disc list-inside space-y-1 text-[#BFE3FF]">
                    {e.bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Technical Title Block in bottom-right */}
        <div className="self-end w-full sm:w-96 border-2 border-[#BFE3FF] bg-[#0A2E50] p-4 text-xs flex flex-col gap-2">
          <div className="flex justify-between border-b border-[#BFE3FF]/40 pb-1 font-bold text-[#FFD166]">
            <span>PROJECT: DECSCV RESUME PORTFOLIO</span>
            <span>REV: 2.4</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-[11px] text-[#BFE3FF]">
            <div>
              <span className="block text-white/50">DRAWN BY:</span>
              <span className="font-bold text-white">{profile.basics.name}</span>
            </div>
            <div>
              <span className="block text-white/50">LOCATION:</span>
              <span>{profile.basics.location || "INDIA"}</span>
            </div>
            <div>
              <span className="block text-white/50">SCALE:</span>
              <span>1:1 TRUE</span>
            </div>
            <div>
              <span className="block text-white/50">CONTACT:</span>
              <span className="truncate block">{profile.basics.email}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
