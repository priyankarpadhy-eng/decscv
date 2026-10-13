"use client";

import React from "react";
import { Profile } from "@/lib/types";

export default function GazetteStyle({ profile }: { profile: Profile }) {
  const accent = profile.portfolio.accent || "#B3261E";
  const todayDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div
      className="min-h-screen bg-[#F1ECE1] text-[#161616] font-serif p-6 sm:p-12 selection:bg-[#E0D7C6]"
      style={
        {
          "--accent": accent,
          "--font-display": "var(--font-dm-serif)",
          "--font-body": "var(--font-fraunces)",
        } as React.CSSProperties
      }
    >
      <div className="max-w-5xl mx-auto flex flex-col gap-8">
        {/* Newspaper Top Info Bar */}
        <div className="border-b border-[#161616] pb-1 flex justify-between items-center text-xs font-mono uppercase tracking-wider text-[#161616]/70">
          <span>Daily Portfolio Edition</span>
          <span>Price: Free of Cost</span>
          <span>cv.decslab.in/{profile.username}</span>
        </div>

        {/* Grand Masthead */}
        <header className="text-center py-4 border-b-4 border-double border-[#161616] flex flex-col items-center gap-2">
          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-normal tracking-tight uppercase">
            The {profile.basics.name} Times
          </h1>
          <div className="w-full flex justify-between items-center border-t border-[#161616] pt-2 text-xs font-mono uppercase tracking-widest text-[#161616]/80">
            <span>Vol. {profile.experience.length + 1}</span>
            <span>{todayDate}</span>
            <span>Edition No. 1</span>
          </div>
        </header>

        {/* Front Page Headline Banner */}
        <div className="text-center border-b border-[#161616] pb-6">
          <h2 className="font-display text-2xl sm:text-3xl italic font-normal text-[#161616] max-w-3xl mx-auto">
            &ldquo;{profile.basics.headline}&rdquo;
          </h2>
        </div>

        {/* 3-Column Newspaper Body */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-b-2 border-[#161616] pb-12">
          {/* Column 1: Lead Story & Editorial */}
          <div className="md:col-span-2 flex flex-col gap-6 md:border-r md:border-[#161616] md:pr-8">
            <div className="border-b border-[#161616] pb-2">
              <span className="font-mono text-xs uppercase tracking-widest text-[#B3261E] font-bold">
                Front Page Feature
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-medium mt-1">
                {profile.projects[0]?.title || "Lead Investigation & Works"}
              </h3>
            </div>
            <p className="text-base leading-relaxed text-justify">
              <span className="float-left text-4xl font-display font-bold leading-none pr-2 pt-0.5 text-[#B3261E]">
                {profile.projects[0]?.desc?.charAt(0) || "T"}
              </span>
              {profile.projects[0]?.desc?.slice(1) || profile.summary}
            </p>
            {profile.projects[0]?.url && (
              <a
                href={profile.projects[0].url}
                target="_blank"
                rel="noreferrer"
                className="font-mono text-xs text-[#B3261E] underline uppercase"
              >
                Read Full Dispatch ↗
              </a>
            )}

            {/* Other Projects */}
            <div className="mt-6 pt-6 border-t border-[#161616]/30 flex flex-col gap-4">
              <h4 className="font-mono text-xs uppercase tracking-widest font-bold">
                Other Inventions & Dispatches
              </h4>
              {profile.projects.slice(1, 4).map((p) => (
                <div key={p.id} className="text-sm">
                  <span className="font-bold">{p.title}</span> — {p.desc}
                </div>
              ))}
            </div>
          </div>

          {/* Column 3: The Classifieds (Contact & Skills) */}
          <div className="flex flex-col gap-6">
            <div className="border-2 border-[#161616] p-4 bg-[#EDE7DA]">
              <span className="font-mono text-xs uppercase tracking-widest font-bold block border-b border-[#161616] pb-1 text-center">
                Classified Notices
              </span>
              <div className="mt-3 text-xs space-y-3 font-mono">
                <div>
                  <span className="font-bold block">STATUS:</span>
                  <span>{profile.basics.availableForWork ? "OPEN TO HIRE" : "ENGAGED"}</span>
                </div>
                <div>
                  <span className="font-bold block">TELEGRAPH / COMMS:</span>
                  <a href={`mailto:${profile.basics.email}`} className="underline block break-all">
                    {profile.basics.email}
                  </a>
                </div>
                <div>
                  <span className="font-bold block">REGISTERED LINKS:</span>
                  <ul className="list-disc list-inside space-y-1">
                    {profile.basics.links.map((l, i) => (
                      <li key={i}>
                        <a href={l.url} target="_blank" rel="noreferrer" className="underline">
                          {l.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="border border-[#161616] p-4">
              <span className="font-mono text-xs uppercase tracking-widest font-bold block border-b border-[#161616] pb-1">
                Field Competencies
              </span>
              <div className="flex flex-wrap gap-1.5 mt-3 text-xs font-mono">
                {profile.skills.map((sk) => (
                  <span key={sk.id} className="border border-[#161616] px-2 py-0.5">
                    {sk.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Career Chronicle */}
        {profile.experience.length > 0 && (
          <section className="flex flex-col gap-4">
            <h3 className="font-mono text-xs uppercase tracking-widest font-bold border-b border-[#161616] pb-1">
              Career Chronicle & Tenures
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
              {profile.experience.map((e) => (
                <div key={e.id} className="border-l-2 border-[#161616] pl-3">
                  <div className="font-bold font-display text-base">{e.role}</div>
                  <div className="text-xs font-mono text-[#161616]/70">
                    {e.company} ({e.start}–{e.current ? "Present" : e.end})
                  </div>
                  <ul className="list-disc list-inside text-xs mt-2 space-y-1">
                    {e.bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        <footer className="text-center text-xs font-mono text-[#161616]/60 pt-6 border-t border-[#161616]">
          PUBLISHED EXCLUSIVELY VIA DECSCV GAZETTE PRESS · ALL RIGHTS RESERVED
        </footer>
      </div>
    </div>
  );
}
