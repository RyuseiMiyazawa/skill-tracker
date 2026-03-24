"use client";

import { Skill } from "@/types/skill";

const GUEST_MODE_STORAGE_KEY = "skill-tracker.guest-mode";
const GUEST_SKILLS_STORAGE_KEY = "skill-tracker.guest-skills";

type GuestSkillInput = Pick<Skill, "name" | "level" | "category" | "experience_months">;

export function isGuestModeEnabled() {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(GUEST_MODE_STORAGE_KEY) === "true";
}

export function enableGuestMode() {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(GUEST_MODE_STORAGE_KEY, "true");
}

export function disableGuestMode() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(GUEST_MODE_STORAGE_KEY);
}

export function getGuestSkills(): Skill[] {
  if (typeof window === "undefined") return [];

  const raw = window.localStorage.getItem(GUEST_SKILLS_STORAGE_KEY);
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw) as Skill[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveGuestSkills(skills: Skill[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(GUEST_SKILLS_STORAGE_KEY, JSON.stringify(skills));
}

export function getGuestSkillById(id: string) {
  return getGuestSkills().find((skill) => skill.id === id) ?? null;
}

export function createGuestSkill(input: GuestSkillInput): Skill {
  const timestamp = new Date().toISOString();
  const skill: Skill = {
    id: crypto.randomUUID(),
    ...input,
    created_at: timestamp,
    updated_at: timestamp,
  };

  saveGuestSkills([skill, ...getGuestSkills()]);
  return skill;
}

export function updateGuestSkill(id: string, input: Partial<GuestSkillInput>) {
  const now = new Date().toISOString();
  let updatedSkill: Skill | null = null;

  const nextSkills: Skill[] = getGuestSkills().map((skill) => {
    if (skill.id !== id) return skill;

    const nextSkill: Skill = {
      ...skill,
      ...input,
      updated_at: now,
    };

    updatedSkill = nextSkill;
    return nextSkill;
  });

  saveGuestSkills(nextSkills);
  return updatedSkill;
}

export function deleteGuestSkill(id: string) {
  const current = getGuestSkills();
  const nextSkills = current.filter((skill) => skill.id !== id);
  saveGuestSkills(nextSkills);
  return nextSkills.length !== current.length;
}

export function getGuestCategories() {
  return [...new Set(getGuestSkills().map((skill) => skill.category))];
}

export function clearGuestSkills() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(GUEST_SKILLS_STORAGE_KEY);
}
