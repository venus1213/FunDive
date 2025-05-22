import * as React from "react";
import { Suspense } from "react";
import { ProjectSearch } from "@/components/features/project/ProjectSearch";

export default function ProjectSearchPage() {
  return (
    <Suspense fallback={<div>読み込み中...</div>}>
      <ProjectSearch />
    </Suspense>
  );
}