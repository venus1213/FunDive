import { useQuery } from '@tanstack/react-query';
import { adminDashboardApi } from '@/lib/api/admin';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import * as React from "react";

interface ProjectStatsProps {
  period: number;
}

export function ProjectStats({ period }: ProjectStatsProps) {
  const { data: projectStats, isLoading } = useQuery({
    queryKey: ['adminProjectStats', period],
    queryFn: () => adminDashboardApi.getProjectStats(period),
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!projectStats) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* プロジェクト概要 */}
      <Card>
        <CardHeader>
          <CardTitle>プロジェクト概要</CardTitle>
          <CardDescription>プロジェクトの全体統計</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <div className="text-2xl font-bold">{projectStats.total}</div>
              <div className="text-sm text-muted-foreground">総プロジェクト数</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{projectStats.newProjectsCount}</div>
              <div className="text-sm text-muted-foreground">新規プロジェクト</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{projectStats.activeProjectsCount}</div>
              <div className="text-sm text-muted-foreground">アクティブなプロジェクト</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* カテゴリー別分布 */}
      <Card>
        <CardHeader>
          <CardTitle>カテゴリー別分布</CardTitle>
          <CardDescription>プロジェクトのカテゴリー別内訳</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {projectStats.categoryDistribution.map((category) => (
              <div key={category.category} className="flex items-center gap-4">
                <div className="w-32 text-sm">{getCategoryLabel(category.category)}</div>
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary"
                    style={{
                      width: `${(category._count / projectStats.total) * 100}%`,
                    }}
                  />
                </div>
                <div className="w-16 text-sm text-right">{category._count}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* ステージ別分布 */}
      <Card>
        <CardHeader>
          <CardTitle>ステージ別分布</CardTitle>
          <CardDescription>プロジェクトの進行段階別内訳</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {projectStats.stageDistribution.map((stage) => (
              <div key={stage.projectStage} className="flex items-center gap-4">
                <div className="w-32 text-sm">{getStageLabel(stage.projectStage)}</div>
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary"
                    style={{
                      width: `${(stage._count / projectStats.total) * 100}%`,
                    }}
                  />
                </div>
                <div className="w-16 text-sm text-right">{stage._count}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 人気プロジェクト */}
      <Card>
        <CardHeader>
          <CardTitle>人気プロジェクト</CardTitle>
          <CardDescription>ブックマーク数の多いプロジェクト</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {projectStats.popularProjects.map((project) => (
              <div
                key={project.id}
                className="border rounded-lg p-4 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">{project.title}</h3>
                  <div className="text-sm text-muted-foreground">
                    {project._count.bookmarks} ブックマーク
                  </div>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {project.description}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs px-2 py-1 bg-primary/10 rounded-full">
                    {getCategoryLabel(project.category)}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    人気スコア: {project.popularityScore.toFixed(1)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// カテゴリーのラベルを取得する関数
function getCategoryLabel(category: string): string {
  const labels: Record<string, string> = {
    tech: 'テクノロジー',
    finance: 'ファイナンス',
    retail: '小売',
    healthcare: 'ヘルスケア',
    education: '教育',
    other: 'その他',
  };
  return labels[category] || category;
}

// ステージのラベルを取得する関数
function getStageLabel(stage: string): string {
  const labels: Record<string, string> = {
    idea: 'アイデア段階',
    mvp: 'MVP',
    early_stage: '初期段階',
    growth: '成長段階',
    mature: '成熟段階',
  };
  return labels[stage] || stage;
} 