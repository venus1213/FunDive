"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Project } from "@/types/project";
import { ProjectCard } from "./ProjectCard";
import { bookmarkApi, type Bookmark } from "@/lib/api/bookmark";


export function BookmarkList() {
  const { toast } = useToast();
  const [bookmarks, setBookmarks] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchBookmarks = async (currentPage: number) => {
    try {
      const response = await bookmarkApi.getBookmarks({ page: currentPage, limit: 10 });
      
      if (currentPage === 1) {
        setBookmarks(response?.bookmarks?.map((b: Bookmark) => b.project) || []);
      } else {
        setBookmarks(prev => [...prev, ...(response?.bookmarks?.map((b: Bookmark) => b.project) || [])]);
      }
      
      setHasMore(response?.pagination ? currentPage < response.pagination.total : false);
    } catch (error) {
      console.error("ブックマークの取得に失敗しました:", error);
      toast({
        title: "エラー",
        description: "ブックマークの取得に失敗しました。",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBookmarks(1);
  }, []);

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchBookmarks(nextPage);
  };

  if (isLoading && bookmarks.length === 0) {
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
            <h1 className="text-2xl font-bold">ブックマーク一覧</h1>
          </div>
        </div>

        {bookmarks.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            ブックマークしたプロジェクトはありません
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 2xl:grid-cols-2 gap-4 md:gap-6">
            {bookmarks.map((project) => (
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
