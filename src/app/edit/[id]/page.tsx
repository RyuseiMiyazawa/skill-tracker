"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import EditSkillClient from "./EditSkillClient";
import { Skill } from "@/types/skill";
import { useAuth } from "@/components/AuthProvider";
import { getGuestSkillById } from "@/lib/guestSkills";
import { authenticatedFetch } from "@/lib/api";

export default function EditSkillPage() {
  const params = useParams<{ id: string }>();
  const { isGuest, loading: authLoading } = useAuth();
  const [skill, setSkill] = useState<Skill | null>(null);
  const [loading, setLoading] = useState(true);
  const [missing, setMissing] = useState(false);

  useEffect(() => {
    if (authLoading) return;

    const loadSkill = async () => {
      try {
        if (isGuest) {
          const guestSkill = getGuestSkillById(params.id);
          setSkill(guestSkill);
          setMissing(!guestSkill);
          return;
        }

        const res = await authenticatedFetch(`/api/skills/${params.id}`);
        if (!res.ok) {
          setMissing(true);
          return;
        }

        const data = (await res.json()) as Skill;
        setSkill(data);
      } catch {
        setMissing(true);
      } finally {
        setLoading(false);
      }
    };

    loadSkill();
  }, [authLoading, isGuest, params.id]);

  if (authLoading || loading) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">Loading...</p>
      </div>
    );
  }

  if (missing || !skill) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-8 text-center shadow-sm">
        <h1 className="mb-3 text-2xl font-bold text-gray-800">Skill not found</h1>
        <p className="mb-6 text-gray-600">
          The requested skill does not exist or you do not have access to it.
        </p>
        <Link
          href="/"
          className="inline-flex rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white transition hover:bg-blue-700"
        >
          Back to Dashboard
        </Link>
      </div>
    );
  }

  return <EditSkillClient skill={skill} />;
}
