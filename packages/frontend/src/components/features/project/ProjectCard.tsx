"use client";

import * as React from "react";
import { Project } from "@/types/project";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Tag, Users, Rocket, Coins, HandshakeIcon, MinusCircle } from "lucide-react";
import { formatDate } from "@/lib/utils";
import Link from "next/link";

interface ProjectCardProps {
  project: Project;
}

const getCategoryText = (category: Project['category'] | undefined): string => {
  if (!category) return '未設定';
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

const getProjectTypeText = (type: Project['projectType'] | undefined): { short: string; full: string } => {
  if (!type) return { short: '未設定', full: '未設定' };
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

const getProjectTypeBadgeColor = (type: Project['projectType'] | undefined): string => {
  if (!type) return 'bg-gray-500';
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

const getProjectTypeIcon = (type: Project['projectType'] | undefined) => {
  if (!type) return <MinusCircle className="h-4 w-4 text-gray-500" />;
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

const getStatusBadgeColor = (status: Project['status']) => {
  switch (status) {
    case 'active':
      return 'bg-green-500';
    default:
      return 'bg-gray-500';
  }
};

const getStatusText = (status: Project['status']) => {
  switch (status) {
    case 'active':
      return '公開中';
    default:
      return status;
  }
};

export function ProjectCard({ project }: ProjectCardProps) {
  if (project.status !== 'active') {
    return null;
  }

  return (
    <Card className="flex flex-col h-full">
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
        <p className="text-base text-muted-foreground line-clamp-3 break-all">
          {project.description}
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 text-base text-muted-foreground">
          {project.investmentAmount && (
            <div className="flex items-center gap-3">
              <Coins className="h-5 w-5 shrink-0 text-blue-500" />
              <span>
                {project.investmentAmount >= 100000000
                  ? `${(project.investmentAmount / 100000000).toFixed(1)}億円`
                  : `${(project.investmentAmount / 10000).toFixed(0)}万円`}
              </span>
            </div>
          )}
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
        <Button variant="default" size="default" asChild>
          <Link href={`/projects/${project.id}`}>
            詳細
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
} 