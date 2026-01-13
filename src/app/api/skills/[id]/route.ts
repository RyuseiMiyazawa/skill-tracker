import { NextRequest, NextResponse } from "next/server";
import { getSkillById, updateSkill, deleteSkill } from "@/lib/data";
import { updateSkillSchema } from "@/lib/validation";

type Params = Promise<{ id: string }>;

// GET /api/skills/:id - 単一取得
export async function GET(request: NextRequest, { params }: { params: Params }) {
  const { id } = await params;
  const skill = await getSkillById(id);

  if (!skill) {
    return NextResponse.json({ error: "Skill not found" }, { status: 404 });
  }

  return NextResponse.json(skill);
}

// PATCH /api/skills/:id - 更新
export async function PATCH(request: NextRequest, { params }: { params: Params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const validatedData = updateSkillSchema.parse(body) as Partial<{
      name: string;
      level: 1 | 2 | 3 | 4 | 5;
      category: string;
      experience_months: number;
    }>;
    const updatedSkill = await updateSkill(id, validatedData);

    if (!updatedSkill) {
      return NextResponse.json({ error: "Skill not found" }, { status: 404 });
    }

    return NextResponse.json(updatedSkill);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}

// DELETE /api/skills/:id - 削除
export async function DELETE(request: NextRequest, { params }: { params: Params }) {
  const { id } = await params;
  const success = await deleteSkill(id);

  if (!success) {
    return NextResponse.json({ error: "Skill not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "Skill deleted" }, { status: 200 });
}
