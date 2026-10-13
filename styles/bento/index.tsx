"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Profile, ProjectItem } from "@/lib/types";
import {
  ArrowUpRight,
  MapPin,
  Briefcase,
  Sparkle,
  X,
  Calendar,
  CheckCircle,
  DotsThree,
  Envelope,
  GithubLogo,
  LinkedinLogo,
  Globe,
} from "@phosphor-icons/react";

export default function BentoStyle({ profile }: { profile: Profile }) {
  const accent = profile.portfolio.accent || "#6E44FF";
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  // Derive counts
  const totalProjects = profile.projects.length;
  const totalSkills = profile.skills.length;
  const currentRole = profile.experience[0]?.role || "Software Craftsman";
  const currentCompany = profile.experience[0]?.company || "Available for Opportunities";

  return (
    <div
      className="min-h-screen bg-[#F4F5F7] text-slate-900 font-sans p-4 sm:p-8 lg:p-12 flex justify-center selection:bg-purple-200"
      style={
        {
          "--accent": accent,
          "--font-display": "var(--font-display)",
          "--font-body": "var(--font-sans)",
        } as React.CSSProperties
      }
    >
      <div className="w-full max-w-6xl flex flex-col gap-5">
        {/* Top Minimal Bar */}
        <div className="flex justify-between items-center px-2 py-1 text-xs font-mono text-slate-500 uppercase tracking-wider">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#6E44FF]" />
            <span>PORTFOLIO GRID / {profile.username}</span>
          </div>
          <span className="text-slate-400">cv.decslab.in/{profile.username}</span>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {/* Tile 1: Giant Intro Card (Spans 2 cols) */}
          <div className="md:col-span-2 p-8 rounded-[28px] bg-white border border-slate-200/80 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04)] flex flex-col justify-between">
            <div className="flex items-start justify-between gap-4">
              {profile.basics.photo?.url ? (
                <div className="relative w-20 h-20 rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm">
                  <Image
                    src={profile.basics.photo.url}
                    alt={profile.basics.name}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="w-20 h-20 rounded-2xl bg-purple-50 text-[#6E44FF] flex items-center justify-center font-display font-black text-2xl border border-purple-100 shadow-sm">
                  {profile.basics.name.slice(0, 2).toUpperCase()}
                </div>
              )}
              {profile.basics.availableForWork && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                  Available for hire
                </span>
              )}
            </div>

            <div className="mt-8 flex flex-col gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Craftsman & Developer
              </span>
              <h1 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
                {profile.basics.name}
              </h1>
              <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-xl">
                {profile.basics.headline || "Building reliable systems and human-friendly digital products."}
              </p>
            </div>
          </div>

          {/* Tile 2: Vibrant Coral / Orange Highlight Card (Matching Image 1) */}
          <div className="p-7 rounded-[28px] bg-[#FF5722] text-white shadow-md shadow-[#FF5722]/20 flex flex-col justify-between relative overflow-hidden group">
            {/* Subtle decorative background watermark */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full bg-white/10 blur-xl pointer-events-none" />
            
            <div className="flex items-center justify-between z-10">
              <span className="text-xs font-semibold uppercase tracking-wider text-white/80">
                Philosophy
              </span>
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white backdrop-blur-xs">
                <ArrowUpRight size={16} weight="bold" />
              </div>
            </div>

            <div className="my-6 z-10">
              <h3 className="font-display text-2xl font-bold leading-tight">
                Discover a smarter way to craft solutions.
              </h3>
            </div>

            <div className="z-10">
              <a
                href={profile.basics.email ? `mailto:${profile.basics.email}` : "#"}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white text-[#FF5722] text-xs font-bold hover:bg-orange-50 active:scale-95 transition-all shadow-sm"
              >
                <span>Get in touch</span>
                <ArrowUpRight size={14} weight="bold" />
              </a>
            </div>
          </div>

          {/* Tile 3: Current Focus / Status */}
          <div className="p-7 rounded-[28px] bg-white border border-slate-200/80 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04)] flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs font-medium text-slate-400">
              <div className="flex items-center gap-2">
                <Briefcase size={16} className="text-[#6E44FF]" />
                <span className="uppercase tracking-wider font-semibold">Active Role</span>
              </div>
              <DotsThree size={20} weight="bold" />
            </div>

            <div className="my-4">
              <p className="text-lg font-bold text-slate-900 leading-snug">
                {currentRole}
              </p>
              <p className="text-sm text-slate-500 mt-1">
                {currentCompany}
              </p>
            </div>

            <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100">
              <span className="text-slate-400">Since {profile.experience[0]?.start || "Present"}</span>
              <span className="px-2 py-0.5 rounded-md bg-purple-50 text-[#6E44FF] font-semibold text-[11px]">
                Active
              </span>
            </div>
          </div>

          {/* Tile 4: Metrics Squircle Row (Image 1 style) */}
          <div className="p-7 rounded-[28px] bg-white border border-slate-200/80 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04)] flex flex-col justify-between">
            <div className="w-11 h-11 rounded-2xl bg-[#10B981] text-white flex items-center justify-center shadow-sm shadow-[#10B981]/25">
              <CheckCircle size={22} weight="duotone" />
            </div>
            <div className="my-3">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                Projects Built
              </span>
              <span className="font-display text-3xl font-extrabold text-slate-900">
                {totalProjects}
              </span>
            </div>
            <span className="text-[11px] font-semibold text-emerald-600">
              +100% verified repos
            </span>
          </div>

          <div className="p-7 rounded-[28px] bg-white border border-slate-200/80 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04)] flex flex-col justify-between">
            <div className="w-11 h-11 rounded-2xl bg-[#F59E0B] text-white flex items-center justify-center shadow-sm shadow-[#F59E0B]/25">
              <Sparkle size={22} weight="duotone" />
            </div>
            <div className="my-3">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                Tech Proficiencies
              </span>
              <span className="font-display text-3xl font-extrabold text-slate-900">
                {totalSkills}
              </span>
            </div>
            <span className="text-[11px] font-medium text-slate-400">
              Full-stack toolchain
            </span>
          </div>

          {/* Tile 5: Time Activity / Skills Distribution (Image 1 style) */}
          <div className="md:col-span-2 p-7 rounded-[28px] bg-white border border-slate-200/80 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04)] flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Domain Distribution
                </span>
                <h4 className="font-display text-lg font-bold text-slate-900 mt-0.5">
                  Core Engineering Focus
                </h4>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
                Verified
              </span>
            </div>

            {/* Multi-segment colorful bar */}
            <div className="my-5 flex flex-col gap-2.5">
              <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden flex gap-1">
                <div className="bg-[#6E44FF] h-full rounded-full" style={{ width: "50%" }} />
                <div className="bg-[#10B981] h-full rounded-full" style={{ width: "30%" }} />
                <div className="bg-[#FF5722] h-full rounded-full" style={{ width: "20%" }} />
              </div>
              <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-600 pt-1">
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#6E44FF]" />
                  Frontend & UI (50%)
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
                  Backend APIs (30%)
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FF5722]" />
                  Architecture (20%)
                </span>
              </div>
            </div>
          </div>

          {/* Tile 6: Featured Projects with Pastel Category Pills (Image 2 style) */}
          {profile.projects.slice(0, 4).map((proj, idx) => {
            const pillColors = [
              { bg: "bg-[#F2EEFE]", text: "text-[#6E44FF]", label: "REQUEST" },
              { bg: "bg-[#E6F7F0]", text: "text-[#0D9488]", label: "SOLVED" },
              { bg: "bg-[#FEF7E6]", text: "text-[#D97706]", label: "FEATURE" },
              { bg: "bg-[#F1F5F9]", text: "text-[#475569]", label: "RELEASE" },
            ];
            const pill = pillColors[idx % pillColors.length];

            return (
              <div
                key={proj.id}
                onClick={() => setSelectedProject(proj)}
                className="md:col-span-2 p-7 rounded-[28px] bg-white border border-slate-200/80 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04)] hover:shadow-hover hover:border-slate-300 transition-all flex flex-col justify-between group cursor-pointer"
              >
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-md ${pill.bg} ${pill.text}`}
                        >
                          {pill.label}
                        </span>
                        <span className="text-xs text-slate-400 font-mono">0{idx + 1}</span>
                      </div>
                      <h3 className="font-display text-xl font-bold text-slate-900 group-hover:text-[#6E44FF] transition-colors">
                        {proj.title}
                      </h3>
                    </div>
                    <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-600 group-hover:bg-[#6E44FF] group-hover:text-white flex items-center justify-center transition-colors shadow-sm">
                      <ArrowUpRight size={17} weight="bold" />
                    </div>
                  </div>

                  <p className="text-sm text-slate-600 my-4 line-clamp-2 leading-relaxed">
                    {proj.desc}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-100">
                  {proj.tech.map((t, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-lg bg-slate-50 text-[11px] font-medium text-slate-600 border border-slate-200/60"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}

          {/* Tile 7: Skills Cloud Pill Matrix */}
          <div className="md:col-span-2 p-7 rounded-[28px] bg-white border border-slate-200/80 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04)] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Technology Stack
                </span>
                <span className="text-xs font-semibold text-[#6E44FF]">
                  {profile.skills.length} competencies
                </span>
              </div>
              <h4 className="font-display text-lg font-bold text-slate-900 mt-1">
                Tools, Frameworks & Languages
              </h4>
            </div>

            <div className="flex flex-wrap gap-2 my-5">
              {profile.skills.map((sk) => (
                <span
                  key={sk.id}
                  className="px-3 py-1.5 rounded-xl border border-slate-200/90 text-xs font-medium bg-slate-50/50 text-slate-700 hover:border-[#6E44FF]/40 transition-colors"
                >
                  {sk.name}
                </span>
              ))}
            </div>

            <div className="text-xs text-slate-400 font-mono pt-2 border-t border-slate-100">
              Updated for Q4 2026 deployment
            </div>
          </div>

          {/* Tile 8: Location & Availability (Image 1 style) */}
          <div className="p-7 rounded-[28px] bg-white border border-slate-200/80 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04)] flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs font-medium text-slate-400">
              <div className="flex items-center gap-1.5">
                <MapPin size={16} className="text-[#FF5722]" />
                <span className="uppercase tracking-wider font-semibold">Location</span>
              </div>
              <span className="text-[11px] text-slate-400 font-mono">IST (UTC+5:30)</span>
            </div>

            <div className="my-3">
              <p className="text-xl font-bold text-slate-900">
                {profile.basics.location || "Bengaluru, India"}
              </p>
              <p className="text-xs text-slate-500 mt-1">Open to remote & hybrid</p>
            </div>

            {/* Mini calendar block matching Image 1 */}
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <Calendar size={18} className="text-[#6E44FF]" />
                <span className="font-semibold text-slate-700">Immediate</span>
              </div>
              <span className="w-6 h-6 rounded-full bg-amber-400 text-slate-900 font-bold flex items-center justify-center text-[11px]">
                {new Date().getDate()}
              </span>
            </div>
          </div>

          {/* Tile 9: Connect & Socials (Clean White Card with Direct Action Pills) */}
          <div className="p-7 rounded-[28px] bg-white border border-slate-200/80 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04)] flex flex-col justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Get in Touch
            </span>

            <div className="flex flex-col gap-2 my-4">
              {profile.basics.email && (
                <a
                  href={`mailto:${profile.basics.email}`}
                  className="px-4 py-2.5 rounded-xl bg-[#6E44FF] text-white text-xs font-semibold hover:bg-[#5E34E8] transition-colors flex items-center justify-between shadow-sm shadow-[#6E44FF]/25"
                >
                  <span className="flex items-center gap-2">
                    <Envelope size={15} weight="bold" />
                    <span>Send Message</span>
                  </span>
                  <ArrowUpRight size={14} weight="bold" />
                </a>
              )}

              {profile.basics.links.map((link, idx) => (
                <a
                  key={idx}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold transition-colors flex items-center justify-between border border-slate-200/80"
                >
                  <span className="truncate">{link.label}</span>
                  <ArrowUpRight size={13} />
                </a>
              ))}
            </div>

            <span className="text-[11px] text-slate-400 font-mono">cv.decslab.in/{profile.username}</span>
          </div>
        </div>
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-white rounded-[28px] p-7 shadow-2xl relative flex flex-col gap-4 border border-slate-200">
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute right-5 top-5 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
            >
              <X size={20} weight="bold" />
            </button>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-purple-50 text-[#6E44FF]">
                Project Details
              </span>
            </div>
            <h3 className="font-display text-2xl font-bold text-slate-900">{selectedProject.title}</h3>
            <p className="text-sm text-slate-600 leading-relaxed">{selectedProject.desc}</p>
            <div className="flex flex-wrap gap-2 pt-2">
              {selectedProject.tech.map((t, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-medium"
                >
                  {t}
                </span>
              ))}
            </div>
            {selectedProject.url && (
              <a
                href={selectedProject.url}
                target="_blank"
                rel="noreferrer"
                className="mt-4 w-full py-3 rounded-xl bg-[#6E44FF] text-white text-center text-sm font-semibold hover:bg-[#5E34E8] shadow-sm shadow-[#6E44FF]/30 transition-all inline-flex items-center justify-center gap-1.5"
              >
                <span>Visit Live Product</span>
                <ArrowUpRight size={16} weight="bold" />
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
