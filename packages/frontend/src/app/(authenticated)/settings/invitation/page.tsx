"use client";

import * as React from "react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { User, AlertCircle } from "lucide-react";
import { validateInvitationCode, applyInvitationCode, getInvitationStatus } from "@/lib/api/invitation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function InvitationPage() {
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [validationResult, setValidationResult] = useState<any>(null);

  const { data: invitationStatus, isLoading: isStatusLoading, refetch } = useQuery({
    queryKey: ["invitationStatus"],
    queryFn: getInvitationStatus,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      // 招待コードの検証
      const result = await validateInvitationCode(code);
      setValidationResult(result);
      
      if (!result.valid) {
        setError("無効な招待コードです");
        setIsSubmitting(false);
        return;
      }
      
      // 確認ダイアログを表示
      setShowConfirmDialog(true);
    } catch (error: any) {
      // 400エラーの場合は有効期限切れメッセージを表示
      if (error.response && error.response.status === 400) {
        setError("このコードは有効期限切れです");
      } else {
        setError(error instanceof Error ? error.message : "予期せぬエラーが発生しました");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleConfirmApply = async () => {
    setIsSubmitting(true);
    try {
      // 招待コードの適用
      await applyInvitationCode(code);
      
      // 成功メッセージを表示
      setCode("");
      setError(null);
      setShowConfirmDialog(false);
      
      // 招待状態を更新するためにクエリを再取得
      await refetch();
    } catch (error: any) {
      // 400エラーの場合は有効期限切れメッセージを表示
      if (error.response && error.response.status === 400) {
        setError("このコードは有効期限切れです");
      } else {
        setError(error instanceof Error ? error.message : "予期せぬエラーが発生しました");
      }
    } finally {
      setIsSubmitting(false);
      setShowConfirmDialog(false);
    }
  };

  if (isStatusLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  // 既に招待コードが適用されている場合
  const isAlreadyVerified = invitationStatus && invitationStatus.isValid && invitationStatus.isVerified;

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>招待コード</CardTitle>
          <CardDescription>
            招待コードを入力して、機能を利用できるようにしてください。
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* 招待状態の表示 */}
          {invitationStatus && (
            <div className="mb-6">
              <Alert>
                <User className="h-4 w-4" />
                <AlertTitle>招待状態</AlertTitle>
                <AlertDescription>
                  <div className="mt-2">
                    {invitationStatus.isValid && invitationStatus.isVerified ? (
                      <>
                        <p>招待ユーザーとして認証されています。</p>
                        {invitationStatus.invitationExpires && (
                          <p className="text-sm text-muted-foreground">
                            有効期限: {new Date(invitationStatus.invitationExpires).toLocaleDateString('ja-JP')}
                          </p>
                        )}
                      </>
                    ) : (
                      <p>招待コードが必要です。</p>
                    )}
                  </div>
                </AlertDescription>
              </Alert>
            </div>
          )}

          {/* エラー表示 */}
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>エラー</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* 招待コード入力フォーム */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                type="text"
                placeholder="招待コードを入力"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                disabled={isSubmitting || isAlreadyVerified}
              />
            </div>
            <Button 
              type="submit" 
              disabled={isSubmitting || !code || isAlreadyVerified}
            >
              {isSubmitting ? "処理中..." : "招待コードを確認"}
            </Button>
            {isAlreadyVerified && (
              <p className="text-sm text-muted-foreground mt-2">
                既に招待コードが適用されているため、新しいコードは適用できません。
              </p>
            )}
          </form>
        </CardContent>
      </Card>

      {/* 確認ダイアログ */}
      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>招待コードの適用</DialogTitle>
            <DialogDescription asChild>
              <div>
                この招待コードを適用してもよろしいですか？
                {validationResult && (
                  <div className="mt-4 space-y-2">
                    <div>コード: {validationResult.code}</div>
                    <div>有効期限: {new Date(validationResult.expiresAt).toLocaleDateString('ja-JP')}</div>
                  </div>
                )}
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowConfirmDialog(false)} disabled={isSubmitting}>
              キャンセル
            </Button>
            <Button onClick={handleConfirmApply} disabled={isSubmitting}>
              {isSubmitting ? "処理中..." : "適用する"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
} 