import { Metadata } from "next";
import { ProjectList } from "@/components/features/project/ProjectList";

export const metadata: Metadata = {
  title: "マイプロジェクト | FUNDIVE",
  description: "あなたのプロジェクト一覧です。",
};

export default function ProjectsPage() {
  return (
    <div className="container py-8 max-w-7xl">
      <ProjectList />
    </div>
  );
} 