import * as React from "react";
import { ProjectEditForm } from "@/components/features/project/ProjectEditForm";


interface ProjectEditPageProps {
  params: {
    id: string;
  };
}

export default function ProjectEditPage({ params }: ProjectEditPageProps) {
  return (
    <div className="min-h-screen">
        <main className="flex-1 p-6">
          <ProjectEditForm projectId={params.id} />
        </main>
    </div>
  );
} 