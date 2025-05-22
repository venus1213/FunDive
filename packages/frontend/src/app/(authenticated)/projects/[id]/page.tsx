import * as React from "react";
import { Suspense } from "react";
import { ProjectDetail } from "@/components/features/project/ProjectDetail";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ id: string }> | { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

// プロジェクトIDの検証を行う関数
async function validateProjectId(id: string): Promise<string> {
  if (!id || typeof id !== 'string') {
    notFound();
  }
  return id;
}

export default async function ProjectPage({ params }: Props) {
  const resolvedParams = await Promise.resolve(params);
  const validatedProjectId = await validateProjectId(resolvedParams.id);

  return (
    <div className="flex min-h-screen">
      <main className="flex-1 p-6">
        <Suspense fallback={<div>読み込み中...</div>}>
          <ProjectDetail projectId={validatedProjectId} />
        </Suspense>
      </main>
    </div>
  );
} 