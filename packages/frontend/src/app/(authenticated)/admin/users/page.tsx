"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { adminApi } from "@/lib/api/admin";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth";
import { UserActionCell } from "@/components/features/admin/UserActionCell";
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
import { useToast } from "@/components/ui/use-toast";
import { Loader2, Search, RefreshCw } from "lucide-react";
import { PLAN_NAMES_JA } from "@/constants/planFeatures";
import { PlanType } from "@/types/user";

interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: "entrepreneur" | "investor" | "admin" | "invited";
  isVerified: boolean;
  createdAt: string;
  planType?: PlanType;
  invitationExpires?: string | null;
}

interface TableColumn {
  accessorKey: keyof AdminUser | 'actions';
  header: string;
  cell?: (props: { row: { original: AdminUser } }) => React.ReactNode;
}

interface ActionCellProps {
  row: { original: AdminUser };
  refetch: () => void;
}

interface SearchParams {
  email: string;
  name: string;
  role: "all" | "entrepreneur" | "investor" | "admin";
  plan: "all" | PlanType;
  isVerified?: boolean;
  createdAtStart: string;
  createdAtEnd: string;
  page: number;
  limit: number;
}

export default function AdminUsersPage() {
  const router = useRouter();
  const { user, isAdmin } = useAuthStore();
  const { toast } = useToast();

  useEffect(() => {
    if (!isAdmin) {
      toast({
        title: "アクセス権限がありません",
        description: "管理者以外はアクセスできません",
        variant: "destructive",
      });
      router.push("/dashboard");
    }
  }, [isAdmin, router, toast]);

  const [searchParams, setSearchParams] = useState<SearchParams>({
    email: "",
    name: "",
    role: "all",
    plan: "all",
    isVerified: undefined,
    createdAtStart: "",
    createdAtEnd: "",
    page: 1,
    limit: 10,
  });

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["adminUsers", searchParams],
    queryFn: () => {
      // 検索用パラメータを組み立て（空文字や未指定は除外）
      const {
        email,
        name,
        role,
        plan,
        isVerified,
        createdAtStart,
        createdAtEnd,
        page,
        limit,
      } = searchParams;

      const baseParams = { page, limit };

      const filters: Record<string, any> = {};
      if (email.trim()) filters.email = email.trim();
      if (name.trim()) filters.name = name.trim();
      if (role !== "all") filters.role = role;
      if (plan !== "all") filters.planType = plan;
      if (typeof isVerified === "boolean") filters.isVerified = isVerified;
      if (createdAtStart) filters.createdAtStart = createdAtStart;
      if (createdAtEnd) filters.createdAtEnd = createdAtEnd;

      const params = { ...baseParams, ...filters };

      // フィルターがある場合は search API、無い場合は一覧 API
      const hasFilter = Object.keys(filters).length > 0;
      return hasFilter ? adminApi.searchUsers(params) : adminApi.getUsers(params);
    },
    refetchOnWindowFocus: false,
    staleTime: 30000, // 30秒
  });

  // 全ユーザー取得のクエリを追加
  const { data: allUsersData } = useQuery({
    queryKey: ["adminAllUsers"],
    queryFn: () => adminApi.getUsers({ page: 1, limit: 100 }),
    refetchOnWindowFocus: false,
    staleTime: 30000,
  });

  const handleSearch = () => {
    refetch();
  };

  const handleReset = () => {
    setSearchParams({
      email: "",
      name: "",
      role: "all",
      plan: "all",
      isVerified: undefined,
      createdAtStart: "",
      createdAtEnd: "",
      page: 1,
      limit: 10,
    });
  };

  const handlePageChange = (newPage: number) => {
    setSearchParams({ ...searchParams, page: newPage });
  };

  const columns: TableColumn[] = [
    {
      accessorKey: "email",
      header: "メールアドレス",
    },
    {
      accessorKey: "name",
      header: "名前",
    },
    {
      accessorKey: "role",
      header: "ロール",
      cell: ({ row }) => {
        const role = row.original.role;
        const roleLabels = {
          entrepreneur: "起業家",
          investor: "投資家",
          admin: "管理者",
        } as const;
        return role in roleLabels ? roleLabels[role as keyof typeof roleLabels] : "-";
      },
    },
    {
      accessorKey: "isVerified",
      header: "認証状態",
      cell: ({ row }) => (
        <span className={row.original.isVerified ? "text-green-600" : "text-red-600"}>
          {row.original.isVerified ? "認証済み" : "未認証"}
        </span>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "登録日",
      cell: ({ row }) => new Date(row.original.createdAt).toLocaleDateString(),
    },
    {
      accessorKey: "planType",
      header: "プラン",
      cell: ({ row }) => {
        const plan = row.original.planType || "free";
        return PLAN_NAMES_JA[plan as keyof typeof PLAN_NAMES_JA] || plan;
      },
    },
    {
      accessorKey: "invitationExpires",
      header: "招待ユーザー",
      cell: ({ row }) => {
        const expires = row.original.invitationExpires;
        if (expires && new Date(expires) > new Date()) {
          return <span className="text-blue-600">招待中</span>;
        }
        return "-";
      },
    },
    {
      accessorKey: "actions",
      header: "アクション",
      cell: ({ row }) => (
        <UserActionCell 
          user={row.original} 
          onSuccess={() => refetch()}
        />
      ),
    },
  ];

  if (isError) {
    toast({
      title: "エラー",
      description: "ユーザー情報の取得に失敗しました",
      variant: "destructive",
    });
  }

  return (
    <div className="container py-8">
      <h1 className="text-2xl font-bold mb-6">ユーザー管理</h1>

      {/* 検索フォーム */}
      <div className="bg-card p-4 rounded-lg mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          {/* メールアドレス */}
          <div className="space-y-1">
            <span className="text-sm text-muted-foreground">メールアドレス</span>
            <Input
              placeholder="例: user@example.com"
              value={searchParams.email}
              onChange={(e) => setSearchParams({ ...searchParams, email: e.target.value })}
            />
          </div>

          {/* 名前 */}
          <div className="space-y-1">
            <span className="text-sm text-muted-foreground">名前</span>
            <Input
              placeholder="例: 田中 太郎"
              value={searchParams.name}
              onChange={(e) => setSearchParams({ ...searchParams, name: e.target.value })}
            />
          </div>

          {/* ロール */}
          <div className="space-y-1">
            <span className="text-sm text-muted-foreground">ロール</span>
            <Select
              value={searchParams.role}
              onValueChange={(value: "all" | "entrepreneur" | "investor" | "admin") => 
                setSearchParams({ ...searchParams, role: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="ロールを選択" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全て</SelectItem>
                <SelectItem value="entrepreneur">起業家</SelectItem>
                <SelectItem value="investor">投資家</SelectItem>
                <SelectItem value="admin">管理者</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* プラン */}
          <div className="space-y-1">
            <span className="text-sm text-muted-foreground">プラン</span>
            <Select
              value={searchParams.plan}
              onValueChange={(value: "all" | PlanType) =>
                setSearchParams({ ...searchParams, plan: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="プランを選択" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全て</SelectItem>
                {Object.entries(PLAN_NAMES_JA).map(([key, label]) => (
                  <SelectItem key={key} value={key}>{label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
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
                {columns.map((column) => (
                  <TableHead key={column.accessorKey}>{column.header}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {((data?.users || []) as any[])
                .filter((u) =>
                  searchParams.plan === "all" ? true : u.planType === searchParams.plan
                )
                .map((user) => {
                  const adminUser = user as AdminUser;
                  return (
                    <TableRow key={adminUser.id}>
                      {columns.map((column) => (
                        <TableCell key={`${adminUser.id}-${column.accessorKey}`}>
                          {column.cell
                            ? column.cell({ row: { original: adminUser } })
                            : column.accessorKey !== 'actions'
                              ? adminUser[column.accessorKey as keyof AdminUser]
                              : null}
                        </TableCell>
                      ))}
                    </TableRow>
                  );
                })}
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