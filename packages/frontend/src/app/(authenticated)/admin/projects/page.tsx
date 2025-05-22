"use client";

import * as React from "react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { adminApi } from "@/lib/api/admin";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, Search, RefreshCw } from "lucide-react";
import { ProjectActionCell } from "@/components/features/admin/ProjectActionCell";
import type { Project } from '@/types/project';

interface SearchParams {
  title: string;
  category: string;
  status: string;
  createdAtStart: string;
  createdAtEnd: string;
  page: number;
  limit: number;
}

export default function AdminProjectsPage() {
  const router = useRouter();
  const { toast } = useToast();

  const [searchParams, setSearchParams] = useState<SearchParams>({
    title: "",
    category: "all",
    status: "all",
    createdAtStart: "",
    createdAtEnd: "",
    page: 1,
    limit: 10,
  });

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["adminProjects", searchParams],
    queryFn: () => adminApi.searchProjects(searchParams),
    refetchOnWindowFocus: false,
    staleTime: 30000,
  });

  const handleSearch = () => {
    refetch();
  };

  const handleReset = () => {
    setSearchParams({
      title: "",
      category: "all",
      status: "all",
      createdAtStart: "",
      createdAtEnd: "",
      page: 1,
      limit: 10,
    });
  };

  const handlePageChange = (newPage: number) => {
    setSearchParams({ ...searchParams, page: newPage });
  };

  if (isError) {
    toast({
      title: "エラー",
      description: "プロジェクト情報の取得に失敗しました",
      variant: "destructive",
    });
  }

  return (
    <div className="container py-8">
      <h1 className="text-2xl font-bold mb-6">プロジェクト管理</h1>

      {/* 検索フォーム */}
      <div className="bg-card p-4 rounded-lg mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <Input
            placeholder="タイトル"
            value={searchParams.title}
            onChange={(e) => setSearchParams({ ...searchParams, title: e.target.value })}
          />
          <Select
            value={searchParams.category}
            onValueChange={(value) => setSearchParams({ ...searchParams, category: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="カテゴリー" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全て</SelectItem>
              <SelectItem value="tech">テクノロジー</SelectItem>
              <SelectItem value="finance">金融</SelectItem>
              <SelectItem value="retail">小売</SelectItem>
              <SelectItem value="healthcare">ヘルスケア</SelectItem>
              <SelectItem value="education">教育</SelectItem>
              <SelectItem value="other">その他</SelectItem>
            </SelectContent>
          </Select>
          <Select
            value={searchParams.status}
            onValueChange={(value) => setSearchParams({ ...searchParams, status: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="ステータス" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全て</SelectItem>
              <SelectItem value="draft">下書き</SelectItem>
              <SelectItem value="active">公開中</SelectItem>
              <SelectItem value="suspended">停止中</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={handleReset}>
            <RefreshCw className="h-4 w-4 mr-2" />
            リセット
          </Button>
          <Button onClick={handleSearch}>
            <Search className="h-4 w-4 mr-2" />
            検索
          </Button>
        </div>
      </div>

      {/* データテーブル */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>タイトル</TableHead>
                <TableHead>作成者</TableHead>
                <TableHead>カテゴリー</TableHead>
                <TableHead>ステータス</TableHead>
                <TableHead>投資額</TableHead>
                <TableHead>作成日</TableHead>
                <TableHead>アクション</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {(data?.projects || []).map((project: Project) => (
                <TableRow key={project.id}>
                  <TableCell className="font-medium">{project.title}</TableCell>
                  <TableCell>{project.user?.name || '不明'}</TableCell>
                  <TableCell>
                    {project.category === 'tech' ? 'テクノロジー' :
                     project.category === 'finance' ? '金融' :
                     project.category === 'retail' ? '小売' :
                     project.category === 'healthcare' ? 'ヘルスケア' :
                     project.category === 'education' ? '教育' : 'その他'}
                  </TableCell>
                  <TableCell>
                    <span className={
                      project.status === 'active' ? 'text-green-600' :
                      project.status === 'suspended' ? 'text-red-600' :
                      'text-yellow-600'
                    }>
                      {project.status === 'active' ? '公開中' :
                       project.status === 'suspended' ? '停止中' : '下書き'}
                    </span>
                  </TableCell>
                  <TableCell>
                    {project.investmentAmount
                      ? `¥${project.investmentAmount.toLocaleString()}`
                      : '-'}
                  </TableCell>
                  <TableCell>
                    {new Date(project.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <ProjectActionCell
                      project={project}
                      onSuccess={refetch}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* ページネーション */}
          <div className="flex items-center justify-end p-4">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(searchParams.page - 1)}
                disabled={searchParams.page <= 1}
              >
                前へ
              </Button>
              <span className="text-sm">
                {searchParams.page} / {Math.ceil((data?.pagination?.total || 0) / searchParams.limit)}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(searchParams.page + 1)}
                disabled={
                  searchParams.page >= Math.ceil((data?.pagination?.total || 0) / searchParams.limit)
                }
              >
                次へ
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 