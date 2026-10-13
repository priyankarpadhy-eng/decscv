"use client";

import React from "react";
import { Profile } from "@/lib/types";

export function ClassicResume({ profile }: { profile: Profile }) {
  const accent = profile.resume.accent || "#0F172A";

  return (
    <div className="font-serif text-slate-900 leading-normal p-8 sm:p-14 max-w-[210mm] mx-auto bg-white min-h-[297mm] shadow-card print:shadow-none print:p-0 print:m-0 print:max-w-none print:w-full">
      {/* Header */}
      <header className="border-b-2 border-slate-900 pb-4 mb-6 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-950 font-serif">
          {profile.basics.name}
        </h1>
        {profile.basics.headline && (
          <p className="italic text-sm text-slate-700 mt-1 font-serif">
            {profile.basics.headline}
          </p>
        )}
        <div className="flex justify-center flex-wrap items-center gap-x-3 gap-y-1 text-xs font-sans mt-2.5 text-slate-600">
          {profile.basics.email && (
            <a href={`mailto:${profile.basics.email}`} className="hover:underline">
              {profile.basics.email}
            </a>
          )}
          {profile.basics.phone && <span>· {profile.basics.phone}</span>}
          {profile.basics.location && <span>· {profile.basics.location}</span>}
          {profile.basics.links.map((l, i) => (
            <span key={i}>
              ·{" "}
              <a href={l.url} target="_blank" rel="noreferrer" className="hover:underline text-slate-700">
                {l.label}
              </a>
            </span>
          ))}
        </div>
      </header>

      {/* Summary */}
      {profile.summary && (
        <section className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-wider border-b border-slate-800 pb-1 mb-2 font-sans text-slate-900">
            Professional Summary
          </h2>
          <p className="text-xs sm:text-sm leading-relaxed text-slate-800 text-justify font-serif">
            {profile.summary}
          </p>
        </section>
      )}

      {/* Experience */}
      {profile.experience.length > 0 && (
        <section className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-wider border-b border-slate-800 pb-1 mb-3 font-sans text-slate-900">
            Experience & Internships
          </h2>
          <div className="space-y-4">
            {profile.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline text-xs sm:text-sm">
                  <div>
                    <span className="font-bold text-slate-950 font-serif">{exp.role}</span>
                    <span className="font-sans italic text-slate-700"> — {exp.company}</span>
                    {exp.location && <span className="text-slate-500 font-sans text-xs"> ({exp.location})</span>}
                  </div>
                  <span className="text-xs text-slate-600 font-sans whitespace-nowrap">
                    {exp.start} – {exp.current ? "Present" : exp.end}
                  </span>
                </div>
                <ul className="list-disc list-outside ml-4 text-xs mt-1.5 space-y-1 text-slate-800 font-sans leading-relaxed">
                  {exp.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {profile.projects.length > 0 && (
        <section className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-wider border-b border-slate-800 pb-1 mb-3 font-sans text-slate-900">
            Selected Projects
          </h2>
          <div className="space-y-3 font-sans">
            {profile.projects.map((proj) => (
              <div key={proj.id} className="text-xs">
                <div className="flex justify-between items-baseline">
                  <span className="font-bold text-slate-950 font-serif text-sm">
                    {proj.title}
                  </span>
                  {proj.url && (
                    <a
                      href={proj.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-slate-600 text-[11px] underline hover:text-slate-900 font-sans"
                    >
                      {proj.url.replace(/^https?:\/\//, "")}
                    </a>
                  )}
                </div>
                <p className="text-slate-800 mt-0.5 leading-relaxed font-sans">{proj.desc}</p>
                {proj.tech.length > 0 && (
                  <div className="text-slate-600 mt-1 italic text-[11px]">
                    Technologies: {proj.tech.join(", ")}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {profile.education.length > 0 && (
        <section className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-wider border-b border-slate-800 pb-1 mb-3 font-sans text-slate-900">
            Education
          </h2>
          <div className="space-y-3 font-sans">
            {profile.education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-baseline text-xs">
                <div>
                  <span className="font-bold text-slate-950 font-serif text-sm block">
                    {edu.school}
                  </span>
                  <div className="text-slate-700">
                    {edu.degree} {edu.field && `in ${edu.field}`}
                  </div>
                </div>
                <div className="text-right whitespace-nowrap">
                  <span className="text-slate-600 block">
                    {edu.start} – {edu.end || "Present"}
                  </span>
                  {edu.grade && (
                    <span className="font-semibold text-slate-900 text-[11px]">
                      {edu.gradeType || "CGPA"}: {edu.grade}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {profile.skills.length > 0 && (
        <section className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wider border-b border-slate-800 pb-1 mb-2 font-sans text-slate-900">
            Skills & Competencies
          </h2>
          <p className="text-xs font-sans text-slate-800 leading-relaxed">
            {profile.skills.map((s) => s.name).join(" · ")}
          </p>
        </section>
      )}
    </div>
  );
}

export function ModernResume({ profile }: { profile: Profile }) {
  const accent = profile.resume.accent || "#6E44FF";

  return (
    <div className="font-sans text-slate-900 leading-normal p-8 sm:p-14 max-w-[210mm] mx-auto bg-white min-h-[297mm] shadow-card print:shadow-none print:p-0 print:m-0 print:max-w-none print:w-full">
      {/* Modern Top Header with Sleek Accent Line */}
      <header className="pb-5 mb-6 border-b border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950">
              {profile.basics.name}
            </h1>
            <p className="text-sm sm:text-base font-semibold mt-1" style={{ color: accent }}>
              {profile.basics.headline}
            </p>
          </div>
          {profile.basics.availableForWork && (
            <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 w-max">
              ● Immediate Availability
            </span>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-slate-600 mt-3 pt-3 border-t border-slate-100">
          {profile.basics.email && (
            <a href={`mailto:${profile.basics.email}`} className="hover:text-slate-900">
              {profile.basics.email}
            </a>
          )}
          {profile.basics.phone && <span>• {profile.basics.phone}</span>}
          {profile.basics.location && <span>• {profile.basics.location}</span>}
          {profile.basics.links.map((link, idx) => (
            <a
              key={idx}
              href={link.url}
              target="_blank"
              rel="noreferrer"
              className="text-slate-700 hover:underline"
            >
              • {link.label}
            </a>
          ))}
        </div>
      </header>

      {/* Summary */}
      {profile.summary && (
        <section className="mb-5">
          <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
            About & Profile
          </h2>
          <p className="text-xs sm:text-sm leading-relaxed text-slate-700 font-normal">
            {profile.summary}
          </p>
        </section>
      )}

      {/* Experience */}
      {profile.experience.length > 0 && (
        <section className="mb-5">
          <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-3 pb-1 border-b border-slate-100 flex items-center justify-between">
            <span>Work Experience</span>
            <span className="text-[10px] text-slate-400 font-mono">CAREER / INTERNSHIP</span>
          </h2>
          <div className="space-y-4">
            {profile.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline text-xs sm:text-sm">
                  <div>
                    <span className="font-bold text-slate-900">{exp.role}</span>
                    <span className="text-slate-600 font-medium"> @ {exp.company}</span>
                  </div>
                  <span className="text-[11px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                    {exp.start} — {exp.current ? "Present" : exp.end}
                  </span>
                </div>
                <ul className="list-disc list-outside ml-4 text-xs mt-1.5 space-y-1 text-slate-700 leading-relaxed">
                  {exp.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Selected Projects */}
      {profile.projects.length > 0 && (
        <section className="mb-5">
          <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-3 pb-1 border-b border-slate-100 flex items-center justify-between">
            <span>Key Projects & Builds</span>
            <span className="text-[10px] text-slate-400 font-mono">SELECTED WORKS</span>
          </h2>
          <div className="space-y-3.5">
            {profile.projects.map((proj) => (
              <div key={proj.id} className="text-xs">
                <div className="flex justify-between items-baseline font-bold text-slate-900">
                  <span className="text-sm">{proj.title}</span>
                  {proj.url && (
                    <a
                      href={proj.url}
                      target="_blank"
                      rel="noreferrer"
                      className="font-normal text-slate-500 hover:text-slate-900 underline text-[11px]"
                    >
                      {proj.url.replace(/^https?:\/\//, "")} ↗
                    </a>
                  )}
                </div>
                <p className="text-slate-600 mt-1 leading-relaxed">{proj.desc}</p>
                <div className="flex flex-wrap gap-1.5 mt-1.5">
                  {proj.tech.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-mono text-[10px]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {profile.education.length > 0 && (
        <section className="mb-5">
          <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-3 pb-1 border-b border-slate-100">
            Education
          </h2>
          <div className="space-y-2.5">
            {profile.education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-baseline text-xs">
                <div>
                  <span className="font-bold text-slate-900 text-sm block">{edu.school}</span>
                  <span className="text-slate-600">
                    {edu.degree} {edu.field && `in ${edu.field}`}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-slate-500 font-mono text-[11px]">
                    {edu.start} — {edu.end || "Present"}
                  </span>
                  {edu.grade && (
                    <span className="block font-semibold text-emerald-700 text-[11px]">
                      {edu.gradeType || "Grade"}: {edu.grade}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills Matrix */}
      {profile.skills.length > 0 && (
        <section className="mb-4">
          <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 pb-1 border-b border-slate-100">
            Skills & Technologies
          </h2>
          <div className="flex flex-wrap gap-1.5 text-xs">
            {profile.skills.map((s) => (
              <span
                key={s.id}
                className="px-2.5 py-1 bg-slate-50 border border-slate-200/80 rounded-md text-slate-700 text-xs font-medium"
              >
                {s.name}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export function CompactResume({ profile }: { profile: Profile }) {
  return (
    <div className="font-sans text-slate-900 leading-tight p-6 sm:p-10 max-w-[210mm] mx-auto bg-white min-h-[297mm] shadow-card print:shadow-none print:p-0 print:m-0 print:max-w-none print:w-full text-xs">
      {/* Header */}
      <header className="border-b-2 border-slate-900 pb-3 mb-4 flex justify-between items-end">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-950">
            {profile.basics.name}
          </h1>
          <p className="text-xs font-semibold text-slate-700 mt-0.5">
            {profile.basics.headline}
          </p>
        </div>
        <div className="text-right text-[11px] text-slate-600 font-mono">
          <div>
            {profile.basics.email} {profile.basics.phone && `· ${profile.basics.phone}`}
          </div>
          <div>{profile.basics.location}</div>
        </div>
      </header>

      {/* Education */}
      {profile.education.length > 0 && (
        <section className="mb-3.5">
          <h2 className="text-[10px] font-bold uppercase tracking-widest text-slate-500 border-b border-slate-200 pb-0.5 mb-1.5">
            EDUCATION
          </h2>
          {profile.education.map((edu) => (
            <div key={edu.id} className="flex justify-between mb-1">
              <span>
                <strong className="text-slate-900">{edu.school}</strong> — {edu.degree}{" "}
                {edu.field && `(${edu.field})`}
              </span>
              <span className="text-slate-600 font-mono text-[10px]">
                {edu.start}–{edu.end} {edu.grade && `[${edu.grade}]`}
              </span>
            </div>
          ))}
        </section>
      )}

      {/* Experience */}
      {profile.experience.length > 0 && (
        <section className="mb-3.5">
          <h2 className="text-[10px] font-bold uppercase tracking-widest text-slate-500 border-b border-slate-200 pb-0.5 mb-1.5">
            EXPERIENCE
          </h2>
          {profile.experience.map((e) => (
            <div key={e.id} className="mb-2">
              <div className="flex justify-between font-semibold text-slate-900">
                <span>
                  {e.role}, <span className="font-normal text-slate-700">{e.company}</span>
                </span>
                <span className="text-slate-500 font-mono text-[10px]">
                  {e.start}–{e.current ? "Present" : e.end}
                </span>
              </div>
              <ul className="list-disc list-outside ml-3.5 text-[11px] text-slate-700 space-y-0.5 mt-0.5">
                {e.bullets.map((b, idx) => (
                  <li key={idx}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      )}

      {/* Projects */}
      {profile.projects.length > 0 && (
        <section className="mb-3.5">
          <h2 className="text-[10px] font-bold uppercase tracking-widest text-slate-500 border-b border-slate-200 pb-0.5 mb-1.5">
            PROJECTS
          </h2>
          {profile.projects.map((p) => (
            <div key={p.id} className="mb-1.5">
              <span className="font-bold text-slate-900">{p.title}: </span>
              <span className="text-slate-700">{p.desc} </span>
              <span className="text-slate-500 font-mono text-[10px]">
                [{p.tech.join(", ")}]
              </span>
            </div>
          ))}
        </section>
      )}

      {/* Skills */}
      {profile.skills.length > 0 && (
        <section className="mb-3">
          <h2 className="text-[10px] font-bold uppercase tracking-widest text-slate-500 border-b border-slate-200 pb-0.5 mb-1">
            TECHNICAL SKILLS
          </h2>
          <div className="text-slate-800 text-[11px] leading-relaxed">
            {profile.skills.map((s) => s.name).join(" · ")}
          </div>
        </section>
      )}
    </div>
  );
}

export function ResumeView({ profile }: { profile: Profile }) {
  const template = profile.resume?.template || "modern";

  switch (template) {
    case "classic":
      return <ClassicResume profile={profile} />;
    case "compact":
      return <CompactResume profile={profile} />;
    case "modern":
    default:
      return <ModernResume profile={profile} />;
  }
}
