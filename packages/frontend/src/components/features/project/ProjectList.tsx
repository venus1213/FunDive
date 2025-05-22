"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { Project, Category, ProjectType } from "@/types/project";
import { projectApi } from "@/lib/api/project";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Plus, Lock, Calendar, MapPin, Tag, Users, Rocket, Coins, HandshakeIcon } from "lucide-react";
import Link from "next/link";
import { useAuthStore } from "@/store/auth";
import { useFeatureAccess } from "@/store/featureAccess";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import { FeatureAccess } from "@/components/features/access/FeatureAccess";

const getCategoryText = (category: Category): string => {
  switch (category) {
    case 'tech':
      return 'テクノロジー';
    case 'finance':
      return '金融';
    case 'retail':
      return '小売';
    case 'healthcare':
      return 'ヘルスケア';
    case 'education':
      return '教育';
    case 'other':
      return 'その他';
    default:
      return category;
  }
};

const getProjectTypeText = (type: ProjectType): { short: string; full: string } => {
  switch (type) {
    case 'entrepreneur':
      return { short: '起業', full: '起業プロジェクト' };
    case 'investor':
      return { short: '投資', full: '投資プロジェクト' };
    case 'cofounder':
      return { short: '仲間', full: '共同創業者募集' };
    default:
      return { short: type, full: type };
  }
};

const getProjectTypeBadgeColor = (type: ProjectType): string => {
  switch (type) {
    case 'entrepreneur':
      return 'bg-blue-500';
    case 'investor':
      return 'bg-purple-500';
    case 'cofounder':
      return 'bg-orange-500';
    default:
      return 'bg-gray-500';
  }
};

const getProjectTypeIcon = (type: ProjectType) => {
  switch (type) {
    case 'entrepreneur':
      return <Rocket className="h-4 w-4 text-blue-500" />;
    case 'investor':
      return <Coins className="h-4 w-4 text-purple-500" />;
    case 'cofounder':
      return <HandshakeIcon className="h-4 w-4 text-orange-500" />;
    default:
      return null;
  }
};

export function ProjectList() {
  const { toast } = useToast();
  const { user } = useAuthStore();
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { getPlanFeatures, fetchStatus } = useFeatureAccess();

  useEffect(() => {
    fetchStatus();
  }, [fetchStatus]);

  const features = getPlanFeatures();
  const projectLimit = features.projectAccess.create.limit;
  const currentProjectCount = projects.length;

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoading(true);
        const response = await projectApi.getMyProjects();
        setProjects(response.projects);
      } catch (error) {
        toast({
          title: "エラー",
          description: "プロジェクトの取得に失敗しました",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, [toast]);

  if (isLoading) {
    return <div>読み込み中...</div>;
  }

  const getStatusBadgeColor = (status: Project['status']) => {
    switch (status) {
      case 'draft':
        return 'bg-gray-500';
      case 'active':
        return 'bg-green-500';
      case 'closed':
        return 'bg-red-500';
      case 'suspended':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusText = (status: Project['status']) => {
    switch (status) {
      case 'draft':
        return '下書き';
      case 'active':
        return '公開中';
      case 'closed':
        return '終了';
      case 'suspended':
        return '一時停止';
      default:
        return status;
    }
  };

  return (
    <div className="container mx-auto px-4 md:px-6 max-w-7xl">
      <div className="space-y-6">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">マイプロジェクト</h1>
          </div>
          <div className={features.projectAccess.create.limit === false || currentProjectCount < (features.projectAccess.create.limit || 0) 
            ? "flex justify-end" 
            : "w-full"
          }>
            <FeatureAccess 
              feature="projectAccess.create"
              currentLimit={currentProjectCount} 
              maxLimit={projectLimit || undefined}
            >
              <Button asChild className={features.projectAccess.create.limit === false || currentProjectCount < (features.projectAccess.create.limit || 0) 
                ? "w-fit" 
                : "w-full sm:w-fit"
              }>
                <Link href="/projects/create" className="gap-2">
                  <Plus className="h-4 w-4" />
                  新規プロジェクト作成
                </Link>
              </Button>
            </FeatureAccess>
          </div>
        </div>

        {projects.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            公開中のプロジェクトがありません
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-1 2xl:grid-cols-1 gap-8">
            {projects.map((project) => (
              <Card key={project.id} className="flex flex-col h-full w-full">
                <CardHeader className="flex-1 space-y-4">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="flex-1 min-w-0 space-y-4">
                      <div className="flex flex-wrap items-center gap-2">
                        <div className="flex flex-wrap items-center gap-2">
                          {getProjectTypeIcon(project.projectType)}
                          <Badge className={`${getProjectTypeBadgeColor(project.projectType)} text-base py-1 px-3`}>
                            <span className="sm:hidden">{getProjectTypeText(project.projectType).short}</span>
                            <span className="hidden sm:inline">{getProjectTypeText(project.projectType).full}</span>
                          </Badge>
                          <Badge className={`${getStatusBadgeColor(project.status)} text-base py-1 px-3`}>
                            {getStatusText(project.status)}
                          </Badge>
                        </div>
                      </div>
                      <CardTitle className="text-2xl line-clamp-2">
                        <Link href={`/projects/${project.id}`} className="hover:underline break-all">
                          {project.title}
                        </Link>
                      </CardTitle>
                    </div>
                  </div>
                  <CardDescription className="text-base line-clamp-3 break-all">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-base text-muted-foreground">
                    {project.location && (
                      <div className="flex items-center gap-3 break-all">
                        <MapPin className="h-5 w-5 shrink-0 text-indigo-500" />
                        <span>{project.location}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-3">
                      <Calendar className="h-5 w-5 shrink-0 text-emerald-500" />
                      <span>{formatDate(project.createdAt)}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Tag className="h-5 w-5 shrink-0 text-amber-500" />
                      <span>{getCategoryText(project.category)}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-3 pt-6">
                  <Button variant="outline" size="default" asChild>
                    <Link href={`/projects/${project.id}/edit`}>
                      編集
                    </Link>
                  </Button>
                  <Button variant="default" size="default" asChild>
                    <Link href={`/projects/${project.id}`}>
                      詳細
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 