"use client";

import React, { useRef, useState, useEffect } from "react";
import { useEditorStore } from "./EditorStore";
import { Profile } from "@/lib/types";
import { DynamicStyleRenderer } from "@/styles/DynamicStyleRenderer";
import { ResumeView } from "@/resume/ResumeView";
import { Laptop, DeviceMobile, FileText, ArrowSquareOut } from "@phosphor-icons/react";

interface PreviewFrameProps {
  profile: Profile;
}

export function PreviewFrame({ profile }: { profile: Profile }) {
  const { deviceFrame, setDeviceFrame } = useEditorStore();
  const isResumeMode = profile.mode === "resume";
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number>(800);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerWidth(entry.contentRect.width);
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex-1 bg-[#F4F5F7] flex flex-col h-full overflow-hidden select-none">
      {/* Device Toolbar */}
      <div className="h-13 sm:h-14 border-b border-slate-200/90 bg-white px-4 sm:px-6 flex items-center justify-between shrink-0 z-10">
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="text-xs font-bold text-slate-800 tracking-tight">
            Live Preview
          </span>
          <span className="hidden sm:inline-flex text-[11px] px-2.5 py-0.5 rounded-full bg-purple-50 text-[#6E44FF] border border-purple-200/70 font-semibold">
            {profile.mode === "resume" ? "A4 Placement Resume" : `Portfolio · ${profile.portfolio.style.toUpperCase()}`}
          </span>
        </div>

        {/* Clean Segmented Device Controls */}
        <div className="flex items-center gap-2">
          <div className="flex items-center p-1 bg-slate-100/90 rounded-xl border border-slate-200/60">
            <button
              onClick={() => setDeviceFrame("laptop")}
              className={`flex items-center gap-1.5 px-2.5 py-1 sm:py-1.5 rounded-lg text-xs transition-all duration-150 ${
                deviceFrame === "laptop"
                  ? "bg-white text-slate-900 shadow-sm font-bold"
                  : "text-slate-500 hover:text-slate-800"
              }`}
              title="Desktop viewport"
            >
              <Laptop size={16} weight={deviceFrame === "laptop" ? "bold" : "regular"} />
              <span className="hidden md:inline text-[11px]">Desktop</span>
            </button>
            <button
              onClick={() => setDeviceFrame("phone")}
              className={`flex items-center gap-1.5 px-2.5 py-1 sm:py-1.5 rounded-lg text-xs transition-all duration-150 ${
                deviceFrame === "phone"
                  ? "bg-white text-slate-900 shadow-sm font-bold"
                  : "text-slate-500 hover:text-slate-800"
              }`}
              title="Mobile phone viewport"
            >
              <DeviceMobile size={16} weight={deviceFrame === "phone" ? "bold" : "regular"} />
              <span className="hidden md:inline text-[11px]">Mobile</span>
            </button>
            {isResumeMode && (
              <button
                onClick={() => setDeviceFrame("a4")}
                className={`flex items-center gap-1.5 px-2.5 py-1 sm:py-1.5 rounded-lg text-xs transition-all duration-150 ${
                  deviceFrame === "a4"
                    ? "bg-white text-slate-900 shadow-sm font-bold"
                    : "text-slate-500 hover:text-slate-800"
                }`}
                title="A4 Sheet format"
              >
                <FileText size={16} weight={deviceFrame === "a4" ? "bold" : "regular"} />
                <span className="hidden md:inline text-[11px]">A4</span>
              </button>
            )}
          </div>

          {/* New Tab Quick Preview Link */}
          {profile.username && (
            <a
              href={`/${profile.username}`}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors"
              title="Open full page in new tab"
            >
              <ArrowSquareOut size={17} weight="bold" />
            </a>
          )}
        </div>
      </div>

      {/* Frame Canvas */}
      <div
        ref={containerRef}
        className="flex-1 overflow-auto p-3 sm:p-6 lg:p-8 flex items-start justify-center bg-[#F4F5F7]"
      >
        {deviceFrame === "phone" ? (
          /* Mobile Phone Frame - Responsive to fit height without clipping */
          <div className="w-[360px] sm:w-[375px] max-w-full h-[680px] sm:h-[740px] bg-slate-900 rounded-[38px] p-2.5 shadow-float border border-slate-700/60 shrink-0 relative flex flex-col my-auto">
            {/* Dynamic Island Pill */}
            <div className="absolute top-3.5 left-1/2 -translate-x-1/2 w-24 h-4 bg-black rounded-full z-30" />
            <div className="w-full h-full bg-white rounded-[30px] overflow-y-auto overflow-x-hidden relative shadow-inner">
              {isResumeMode ? <ResumeView profile={profile} /> : <DynamicStyleRenderer profile={profile} />}
            </div>
          </div>
        ) : deviceFrame === "a4" ? (
          /* A4 Resume Sheet - Scaled neatly if container is narrower than 210mm */
          <div className="w-full max-w-[210mm] bg-white border border-slate-200/90 rounded-2xl shadow-card overflow-hidden shrink-0 my-auto">
            <ResumeView profile={profile} />
          </div>
        ) : (
          /* Fluid Desktop Canvas - Fits seamlessly without awkward horizontal scrollbars */
          <div className="w-full h-full max-w-6xl rounded-2xl border border-slate-200/90 shadow-card bg-white overflow-hidden flex flex-col shrink-0 min-h-[500px]">
            {/* Minimalist Browser Tab Bar */}
            <div className="bg-slate-50/90 px-4 py-2.5 border-b border-slate-200/80 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
              </div>
              <div className="text-[11px] font-mono text-slate-500 bg-white px-3.5 py-1 rounded-lg border border-slate-200/80 max-w-[280px] truncate shadow-2xs">
                cv.decslab.in/{profile.username || "preview"}
              </div>
              <div className="w-6" />
            </div>

            {/* Inner Viewport */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden">
              {isResumeMode ? <ResumeView profile={profile} /> : <DynamicStyleRenderer profile={profile} />}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
