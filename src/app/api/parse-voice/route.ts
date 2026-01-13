import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(request: NextRequest) {
  try {
    const { transcript } = await request.json();

    if (!transcript) {
      return NextResponse.json({ error: "Transcript is required" }, { status: 400 });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `
あなたはスキル管理アプリのアシスタントです。以下の音声テキストから、スキル情報を抽出してJSON形式で返してください。

音声テキスト: "${transcript}"

以下のJSON形式で返してください：
{
  "name": "スキル名（例: Next.js, TypeScript）",
  "category": "カテゴリー（Frontend, Backend, Language, Infrastructure のいずれか）",
  "level": レベル（1-5の数値）,
  "experience_months": 経験月数（数値、不明な場合は0）
}

ルール:
- スキル名は技術名のみ抽出（「スキル」「追加」などの余計な単語は除外）
- レベルは1-5の整数（初級=1-2, 中級=3, 上級=4, エキスパート=5）
- カテゴリーは4つのいずれかに分類
- 経験月数が不明な場合は0
- JSONのみを返し、他の説明文は含めない
`;

    // Retry logic for API overload
    let lastError;
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        const result = await model.generateContent(prompt);
        const response = result.response;
        const text = response.text();

        // JSONを抽出（マークダウンコードブロックを除去）
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
          throw new Error("Failed to parse JSON from AI response");
        }

        const skillData = JSON.parse(jsonMatch[0]);
        return NextResponse.json(skillData);
      } catch (error: any) {
        lastError = error;
        // Retry on 503 (service overload) or network errors
        if (error?.status === 503 || error?.message?.includes("overloaded")) {
          if (attempt < 2) {
            await new Promise(resolve => setTimeout(resolve, 1000 * (attempt + 1)));
            continue;
          }
        }
        throw error;
      }
    }

    throw lastError;
  } catch (error) {
    console.error("Error parsing voice:", error);
    return NextResponse.json(
      { error: "Failed to parse voice input" },
      { status: 500 }
    );
  }
}
