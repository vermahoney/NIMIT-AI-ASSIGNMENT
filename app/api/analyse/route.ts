import { NextResponse } from "next/server";
import OpenAI from "openai";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { parseGeminiJson } from "@/lib/parseGeminiJson";
import type { AnalyseRequestBody } from "@/types/analysis";

export async function POST(req: Request) {
  const openAIKey = process.env.OPENAI_API_KEY?.trim();
  const geminiKey = process.env.GEMINI_API_KEY?.trim();
  const apiKey = openAIKey ?? geminiKey;
  const provider = openAIKey ? "openai" : geminiKey ? "gemini" : null;

  if (!apiKey || !provider) {
    return NextResponse.json(
      {
        error:
          "API key is missing. Create a .env file and add OPENAI_API_KEY or GEMINI_API_KEY.",
      },
      { status: 500 }
    );
  }

  if (
    apiKey.includes("your_gem") ||
    apiKey.includes("your_openai") ||
    apiKey.includes("your_api_key_here")
  ) {
    return NextResponse.json(
      {
        error:
          "A placeholder API key is still configured. Replace OPENAI_API_KEY or GEMINI_API_KEY in .env with your real key and restart the server.",
      },
      { status: 500 }
    );
  }

  let body: AnalyseRequestBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!body?.transcript || typeof body.transcript !== "string") {
    return NextResponse.json({ error: "Transcript is required." }, { status: 400 });
  }

  const prompt = `You are a sales coach. Read the transcript and return strictly valid JSON only. Do not include any markdown, explanation, or extra text. Output an object with a top-level "signals" array. Each signal must contain:
- type: buying_interest, objection, or confusion
- quote: the exact transcript quote
- tip: a concise coaching recommendation

Transcript:
${body.transcript}

Example reply:
{"signals":[{"type":"buying_interest","quote":"Send me the pricing deck.","tip":"Ask about purchasing timeline."}]}
`;

  try {
    let rawOutput = "";

    if (provider === "openai") {
      const client = new OpenAI({ apiKey });
      const response = await client.responses.create({
        model: "gpt-4.1-mini",
        input: prompt,
        max_output_tokens: 400,
      });

      rawOutput = (response.output_text as string) || "";
    } else {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
      const result = await model.generateContent(prompt);
      rawOutput = result.response.text() || "";
    }

    const data = parseGeminiJson(rawOutput);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Analysis error:", error);
    const message = error instanceof Error ? error.message : "Unexpected error during analysis.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
