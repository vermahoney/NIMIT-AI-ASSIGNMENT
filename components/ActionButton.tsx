import { type ButtonHTMLAttributes, type ReactNode } from "react";

interface ActionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  icon?: ReactNode;
}

export default function ActionButton({ label, icon, className = "", ...props }: ActionButtonProps) {
  return (
    <button
      type="button"
      className={
        "inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-slate-100 shadow-lg shadow-slate-950/20 transition hover:-translate-y-0.5 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60 " +
        className
      }
      {...props}
    >
      {icon}
      {label}
    </button>
  );
}
