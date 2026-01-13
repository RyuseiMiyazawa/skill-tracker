import { z } from "zod";

export const createSkillSchema = z.object({
  name: z.string().min(1, "Skill name is required").max(100),
  level: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5)]),
  category: z.string().min(1, "Category is required").max(50),
  experience_months: z.number().int().min(0),
});

export const updateSkillSchema = createSkillSchema.partial();
