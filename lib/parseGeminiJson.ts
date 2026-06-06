import { AnalysisResponse } from "@/types/analysis";

export function parseGeminiJson(raw: string): AnalysisResponse {
  const trimmed = raw.trim();
  if (!trimmed) {
    throw new Error("Empty AI response.");
  }

  const jsonString = trimmed.replace(/^[^\{\[]*/, "").replace(/[^\}\]]*$/, "");

  let parsed: unknown;
  try {
    parsed = JSON.parse(jsonString);
  } catch (error) {
    throw new Error("AI output was not valid JSON.");
  }

  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    throw new Error("AI response is not an object.");
  }

  const candidate = parsed as AnalysisResponse;
  if (!Array.isArray(candidate.signals)) {
    throw new Error("Missing signals array.");
  }

  for (const signal of candidate.signals) {
    if (typeof signal !== "object" || signal === null) {
      throw new Error("Invalid signal entry.");
    }
    if (!["buying_interest", "objection", "confusion"].includes((signal as any).type)) {
      throw new Error("Signal type must be buying_interest, objection, or confusion.");
    }
    if (typeof (signal as any).quote !== "string" || typeof (signal as any).tip !== "string") {
      throw new Error("Signal quote and tip must be strings.");
    }
  }

  return candidate;
}
