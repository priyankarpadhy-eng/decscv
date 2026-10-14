"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Profile } from "@/lib/types";
import { parseMarkdownLite } from "@/lib/sanitize";
import { Copy, Check, ArrowUpRight, GithubLogo, LinkedinLogo } from "@phosphor-icons/react";

export default function NoirStyle({ profile }: { profile: Profile }) {
  const accent = profile.portfolio.accent || "#C6FF3D";
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [copied, setCopied] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleCopyEmail = () => {
    if (profile.basics.email) {
      navigator.clipboard.writeText(profile.basics.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getSection = (id: string) => profile.sections.find((s) => s.id === id && s.visible);

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen bg-[#07070A] text-[#EDEDED] font-sans selection:bg-[#C6FF3D] selection:text-black overflow-x-hidden"
      style={
        {
          "--accent": accent,
          "--font-display": "var(--font-unbounded)",
          "--font-body": "var(--font-space)",
        } as React.CSSProperties
      }
    >
      {/* Dynamic Cursor Spotlight */}
      <div
        className="pointer-events-none fixed inset-0 z-10 transition-opacity duration-300 hidden md:block"
        style={{
          background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, ${accent}15, transparent 80%)`,
        }}
      />

      {/* Grid Pattern */}
      <div
        className="pointer-events-none fixed inset-0 opacity-20"
        style={{
          backgroundImage: `radial-gradient(#8A8A93 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-20 flex flex-col gap-14 sm:gap-24">
        {/* Header / Nav */}
        <header className="flex items-center justify-between border-b border-white/10 pb-5">
          <span className="font-mono text-[11px] sm:text-xs tracking-widest text-[#8A8A93] uppercase truncate max-w-[200px] sm:max-w-none">
            // {profile.username}.cv.decslab.in
          </span>
          {profile.basics.availableForWork && (
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/15 bg-white/5 text-[11px] font-mono shrink-0">
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: accent }} />
              <span className="text-[#EDEDED]">available for work</span>
            </div>
          )}
        </header>

        {/* Hero */}
        <section className="flex flex-col gap-6 sm:gap-8 pt-4 sm:pt-8">
          <div className="flex flex-col gap-3">
            <span className="font-mono text-xs text-[#8A8A93] tracking-widest uppercase">00 / INTRO</span>
            <h1 className="font-display font-extrabold text-3xl sm:text-6xl md:text-8xl tracking-tight leading-[1.05] flex flex-wrap break-words">
              {(profile.basics?.name || "Your Name").split(" ").map((word, wIdx) => (
                <span key={wIdx} className="inline-block mr-3 sm:mr-4">
                  {word.split("").map((char, cIdx) => (
                    <span
                      key={cIdx}
                      className="inline-block transition-transform duration-150 hover:-translate-y-2 hover:text-[var(--accent)] cursor-default"
                    >
                      {char}
                    </span>
                  ))}
                </span>
              ))}
            </h1>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-t border-white/10 pt-8">
            <p className="text-xl sm:text-2xl text-[#EDEDED] font-light max-w-2xl leading-relaxed">
              {profile.basics.headline}
            </p>
            {profile.basics.photo && (
              <div className="relative w-28 h-28 shrink-0 rounded-xl overflow-hidden border-2 border-white/20">
                <Image
                  src={profile.basics.photo.url}
                  alt={profile.basics.name}
                  fill
                  className="object-cover"
                />
              </div>
            )}
          </div>
        </section>

        {/* About Section */}
        {getSection("about") && profile.summary && (
          <section className="flex flex-col md:flex-row gap-12 border-t border-white/10 pt-16">
            <div className="w-48 shrink-0 font-mono text-xs text-[#8A8A93] tracking-widest uppercase">
              01 / ABOUT
            </div>
            <div className="text-lg md:text-xl text-[#EDEDED]/90 leading-relaxed max-w-3xl">
              {parseMarkdownLite(profile.summary)}
            </div>
          </section>
        )}

        {/* Skills Marquee */}
        {getSection("skills") && profile.skills.length > 0 && (
          <section className="flex flex-col gap-6 border-t border-white/10 pt-16">
            <div className="font-mono text-xs text-[#8A8A93] tracking-widest uppercase">
              02 / CAPABILITIES & TECH
            </div>
            <div className="overflow-hidden py-4 flex flex-col gap-4">
              <div className="animate-marquee flex gap-3">
                {profile.skills.concat(profile.skills).map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-4 py-2 rounded border border-white/15 bg-white/5 font-mono text-xs tracking-wider text-white whitespace-nowrap hover:border-[var(--accent)] transition-colors"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
              <div className="animate-marquee-reverse flex gap-3">
                {profile.skills
                  .slice()
                  .reverse()
                  .concat(profile.skills)
                  .map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-4 py-2 rounded border border-white/15 bg-white/5 font-mono text-xs tracking-wider text-white whitespace-nowrap hover:border-[var(--accent)] transition-colors"
                    >
                      {skill.name}
                    </span>
                  ))}
              </div>
            </div>
          </section>
        )}

        {/* Projects */}
        {getSection("projects") && profile.projects.length > 0 && (
          <section className="flex flex-col gap-10 border-t border-white/10 pt-16">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-[#8A8A93] tracking-widest uppercase">
                03 / SELECTED WORKS
              </span>
              <span className="font-mono text-xs text-[#8A8A93]">
                [{profile.projects.length} PROJECTS]
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {profile.projects.map((proj) => (
                <div
                  key={proj.id}
                  className="group relative flex flex-col justify-between p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[var(--accent)] transition-all duration-300"
                >
                  <div className="flex flex-col gap-4">
                    {proj.images && proj.images[0] && (
                      <div className="relative w-full h-48 rounded-xl overflow-hidden bg-black/40">
                        <Image
                          src={proj.images[0].url}
                          alt={proj.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    )}
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="font-display text-2xl font-bold group-hover:text-[var(--accent)] transition-colors">
                        {proj.title}
                      </h3>
                      {proj.url && (
                        <a
                          href={proj.url}
                          target="_blank"
                          rel="noreferrer"
                          className="p-2 rounded-full border border-white/20 hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
                        >
                          <ArrowUpRight size={18} />
                        </a>
                      )}
                    </div>
                    <p className="text-sm text-[#8A8A93] leading-relaxed">{proj.desc}</p>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-6 pt-4 border-t border-white/10">
                    {proj.tech.map((t, i) => (
                      <span key={i} className="text-xs font-mono text-[#8A8A93]">
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Experience Timeline */}
        {getSection("experience") && profile.experience.length > 0 && (
          <section className="flex flex-col gap-10 border-t border-white/10 pt-16">
            <span className="font-mono text-xs text-[#8A8A93] tracking-widest uppercase">
              04 / TIMELINE & EXPERIENCE
            </span>
            <div className="flex flex-col border-l border-white/15 pl-6 ml-3 space-y-12">
              {profile.experience.map((exp) => (
                <div key={exp.id} className="relative group">
                  <div
                    className="absolute -left-[31px] top-1.5 w-3 h-3 rounded-full border-2 border-[#07070A] transition-colors group-hover:scale-125"
                    style={{ backgroundColor: accent }}
                  />
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                    <h4 className="text-xl font-bold text-white">{exp.role}</h4>
                    <span className="font-mono text-xs text-[#8A8A93]">
                      {exp.start} — {exp.current ? "PRESENT" : exp.end}
                    </span>
                  </div>
                  <div className="text-sm text-[var(--accent)] font-mono mt-0.5">{exp.company}</div>
                  <ul className="mt-4 space-y-2 text-sm text-[#8A8A93] list-disc list-inside">
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
          <section className="flex flex-col gap-8 border-t border-white/10 pt-16">
            <span className="font-mono text-xs text-[#8A8A93] tracking-widest uppercase">
              05 / ACADEMIC BACKGROUND
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {profile.education.map((edu) => (
                <div key={edu.id} className="p-6 rounded-xl border border-white/10 bg-white/[0.02]">
                  <h4 className="text-lg font-bold text-white">{edu.school}</h4>
                  <div className="text-sm text-[#8A8A93] mt-1">{edu.degree}</div>
                  <div className="font-mono text-xs text-[#8A8A93] mt-3 flex justify-between">
                    <span>{edu.start} — {edu.current ? "Present" : edu.end}</span>
                    {edu.grade && <span className="text-[var(--accent)] font-semibold">{edu.grade}</span>}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Contact */}
        <section className="flex flex-col gap-8 border-t border-white/10 pt-20 pb-12">
          <span className="font-mono text-xs text-[#8A8A93] tracking-widest uppercase">
            06 / GET IN TOUCH
          </span>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <h2 className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight">
                Let&apos;s talk.
              </h2>
              <p className="text-[#8A8A93] mt-3 text-sm">
                Open to full-time opportunities, internships, and high-impact collaborations.
              </p>
            </div>
            {profile.basics.email && (
              <button
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-3 px-6 py-4 rounded-xl border border-white/20 bg-white/5 hover:border-[var(--accent)] font-mono text-sm transition-all"
              >
                {copied ? <Check size={18} className="text-[var(--accent)]" /> : <Copy size={18} />}
                <span>{copied ? "Copied to clipboard!" : profile.basics.email}</span>
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-6 pt-10 border-t border-white/10">
            {profile.basics.links.map((link, idx) => (
              <a
                key={idx}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="font-mono text-xs text-[#8A8A93] hover:text-[var(--accent)] transition-colors underline underline-offset-4"
              >
                {link.label} ↗
              </a>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
