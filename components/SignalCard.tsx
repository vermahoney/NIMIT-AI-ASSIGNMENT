import { ArrowRight, AlertTriangle, CheckCircle2, Lightbulb } from "lucide-react";
import { type Signal } from "@/types/analysis";

const signalMeta = {
  buying_interest: {
    label: "Buying Interest",
    accent: "bg-emerald-500/10 text-emerald-200 border border-emerald-500/20",
    icon: <CheckCircle2 className="h-5 w-5" />,
  },
  objection: {
    label: "Objection",
    accent: "bg-rose-500/10 text-rose-200 border border-rose-500/20",
    icon: <AlertTriangle className="h-5 w-5" />,
  },
  confusion: {
    label: "Confusion",
    accent: "bg-amber-400/10 text-amber-200 border border-amber-400/20",
    icon: <Lightbulb className="h-5 w-5" />,
  },
};

export default function SignalCard({ signal }: { signal: Signal }) {
  const meta = signalMeta[signal.type];

  return (
    <div className="glass-card border-slate-800 p-6">
      <div className="flex items-center justify-between gap-4 pb-4">
        <div className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs font-semibold uppercase tracking-[0.3em] ${meta.accent}`}>
          {meta.icon}
          {meta.label}
        </div>
        <ArrowRight className="h-5 w-5 text-slate-400" />
      </div>
      <div className="space-y-4">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Quote</p>
          <p className="mt-3 text-base leading-7 text-slate-100">“{signal.quote}”</p>
        </div>
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Coaching tip</p>
          <p className="mt-3 rounded-3xl bg-slate-950/90 px-4 py-3 text-sm leading-7 text-slate-200">{signal.tip}</p>
        </div>
      </div>
    </div>
  );
}
