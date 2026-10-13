import React from "react";
import Link from "next/link";
import { LandingHero } from "@/components/landing/LandingHero";
import { MarqueeStrip, StyleGallerySection } from "@/components/landing/StyleGallerySection";
import { HowItWorksSection, ResumeFeatureSection } from "@/components/landing/HowItWorksSection";
import { ExamplesWall, FaqSection, Footer } from "@/components/landing/ExamplesWall";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";

export const metadata = {
  title: "DecsCV — One form → resume OR portfolio website",
  description:
    "Build a stunning portfolio website with 8 visual engines or an ATS-safe A4 resume from a single guided form. Free public link at cv.decslab.in/{username}.",
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#F8F9FA] text-slate-900 font-sans flex flex-col">
      {/* Sticky Top Navigation */}
      <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-6 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 font-display text-sm font-bold text-slate-900 tracking-tight"
          >
            <span className="w-7 h-7 rounded-lg bg-[#6E44FF] text-white flex items-center justify-center font-extrabold text-xs shadow-sm shadow-[#6E44FF]/25">
              D
            </span>
            <span>decs/cv</span>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-xs font-semibold text-slate-600 hover:text-slate-900 px-3 py-2 rounded-xl transition-colors"
            >
              Log in
            </Link>
            <Link
              href="/editor"
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-xl bg-[#6E44FF] text-white shadow-sm shadow-[#6E44FF]/25 hover:bg-[#5E34E8] active:scale-95 transition-all"
            >
              <span>Make mine</span>
              <ArrowRight size={13} weight="bold" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero with interactive name input & live preview */}
      <LandingHero />

      {/* Marquee strip */}
      <MarqueeStrip />

      {/* 8-Engine Style Gallery */}
      <StyleGallerySection />

      {/* How it works */}
      <HowItWorksSection />

      {/* A4 Resume printing feature */}
      <ResumeFeatureSection />

      {/* Community examples wall */}
      <ExamplesWall />

      {/* FAQ */}
      <FaqSection />

      {/* Footer */}
      <Footer />
    </div>
  );
}
