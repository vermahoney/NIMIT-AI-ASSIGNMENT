import { type ReactNode } from "react";

interface AnalyticsCardProps {
  label: string;
  value: number;
  icon: ReactNode;
  accent: string;
}

export default function AnalyticsCard({ label, value, icon, accent }: AnalyticsCardProps) {
  return (
    <div className="glass-card p-5">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className={`flex h-11 w-11 items-center justify-center rounded-2xl ${accent} bg-white/10 text-white`}>{icon}</div>
          <div>
            <p className="text-sm text-slate-400">{label}</p>
            <p className="mt-1 text-3xl font-semibold text-white">{value}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
