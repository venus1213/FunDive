'use client';

import * as React from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Bell, Mail, MessageCircle, AtSign } from "lucide-react";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { notificationApi } from "@/lib/api/notification";

const notificationSettingsSchema = z.object({
  emailEnabled: z.boolean(),
  directMessageEnabled: z.boolean(),
  projectMessageEnabled: z.boolean(),
  mentionEnabled: z.boolean(),
});

type NotificationSettingsFormData = z.infer<typeof notificationSettingsSchema>;

export function NotificationSettingsForm() {
  const { toast } = useToast();

  const form = useForm<NotificationSettingsFormData>({
    resolver: zodResolver(notificationSettingsSchema),
    defaultValues: {
      emailEnabled: true,
      directMessageEnabled: true,
      projectMessageEnabled: true,
      mentionEnabled: true,
    },
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await notificationApi.getSettings();
        const settings = response;
        form.reset({
          emailEnabled: settings.emailEnabled,
          directMessageEnabled: settings.directMessageEnabled,
          projectMessageEnabled: settings.projectMessageEnabled,
          mentionEnabled: settings.mentionEnabled,
        });
      } catch (error) {
        console.error("通知設定の取得に失敗しました:", error);
        toast({
          title: "エラー",
          description: "通知設定の取得に失敗しました。",
          variant: "destructive",
        });
      }
    };

    fetchSettings();
  }, [form, toast]);

  const onSubmit = async (data: NotificationSettingsFormData) => {
    try {
      await notificationApi.updateSettings(data);
      toast({
        title: "更新完了",
        description: "通知設定を更新しました。",
      });
    } catch (error) {
      console.error("通知設定の更新に失敗しました:", error);
      toast({
        title: "エラー",
        description: "通知設定の更新に失敗しました。",
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="emailEnabled"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 bg-muted/50">
                <div className="space-y-0.5">
                  <FormLabel className="text-base flex items-center gap-2">
                    <Mail className="h-4 w-4 text-blue-500" />
                    メール通知
                  </FormLabel>
                  <FormDescription>
                    重要な更新情報をメールでも受け取ります
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

          <FormField
            control={form.control}
            name="directMessageEnabled"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base flex items-center gap-2">
                    <MessageCircle className="h-4 w-4 text-green-500" />
                    ダイレクトメッセージ通知
                  </FormLabel>
                  <FormDescription>
                    新しいダイレクトメッセージを受信したときに通知します
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

          <FormField
            control={form.control}
            name="projectMessageEnabled"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base flex items-center gap-2">
                    <Bell className="h-4 w-4 text-purple-500" />
                    プロジェクトメッセージ通知
                  </FormLabel>
                  <FormDescription>
                    プロジェクトに新しいメッセージが投稿されたときに通知します
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

          <FormField
            control={form.control}
            name="mentionEnabled"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base flex items-center gap-2">
                    <AtSign className="h-4 w-4 text-amber-500" />
                    メンション通知
                  </FormLabel>
                  <FormDescription>
                    メッセージであなたがメンションされたときに通知します
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
        </div>

        <div className="flex justify-end">
          <Button type="submit">
            設定を保存
          </Button>
        </div>
      </form>
    </Form>
  );
} 