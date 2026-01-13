"use client";

import { Skill } from "@/types/skill";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from "chart.js";
import { Doughnut, Bar } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

type Props = {
  skills: Skill[];
};

export default function SkillCharts({ skills }: Props) {
  // カテゴリー別集計
  const categoryData = skills.reduce((acc, skill) => {
    acc[skill.category] = (acc[skill.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // スキルレベル別集計
  const levelData = skills.reduce((acc, skill) => {
    acc[skill.level] = (acc[skill.level] || 0) + 1;
    return acc;
  }, {} as Record<number, number>);

  const categoryChartData = {
    labels: Object.keys(categoryData),
    datasets: [
      {
        label: "Skills by Category",
        data: Object.values(categoryData),
        backgroundColor: [
          "rgba(59, 130, 246, 0.8)",
          "rgba(16, 185, 129, 0.8)",
          "rgba(245, 158, 11, 0.8)",
          "rgba(239, 68, 68, 0.8)",
          "rgba(139, 92, 246, 0.8)",
          "rgba(236, 72, 153, 0.8)",
        ],
        borderColor: [
          "rgba(59, 130, 246, 1)",
          "rgba(16, 185, 129, 1)",
          "rgba(245, 158, 11, 1)",
          "rgba(239, 68, 68, 1)",
          "rgba(139, 92, 246, 1)",
          "rgba(236, 72, 153, 1)",
        ],
        borderWidth: 2,
      },
    ],
  };

  const levelChartData = {
    labels: ["Level 1", "Level 2", "Level 3", "Level 4", "Level 5"],
    datasets: [
      {
        label: "Number of Skills",
        data: [
          levelData[1] || 0,
          levelData[2] || 0,
          levelData[3] || 0,
          levelData[4] || 0,
          levelData[5] || 0,
        ],
        backgroundColor: [
          "rgba(156, 163, 175, 0.8)",
          "rgba(59, 130, 246, 0.8)",
          "rgba(16, 185, 129, 0.8)",
          "rgba(245, 158, 11, 0.8)",
          "rgba(239, 68, 68, 0.8)",
        ],
        borderColor: [
          "rgba(156, 163, 175, 1)",
          "rgba(59, 130, 246, 1)",
          "rgba(16, 185, 129, 1)",
          "rgba(245, 158, 11, 1)",
          "rgba(239, 68, 68, 1)",
        ],
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom" as const,
      },
    },
  };

  if (skills.length === 0) {
    return null;
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 mb-8">
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Skills by Category</h3>
        <div className="h-64">
          <Doughnut data={categoryChartData} options={chartOptions} />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Skills by Level</h3>
        <div className="h-64">
          <Bar data={levelChartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
}
