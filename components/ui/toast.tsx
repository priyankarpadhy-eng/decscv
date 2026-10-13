"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { CheckCircle, WarningCircle, X, ArrowCounterClockwise } from "@phosphor-icons/react";

interface Toast {
  id: string;
  message: string;
  type?: "success" | "error" | "info";
  undoAction?: () => void;
  undoLabel?: string;
  duration?: number;
}

interface ToastContextType {
  showToast: (toast: Omit<Toast, "id">) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((toast: Omit<Toast, "id">) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast: Toast = { ...toast, id };
    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, toast.duration || 5000);
  }, []);

  const dismiss = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 pointer-events-none max-w-sm w-full px-4">
        {toasts.map((t) => (
          <div
            key={t.id}
            className="pointer-events-auto flex items-center justify-between gap-3 bg-white border border-slate-200/90 p-3.5 rounded-2xl shadow-float text-sm font-sans animate-in slide-in-from-bottom-2 duration-150"
          >
            <div className="flex items-center gap-2.5">
              {t.type === "error" ? (
                <div className="w-7 h-7 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                  <WarningCircle size={18} weight="fill" />
                </div>
              ) : (
                <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <CheckCircle size={18} weight="fill" />
                </div>
              )}
              <span className="text-slate-800 font-medium text-xs sm:text-sm">{t.message}</span>
            </div>
            <div className="flex items-center gap-2">
              {t.undoAction && (
                <button
                  onClick={() => {
                    t.undoAction?.();
                    dismiss(t.id);
                  }}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#6E44FF] hover:underline"
                >
                  <ArrowCounterClockwise size={13} weight="bold" />
                  {t.undoLabel || "Undo"}
                </button>
              )}
              <button
                onClick={() => dismiss(t.id)}
                className="text-slate-400 hover:text-slate-600 p-1"
                aria-label="Dismiss toast"
              >
                <X size={15} weight="bold" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return context;
};
