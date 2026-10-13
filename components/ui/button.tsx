import React from "react";
import { CircleNotch } from "@phosphor-icons/react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "coral" | "emerald" | "ghost" | "danger" | "acid";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  icon,
  className = "",
  disabled,
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-sans font-medium transition-all duration-150 select-none rounded-xl focus:outline-none focus:ring-4 focus:ring-[#6E44FF]/15 active:scale-[0.98]";

  const sizeStyles = {
    sm: "px-3 py-1.5 text-xs rounded-lg gap-1.5",
    md: "px-4 py-2.5 text-sm rounded-xl gap-2",
    lg: "px-6 py-3 text-base rounded-xl font-semibold gap-2.5",
  };

  const variantStyles = {
    primary:
      "bg-[#6E44FF] text-white hover:bg-[#5E34E8] shadow-sm shadow-[#6E44FF]/25",
    coral:
      "bg-[#FF5722] text-white hover:bg-[#F44336] shadow-sm shadow-[#FF5722]/25",
    emerald:
      "bg-[#10B981] text-white hover:bg-[#059669] shadow-sm shadow-[#10B981]/25",
    acid:
      "bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100",
    secondary:
      "bg-white text-slate-800 border border-slate-200/80 hover:bg-slate-50 hover:border-slate-300 shadow-sm",
    ghost:
      "bg-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-900",
    danger:
      "bg-rose-50 text-rose-600 border border-rose-200 hover:bg-rose-100 hover:text-rose-700",
  };

  const disabledStyles = disabled || loading ? "opacity-50 pointer-events-none scale-100" : "";

  return (
    <button
      disabled={disabled || loading}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${disabledStyles} ${className}`}
      {...props}
    >
      {loading ? (
        <CircleNotch className="animate-spin" size={size === "sm" ? 14 : 18} />
      ) : icon ? (
        <span className="inline-flex items-center">{icon}</span>
      ) : null}
      {children}
    </button>
  );
};
