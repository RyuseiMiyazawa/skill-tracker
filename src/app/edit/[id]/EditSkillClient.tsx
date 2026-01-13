"use client";

import { useState } from "react";
import SkillForm from "@/components/SkillForm";
import AIChat from "@/components/AIChat";
import { Skill } from "@/types/skill";

type Props = {
  skill: Skill;
};

export default function EditSkillClient({ skill }: Props) {
  const [formData, setFormData] = useState({
    name: skill.name,
    level: skill.level,
    category: skill.category,
    experience_months: skill.experience_months,
  });

  const handleSkillExtracted = (skillUpdate: Partial<{
    name: string;
    level: number;
    category: string;
    experience_months: number;
  }>) => {
    // 部分更新に対応: 送られてきたフィールドのみ更新
    setFormData((prev) => ({
      ...prev,
      ...(skillUpdate.name !== undefined && { name: skillUpdate.name }),
      ...(skillUpdate.level !== undefined && { level: skillUpdate.level as 1 | 2 | 3 | 4 | 5 }),
      ...(skillUpdate.category !== undefined && { category: skillUpdate.category }),
      ...(skillUpdate.experience_months !== undefined && { experience_months: skillUpdate.experience_months }),
    }));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" style={{ height: 'calc(100vh - 12rem)' }}>
      {/* Left: Form */}
      <div className="overflow-y-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Edit Skill</h1>
        <SkillForm
          skill={skill}
          mode="edit"
          externalFormData={formData}
          onFormDataChange={setFormData}
        />
      </div>

      {/* Right: AI Chat */}
      <div style={{ height: '100%', minHeight: 0 }}>
        <AIChat onSkillExtracted={handleSkillExtracted} />
      </div>
    </div>
  );
}
