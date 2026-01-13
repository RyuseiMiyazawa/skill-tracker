import { NextRequest, NextResponse } from "next/server";
import { getSkills, createSkill } from "@/lib/data";
import { createSkillSchema } from "@/lib/validation";

// GET /api/skills - 全件取得
export async function GET() {
  const skills = await getSkills();
  return NextResponse.json(skills);
}

// POST /api/skills - 新規作成
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = createSkillSchema.parse(body) as {
      name: string;
      level: 1 | 2 | 3 | 4 | 5;
      category: string;
      experience_months: number;
    };
    const newSkill = await createSkill(validatedData);
    return NextResponse.json(newSkill, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
