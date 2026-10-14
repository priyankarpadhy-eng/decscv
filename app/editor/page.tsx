"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/firebase/auth-context";
import { EditorContainer } from "@/components/editor/EditorContainer";
import { Profile } from "@/lib/types";

export default function EditorPage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login?redirect=/editor");
    }
  }, [user, loading, router]);

  const handleSave = async (profile: Profile) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("decscv_draft_profile", JSON.stringify(profile));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-6 h-6 border-2 border-slate-300 border-t-[#6E44FF] rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return <EditorContainer onSave={handleSave} />;
}
