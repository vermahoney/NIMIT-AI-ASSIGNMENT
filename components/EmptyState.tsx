import { Sparkles } from "lucide-react";

interface EmptyStateProps {
  message?: string;
}

export default function EmptyState({ message = "Create your first analysis to reveal sales signals, coaching tips, and a clear action plan." }: EmptyStateProps) {
  return (
    <div className="glass-card flex flex-col items-center justify-center gap-4 rounded-[2rem] border-dashed border-slate-700 p-10 text-center text-slate-300">
      <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-slate-900/80 text-slate-100 shadow-soft">
        <Sparkles className="h-8 w-8" />
      </div>
      <div>
        <h2 className="text-xl font-semibold text-white">No signals yet</h2>
        <p className="mt-2 text-sm leading-6 text-slate-400">{message}</p>
      </div>
    </div>
  );
}
