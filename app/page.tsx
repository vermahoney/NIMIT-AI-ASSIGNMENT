import SalesAnalyzer from "@/components/SalesAnalyzer";

export default function Home() {
  return (
    <main className="relative mx-auto flex max-w-7xl flex-col gap-10 pt-10 lg:pt-16">
      <section className="glass-card overflow-hidden p-6 sm:p-8 lg:p-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl space-y-5">
            <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-slate-950/80 px-4 py-2 text-sm text-slate-300 shadow-soft">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
              Live AI Sales Coaching
            </div>
            <div className="space-y-4">
              <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl xl:text-6xl">
                Paste a meeting transcript. Get AI-powered insights.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-300">
                NimitAI scans your transcript for buying intent, objections, and confusion, then turns them into coaching tips your team can act on instantly.
              </p>
            </div>
          </div>
          <div className="grid w-full max-w-sm gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-5 shadow-soft">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Model</p>
              <p className="mt-3 text-2xl font-semibold text-white">Gemini 2.5 Flash</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-5 shadow-soft">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Built with</p>
              <p className="mt-3 text-2xl font-semibold text-white">Next.js + TypeScript</p>
            </div>
          </div>
        </div>
      </section>

      <SalesAnalyzer />
    </main>
  );
}
