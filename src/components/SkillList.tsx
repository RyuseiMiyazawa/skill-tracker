"use client";

import { Skill } from "@/types/skill";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";

type Props = {
  skills: Skill[];
};

export default function SkillList({ skills }: Props) {
  const router = useRouter();
  const [deleting, setDeleting] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (deleting) return; // 既に削除処理中なら何もしない
    if (!confirm("Are you sure you want to delete this skill?")) return;

    setDeleting(id);
    try {
      const res = await fetch(`/api/skills/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        // 削除成功後、データを再読み込み
        router.refresh();
      } else {
        const errorData = await res.json();
        console.error("Delete failed:", res.status, errorData);
        alert(`Failed to delete skill: ${errorData.error || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error deleting skill:", error);
      alert("Error deleting skill");
    } finally {
      setDeleting(null);
    }
  };

  const levelColors = {
    1: "bg-gray-200 text-gray-800",
    2: "bg-blue-200 text-blue-800",
    3: "bg-green-200 text-green-800",
    4: "bg-yellow-200 text-yellow-800",
    5: "bg-red-200 text-red-800",
  };

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {skills.map((skill, index) => (
        <motion.div
          key={skill.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          whileHover={{ scale: 1.03, y: -5 }}
          className="bg-white border border-gray-200 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300"
        >
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-semibold text-gray-800">{skill.name}</h3>
            <span
              className={`px-2 py-1 rounded text-sm font-medium ${
                levelColors[skill.level]
              }`}
            >
              Lv {skill.level}
            </span>
          </div>

          <p className="text-gray-600 text-sm mb-2">
            <span className="inline-block px-2 py-1 bg-gray-100 rounded text-xs font-medium">{skill.category}</span>
          </p>
          <p className="text-gray-600 text-sm mb-3">
            Experience: <span className="font-semibold">{skill.experience_months}</span> months
          </p>

          {/* プログレスバー */}
          <div className="mb-4">
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>Skill Level</span>
              <span>{skill.level}/5</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-gradient-to-r from-blue-500 to-purple-600 h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${(skill.level / 5) * 100}%` }}
              />
            </div>
          </div>

          <div className="flex gap-2">
            <Link
              href={`/edit/${skill.id}`}
              className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white text-center py-2.5 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Edit
            </Link>
            <button
              onClick={() => handleDelete(skill.id)}
              disabled={deleting === skill.id}
              className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white py-2.5 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {deleting === skill.id ? "Deleting..." : "Delete"}
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
