"use client";

import React from "react";
import Image from "next/image";
import { Profile } from "@/lib/types";
import { parseMarkdownLite } from "@/lib/sanitize";

export default function PaperStyle({ profile }: { profile: Profile }) {
  const accent = profile.portfolio.accent || "#C2410C";
  const getSection = (id: string) => profile.sections.find((s) => s.id === id && s.visible);

  return (
    <div
      className="min-h-screen bg-[#FAF7F0] text-[#1B1A17] font-sans selection:bg-[#E2D9C8] py-16 px-6"
      style={
        {
          "--accent": accent,
          "--font-display": "var(--font-fraunces)",
          "--font-body": "var(--font-body)",
        } as React.CSSProperties
      }
    >
      <div className="max-w-[680px] mx-auto flex flex-col gap-16">
        {/* Header */}
        <header className="border-b border-[#1B1A17]/15 pb-8 flex flex-col gap-4">
          <div className="flex items-center justify-between text-xs font-mono text-[#1B1A17]/60">
            <span>PORTFOLIO DISPATCH</span>
            <span>cv.decslab.in/{profile.username}</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-normal tracking-tight text-[#1B1A17]">
            {profile.basics.name}
          </h1>
          <p className="font-display italic text-lg sm:text-xl text-[#1B1A17]/80 leading-relaxed">
            {profile.basics.headline}
          </p>
          {profile.basics.location && (
            <div className="text-xs font-mono text-[#1B1A17]/50 uppercase tracking-wider">
              Loc. {profile.basics.location}
            </div>
          )}
        </header>

        {/* About with Drop Cap */}
        {getSection("about") && profile.summary && (
          <section className="flex flex-col gap-4">
            <h2 className="font-mono text-xs uppercase tracking-widest text-[#1B1A17]/50">
              § 1. Statement
            </h2>
            <div className="text-base sm:text-lg leading-[1.8] text-[#1B1A17]/90 font-serif">
              <span
                className="float-left text-5xl font-display font-normal leading-none pr-3 pt-1"
                style={{ color: accent }}
              >
                {profile.summary.charAt(0)}
              </span>
              {parseMarkdownLite(profile.summary.slice(1))}
            </div>
          </section>
        )}

        {/* Selected Works (Numbered list) */}
        {getSection("projects") && profile.projects.length > 0 && (
          <section className="flex flex-col gap-6 border-t border-[#1B1A17]/15 pt-12">
            <h2 className="font-mono text-xs uppercase tracking-widest text-[#1B1A17]/50">
              § 2. Selected Projects
            </h2>
            <div className="flex flex-col divide-y divide-[#1B1A17]/10">
              {profile.projects.map((proj, idx) => (
                <div key={proj.id} className="py-6 flex flex-col gap-2 group">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="font-display text-xl text-[#1B1A17] font-medium group-hover:italic transition-all">
                      <span className="font-mono text-xs text-[#1B1A17]/40 mr-2">
                        0{idx + 1}.
                      </span>
                      {proj.title}
                    </h3>
                    {proj.url && (
                      <a
                        href={proj.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs font-mono underline decoration-dotted text-[#1B1A17]/70 hover:text-[var(--accent)]"
                      >
                        [Link ↗]
                      </a>
                    )}
                  </div>
                  <p className="text-sm text-[#1B1A17]/80 leading-relaxed font-sans">{proj.desc}</p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {proj.tech.map((t, i) => (
                      <span key={i} className="text-[11px] font-mono text-[#1B1A17]/60">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Experience */}
        {getSection("experience") && profile.experience.length > 0 && (
          <section className="flex flex-col gap-6 border-t border-[#1B1A17]/15 pt-12">
            <h2 className="font-mono text-xs uppercase tracking-widest text-[#1B1A17]/50">
              § 3. Career & Positions
            </h2>
            <div className="space-y-8">
              {profile.experience.map((exp) => (
                <div key={exp.id} className="flex flex-col gap-1.5">
                  <div className="flex items-baseline justify-between">
                    <h4 className="font-display text-lg font-medium text-[#1B1A17]">
                      {exp.role} <span className="font-normal text-[#1B1A17]/60">at {exp.company}</span>
                    </h4>
                    <span className="font-mono text-xs text-[#1B1A17]/50">
                      {exp.start} – {exp.current ? "Present" : exp.end}
                    </span>
                  </div>
                  <ul className="mt-2 space-y-1.5 text-sm text-[#1B1A17]/80 list-disc list-inside font-sans">
                    {exp.bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {getSection("education") && profile.education.length > 0 && (
          <section className="flex flex-col gap-6 border-t border-[#1B1A17]/15 pt-12">
            <h2 className="font-mono text-xs uppercase tracking-widest text-[#1B1A17]/50">
              § 4. Education
            </h2>
            <div className="space-y-4">
              {profile.education.map((edu) => (
                <div key={edu.id} className="flex justify-between items-baseline text-sm">
                  <div>
                    <span className="font-semibold">{edu.school}</span>
                    <span className="text-[#1B1A17]/70 block">{edu.degree}</span>
                  </div>
                  <span className="font-mono text-xs text-[#1B1A17]/50">{edu.start}–{edu.end}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Footnotes & Colophon */}
        <footer className="border-t border-[#1B1A17]/20 pt-10 pb-8 flex flex-col gap-6 text-xs font-mono text-[#1B1A17]/70">
          <div className="flex flex-wrap gap-4">
            {profile.basics.links.map((link, idx) => (
              <a
                key={idx}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-2 hover:text-[var(--accent)]"
              >
                [{idx + 1}] {link.label}
              </a>
            ))}
            {profile.basics.email && (
              <a
                href={`mailto:${profile.basics.email}`}
                className="underline underline-offset-2 hover:text-[var(--accent)]"
              >
                [{profile.basics.links.length + 1}] {profile.basics.email}
              </a>
            )}
          </div>
          <div className="flex justify-between items-center text-[11px] text-[#1B1A17]/40 pt-4 border-t border-[#1B1A17]/10">
            <span>SET IN FRAUNCES & FAMILJEN GROTESK</span>
            <span>DECSCV PAPER EDITION</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
