import SkillList from "@/components/SkillList";
import SkillCharts from "@/components/SkillCharts";
import { getSkills } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const skills = await getSkills();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
          My Skills Dashboard
        </h1>
        <p className="text-gray-600 text-lg">
          Manage and track your technical skills and experience
        </p>
      </div>

      {skills.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No skills added yet</p>
          <p className="text-gray-400 mt-2">Click "Add Skill" to get started</p>
        </div>
      ) : (
        <>
          <SkillCharts skills={skills} />
          <SkillList skills={skills} />
        </>
      )}
    </div>
  );
}
