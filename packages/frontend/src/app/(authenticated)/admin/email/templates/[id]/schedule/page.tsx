"use client";

import * as React from "react";
import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { adminApi } from "@/lib/api/admin";
import { useParams, useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Calendar } from "lucide-react";
import { format } from "date-fns";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  planType: string;
}

export default function ScheduleEmailTemplatePage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const templateId = params.id as string;

  const getRoleText = (role: string) => {
    const roles: Record<string, string> = {
      entrepreneur: "起業家",
      investor: "投資家",
      admin: "管理者",
      invited: "招待中",
    };
    return roles[role] || role;
  };

  const getPlanText = (planType: string) => {
    const plans: Record<string, string> = {
      free: "無料プラン",
      standard: "スタンダード",
      premium: "プレミアム",
      startup_partner: "スタートアップパートナー",
    };
    return plans[planType] || planType;
  };

  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);
  const [scheduleType, setScheduleType] = useState<'ONE_TIME' | 'RECURRING'>('ONE_TIME');
  const [scheduleName, setScheduleName] = useState('');
  const [scheduleDescription, setScheduleDescription] = useState('');
  const [sendAt, setSendAt] = useState('');
  const [cronExpression, setCronExpression] = useState('');
  const [customVariables, setCustomVariables] = useState<Record<string, string>>({});
  const [filterRole, setFilterRole] = useState<string | null>(null);
  const [filterPlan, setFilterPlan] = useState<string | null>(null);

  // テンプレート情報の取得
  const { data: template, isLoading: isTemplateLoading } = useQuery({
    queryKey: ["emailTemplate", templateId],
    queryFn: () => adminApi.getEmailTemplateDetail(templateId),
  });

  // ユーザー一覧の取得
  const { data: users, isLoading: isUsersLoading } = useQuery<{ users: User[] }>({
    queryKey: ["users"],
    queryFn: () => adminApi.searchUsers({ limit: 100 }),
  });

  // スケジュール作成のミューテーション
  const scheduleMutation = useMutation({
    mutationFn: () => adminApi.createEmailSchedule({
      templateId,
      name: scheduleName,
      description: scheduleDescription,
      recipientIds: selectedUserIds,
      scheduleType,
      sendAt: scheduleType === 'ONE_TIME' ? sendAt : undefined,
      cronExpression: scheduleType === 'RECURRING' ? cronExpression : undefined,
      variables: customVariables,
    }),
    onSuccess: () => {
      toast({
        title: "作成完了",
        description: "スケジュールを作成しました",
      });
      router.push("/admin/email");
    },
    onError: () => {
      toast({
        title: "エラー",
        description: "スケジュールの作成に失敗しました",
        variant: "destructive",
      });
    },
  });

  const handleUserSelect = (userId: string, checked: boolean) => {
    setSelectedUserIds(prev => 
      checked 
        ? [...prev, userId]
        : prev.filter(id => id !== userId)
    );
  };

  if (isTemplateLoading || isUsersLoading) {
    return <div>読み込み中...</div>;
  }

  if (!template) {
    return <div>テンプレートが見つかりません</div>;
  }

  return (
    <div className="container py-8">
      <div className="flex items-center gap-4 mb-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.back()}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-bold">スケジュール作成: {template.name}</h1>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>スケジュール設定</CardTitle>
            <CardDescription>
              メール送信のスケジュールを設定してください
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">スケジュール名</label>
              <Input
                value={scheduleName}
                onChange={(e) => setScheduleName(e.target.value)}
                placeholder="例: ウェルカムメール配信"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">説明</label>
              <Textarea
                value={scheduleDescription}
                onChange={(e) => setScheduleDescription(e.target.value)}
                placeholder="スケジュールの説明を入力..."
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">スケジュールタイプ</label>
              <Select
                value={scheduleType}
                onValueChange={(value: 'ONE_TIME' | 'RECURRING') => setScheduleType(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="タイプを選択" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ONE_TIME">一回限り</SelectItem>
                  <SelectItem value="RECURRING">定期実行</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {scheduleType === 'ONE_TIME' ? (
              <div className="space-y-2">
                <label className="text-sm font-medium">送信日時（日本時間）</label>
                <Input
                  type="datetime-local"
                  value={sendAt}
                  onChange={(e) => setSendAt(e.target.value)}
                  min={format(new Date(), "yyyy-MM-dd'T'HH:mm")}
                />
              </div>
            ) : (
              <div className="space-y-2">
                <label className="text-sm font-medium">実行スケジュール（日本時間）</label>
                <Select
                  value={cronExpression}
                  onValueChange={setCronExpression}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="スケジュールを選択" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0 9 * * * Asia/Tokyo">毎日 午前9時</SelectItem>
                    <SelectItem value="0 18 * * * Asia/Tokyo">毎日 午後6時</SelectItem>
                    <SelectItem value="0 9 * * 1 Asia/Tokyo">毎週月曜 午前9時</SelectItem>
                    <SelectItem value="0 9 * * 1-5 Asia/Tokyo">平日 午前9時</SelectItem>
                    <SelectItem value="0 0 1 * * Asia/Tokyo">毎月1日 午前0時</SelectItem>
                    <SelectItem value="0 9 1,15 * * Asia/Tokyo">毎月1日と15日 午前9時</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">
                  ※ すべての時刻は日本時間（JST）で実行されます
                </p>
                <div className="mt-4 space-y-2">
                  <label className="text-sm font-medium">カスタム設定 (上級者向け)</label>
                  <Input
                    value={cronExpression}
                    onChange={(e) => setCronExpression(e.target.value)}
                    placeholder="例: 0 9 * * * Asia/Tokyo"
                  />
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p>Cron式の書き方:</p>
                    <p>* * * * * タイムゾーン</p>
                    <p>│ │ │ │ │ └── タイムゾーン (Asia/Tokyo = 日本時間)</p>
                    <p>│ │ │ │ └── 曜日 (0-6) (日-土)</p>
                    <p>│ │ │ └──── 月 (1-12)</p>
                    <p>│ │ └────── 日 (1-31)</p>
                    <p>│ └──────── 時 (0-23)</p>
                    <p>└────────── 分 (0-59)</p>
                    <p className="mt-2">一般的な例 (日本時間):</p>
                    <ul className="list-disc list-inside">
                      <li>0 9 * * * Asia/Tokyo = 毎日午前9時</li>
                      <li>0 9 * * 1-5 Asia/Tokyo = 平日午前9時</li>
                      <li>0 9 1 * * Asia/Tokyo = 毎月1日午前9時</li>
                      <li>0 */2 * * * Asia/Tokyo = 2時間おき</li>
                      <li>0 9-17 * * * Asia/Tokyo = 午前9時から午後5時まで毎時0分</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>送信先設定</CardTitle>
            <CardDescription>
              送信先ユーザーを選択してください
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">送信先ユーザー ({selectedUserIds.length}名選択中)</label>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    if (selectedUserIds.length === (users?.users.length || 0)) {
                      setSelectedUserIds([]);
                    } else {
                      setSelectedUserIds(users?.users.map(u => u.id) || []);
                    }
                  }}
                >
                  {selectedUserIds.length === (users?.users.length || 0) ? '全解除' : '全選択'}
                </Button>
              </div>

              <div className="flex gap-2 mb-2">
                <Select
                  onValueChange={(value) => {
                    if (value === 'all') {
                      setFilterRole(null);
                    } else {
                      setFilterRole(value as 'entrepreneur' | 'investor' | 'admin' | 'invited');
                    }
                  }}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="ロールで絞り込み" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">すべてのロール</SelectItem>
                    <SelectItem value="entrepreneur">起業家</SelectItem>
                    <SelectItem value="investor">投資家</SelectItem>
                    <SelectItem value="admin">管理者</SelectItem>
                    <SelectItem value="invited">招待中</SelectItem>
                  </SelectContent>
                </Select>

                <Select
                  onValueChange={(value) => {
                    if (value === 'all') {
                      setFilterPlan(null);
                    } else {
                      setFilterPlan(value as 'free' | 'standard' | 'premium' | 'startup_partner');
                    }
                  }}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="プランで絞り込み" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">すべてのプラン</SelectItem>
                    <SelectItem value="free">無料プラン</SelectItem>
                    <SelectItem value="standard">スタンダード</SelectItem>
                    <SelectItem value="premium">プレミアム</SelectItem>
                    <SelectItem value="startup_partner">スタートアップパートナー</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <ScrollArea className="h-[300px] border rounded-md p-2">
                {users?.users
                  .filter(user => !filterRole || user.role === filterRole)
                  .filter(user => !filterPlan || user.planType === filterPlan)
                  .map((user) => (
                  <div key={user.id} className="flex items-center space-x-2 py-1">
                    <Checkbox
                      checked={selectedUserIds.includes(user.id)}
                      onCheckedChange={(checked) => handleUserSelect(user.id, checked as boolean)}
                    />
                    <div className="flex-1">
                      <label className="text-sm">
                        {user.name} ({user.email})
                      </label>
                      <div className="text-xs text-muted-foreground">
                        {getRoleText(user.role)} / {getPlanText(user.planType)}
                      </div>
                    </div>
                  </div>
                ))}
              </ScrollArea>
            </div>

            <Button
              className="w-full"
              onClick={() => {
                if (window.confirm('このスケジュールを作成してもよろしいですか？')) {
                  scheduleMutation.mutate();
                }
              }}
              disabled={
                !scheduleName ||
                selectedUserIds.length === 0 ||
                (scheduleType === 'ONE_TIME' && !sendAt) ||
                (scheduleType === 'RECURRING' && !cronExpression) ||
                scheduleMutation.isPending
              }
            >
              <Calendar className="h-4 w-4 mr-2" />
              {scheduleMutation.isPending ? "作成中..." : "スケジュールを作成"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 