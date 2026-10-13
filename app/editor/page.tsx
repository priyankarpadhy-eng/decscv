"use client";

import React from "react";
import { EditorContainer } from "@/components/editor/EditorContainer";
import { Profile } from "@/lib/types";

export default function EditorPage() {
  const handleSave = async (profile: Profile) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("decscv_draft_profile", JSON.stringify(profile));
    }
  };

  return <EditorContainer onSave={handleSave} />;
}
