"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { projectApi } from "@/lib/api/project";
import { ArrowLeft } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useAuthStore } from "@/store/auth";
import { PLAN_FEATURES } from "@/constants/planFeatures";
import { locations } from "@/constants/locations";
import { projectDesc, getProjectDescription } from "@/constants/projectDesc";

const projectEditSchema = z.object({
  title: z.string()
    .min(5, "タイトルを入力してください")
    .max(200, "タイトルは200文字以内で入力してください"),
  description: z.string()
    .min(1, "説明を入力してください")
    .max(1000, "説明は1000文字以内で入力してください"),
  category: z.enum(["tech", "finance", "retail", "healthcare", "education", "other"] as const),
  projectType: z.enum(["entrepreneur", "investor", "cofounder"] as const),
  investmentAmount: z.number()
    .min(0, "投資額は0以上で入力してください")
    .max(100000, "投資額は100万万円（10億円）以下で入力してください")
    .nullable()
    .optional()
    .transform((val) => (val === null ? undefined : val)),
  location: z.string().max(100).optional(),
  projectStage: z.enum(["idea", "mvp", "early_stage", "growth", "mature"] as const).optional(),
  isPublic: z.boolean()
});

type ProjectFormValues = z.infer<typeof projectEditSchema>;

interface ProjectEditFormProps {
  projectId: string;
}

export function ProjectEditForm({ projectId }: ProjectEditFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuthStore();

  const availableProjectTypes = user?.planType 
    ? PLAN_FEATURES[user.planType].projectAccess.create.types 
    : [];

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectEditSchema),
  });

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const data = await projectApi.getProject(projectId);
        form.reset({
          title: data.title,
          description: data.description,
          category: data.category,
          projectType: data.projectType,
          investmentAmount: data.investmentAmount || undefined,
          location: data.location || undefined,
          projectStage: data.projectStage || undefined,
          isPublic: data.status === 'active',
        });
      } catch (error) {
        console.error('プロジェクト取得エラー:', error);
        toast({
          title: "エラーが発生しました",
          description: "プロジェクトの取得に失敗しました。",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchProject();
  }, [projectId, form, toast]);

  const handleProjectTypeChange = (type: keyof typeof projectDesc) => {
    form.setValue('projectType', type, { shouldValidate: true });
    form.setValue('description', getProjectDescription(type), { shouldValidate: true });
  };

  async function onSubmit(data: ProjectFormValues) {
    try {
      setIsSubmitting(true);
      const projectData = {
        title: data.title,
        description: data.description,
        category: data.category,
        projectType: data.projectType,
        status: data.isPublic ? ('active' as const) : ('draft' as const),
        investmentAmount: data.investmentAmount,
        location: data.location,
        projectStage: data.projectStage,
      };
      await projectApi.updateProject(projectId, projectData);
      toast({
        title: "プロジェクトを更新しました",
        description: "プロジェクト詳細に戻ります。",
      });
      router.push(`/projects/${projectId}`);
    } catch (error) {
      console.error('Project update error:', error);
      toast({
        title: "エラーが発生しました",
        description: "プロジェクトの更新に失敗しました。",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isLoading) {
    return <div>読み込み中...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          戻る
        </Button>
        <h1 className="text-2xl font-bold">プロジェクトを編集</h1>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-1">
                  プロジェクト名
                  <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="プロジェクト名を入力" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-1">
                  プロジェクト説明
                  <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Textarea
                      placeholder="プロジェクトの説明を入力"
                      className="min-h-[500px] mb-1"
                      {...field}
                    />
                    <div className="absolute bottom-2 right-2 text-xs text-muted-foreground">
                      {field.value?.length || 0} / 1000文字
                    </div>
                  </div>
                </FormControl>
                <FormDescription>
                  プロジェクトの詳細な説明を入力してください。
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-1">
                    カテゴリー
                    <span className="text-destructive">*</span>
                  </FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="カテゴリーを選択" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="tech">テクノロジー</SelectItem>
                      <SelectItem value="finance">金融</SelectItem>
                      <SelectItem value="retail">小売</SelectItem>
                      <SelectItem value="healthcare">ヘルスケア</SelectItem>
                      <SelectItem value="education">教育</SelectItem>
                      <SelectItem value="other">その他</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="projectType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-1">
                    プロジェクトタイプ
                    <span className="text-destructive">*</span>
                  </FormLabel>
                  <Select 
                    onValueChange={handleProjectTypeChange} 
                    value={field.value}
                    disabled={availableProjectTypes.length === 0}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="タイプを選択" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {availableProjectTypes.includes('entrepreneur') && (
                        <SelectItem value="entrepreneur">起業プロジェクト</SelectItem>
                      )}
                      {availableProjectTypes.includes('investor') && (
                        <SelectItem value="investor">投資プロジェクト</SelectItem>
                      )}
                      {availableProjectTypes.includes('cofounder') && (
                        <SelectItem value="cofounder">共同創業者募集</SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    {availableProjectTypes.length === 0 && (
                      "現在のプランではプロジェクトを編集できません"
                    )}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="investmentAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>投資額（万円）</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="投資額を万円単位で入力してください"
                      {...field}
                      onChange={(e) => {
                        const value = e.target.value === '' ? undefined : Number(e.target.value);
                        field.onChange(value);
                      }}
                      value={field.value ?? ''}
                    />
                  </FormControl>
                  <FormDescription>
                    0から100,00万円（10億円）の間で入力してください
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>場所</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="場所を選択" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="max-h-[240px] overflow-y-auto">
                      <SelectItem value="未設定">未設定</SelectItem>
                      {locations.map((location) => (
                        <SelectItem key={location} value={location}>
                          {location}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="projectStage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>プロジェクトステージ</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="ステージを選択" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="idea">アイデア段階</SelectItem>
                      <SelectItem value="mvp">MVP/プロトタイプ</SelectItem>
                      <SelectItem value="early_stage">アーリーステージ</SelectItem>
                      <SelectItem value="growth">成長段階</SelectItem>
                      <SelectItem value="mature">成熟段階</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="isPublic"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">公開設定</FormLabel>
                  <FormDescription>
                    プロジェクトを公開するかどうかを設定します
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
            >
              キャンセル
            </Button>
            <Button 
              type="submit" 
              disabled={isSubmitting || availableProjectTypes.length === 0}
            >
              {isSubmitting ? "更新中..." : "プロジェクトを更新"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
} 