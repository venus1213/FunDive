"use client";

import * as React from "react";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { adminApi } from "@/lib/api/admin";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { ArrowLeft } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// 利用可能な変数の定義
const AVAILABLE_VARIABLES = {
  user: {
    name: "ユーザー名",
    email: "メールアドレス",
    displayName: "表示名",
  },
  project: {
    title: "プロジェクトタイトル",
    description: "プロジェクト説明",
    category: "カテゴリー",
  },
  company: {
    name: "会社名",
    website: "Webサイト",
  },
  system: {
    date: "現在の日付",
    time: "現在の時刻",
    siteUrl: "サイトURL",
  },
};

// バリデーションスキーマ
const templateSchema = z.object({
  name: z.string()
    .min(1, "テンプレート名は必須です")
    .max(100, "テンプレート名は100文字以内で入力してください"),
  subject: z.string()
    .min(1, "件名は必須です")
    .max(200, "件名は200文字以内で入力してください"),
  body: z.string()
    .min(1, "本文は必須です"),
  type: z.enum(["NOTIFICATION", "MARKETING", "ANNOUNCEMENT", "REMINDER", "CUSTOM"], {
    required_error: "種類を選択してください",
  }),
  variables: z.record(z.string()).optional(),
});

type TemplateForm = z.infer<typeof templateSchema>;

export default function CreateEmailTemplatePage() {
  const router = useRouter();
  const { toast } = useToast();
  const [previewMode, setPreviewMode] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<keyof typeof AVAILABLE_VARIABLES>("user");
  const [activeField, setActiveField] = useState<"subject" | "body">("body");

  const form = useForm<TemplateForm>({
    resolver: zodResolver(templateSchema),
    defaultValues: {
      name: "",
      subject: "",
      body: "",
      type: "CUSTOM",
      variables: {},
    },
  });

  const bodyTextareaRef = useRef<HTMLTextAreaElement>(null);
  const subjectInputRef = useRef<HTMLInputElement>(null);

  const createMutation = useMutation({
    mutationFn: adminApi.createEmailTemplate,
    onSuccess: () => {
      toast({
        title: "作成完了",
        description: "テンプレートを作成しました",
      });
      router.push("/admin/email");
    },
    onError: () => {
      toast({
        title: "エラー",
        description: "テンプレートの作成に失敗しました",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: TemplateForm) => {
    createMutation.mutate(data);
  };

  const insertVariable = (category: string, variable: string, targetField: "subject" | "body") => {
    const variableText = `{{${category}.${variable}}}`;
    
    if (targetField === "body") {
      const textarea = bodyTextareaRef.current;
      if (textarea) {
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const text = form.getValues("body");
        const newValue = text.substring(0, start) + variableText + text.substring(end);
        form.setValue("body", newValue);
        
        // カーソル位置を変数の後ろに移動
        const newCursorPosition = start + variableText.length;
        textarea.focus();
        textarea.setSelectionRange(newCursorPosition, newCursorPosition);
      }
    } else {
      const input = subjectInputRef.current;
      if (input) {
        const start = input.selectionStart ?? input.value.length;
        const end = input.selectionEnd ?? input.value.length;
        const text = form.getValues("subject");
        const newValue = text.substring(0, start) + variableText + text.substring(end);
        form.setValue("subject", newValue);
        
        // カーソル位置を変数の後ろに移動
        const newCursorPosition = start + variableText.length;
        input.focus();
        input.setSelectionRange(newCursorPosition, newCursorPosition);
      }
    }
  };

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
        <h1 className="text-2xl font-bold">新規テンプレート作成</h1>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>テンプレート情報</CardTitle>
              <CardDescription>
                メールテンプレートの基本情報を入力してください
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>テンプレート名</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="例: ウェルカムメール" />
                        </FormControl>
                        <FormDescription>
                          管理用の名前です。ユーザーには表示されません。
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>種類</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="種類を選択" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="NOTIFICATION">通知メール</SelectItem>
                            <SelectItem value="MARKETING">マーケティングメール</SelectItem>
                            <SelectItem value="ANNOUNCEMENT">お知らせ</SelectItem>
                            <SelectItem value="REMINDER">リマインダー</SelectItem>
                            <SelectItem value="CUSTOM">カスタムメール</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          テンプレートの用途を選択してください。
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>件名</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            ref={subjectInputRef}
                            placeholder="例: FUNDIVEへようこそ！"
                            onClick={() => setActiveField("subject")}
                          />
                        </FormControl>
                        <FormDescription>
                          メールの件名を入力してください。
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="body"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>本文</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            ref={bodyTextareaRef}
                            placeholder="本文を入力..."
                            className="min-h-[300px] font-mono"
                            onClick={() => setActiveField("body")}
                          />
                        </FormControl>
                        <FormDescription>
                          HTMLタグを使用できます。
                        </FormDescription>
                        <FormMessage />
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
                      disabled={createMutation.isPending}
                    >
                      {createMutation.isPending ? "作成中..." : "作成"}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>

        <div className="col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>利用可能な変数</CardTitle>
              <CardDescription>
                クリックして挿入できます
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Select
                  value={selectedCategory}
                  onValueChange={(value) => setSelectedCategory(value as keyof typeof AVAILABLE_VARIABLES)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="カテゴリーを選択" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(AVAILABLE_VARIABLES).map((category) => (
                      <SelectItem key={category} value={category}>
                        {category === "user" ? "ユーザー情報" :
                         category === "project" ? "プロジェクト情報" :
                         category === "company" ? "会社情報" :
                         "システム情報"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <div className="space-y-2">
                  {Object.entries(AVAILABLE_VARIABLES[selectedCategory]).map(([key, description]) => (
                    <Button
                      key={key}
                      variant="outline"
                      className="w-full justify-start text-left"
                      onClick={() => insertVariable(selectedCategory, key, activeField)}
                    >
                      <code className="mr-2 text-sm">{"{{" + selectedCategory + "." + key + "}}"}</code>
                      <span className="text-muted-foreground">{description}</span>
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 