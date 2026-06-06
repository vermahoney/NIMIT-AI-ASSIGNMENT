"use client";

import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, AlertTriangle, ArrowRight, CheckCircle2, Loader2, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import ActionButton from "@/components/ActionButton";
import AnalyticsCard from "@/components/AnalyticsCard";
import EmptyState from "@/components/EmptyState";
import SignalCard from "@/components/SignalCard";
import { SAMPLE_TRANSCRIPT } from "@/lib/sampleTranscript";
import type { AnalysisResponse } from "@/types/analysis";

const defaultPrompt = "Paste your sales meeting transcript here and press Analyze.";

export default function SalesAnalyzer() {
  const [transcript, setTranscript] = useState("");
  const [result, setResult] = useState<AnalysisResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const counts = useMemo(
    () => ({
      total: result?.signals.length ?? 0,
      buyingInterest: result?.signals.filter((signal) => signal.type === "buying_interest").length ?? 0,
      objection: result?.signals.filter((signal) => signal.type === "objection").length ?? 0,
      confusion: result?.signals.filter((signal) => signal.type === "confusion").length ?? 0,
    }),
    [result]
  );

  async function handleAnalyse() {
    if (!transcript.trim()) {
      setError("Please paste a transcript before analyzing.");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch("/api/analyse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transcript }),
      });

      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload?.error || "Unable to analyze the transcript.");
      }

      setResult(payload);
    } catch (error) {
      setError(error instanceof Error ? error.message : String(error));
    } finally {
      setLoading(false);
    }
  }

  function handleUseSample() {
    setTranscript(SAMPLE_TRANSCRIPT);
    setResult(null);
    setError(null);
  }

  function handleClear() {
    setTranscript("");
    setResult(null);
    setError(null);
  }

  return (
    <section className="grid gap-8 xl:grid-cols-[1.4fr_1fr]">
      <div className="glass-card p-6 sm:p-8">
        <div className="flex flex-col gap-4 pb-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-slate-400">Transcript Input</p>
            <h2 className="mt-3 text-2xl font-semibold text-white">Paste your conversation and let the AI surface the most important signals.</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handleUseSample}
              className="rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-sm font-semibold text-slate-200 transition hover:border-slate-200/20 hover:bg-slate-800"
            >
              Sample Transcript
            </button>
            <button
              type="button"
              onClick={handleClear}
              className="rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-sm font-semibold text-slate-200 transition hover:border-slate-200/20 hover:bg-slate-800"
            >
              Clear
            </button>
          </div>
        </div>

        <div className="mt-4">
          <textarea
            value={transcript}
            rows={14}
            onChange={(event) => setTranscript(event.target.value)}
            placeholder={defaultPrompt}
            className="min-h-[18rem] w-full rounded-[2rem] border border-white/10 bg-slate-950/90 px-5 py-4 text-sm leading-7 text-slate-100 outline-none transition focus:border-sky-400/40 focus:ring-2 focus:ring-sky-400/10"
          />
          <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-slate-400">{transcript.length} characters</p>
            <div className="flex flex-wrap gap-3">
              <ActionButton label="Analyze Transcript" onClick={handleAnalyse} disabled={loading} icon={loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />} />
            </div>
          </div>
        </div>

        {error ? (
          <div className="mt-6 rounded-3xl border border-rose-500/20 bg-rose-500/10 p-4 text-sm text-rose-100">
            <div className="flex items-center gap-3">
              <AlertCircle className="h-5 w-5 text-rose-200" />
              <p>{error}</p>
            </div>
          </div>
        ) : null}
      </div>

      <div className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-3">
          <AnalyticsCard label="Total Signals" value={counts.total} icon={<Sparkles className="h-5 w-5" />} accent="bg-sky-500/10" />
          <AnalyticsCard label="Buying Interest" value={counts.buyingInterest} icon={<CheckCircle2 className="h-5 w-5" />} accent="bg-emerald-500/10" />
          <AnalyticsCard label="Objections" value={counts.objection} icon={<AlertTriangle className="h-5 w-5" />} accent="bg-rose-500/10" />
        </div>

        <div className="glass-card p-6 sm:p-8">
          <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Signal dashboard</p>
              <h3 className="mt-2 text-2xl font-semibold text-white">Insights & coaching recommendations</h3>
            </div>
            <p className="text-sm text-slate-400">Results update automatically after analysis.</p>
          </div>

          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="space-y-4">
                {[...Array(3)].map((_, index) => (
                  <div key={index} className="h-28 rounded-3xl bg-slate-900/80 p-5 animate-pulse" />
                ))}
              </motion.div>
            ) : result?.signals.length ? (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-4">
                {result.signals.map((signal, index) => (
                  <SignalCard key={`${signal.type}-${index}`} signal={signal} />
                ))}
              </motion.div>
            ) : (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                <EmptyState message="Start your first analysis to surface buying intent, objections, and confusion in the transcript." />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
