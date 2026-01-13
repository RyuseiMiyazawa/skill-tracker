import SkillForm from "@/components/SkillForm";

export default function AddSkillPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Add New Skill</h1>
      <SkillForm mode="create" />
    </div>
  );
}
