export type Skill = {
  id: string;
  name: string;
  level: 1 | 2 | 3 | 4 | 5;
  category: string;
  experience_months: number;
  created_at: string;
  updated_at: string;
};

export type CreateSkillInput = Omit<Skill, "id" | "created_at" | "updated_at">;
export type UpdateSkillInput = Partial<CreateSkillInput>;
