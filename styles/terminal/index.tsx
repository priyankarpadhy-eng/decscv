"use client";

import React, { useState, useEffect, useRef } from "react";
import { Profile } from "@/lib/types";

export default function TerminalStyle({ profile }: { profile: Profile }) {
  const accent = profile.portfolio.accent || "#39FF88";
  const [history, setHistory] = useState<string[]>([
    `[SYS_INIT] Loading decs-kernel 6.8.0-generic...`,
    `[ OK ] Mounted profile for @${profile.username}`,
    `[ OK ] User: ${profile.basics.name} (${profile.basics.headline})`,
    `Type "help" or click buttons below to inspect node modules.`,
  ]);
  const [inputVal, setInputVal] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [crtEnabled, setCrtEnabled] = useState(false);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const runCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim().toLowerCase();
    if (!trimmed) return;

    setCommandHistory((prev) => [...prev, cmdStr]);
    setHistoryIndex(-1);

    const newLogs: string[] = [`guest@decscv:~$ ${cmdStr}`];

    switch (trimmed) {
      case "help":
        newLogs.push(
          "Available commands:",
          "  whoami      - Display identity and headline",
          "  about       - Read professional statement",
          "  skills      - Dump ASCII capability matrices",
          "  projects    - Tree listing of built projects",
          "  experience  - Git commit log of career history",
          "  contact     - Reveal verified comms channels",
          "  clear       - Clear screen buffer"
        );
        break;
      case "whoami":
        newLogs.push(
          `ID: ${profile.basics.name}`,
          `HEADLINE: ${profile.basics.headline}`,
          `LOCATION: ${profile.basics.location || "Remote / Global"}`,
          `STATUS: ${profile.basics.availableForWork ? "AVAILABLE FOR HIRE" : "DEPLOYED"}`
        );
        break;
      case "about":
        newLogs.push(profile.summary || "No summary file located in /etc/profile.");
        break;
      case "skills":
        profile.skills.forEach((sk) => {
          const lvl = sk.level || 4;
          const filled = "█".repeat(lvl * 2);
          const empty = "░".repeat(10 - lvl * 2);
          newLogs.push(`  ${sk.name.padEnd(20)} [${filled}${empty}] ${lvl * 20}%`);
        });
        break;
      case "projects":
        profile.projects.forEach((p, idx) => {
          newLogs.push(
            `├── 0${idx + 1}_${p.title.replace(/\s+/g, "_")}`,
            `│   ├── desc: ${p.desc}`,
            `│   ├── stack: ${p.tech.join(", ")}`,
            `│   └── url: ${p.url || p.repo || "n/a"}`
          );
        });
        break;
      case "experience":
        profile.experience.forEach((e) => {
          newLogs.push(
            `commit [${e.start} - ${e.current ? "HEAD" : e.end}]`,
            `Author: ${profile.basics.name} <${e.company}>`,
            `Role: ${e.role}`,
            ...e.bullets.map((b) => `  * ${b}`)
          );
        });
        break;
      case "contact":
        newLogs.push(
          `EMAIL: ${profile.basics.email}`,
          ...profile.basics.links.map((l) => `LINK: ${l.label} -> ${l.url}`)
        );
        break;
      case "clear":
        setHistory([]);
        setInputVal("");
        return;
      default:
        newLogs.push(`bash: command not found: ${trimmed}. Type "help" for options.`);
    }

    setHistory((prev) => [...prev, ...newLogs]);
    setInputVal("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      runCommand(inputVal);
    } else if (e.key === "ArrowUp") {
      if (commandHistory.length > 0) {
        const nextIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(nextIndex);
        setInputVal(commandHistory[nextIndex]);
      }
    } else if (e.key === "ArrowDown") {
      if (historyIndex !== -1) {
        const nextIndex = historyIndex + 1;
        if (nextIndex < commandHistory.length) {
          setHistoryIndex(nextIndex);
          setInputVal(commandHistory[nextIndex]);
        } else {
          setHistoryIndex(-1);
          setInputVal("");
        }
      }
    }
  };

  return (
    <div
      className={`min-h-screen bg-[#0B0F0C] text-[#C9F7D1] font-mono p-4 sm:p-8 flex flex-col justify-center items-center selection:bg-[var(--accent)] selection:text-black ${
        crtEnabled ? "crt-scanlines" : ""
      }`}
      style={{ "--accent": accent } as React.CSSProperties}
    >
      <div className="w-full max-w-4xl border border-[#39FF88]/30 rounded-lg bg-[#070A08] shadow-2xl overflow-hidden flex flex-col h-[85vh] sm:h-[88vh] max-h-[800px]">
        {/* Terminal Titlebar */}
        <div className="bg-[#121914] px-4 py-2.5 flex items-center justify-between border-b border-[#39FF88]/20 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#FF5F56] inline-block" />
            <span className="w-3 h-3 rounded-full bg-[#FFBD2E] inline-block" />
            <span className="w-3 h-3 rounded-full bg-[#27C93F] inline-block" />
            <span className="ml-2 text-white/50 tracking-wider truncate text-[11px] sm:text-xs">
              bash — {profile.username}@decscv:~
            </span>
          </div>
          <button
            onClick={() => setCrtEnabled(!crtEnabled)}
            className="text-[10px] uppercase px-2 py-0.5 border border-white/20 rounded hover:border-[var(--accent)] text-white/70 shrink-0"
          >
            CRT: {crtEnabled ? "ON" : "OFF"}
          </button>
        </div>

        {/* Quick command buttons for mobile / quick tapping */}
        <div className="bg-[#0e1410] px-3 sm:px-4 py-2 border-b border-[#39FF88]/10 flex flex-wrap gap-1.5 text-xs overflow-x-auto no-scrollbar">
          {["whoami", "about", "projects", "skills", "experience", "contact", "clear"].map((c) => (
            <button
              key={c}
              onClick={() => runCommand(c)}
              className="px-2.5 py-1 rounded bg-[#17221b] border border-[#39FF88]/20 hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors text-[11px] shrink-0"
            >
              ${c}
            </button>
          ))}
        </div>

        {/* Console Log Buffer */}
        <div className="p-3 sm:p-6 flex-1 overflow-y-auto space-y-1.5 text-xs sm:text-sm leading-relaxed font-mono">
          {history.map((line, i) => (
            <div key={i} className="whitespace-pre-wrap break-all">
              {line.startsWith("guest@") ? (
                <span className="text-[var(--accent)] font-semibold">{line}</span>
              ) : line.startsWith("[ OK ]") ? (
                <span className="text-[#39FF88]">{line}</span>
              ) : (
                <span>{line}</span>
              )}
            </div>
          ))}
          <div ref={terminalEndRef} />
        </div>

        {/* CLI Input Line */}
        <div className="p-3 sm:p-4 bg-[#0a0f0c] border-t border-[#39FF88]/20 flex items-center gap-2 text-xs sm:text-sm">
          <span className="text-[var(--accent)] font-bold shrink-0">
            <span className="hidden sm:inline">guest@decscv:~</span>$
          </span>
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="type command (e.g. projects, skills, contact)..."
            className="flex-1 bg-transparent border-none text-[#C9F7D1] focus:outline-none placeholder:text-white/20 font-mono text-sm"
            autoFocus
          />
        </div>
      </div>
    </div>
  );
}
