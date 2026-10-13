import React from "react";
import { Profile, SectionId } from "../lib/types";

interface SectionRendererProps {
  profile: Profile;
  renderSection: (sectionId: SectionId) => React.ReactNode;
}

export const SectionRenderer: React.FC<SectionRendererProps> = ({ profile, renderSection }) => {
  // Sort sections by order and filter visible
  const orderedSections = [...profile.sections]
    .filter((s) => s.visible)
    .sort((a, b) => a.order - b.order);

  return (
    <>
      {orderedSections.map((s) => (
        <React.Fragment key={s.id}>{renderSection(s.id)}</React.Fragment>
      ))}
    </>
  );
};
