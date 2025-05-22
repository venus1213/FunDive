'use client';

import * as React from 'react';
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { adminApi } from '@/lib/api/admin';

interface InvitationCode {
  id: string;
  code: string;
  maxUses: number;
  usedCount: number;
  expiresAt: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  createdBy: {
    id: string;
    name: string;
    email: string;
  };
  usedBy: {
    id: string;
    name: string;
    email: string;
    invitationExpires?: string;
  } | null;
  isUsed: boolean;
}

const createInvitationCodeSchema = z.object({
  maxUses: z.number().min(1).max(100).default(1),
  expiresIn: z.number().min(1).max(365).default(7),
  durationDays: z.number().min(1).max(365).default(30),
});

type InvitationCodeFormData = z.infer<typeof createInvitationCodeSchema>;

export default function InvitationCodesPage() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedCode, setSelectedCode] = useState<InvitationCode | null>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);

  const form = useForm<InvitationCodeFormData>({
    resolver: zodResolver(createInvitationCodeSchema),
    defaultValues: {
      maxUses: 1,
      expiresIn: 7,
      durationDays: 30,
    },
  });

  const { data: invitationCodesData, isLoading } = useQuery<{
    invitationCodes: InvitationCode[];
    pagination: { total: number; page: number; limit: number; total_pages: number };
  }>({
    queryKey: ['invitationCodes'],
    queryFn: () => adminApi.getInvitationCodes(),
  });

  const createMutation = useMutation({
    mutationFn: adminApi.createInvitationCode,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invitationCodes'] });
      setIsCreateDialogOpen(false);
      form.reset();
      toast({
        title: '招待コードを作成しました',
        variant: 'default',
      });
    },
    onError: (error: Error) => {
      toast({
        title: '招待コードの作成に失敗しました',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: adminApi.deleteInvitationCode,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invitationCodes'] });
      toast({
        title: '招待コードを削除しました',
        variant: 'default',
      });
    },
    onError: (error: Error) => {
      toast({
        title: '招待コードの削除に失敗しました',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const toggleMutation = useMutation({
    mutationFn: ({ id, isActive }: { id: string; isActive: boolean }) =>
      adminApi.toggleInvitationCodeActive(id, isActive),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invitationCodes'] });
      toast({
        title: '招待コードのステータスを更新しました',
        variant: 'default',
      });
    },
    onError: (error: Error) => {
      toast({
        title: '招待コードのステータス更新に失敗しました',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const onSubmit = (data: InvitationCodeFormData) => {
    createMutation.mutate(data);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('この招待コードを削除してもよろしいですか？')) {
      deleteMutation.mutate(id);
    }
  };

  const handleToggleActive = (id: string, isActive: boolean) => {
    toggleMutation.mutate({ id, isActive });
  };

  if (isLoading) {
    return <div>読み込み中...</div>;
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">招待コード管理</h1>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>新規作成</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>招待コードの作成</DialogTitle>
              <DialogDescription>
                新しい招待コードを作成します。最大使用回数、有効期限、招待期間を設定してください。
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="maxUses"
                  render={({ field: { onChange, ...field } }) => (
                    <FormItem>
                      <FormLabel>最大使用回数</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="1"
                          max="100"
                          onChange={(e) => onChange(Number(e.target.value))}
                          {...field}
                          placeholder="例: 1"
                        />
                      </FormControl>
                      <p className="text-sm text-muted-foreground">1から100回の間で指定してください</p>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="expiresIn"
                  render={({ field: { onChange, ...field } }) => (
                    <FormItem>
                      <FormLabel>有効期限（日数）</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="1"
                          max="365"
                          onChange={(e) => onChange(Number(e.target.value))}
                          {...field}
                          placeholder="例: 7"
                        />
                      </FormControl>
                      <p className="text-sm text-muted-foreground">1日から365日の間で指定してください</p>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="durationDays"
                  render={({ field: { onChange, ...field } }) => (
                    <FormItem>
                      <FormLabel>招待期間（日数）</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="1"
                          max="365"
                          onChange={(e) => onChange(Number(e.target.value))}
                          {...field}
                          placeholder="例: 30"
                        />
                      </FormControl>
                      <p className="text-sm text-muted-foreground">1日から365日の間で指定してください</p>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-end gap-2 mt-6">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsCreateDialogOpen(false)}
                  >
                    キャンセル
                  </Button>
                  <Button
                    type="submit"
                    disabled={createMutation.isPending}
                  >
                    {createMutation.isPending ? '作成中...' : '作成'}
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>コード</TableHead>
            <TableHead>使用回数</TableHead>
            <TableHead>有効期限</TableHead>
            <TableHead>ステータス</TableHead>
            <TableHead>作成日時</TableHead>
            <TableHead className="text-center">操作</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invitationCodesData?.invitationCodes.map((code) => (
            <TableRow key={code.id}>
              <TableCell>{code.code}</TableCell>
              <TableCell>
                {code.usedCount} / {code.maxUses}
              </TableCell>
              <TableCell>
                {code.expiresAt
                  ? format(new Date(code.expiresAt), 'yyyy/MM/dd HH:mm', {
                      locale: ja,
                    })
                  : '無期限'}
              </TableCell>
              <TableCell>
                {code.isUsed ? (
                  <span className="text-red-500">使用済み</span>
                ) : !code.isActive ? (
                  <span className="text-yellow-500">無効</span>
                ) : (
                  <span className="text-green-500">有効</span>
                )}
              </TableCell>
              <TableCell>
                {format(new Date(code.createdAt), 'yyyy/MM/dd HH:mm', {
                  locale: ja,
                })}
              </TableCell>
              <TableCell>
                <div className="flex justify-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedCode(code);
                      setIsDetailDialogOpen(true);
                    }}
                  >
                    詳細
                  </Button>
                  {!code.isUsed && (
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => handleToggleActive(code.id, code.isActive)}
                    >
                      {code.isActive ? '無効化' : '有効化'}
                    </Button>
                  )}
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(code.id)}
                  >
                    削除
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>招待コード詳細</DialogTitle>
            <DialogDescription>
              招待コード: {selectedCode?.code}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">使用状況</h3>
              {selectedCode?.usedCount === 0 ? (
                <p className="text-muted-foreground">まだ使用されていません</p>
              ) : (
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    使用回数: {selectedCode?.usedCount} / {selectedCode?.maxUses}
                  </p>
                  {selectedCode?.usedBy && (
                    <div className="border rounded-lg p-4">
                      <div className="font-medium">{selectedCode.usedBy.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {selectedCode.usedBy.email}
                      </div>
                      {selectedCode.usedBy.invitationExpires && (
                        <div className="mt-2">
                          <p className="text-sm text-muted-foreground">
                            招待期限: {format(new Date(selectedCode.usedBy.invitationExpires), 'yyyy/MM/dd HH:mm', { locale: ja })}
                          </p>
                          <div className="mt-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                if (!selectedCode?.usedBy) return;
                                const extensionDays = window.prompt('延長する日数を入力してください');
                                if (extensionDays && !isNaN(Number(extensionDays))) {
                                  adminApi.extendInvitation({
                                    userId: selectedCode.usedBy.id,
                                    extensionDays: Number(extensionDays),
                                  }).then(() => {
                                    toast({
                                      title: '招待期間を延長しました',
                                      variant: 'default',
                                    });
                                    queryClient.invalidateQueries({ queryKey: ['invitationCodes'] });
                                  }).catch((error) => {
                                    toast({
                                      title: '招待期間の延長に失敗しました',
                                      description: error.message,
                                      variant: 'destructive',
                                    });
                                  });
                                }
                              }}
                            >
                              期間を延長
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
            <div>
              <h3 className="font-medium mb-2">有効期限</h3>
              <p className="text-sm text-muted-foreground">
                {selectedCode?.expiresAt
                  ? format(new Date(selectedCode.expiresAt), 'yyyy/MM/dd HH:mm', {
                      locale: ja,
                    })
                  : '無期限'}
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
} 