export type SignalType = "buying_interest" | "objection" | "confusion";

export interface Signal {
  type: SignalType;
  quote: string;
  tip: string;
}

export interface AnalysisResponse {
  signals: Signal[];
}

export interface AnalyseRequestBody {
  transcript: string;
}
