"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Search } from "lucide-react";
import { projectApi } from "@/lib/api/project";
import { Category, Project, ProjectType } from "@/types/project";
import { ProjectCard } from "./ProjectCard";

interface SearchParams {
  keyword: string;
  category?: Category;
  projectType?: ProjectType;
  page: number;
  limit: number;
}

interface SearchResponse {
  projects: Project[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    hasMore: boolean;
  };
}

export function ProjectSearch() {
  const { toast } = useToast();
  const [searchParams, setSearchParams] = useState<SearchParams>({
    keyword: "",
    page: 1,
    limit: 10,
  });
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);

  const handleSearch = async (resetPage: boolean = true) => {
    setIsLoading(true);
    try {
      const params = resetPage ? { ...searchParams, page: 1 } : searchParams;
      
      // 検索パラメータを構築
      const searchQueryParams: any = {
        query: params.keyword,
        page: params.page,
        limit: params.limit,
        status: 'active'
      };
      
      // カテゴリーが選択されている場合は追加
      if (params.category) {
        searchQueryParams.category = params.category;
      }
      
      // プロジェクトタイプが選択されている場合は追加
      if (params.projectType) {
        searchQueryParams.projectType = params.projectType;
      }
      
      const response = await projectApi.searchProjects(searchQueryParams) as SearchResponse;
      
      // プロジェクトのブックマーク状態を確認
      const projectsWithBookmarkStatus = response.projects.map(project => ({
        ...project,
        isBookmarked: !!project.isBookmarked,
        bookmarkCount: project.bookmarkCount ?? 0
      }));
      
      if (resetPage) {
        setProjects(projectsWithBookmarkStatus);
      } else {
        setProjects(prev => [...prev, ...projectsWithBookmarkStatus]);
      }
      
      // ページネーションの判定ロジックを修正
      setHasMore(response.pagination.hasMore);
      if (resetPage) setSearchParams(prev => ({ ...prev, page: 1 }));
    } catch (error) {
      console.error("プロジェクトの検索に失敗しました:", error);
      toast({
        title: "エラー",
        description: "プロジェクトの検索に失敗しました。",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const loadMore = () => {
    setSearchParams(prev => ({ ...prev, page: prev.page + 1 }));
  };

  // フィルターの変更を監視して検索を実行
  useEffect(() => {
    // 初回レンダリング時は実行しない
    if (searchParams.page === 1) {
      handleSearch();
    }
  }, [searchParams.category, searchParams.projectType]);

  useEffect(() => {
    handleSearch();
  }, []);

  useEffect(() => {
    if (searchParams.page > 1) {
      handleSearch(false);
    }
  }, [searchParams.page]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch();
  };

  if (isLoading && projects.length === 0) {
    return (
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 md:px-6 max-w-7xl">
      <div className="space-y-6">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h1 className="text-2xl font-bold">プロジェクト検索</h1>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <Input
                placeholder="キーワードを入力..."
                value={searchParams.keyword}
                onChange={(e) => setSearchParams(prev => ({ ...prev, keyword: e.target.value }))}
                className="flex-1"
              />
              <Select
                value={searchParams.category}
                onValueChange={(value: string) => {
                  // 同じ値が選択された場合はクリア
                  if (value === searchParams.category) {
                    setSearchParams(prev => ({ ...prev, category: undefined }));
                  } else {
                    setSearchParams(prev => ({ ...prev, category: value as Category }));
                  }
                }}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="カテゴリー" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tech">テクノロジー</SelectItem>
                  <SelectItem value="finance">金融</SelectItem>
                  <SelectItem value="retail">小売</SelectItem>
                  <SelectItem value="healthcare">ヘルスケア</SelectItem>
                  <SelectItem value="education">教育</SelectItem>
                  <SelectItem value="other">その他</SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={searchParams.projectType}
                onValueChange={(value: string) => {
                  // 同じ値が選択された場合はクリア
                  if (value === searchParams.projectType) {
                    setSearchParams(prev => ({ ...prev, projectType: undefined }));
                  } else {
                    setSearchParams(prev => ({ ...prev, projectType: value as ProjectType }));
                  }
                }}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="プロジェクトタイプ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="entrepreneur">起業プロジェクト</SelectItem>
                  <SelectItem value="investor">投資プロジェクト</SelectItem>
                  <SelectItem value="cofounder">共同創業者募集</SelectItem>
                </SelectContent>
              </Select>
              <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    <Search className="h-4 w-4 mr-2" />
                    検索
                  </>
                )}
              </Button>
            </div>
            {(searchParams.category || searchParams.projectType) && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">フィルター:</span>
                {searchParams.category && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 text-xs"
                    onClick={() => setSearchParams(prev => ({ ...prev, category: undefined }))}
                  >
                    {searchParams.category === 'tech' ? 'テクノロジー' :
                     searchParams.category === 'finance' ? '金融' :
                     searchParams.category === 'retail' ? '小売' :
                     searchParams.category === 'healthcare' ? 'ヘルスケア' :
                     searchParams.category === 'education' ? '教育' : 'その他'}
                    <span className="ml-1">×</span>
                  </Button>
                )}
                {searchParams.projectType && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 text-xs"
                    onClick={() => setSearchParams(prev => ({ ...prev, projectType: undefined }))}
                  >
                    {searchParams.projectType === 'entrepreneur' ? '起業プロジェクト' :
                     searchParams.projectType === 'investor' ? '投資プロジェクト' :
                     '共同創業者募集'}
                    <span className="ml-1">×</span>
                  </Button>
                )}
                {(searchParams.category || searchParams.projectType) && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 text-xs"
                    onClick={() => {
                      setSearchParams(prev => ({ ...prev, category: undefined, projectType: undefined }));
                      handleSearch();
                    }}
                  >
                    すべてクリア
                  </Button>
                )}
              </div>
            )}
          </form>
        </div>

        {projects.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            プロジェクトが見つかりませんでした
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 2xl:grid-cols-2 gap-4 md:gap-6">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}

        {hasMore && (
          <div className="flex justify-center pt-6">
            <Button
              variant="outline"
              onClick={loadMore}
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "さらに読み込む"
              )}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}