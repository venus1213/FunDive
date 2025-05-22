"use client";

import * as React from "react";
import { useMutation } from "@tanstack/react-query";
import { adminApi } from "@/lib/api/admin";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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
  PlayCircle,
  PauseCircle,
  Trash,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Project {
  id: string;
  title: string;
  status: string;
}

interface ProjectActionCellProps {
  project: Project;
  onSuccess: () => void;
}

export function ProjectActionCell({ project, onSuccess }: ProjectActionCellProps) {
  const { toast } = useToast();
  const router = useRouter();
  const [isStatusDialogOpen, setIsStatusDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  // ステータス更新のミューテーション
  const statusMutation = useMutation({
    mutationFn: (status: 'active' | 'suspended' | 'draft') => adminApi.updateProjectStatus(project.id, { status }),
    onSuccess: () => {
      toast({
        title: "更新完了",
        description: "プロジェクトのステータスを更新しました",
      });
      setIsStatusDialogOpen(false);
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

  // 削除のミューテーション
  const deleteMutation = useMutation({
    mutationFn: () => adminApi.deleteProject(project.id, { reason: "管理者による削除", confirm: true }),
    onSuccess: () => {
      toast({
        title: "削除完了",
        description: "プロジェクトを削除しました",
      });
      setIsDeleteDialogOpen(false);
      onSuccess();
    },
    onError: () => {
      toast({
        title: "エラー",
        description: "プロジェクトの削除に失敗しました",
        variant: "destructive",
      });
    },
  });

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => router.push(`/admin/projects/${project.id}`)}>
            <Eye className="mr-2 h-4 w-4" />
            詳細
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsStatusDialogOpen(true)}>
            {project.status === 'active' ? (
              <>
                <PauseCircle className="mr-2 h-4 w-4" />
                停止する
              </>
            ) : (
              <>
                <PlayCircle className="mr-2 h-4 w-4" />
                公開する
              </>
            )}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem 
            className="text-red-600"
            onClick={() => setIsDeleteDialogOpen(true)}
          >
            <Trash className="mr-2 h-4 w-4" />
            削除
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={isStatusDialogOpen} onOpenChange={setIsStatusDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>プロジェクトのステータス変更</DialogTitle>
            <DialogDescription>
              {project.status === 'active' 
                ? 'このプロジェクトを停止しますか？'
                : 'このプロジェクトを公開しますか？'
              }
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant={project.status === 'active' ? "destructive" : "default"}
              onClick={() => statusMutation.mutate(
                project.status === 'active' ? 'suspended' : 'active'
              )}
              disabled={statusMutation.isPending}
            >
              {project.status === 'active' ? '停止する' : '公開する'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>プロジェクトの削除</DialogTitle>
            <DialogDescription>
              このアクションは取り消せません。本当にプロジェクトを削除しますか？
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="destructive"
              onClick={() => deleteMutation.mutate()}
              disabled={deleteMutation.isPending}
            >
              削除する
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
} 