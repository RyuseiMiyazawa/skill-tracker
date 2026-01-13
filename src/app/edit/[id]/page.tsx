import { getSkillById } from "@/lib/data";
import { notFound } from "next/navigation";
import EditSkillClient from "./EditSkillClient";

type Params = Promise<{ id: string }>;

export default async function EditSkillPage({ params }: { params: Params }) {
  const { id } = await params;
  const skill = await getSkillById(id);

  if (!skill) {
    notFound();
  }

  return <EditSkillClient skill={skill} />;
}
