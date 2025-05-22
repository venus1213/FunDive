"use client";

import * as React from "react";
import { useState, useEffect, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { profileApi } from "@/lib/api/profile";
import { useAuthStore } from "@/store/auth";
import { AlertCircle, ChevronLeft, ChevronRight, Search } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Link from "next/link";
import { Building2, MapPin } from "lucide-react";
import { locations } from "@/constants/locations";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SearchUser {
  id: string;
  role: string;
  planType: string;
  profile: {
    displayName: string | null;
    company: string | null;
    position: string | null;
    location: string | null;
    bio: string | null;
    skills: string[];
    interests: string[];
    social_links: Record<string, string> | null;
  } | null;
}

export function InvestorSearch() {
  const { toast } = useToast();
  const { user } = useAuthStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("all");
  const [users, setUsers] = useState<SearchUser[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const itemsPerPage = 9;

  const handleSearch = useCallback(async (page = 1) => {
    if (!user) {
      toast({
        title: "ログインが必要です",
        description: "投資家の検索・閲覧にはログインが必要です。",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);
      const response = await profileApi.searchUsers({
        q: searchQuery,
        role: 'investor',
        location: location === 'all' ? undefined : location,
        page,
        limit: itemsPerPage
      });

      if (!response || !response.users) {
        throw new Error('検索結果が不正です');
      }

      const processedUsers = response.users.map(user => ({
        id: user.id,
        role: user.role,
        planType: user.planType || 'free',
        profile: user.profile ? {
          ...user.profile,
          displayName: user.profile.displayName || '名前未設定',
          company: user.profile.company || '会社名未設定',
          position: user.profile.position || '役職未設定',
          location: user.profile.location || '場所未設定',
          bio: user.profile.bio || null,
          skills: user.profile.skills || [],
          interests: user.profile.interests || [],
          social_links: user.profile.social_links || null,
        } : null
      }));

      setUsers(processedUsers);
      setTotalPages(Math.ceil(response.pagination.total / itemsPerPage));
      setTotalResults(response.pagination.total);
      setCurrentPage(page);
    } catch (error) {
      toast({
        title: "エラーが発生しました",
        description: "検索に失敗しました。もう一度お試しください。",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [user, searchQuery, location, itemsPerPage, toast]);

  useEffect(() => {
    if (user) {
      handleSearch(1);
    }
  }, [user, handleSearch]);

  const handlePageChange = (page: number) => {
    handleSearch(page);
  };

  // ページネーションコンポーネント
  const Pagination = () => {
    if (totalPages <= 1) return null;

    return (
      <div className="flex items-center justify-center gap-2 mt-8">
        <Button
          variant="outline"
          size="icon"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1 || isLoading}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            {currentPage} / {totalPages} ページ
          </span>
          <span className="text-sm text-muted-foreground">
            （全{totalResults}件）
          </span>
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages || isLoading}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    );
  };

  if (!user) {
    return (
      <div className="space-y-6">
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>ログインが必要です</AlertTitle>
          <AlertDescription>
            投資家の検索・閲覧機能を利用するにはログインが必要です。
            <div className="mt-4">
              <Button asChild>
                <Link href="/login">
                  ログイン
                </Link>
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 検索フィルター */}
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-blue-500" />
          <Input
            placeholder="キーワードで検索（名前、会社名など）"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-emerald-500 z-10" />
          <Select
            value={location}
            onValueChange={setLocation}
          >
            <SelectTrigger className="md:w-48 pl-10">
              <SelectValue placeholder="場所で絞り込み" />
            </SelectTrigger>
            <SelectContent className="max-h-[240px] overflow-y-auto">
              <SelectItem value="all">すべての地域</SelectItem>
              {locations.map((loc) => (
                <SelectItem key={loc} value={loc}>
                  {loc}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button onClick={() => handleSearch(1)} disabled={isLoading}>
          {isLoading ? "検索中..." : "検索"}
        </Button>
      </div>

      {/* 検索結果 */}
      <div className="grid gap-4 md:grid-cols-2">
        {users.map((user) => (
          <Card key={user.id} className="group hover:shadow-lg transition-shadow duration-200">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                {/* アイコン部分をコメントアウト
                <Avatar className="h-16 w-16 border-2 border-border">
                  <AvatarImage
                    src={user.profile?.profile_image_url || undefined}
                    alt={user.profile?.displayName || ""}
                    className="object-cover"
                  />
                  <AvatarFallback className="text-lg">
                    {user.profile?.displayName?.[0]?.toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
                */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold truncate mb-2">
                    {user.profile?.displayName || "名称未設定"}
                  </h3>
                  {/* プレミアムユーザーの場合はバッジを表示 */}
                  {user.planType === 'premium' && (
                    <Badge variant="secondary" className="bg-gradient-to-r from-amber-500 to-yellow-500 text-white">
                      Premium
                    </Badge>
                  )}
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <Building2 className="h-4 w-4 mr-1.5 flex-shrink-0 text-orange-500" />
                      <span className={user.profile?.company ? "text-muted-foreground" : "text-muted-foreground/50"}>
                        {user.profile?.company ? (
                          <>
                            {user.profile.company}
                            {user.profile.position && ` - ${user.profile.position}`}
                          </>
                        ) : "会社名未設定"}
                      </span>
                    </div>

                    <div className="flex items-center text-sm">
                      <MapPin className="h-4 w-4 mr-1.5 flex-shrink-0 text-emerald-500" />
                      <span className={user.profile?.location ? "text-muted-foreground" : "text-muted-foreground/50"}>
                        {user.profile?.location || "場所未設定"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <p className={`text-sm mb-4 line-clamp-2 ${user.profile?.bio ? "text-muted-foreground" : "text-muted-foreground/50 italic"}`}>
                  {user.profile?.bio || "自己紹介文未設定"}
                </p>

                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium mb-1.5">投資関心領域</p>
                    {user.profile?.interests && user.profile.interests.length > 0 ? (
                      <div className="flex flex-wrap gap-1.5">
                        {user.profile.interests.slice(0, 3).map((interest) => (
                          <Badge key={interest} variant="secondary" className="px-2.5 py-0.5">
                            {interest}
                          </Badge>
                        ))}
                        {user.profile.interests.length > 3 && (
                          <Badge variant="secondary" className="px-2.5 py-0.5">
                            +{user.profile.interests.length - 3}
                          </Badge>
                        )}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground/50 italic">未設定</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-200"
                  asChild
                >
                  <Link href={`/users/${user.id}`}>
                    プロフィール詳細を見る
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {users.length === 0 && !isLoading && (
        <div className="text-center py-12 text-muted-foreground">
          検索結果がありません
        </div>
      )}

      {/* ページネーション */}
      <Pagination />
    </div>
  );
} 