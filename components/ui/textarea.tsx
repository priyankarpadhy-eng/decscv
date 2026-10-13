import React from "react";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
  charCount?: { current: number; max: number };
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, hint, charCount, className = "", id, ...props }, ref) => {
    const textareaId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <div className="flex items-center justify-between text-xs font-sans font-medium text-slate-700">
            <label htmlFor={textareaId}>{label}</label>
            {charCount && (
              <span
                className={`text-[11px] ${
                  charCount.current > charCount.max ? "text-rose-500 font-bold" : "text-slate-400"
                }`}
              >
                {charCount.current}/{charCount.max}
              </span>
            )}
          </div>
        )}
        <textarea
          id={textareaId}
          ref={ref}
          className={`w-full bg-slate-50/70 px-3.5 py-2.5 text-sm font-sans text-slate-900 border rounded-xl transition-all duration-150 placeholder:text-slate-400 focus:bg-white focus:outline-none resize-y min-h-[96px] ${
            error
              ? "border-rose-300 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10"
              : "border-slate-200/90 focus:border-[#6E44FF] focus:ring-4 focus:ring-[#6E44FF]/10"
          } ${className}`}
          {...props}
        />
        {hint && !error && <span className="text-[11px] text-slate-400">{hint}</span>}
        {error && <span className="text-xs text-rose-500 font-medium">{error}</span>}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
