
import { Metadata } from "next";
import { ProjectCreateForm } from "@/components/features/project/ProjectCreateForm";

export const metadata: Metadata = {
  title: "新規プロジェクト作成 | FUNDIVE",
  description: "新しいプロジェクトを作成します。",
};

export default function ProjectCreatePage() {
  return (
    <div className="container py-8 max-w-3xl">
      <ProjectCreateForm />
    </div>
  );
} 