import { create } from "zustand";

export type EditorStepId =
  | "mode"
  | "basics"
  | "about"
  | "experience"
  | "education"
  | "projects"
  | "skills"
  | "extras"
  | "style"
  | "publish";

export type DeviceFrame = "laptop" | "phone" | "a4";

interface EditorState {
  currentStep: EditorStepId;
  setCurrentStep: (step: EditorStepId) => void;
  deviceFrame: DeviceFrame;
  setDeviceFrame: (frame: DeviceFrame) => void;
  mobileView: "form" | "preview";
  setMobileView: (view: "form" | "preview") => void;
  saveStatus: "saved" | "saving" | "unsaved";
  setSaveStatus: (status: "saved" | "saving" | "unsaved") => void;
  lastSavedTime: string | null;
  setLastSavedTime: (time: string) => void;
  showShortcutsModal: boolean;
  setShowShortcutsModal: (show: boolean) => void;
}

export const useEditorStore = create<EditorState>((set) => ({
  currentStep: "basics",
  setCurrentStep: (step) => set({ currentStep: step }),
  deviceFrame: "laptop",
  setDeviceFrame: (frame) => set({ deviceFrame: frame }),
  mobileView: "form",
  setMobileView: (view) => set({ mobileView: view }),
  saveStatus: "saved",
  setSaveStatus: (status) => set({ saveStatus: status }),
  lastSavedTime: null,
  setLastSavedTime: (time) => set({ lastSavedTime: time }),
  showShortcutsModal: false,
  setShowShortcutsModal: (show) => set({ showShortcutsModal: show }),
}));
