import React from "react";

interface PillProps {
  children: React.ReactNode;
  variant?: "purple" | "emerald" | "amber" | "coral" | "sky" | "neutral" | "ink" | "acid" | "signal";
  size?: "xs" | "sm" | "md";
  className?: string;
  dot?: boolean;
  onClick?: () => void;
}

export const Pill: React.FC<PillProps> = ({
  children,
  variant = "neutral",
  size = "sm",
  dot = false,
  className = "",
  onClick,
}) => {
  const variantStyles = {
    purple: "bg-purple-50 text-purple-700 border border-purple-200/70",
    emerald: "bg-emerald-50 text-emerald-700 border border-emerald-200/70",
    amber: "bg-amber-50 text-amber-700 border border-amber-200/70",
    coral: "bg-orange-50 text-orange-700 border border-orange-200/70",
    sky: "bg-blue-50 text-blue-700 border border-blue-200/70",
    neutral: "bg-slate-100 text-slate-600 border border-slate-200/70",
    ink: "bg-slate-900 text-white border border-slate-900",
    acid: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    signal: "bg-orange-50 text-orange-700 border border-orange-200",
  };

  const dotColors = {
    purple: "bg-purple-500",
    emerald: "bg-emerald-500",
    amber: "bg-amber-500",
    coral: "bg-orange-500",
    sky: "bg-blue-500",
    neutral: "bg-slate-400",
    ink: "bg-white",
    acid: "bg-emerald-500",
    signal: "bg-orange-500",
  };

  const sizeStyles = {
    xs: "px-2 py-0.5 text-[10px]",
    sm: "px-2.5 py-0.5 text-[11px]",
    md: "px-3 py-1 text-xs",
  };

  return (
    <span
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 font-sans font-semibold rounded-full tracking-wide transition-colors ${
        variantStyles[variant]
      } ${sizeStyles[size]} ${
        onClick ? "cursor-pointer hover:opacity-85 active:scale-95" : ""
      } ${className}`}
    >
      {dot && (
        <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${dotColors[variant] || "bg-current"}`} />
      )}
      {children}
    </span>
  );
};

interface StickerProps {
  children: React.ReactNode;
  rotation?: "left" | "right" | "none";
  color?: "purple" | "coral" | "emerald" | "amber" | "acid" | "signal" | "paper" | "sky";
  className?: string;
}

export const Sticker: React.FC<StickerProps> = ({
  children,
  color = "purple",
  className = "",
}) => {
  const colorStyles = {
    purple: "bg-purple-50 text-purple-700 border border-purple-200",
    coral: "bg-orange-50 text-orange-700 border border-orange-200",
    emerald: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    amber: "bg-amber-50 text-amber-700 border border-amber-200",
    acid: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    signal: "bg-orange-50 text-orange-700 border border-orange-200",
    paper: "bg-white text-slate-700 border border-slate-200",
    sky: "bg-blue-50 text-blue-700 border border-blue-200",
  };

  return (
    <div
      className={`inline-flex items-center gap-1.5 rounded-xl text-xs font-semibold px-3 py-1.5 shadow-sm transition-all hover:scale-[1.02] ${colorStyles[color]} ${className}`}
    >
      {children}
    </div>
  );
};
