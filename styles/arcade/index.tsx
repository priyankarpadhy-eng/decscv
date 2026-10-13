"use client";

import React, { useState, useEffect } from "react";
import { Profile } from "@/lib/types";
import { SpeakerHigh, SpeakerSlash, Trophy, Sword, GameController } from "@phosphor-icons/react";

export default function ArcadeStyle({ profile }: { profile: Profile }) {
  const accent = profile.portfolio.accent || "#FFD23F";
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [easterEggActive, setEasterEggActive] = useState(false);
  const [konamiSeq, setKonamiSeq] = useState<string[]>([]);

  // Synthesize 8-bit sound blip via WebAudio
  const playBlip = (freq = 440, type: OscillatorType = "square") => {
    if (!soundEnabled || typeof window === "undefined") return;
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.15);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.15);
    } catch {
      // AudioContext unavailable
    }
  };

  // Konami Code listener
  useEffect(() => {
    const konamiTarget = [
      "ArrowUp",
      "ArrowUp",
      "ArrowDown",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
      "ArrowLeft",
      "ArrowRight",
      "b",
      "a",
    ];

    const handleKey = (e: KeyboardEvent) => {
      setKonamiSeq((prev) => {
        const updated = [...prev, e.key].slice(-10);
        if (updated.join(",") === konamiTarget.join(",")) {
          setEasterEggActive(true);
          playBlip(880);
        }
        return updated;
      });
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [soundEnabled]);

  const scrollToContent = () => {
    playBlip(600);
    document.getElementById("arcade-main")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      className="min-h-screen bg-[#1A1033] text-[#F5F3FF] font-mono selection:bg-[#FFD23F] selection:text-black overflow-x-hidden"
      style={
        {
          "--accent": accent,
          "--font-arcade": "var(--font-arcade)",
          "--font-vt323": "var(--font-vt323)",
        } as React.CSSProperties
      }
    >
      {/* Sound toggle floating */}
      <div className="fixed top-4 right-4 z-40">
        <button
          onClick={() => {
            setSoundEnabled(!soundEnabled);
            if (!soundEnabled) playBlip(520);
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-black/60 border border-[#FFD23F] text-xs text-[#FFD23F] hover:bg-[#FFD23F] hover:text-black transition-colors"
        >
          {soundEnabled ? <SpeakerHigh size={16} /> : <SpeakerSlash size={16} />}
          <span>8-BIT AUDIO: {soundEnabled ? "ON" : "OFF"}</span>
        </button>
      </div>

      {easterEggActive && (
        <div className="bg-[#EE4266] text-black font-bold text-center py-2 text-xs uppercase animate-pulse">
          ★ CHEAT CODE ACTIVATED: GOD MODE BUILDER LEVEL 99 ★
        </div>
      )}

      {/* Hero: 8-Bit Title Screen */}
      <section className="min-h-[85vh] flex flex-col items-center justify-center p-6 text-center gap-6 border-b-4 border-[#FFD23F]/30">
        <div className="text-xs text-[#3BCEAC] uppercase tracking-widest flex items-center gap-2">
          <GameController size={20} />
          <span>PLAYER 1: READY</span>
        </div>

        <h1 className="font-arcade text-3xl sm:text-5xl md:text-6xl text-[#FFD23F] leading-tight tracking-wider uppercase drop-shadow-[4px_4px_0_#EE4266]">
          {profile.basics.name}
        </h1>

        <p className="font-vt323 text-2xl sm:text-3xl text-white/90 max-w-xl">
          {profile.basics.headline}
        </p>

        <button
          onClick={scrollToContent}
          className="mt-8 px-6 py-3 bg-[#EE4266] text-white font-arcade text-xs sm:text-sm uppercase tracking-widest border-2 border-white shadow-[4px_4px_0_#FFD23F] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all animate-bounce"
        >
          ► PRESS START TO BEGIN
        </button>
      </section>

      {/* Main Content Area */}
      <main id="arcade-main" className="max-w-4xl mx-auto p-6 sm:p-10 flex flex-col gap-16">
        {/* Quest Log (Experience) */}
        {profile.experience.length > 0 && (
          <section className="flex flex-col gap-6">
            <div className="flex items-center gap-2 border-b-2 border-[#3BCEAC] pb-2 text-[#3BCEAC]">
              <Sword size={22} />
              <h2 className="font-arcade text-base sm:text-lg uppercase">QUEST LOG (EXP)</h2>
            </div>
            <div className="space-y-6">
              {profile.experience.map((e) => (
                <div
                  key={e.id}
                  onClick={() => playBlip(480)}
                  className="border-2 border-white/20 bg-black/40 p-5 rounded hover:border-[#3BCEAC] transition-colors"
                >
                  <div className="flex justify-between items-baseline flex-wrap gap-2 text-sm text-[#FFD23F]">
                    <span className="font-bold">✓ {e.role}</span>
                    <span className="text-xs text-white/50">{e.company} [{e.start}–{e.current ? "ACTIVE" : e.end}]</span>
                  </div>
                  <ul className="mt-3 space-y-1 text-xs text-white/80 list-disc list-inside">
                    {e.bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skill Stat Bars */}
        {profile.skills.length > 0 && (
          <section className="flex flex-col gap-6">
            <div className="flex items-center gap-2 border-b-2 border-[#EE4266] pb-2 text-[#EE4266]">
              <Trophy size={22} />
              <h2 className="font-arcade text-base sm:text-lg uppercase">CHARACTER STATS</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {profile.skills.map((sk) => {
                const lvl = sk.level || 4;
                return (
                  <div key={sk.id} className="border border-white/20 p-3 bg-black/30 rounded flex flex-col gap-1">
                    <div className="flex justify-between text-xs text-white">
                      <span>{sk.name}</span>
                      <span className="text-[#FFD23F]">LVL {lvl * 20}</span>
                    </div>
                    <div className="w-full bg-white/10 h-3 rounded overflow-hidden flex">
                      <div
                        className="bg-[#3BCEAC] h-full"
                        style={{ width: `${lvl * 20}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Level Select (Projects) */}
        {profile.projects.length > 0 && (
          <section className="flex flex-col gap-6">
            <h2 className="font-arcade text-base sm:text-lg uppercase text-[#FFD23F] border-b-2 border-[#FFD23F] pb-2">
              LEVEL SELECT (PROJECTS)
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {profile.projects.map((proj, idx) => (
                <div
                  key={proj.id}
                  onClick={() => playBlip(560)}
                  className="border-2 border-[#FFD23F]/50 bg-black/50 p-5 rounded flex flex-col justify-between hover:border-[#FFD23F] transition-all"
                >
                  <div>
                    <span className="font-arcade text-[10px] text-[#3BCEAC] block mb-1">
                      WORLD 1-{idx + 1}
                    </span>
                    <h3 className="text-lg font-bold text-white mb-2">{proj.title}</h3>
                    <p className="text-xs text-white/70 leading-relaxed mb-4">{proj.desc}</p>
                  </div>
                  <div className="flex justify-between items-center pt-3 border-t border-white/10 text-xs">
                    <span className="text-[#EE4266]">{proj.tech.slice(0, 3).join(" · ")}</span>
                    {proj.url && (
                      <a
                        href={proj.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[#FFD23F] underline font-bold"
                      >
                        PLAY ↗
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* High Score / Contact */}
        <footer className="border-t-2 border-white/20 pt-8 text-center flex flex-col gap-4 text-xs">
          <div className="font-arcade text-sm text-[#3BCEAC]">HIGH SCORE: CONTACT ME</div>
          <div className="text-white/80">{profile.basics.email}</div>
          <div className="flex justify-center gap-4 text-white/50">
            {profile.basics.links.map((l, i) => (
              <a key={i} href={l.url} target="_blank" rel="noreferrer" className="underline hover:text-[#FFD23F]">
                {l.label}
              </a>
            ))}
          </div>
        </footer>
      </main>
    </div>
  );
}
