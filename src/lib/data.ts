import { Skill } from "@/types/skill";
import { supabase } from "./supabase";

export const getSkills = async (): Promise<Skill[]> => {
  const { data, error } = await supabase
    .from("skills")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data || [];
};

export const getSkillById = async (id: string): Promise<Skill | null> => {
  const { data, error } = await supabase
    .from("skills")
    .select("*")
    .eq("id", id)
    .single();

  if (error) return null;
  return data;
};

export const createSkill = async (
  skillData: Omit<Skill, "id" | "created_at" | "updated_at">
): Promise<Skill> => {
  const { data, error } = await supabase
    .from("skills")
    .insert([skillData])
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const updateSkill = async (
  id: string,
  skillData: Partial<Omit<Skill, "id" | "created_at" | "updated_at">>
): Promise<Skill | null> => {
  const { data, error } = await supabase
    .from("skills")
    .update({ ...skillData, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();

  if (error) return null;
  return data;
};

export const deleteSkill = async (id: string): Promise<boolean> => {
  const { error } = await supabase.from("skills").delete().eq("id", id);
  return !error;
};
