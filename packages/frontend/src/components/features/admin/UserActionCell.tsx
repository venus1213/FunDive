"use client";

import * as React from "react";
import { useMutation } from "@tanstack/react-query";
import { adminApi } from "@/lib/api/admin";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  MoreHorizontal,
  Eye,
  UserCheck,
  UserX,
  UserCog,
  Trash,
} from "lucide-react";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  isVerified: boolean;
  createdAt: string;
}

interface UserActionCellProps {
  user: User;
  onSuccess: () => void;
}

export function UserActionCell({ user, onSuccess }: UserActionCellProps) {
  const { toast } = useToast();
  const router = useRouter();

  // ステータス更新のミューテーション
  const statusMutation = useMutation({
    mutationFn: (isVerified: boolean) => adminApi.updateUserStatus(user.id, isVerified),
    onSuccess: () => {
      toast({
        title: "更新完了",
        description: "ユーザーのステータスを更新しました",
      });
      onSuccess();
    },
    onError: () => {
      toast({
        title: "エラー",
        description: "ステータスの更新に失敗しました",
        variant: "destructive",
      });
    },
  });

  // ロール更新のミューテーション
  const roleMutation = useMutation({
    mutationFn: (role: string) => adminApi.updateUserRole(user.id, { role: role as any }),
    onSuccess: () => {
      toast({
        title: "更新完了",
        description: "ユーザーのロールを更新しました",
      });
      onSuccess();
    },
    onError: () => {
      toast({
        title: "エラー",
        description: "ロールの更新に失敗しました",
        variant: "destructive",
      });
    },
  });

  // 削除のミューテーション
  const deleteMutation = useMutation({
    mutationFn: () => adminApi.deleteUser(user.id, { reason: "管理者による削除", confirm: true }),
    onSuccess: () => {
      toast({
        title: "削除完了",
        description: "ユーザーを削除しました",
      });
      onSuccess();
    },
    onError: () => {
      toast({
        title: "エラー",
        description: "ユーザーの削除に失敗しました",
        variant: "destructive",
      });
    },
  });

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => router.push(`/admin/users/${user.id}`)}>
            <Eye className="mr-2 h-4 w-4" />
            詳細
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => statusMutation.mutate(!user.isVerified)}
          >
            {user.isVerified ? (
              <>
                <UserX className="mr-2 h-4 w-4" />
                認証解除
              </>
            ) : (
              <>
                <UserCheck className="mr-2 h-4 w-4" />
                認証する
              </>
            )}
          </DropdownMenuItem>
          <DropdownMenuItem>
            <UserCog className="mr-2 h-4 w-4" />
            ロール変更
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="text-red-600"
            onClick={() => {
              if (window.confirm('このユーザーを削除してもよろしいですか？')) {
                deleteMutation.mutate();
              }
            }}
          >
            <Trash className="mr-2 h-4 w-4" />
            削除
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>ユーザー詳細</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <div className="font-semibold">メールアドレス</div>
            <div className="col-span-3">{user.email}</div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <div className="font-semibold">名前</div>
            <div className="col-span-3">{user.name}</div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <div className="font-semibold">ロール</div>
            <div className="col-span-3">{user.role}</div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <div className="font-semibold">認証状態</div>
            <div className="col-span-3">
              <span className={user.isVerified ? "text-green-600" : "text-red-600"}>
                {user.isVerified ? "認証済み" : "未認証"}
              </span>
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <div className="font-semibold">登録日</div>
            <div className="col-span-3">
              {new Date(user.createdAt).toLocaleDateString()}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 