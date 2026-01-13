"use client";

import { useState, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Skill } from "@/types/skill";
import VoiceInput from "./VoiceInput";

type Props = {
  skill?: Skill;
  mode: "create" | "edit";
  externalFormData?: {
    name: string;
    level: 1 | 2 | 3 | 4 | 5;
    category: string;
    experience_months: number;
  };
  onFormDataChange?: (data: {
    name: string;
    level: 1 | 2 | 3 | 4 | 5;
    category: string;
    experience_months: number;
  }) => void;
};

type SkillFormProps = {
  formData: {
    name: string;
    level: 1 | 2 | 3 | 4 | 5;
    category: string;
    experience_months: number;
  };
  setFormData: (data: {
    name: string;
    level: 1 | 2 | 3 | 4 | 5;
    category: string;
    experience_months: number;
  }) => void;
};

export default function SkillForm({ skill, mode, externalFormData, onFormDataChange }: Props) {
  const router = useRouter();
  const [internalFormData, setInternalFormData] = useState({
    name: skill?.name || "",
    level: skill?.level || (1 as 1 | 2 | 3 | 4 | 5),
    category: skill?.category || "",
    experience_months: skill?.experience_months || 0,
  });
  const [loading, setLoading] = useState(false);

  // Use external form data if provided, otherwise use internal state
  const formData = externalFormData || internalFormData;
  const setFormData = onFormDataChange || setInternalFormData;

  return <SkillFormContent formData={formData} setFormData={setFormData} mode={mode} skill={skill} router={router} loading={loading} setLoading={setLoading} />;
}

function SkillFormContent({ formData, setFormData, mode, skill, router, loading, setLoading }: SkillFormProps & { mode: "create" | "edit"; skill?: Skill; router: any; loading: boolean; setLoading: (loading: boolean) => void }) {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { authenticatedFetch } = await import("@/lib/api");
        const res = await authenticatedFetch("/api/skills/categories");
        if (res.ok) {
          const data = await res.json();
          setCategories(data);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleVoiceTranscript = async (transcript: string) => {
    try {
      // Gemini APIで音声テキストを解析
      const res = await fetch("/api/parse-voice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transcript }),
      });

      if (!res.ok) {
        throw new Error("Failed to parse voice");
      }

      const skillData = await res.json();

      setFormData({
        name: skillData.name || formData.name,
        level: (skillData.level || formData.level) as 1 | 2 | 3 | 4 | 5,
        category: skillData.category || formData.category,
        experience_months: skillData.experience_months || formData.experience_months,
      });
    } catch (error) {
      console.error("Error parsing voice:", error);
      alert("音声の解析に失敗しました。もう一度お試しください。");
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { authenticatedFetch } = await import("@/lib/api");
      const url = mode === "create" ? "/api/skills" : `/api/skills/${skill?.id}`;
      const method = mode === "create" ? "POST" : "PATCH";

      const res = await authenticatedFetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        router.push("/");
        router.refresh();
      } else {
        const error = await res.json();
        alert(`Error: ${error.error || "Failed to save skill"}`);
      }
    } catch (error) {
      console.error("Error saving skill:", error);
      alert("Error saving skill");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg space-y-4">

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Skill Name
        </label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
          Category
        </label>
        <input
          type="text"
          id="category"
          list="categories"
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          required
          placeholder="e.g. Frontend, Backend, Infrastructure"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <datalist id="categories">
          {categories.map((category) => (
            <option key={category} value={category} />
          ))}
        </datalist>
      </div>

      <div>
        <label htmlFor="level" className="block text-sm font-medium text-gray-700 mb-1">
          Skill Level (1-5)
        </label>
        <select
          id="level"
          value={formData.level}
          onChange={(e) => setFormData({ ...formData, level: Number(e.target.value) as 1 | 2 | 3 | 4 | 5 })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value={1}>1 - Beginner</option>
          <option value={2}>2 - Elementary</option>
          <option value={3}>3 - Intermediate</option>
          <option value={4}>4 - Advanced</option>
          <option value={5}>5 - Expert</option>
        </select>
      </div>

      <div>
        <label htmlFor="experience_months" className="block text-sm font-medium text-gray-700 mb-1">
          Experience (months)
        </label>
        <input
          type="number"
          id="experience_months"
          value={formData.experience_months}
          onChange={(e) => setFormData({ ...formData, experience_months: Number(e.target.value) })}
          min={0}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex gap-2 pt-4">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition disabled:opacity-50"
        >
          {loading ? "Saving..." : mode === "create" ? "Create Skill" : "Update Skill"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/")}
          className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-md transition"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
