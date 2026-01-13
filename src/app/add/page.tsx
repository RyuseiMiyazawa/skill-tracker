"use client";

import SkillForm from "@/components/SkillForm";
import AIChat from "@/components/AIChat";
import { useState } from "react";

export default function AddSkillPage() {
  const [formData, setFormData] = useState({
    name: "",
    level: 1 as 1 | 2 | 3 | 4 | 5,
    category: "",
    experience_months: 0,
  });

  const handleSkillExtracted = (skill: Partial<{
    name: string;
    level: number;
    category: string;
    experience_months: number;
  }>) => {
    // 部分更新に対応: 送られてきたフィールドのみ更新
    setFormData((prev) => ({
      ...prev,
      ...(skill.name !== undefined && { name: skill.name }),
      ...(skill.level !== undefined && { level: skill.level as 1 | 2 | 3 | 4 | 5 }),
      ...(skill.category !== undefined && { category: skill.category }),
      ...(skill.experience_months !== undefined && { experience_months: skill.experience_months }),
    }));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" style={{ height: 'calc(100vh - 12rem)' }}>
      {/* Left: Form */}
      <div className="overflow-y-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Add New Skill</h1>
        <SkillForm mode="create" externalFormData={formData} onFormDataChange={setFormData} />
      </div>

      {/* Right: AI Chat */}
      <div style={{ height: '100%', minHeight: 0 }}>
        <AIChat onSkillExtracted={handleSkillExtracted} />
      </div>
    </div>
  );
}
