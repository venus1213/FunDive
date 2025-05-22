"use client";

import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Project {
  id: string;
  title: string;
  description: string;
  createdAt: string;
}

export function ProjectsTab({ projects }: { projects: Project[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>プロジェクト一覧</CardTitle>
        <CardDescription>ユーザーが作成したプロジェクトを表示します</CardDescription>
      </CardHeader>
      <CardContent>
        {projects?.length ? (
          <div className="space-y-4">
            {projects.map((project: Project) => (
              <div key={project.id} className="flex items-start gap-4 p-4 bg-muted/50 rounded-lg">
                <div>
                  <div className="font-medium">{project.title}</div>
                  <div className="text-sm text-muted-foreground">
                    {project.description}
                  </div>
                  <div className="text-sm">
                    作成日: {new Date(project.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-muted-foreground">
            プロジェクトがありません
          </div>
        )}
      </CardContent>
    </Card>
  );
} 