"use client";

import React from "react";
import { useEditorStore } from "./EditorStore";
import { Profile } from "@/lib/types";
import { DynamicStyleRenderer } from "@/styles/DynamicStyleRenderer";
import { ResumeView } from "@/resume/ResumeView";
import { Laptop, DeviceMobile, FileText } from "@phosphor-icons/react";

interface PreviewFrameProps {
  profile: Profile;
}

export function PreviewFrame({ profile }: { profile: Profile }) {
  const { deviceFrame, setDeviceFrame } = useEditorStore();

  const isResumeMode = profile.mode === "resume";

  return (
    <div className="flex-1 bg-[#F8F9FA] flex flex-col h-full overflow-hidden select-none">
      {/* Device Toolbar */}
      <div className="h-14 border-b border-slate-200/80 bg-white px-6 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="text-xs font-semibold text-slate-700">
            Live Preview
          </span>
          <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200/70 font-medium">
            {profile.mode === "resume" ? "Resume View" : `Portfolio · ${profile.portfolio.style.toUpperCase()}`}
          </span>
        </div>

        {/* Clean Segmented Device Controls */}
        <div className="flex items-center p-1 bg-slate-100 rounded-xl">
          <button
            onClick={() => setDeviceFrame("laptop")}
            className={`p-1.5 rounded-lg transition-all duration-150 ${
              deviceFrame === "laptop"
                ? "bg-white text-slate-900 shadow-sm font-semibold"
                : "text-slate-500 hover:text-slate-800"
            }`}
            title="Desktop laptop view"
          >
            <Laptop size={17} weight={deviceFrame === "laptop" ? "bold" : "regular"} />
          </button>
          <button
            onClick={() => setDeviceFrame("phone")}
            className={`p-1.5 rounded-lg transition-all duration-150 ${
              deviceFrame === "phone"
                ? "bg-white text-slate-900 shadow-sm font-semibold"
                : "text-slate-500 hover:text-slate-800"
            }`}
            title="Mobile phone view"
          >
            <DeviceMobile size={17} weight={deviceFrame === "phone" ? "bold" : "regular"} />
          </button>
          {isResumeMode && (
            <button
              onClick={() => setDeviceFrame("a4")}
              className={`p-1.5 rounded-lg transition-all duration-150 ${
                deviceFrame === "a4"
                  ? "bg-white text-slate-900 shadow-sm font-semibold"
                  : "text-slate-500 hover:text-slate-800"
              }`}
              title="A4 Sheet (Print preview)"
            >
              <FileText size={17} weight={deviceFrame === "a4" ? "bold" : "regular"} />
            </button>
          )}
        </div>
      </div>

      {/* Frame Canvas */}
      <div className="flex-1 overflow-auto p-6 sm:p-10 flex items-start justify-center bg-subtle-grid">
        {deviceFrame === "phone" ? (
          /* Mobile Phone Frame */
          <div className="w-[375px] h-[780px] bg-slate-900 rounded-[44px] p-3 shadow-float border border-slate-700/50 shrink-0 relative flex flex-col">
            {/* Dynamic Island / Notch */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-4.5 bg-black rounded-full z-30" />
            <div className="w-full h-full bg-white rounded-[36px] overflow-y-auto overflow-x-hidden relative shadow-inner">
              {isResumeMode ? <ResumeView profile={profile} /> : <DynamicStyleRenderer profile={profile} />}
            </div>
          </div>
        ) : deviceFrame === "a4" ? (
          /* A4 Resume Sheet */
          <div className="w-[210mm] min-h-[297mm] bg-white border border-slate-200/90 rounded-xl shadow-float overflow-hidden shrink-0">
            <ResumeView profile={profile} />
          </div>
        ) : (
          /* Desktop Laptop Device Frame */
          <div className="w-full max-w-5xl rounded-2xl border border-slate-200/90 shadow-float bg-white overflow-hidden flex flex-col shrink-0 min-h-[700px]">
            {/* Minimalist Browser Tab Header */}
            <div className="bg-slate-50 px-4 py-2.5 border-b border-slate-200/80 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              </div>
              <div className="text-xs text-slate-500 bg-white px-4 py-1 rounded-lg border border-slate-200/80 w-72 text-center truncate shadow-sm">
                cv.decslab.in/{profile.username || "preview"}
              </div>
              <div className="w-10" />
            </div>
            {/* Rendered View */}
            <div className="flex-1 overflow-y-auto max-h-[750px]">
              {isResumeMode ? <ResumeView profile={profile} /> : <DynamicStyleRenderer profile={profile} />}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
