import * as React from "react";
import { Suspense } from "react";
import { ProjectList } from "@/components/features/project/ProjectList";


export default async function ProjectsPage() {
  return (
    <div className="min-h-screen">
      <div className="flex">
        <main className="flex-1 py-6 md:py-8">
          <Suspense fallback={<div>読み込み中...</div>}>
            <ProjectList />
          </Suspense>
        </main>
      </div>
    </div>
  );
} 