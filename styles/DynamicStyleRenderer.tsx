"use client";

import React from "react";
import dynamic from "next/dynamic";
import { Profile, StyleId } from "@/lib/types";

// Dynamic imports with lazy loading per style
const NoirStyle = dynamic(() => import("./noir"), { ssr: true });
const PaperStyle = dynamic(() => import("./paper"), { ssr: true });
const TerminalStyle = dynamic(() => import("./terminal"), { ssr: true });
const BentoStyle = dynamic(() => import("./bento"), { ssr: true });
const BrutalStyle = dynamic(() => import("./brutal"), { ssr: true });
const GazetteStyle = dynamic(() => import("./gazette"), { ssr: true });
const ArcadeStyle = dynamic(() => import("./arcade"), { ssr: true });
const BlueprintStyle = dynamic(() => import("./blueprint"), { ssr: true });

export function DynamicStyleRenderer({ profile }: { profile: Profile }) {
  const styleId: StyleId = profile.portfolio.style || "noir";

  switch (styleId) {
    case "noir":
      return <NoirStyle profile={profile} />;
    case "paper":
      return <PaperStyle profile={profile} />;
    case "terminal":
      return <TerminalStyle profile={profile} />;
    case "bento":
      return <BentoStyle profile={profile} />;
    case "brutal":
      return <BrutalStyle profile={profile} />;
    case "gazette":
      return <GazetteStyle profile={profile} />;
    case "arcade":
      return <ArcadeStyle profile={profile} />;
    case "blueprint":
      return <BlueprintStyle profile={profile} />;
    default:
      return <NoirStyle profile={profile} />;
  }
}
