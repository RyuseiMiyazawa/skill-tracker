import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

async function getUserFromRequest(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (!authHeader) return null;

  const token = authHeader.replace("Bearer ", "");
  const { data: { user } } = await supabase.auth.getUser(token);
  return user;
}

export async function GET(request: NextRequest) {
  try {
    const user = await getUserFromRequest(request);
    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const { data, error } = await supabase
      .from("skills")
      .select("category")
      .eq("user_id", user.id);

    if (error) throw error;

    // Extract unique categories
    const categories = [...new Set(data.map(skill => skill.category))];

    return NextResponse.json(categories);
  } catch (error) {
    console.error("GET /api/skills/categories error:", error);
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 });
  }
}
