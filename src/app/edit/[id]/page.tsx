import { getSkillById } from "@/lib/data";
import SkillForm from "@/components/SkillForm";
import { notFound } from "next/navigation";

type Params = Promise<{ id: string }>;

export default async function EditSkillPage({ params }: { params: Params }) {
  const { id } = await params;
  const skill = await getSkillById(id);

  if (!skill) {
    notFound();
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Edit Skill</h1>
      <SkillForm skill={skill} mode="edit" />
    </div>
  );
}
