import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { SAMPLE_PROFILES } from "@/seed/sample-profiles";
import { Profile } from "@/lib/types";
import { DynamicStyleRenderer } from "@/styles/DynamicStyleRenderer";
import { ResumeView } from "@/resume/ResumeView";

// Helper to look up profile by username
async function getProfileByUsername(username: string): Promise<Profile | null> {
  const clean = username.toLowerCase().trim();

  // 1. Check sample seed profiles
  for (const key of Object.keys(SAMPLE_PROFILES)) {
    if (SAMPLE_PROFILES[key].username.toLowerCase() === clean) {
      return SAMPLE_PROFILES[key];
    }
  }

  // 2. Fallback sample if user tests any custom slug
  const firstSample = SAMPLE_PROFILES.noir;
  return {
    ...firstSample,
    username: clean,
    basics: {
      ...firstSample.basics,
      name: clean
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" "),
    },
  };
}

export async function generateMetadata({
  params,
}: {
  params: { username: string };
}): Promise<Metadata> {
  const profile = await getProfileByUsername(params.username);
  if (!profile) return { title: "Profile Not Found · DecsCV" };

  const title = profile.seo?.title || `${profile.basics.name} — Portfolio & Resume`;
  const description =
    profile.seo?.description ||
    `${profile.basics.headline}. View full career details, projects, and contact info at cv.decslab.in/${profile.username}.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://cv.decslab.in/${profile.username}`,
      siteName: "DecsCV",
      type: "profile",
    },
  };
}

export default async function PublicProfilePage({
  params,
}: {
  params: { username: string };
}) {
  const profile = await getProfileByUsername(params.username);

  if (!profile || profile.visibility === "draft") {
    notFound();
  }

  // JSON-LD Person Structured Data for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.basics.name,
    jobTitle: profile.basics.headline,
    email: profile.basics.email,
    url: `https://cv.decslab.in/${profile.username}`,
    sameAs: profile.basics.links.map((l) => l.url),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {profile.mode === "resume" ? (
        <div className="min-h-screen bg-gray-100 py-10">
          <ResumeView profile={profile} />
        </div>
      ) : (
        <DynamicStyleRenderer profile={profile} />
      )}
    </>
  );
}
