"use client";

import * as React from "react";
import { useState, useEffect } from "react";
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
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { X, User2, FileText, Building2, Briefcase, MapPin, Globe, Twitter, Linkedin, Facebook, Eye, EyeOff, Lightbulb, Wrench } from "lucide-react";
import { profileApi } from "@/lib/api/profile";
import { useAuthStore } from "@/store/auth";
import { FeatureAccess } from "@/components/features/access/FeatureAccess";
import { locations } from "@/constants/locations";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// プロフィールフォームのバリデーションスキーマ
const profileFormSchema = z.object({
  displayName: z.string().optional().or(z.literal("")),
  bio: z.string().max(500, "自己紹介は500文字以内で入力してください").optional().or(z.literal("")),
  company: z.string().optional().or(z.literal("")),
  position: z.string().optional().or(z.literal("")),
  location: z.string().optional().or(z.literal("")),
  website: z.string().optional().or(z.literal(""))
    .refine((val) => {
      if (!val) return true;
      try {
        new URL(val);
        return true;
      } catch {
        return false;
      }
    }, "有効なURLを入力してください"),
  social_links: z.object({
    twitter: z.string().optional().or(z.literal(""))
      .refine((val) => {
        if (!val) return true;
        return val.startsWith('https://twitter.com/') || 
               val.startsWith('https://x.com/');
      }, "TwitterのURLは https://twitter.com/ または https://x.com/ で始まる必要があります"),
    linkedin: z.string().optional().or(z.literal(""))
      .refine((val) => {
        if (!val) return true;
        return val.startsWith('https://linkedin.com/in/') || 
               val.startsWith('https://www.linkedin.com/in/');
      }, "LinkedInのURLは https://linkedin.com/in/ で始まる必要があります"),
    facebook: z.string().optional().or(z.literal(""))
      .refine((val) => {
        if (!val) return true;
        return val.startsWith('https://facebook.com/') || 
               val.startsWith('https://www.facebook.com/');
      }, "FacebookのURLは https://facebook.com/ で始まる必要があります")
  }).optional().default({}),
  skills: z.array(z.string()).optional().default([]),
  interests: z.array(z.string()).optional().default([]),
  is_public: z.boolean().optional().default(true),
  visible_fields: z.array(z.string()).optional().default([
    "bio",
    "company",
    "position",
    "location",
    "website",
    "social_links",
    "skills",
    "interests"
  ])
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export function ProfileForm() {
  const { toast } = useToast();
  const { user, setUser } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [newSkill, setNewSkill] = useState("");
  const [newInterest, setNewInterest] = useState("");
  const [isInitialized, setIsInitialized] = useState(false);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      displayName: user?.profile?.displayName || "",
      bio: user?.profile?.bio || "",
      company: user?.profile?.company || "",
      position: user?.profile?.position || "",
      location: user?.profile?.location || "",
      website: user?.profile?.website || "",
      social_links: {
        twitter: user?.profile?.social_links?.twitter || "",
        linkedin: user?.profile?.social_links?.linkedin || "",
        facebook: user?.profile?.social_links?.facebook || "",
      },
      skills: user?.profile?.skills || [],
      interests: user?.profile?.interests || [],
      is_public: user?.profile?.is_public ?? true,
      visible_fields: user?.profile?.visible_fields || [
        "bio",
        "company",
        "position",
        "location",
        "website",
        "social_links",
        "skills",
        "interests"
      ],
    },
    mode: "onChange"
  });

  // フォームの状態を監視
  useEffect(() => {
  }, [form]);

  // プロフィールデータの初期読み込み
  useEffect(() => {
    const loadProfile = async () => {
      if (!user || isInitialized) return;

      try {
        setIsLoading(true);
        const response = await profileApi.getProfile();
        
        // プロフィールデータの構造を正しく解析
        const formValues = {
          displayName: response.profile?.displayName || "",
          bio: response.profile?.bio || "",
          company: response.profile?.company || "",
          position: response.profile?.position || "",
          location: response.profile?.location || "",
          website: response.profile?.website || "",
          social_links: {
            twitter: response.profile?.social_links?.twitter || "",
            linkedin: response.profile?.social_links?.linkedin || "",
            facebook: response.profile?.social_links?.facebook || "",
          },
          skills: response.profile?.skills || [],
          interests: response.profile?.interests || [],
          is_public: response.profile?.is_public ?? true,
          visible_fields: response.profile?.visible_fields || [
            "bio",
            "company",
            "position",
            "location",
            "website",
            "social_links",
            "skills",
            "interests"
          ],
        };

        form.reset(formValues);

        // グローバルステートも更新
        setUser({
          ...user,
          profile: response.profile
        });
        
        setIsInitialized(true);
      } catch (error) {
        toast({
          title: "エラーが発生しました",
          description: "プロフィールの読み込みに失敗しました",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadProfile();
  }, [user, form, toast, setUser, isInitialized]);

  async function onSubmit(data: ProfileFormValues) {
    try {
      setIsLoading(true);
      
      const result = await profileApi.updateProfile(data);
      const updatedProfile = await profileApi.getProfile();


      // グローバルステートの更新
      if (user) {
        setUser({
          ...user,
          profile: updatedProfile.profile
        });
      }
      
      // フォームのリセット処理を修正
      const defaultValues = {
        displayName: updatedProfile.profile?.displayName || "",
        bio: updatedProfile.profile?.bio || "",
        company: updatedProfile.profile?.company || "",
        position: updatedProfile.profile?.position || "",
        location: updatedProfile.profile?.location || "",
        website: updatedProfile.profile?.website || "",
        social_links: {
          twitter: updatedProfile.profile?.social_links?.twitter || "",
          linkedin: updatedProfile.profile?.social_links?.linkedin || "",
          facebook: updatedProfile.profile?.social_links?.facebook || "",
        },
        skills: updatedProfile.profile?.skills || [],
        interests: updatedProfile.profile?.interests || [],
        is_public: updatedProfile.profile?.is_public ?? true,
        visible_fields: updatedProfile.profile?.visible_fields || [
          "bio",
          "company",
          "position",
          "location",
          "website",
          "social_links",
          "skills",
          "interests"
        ],
      };

      form.reset(defaultValues);

      toast({
        title: "プロフィールを更新しました",
        description: "変更内容が保存されました。",
      });
    } catch (error) {
      toast({
        title: "エラーが発生しました",
        description: error instanceof Error ? error.message : "プロフィールの更新に失敗しました",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  const addSkill = () => {
    if (!newSkill.trim()) return;
    
    // カンマ区切りの入力を処理
    const skillsToAdd = newSkill
      .split(',')
      .map(skill => skill.trim())
      .filter(skill => skill && !form.getValues("skills").includes(skill));

    if (skillsToAdd.length > 0) {
      form.setValue("skills", [...form.getValues("skills"), ...skillsToAdd]);
      setNewSkill("");
    }
  };

  const removeSkill = (skill: string) => {
    form.setValue(
      "skills",
      form.getValues("skills").filter((s) => s !== skill)
    );
  };

  const addInterest = () => {
    if (!newInterest.trim()) return;
    
    // カンマ区切りの入力を処理
    const interestsToAdd = newInterest
      .split(',')
      .map(interest => interest.trim())
      .filter(interest => interest && !form.getValues("interests").includes(interest));

    if (interestsToAdd.length > 0) {
      form.setValue("interests", [...form.getValues("interests"), ...interestsToAdd]);
      setNewInterest("");
    }
  };

  const removeInterest = (interest: string) => {
    form.setValue(
      "interests",
      form.getValues("interests").filter((i) => i !== interest)
    );
  };

  const handleSubmit = async (data: ProfileFormValues) => {
    
    if (Object.keys(form.formState.errors).length > 0) {
      toast({
        title: "入力エラー",
        description: "必須項目を入力してください",
        variant: "destructive",
      });
      return;
    }
    
    await onSubmit(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        {/* 基本情報 */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">基本情報</h3>
          <FormField
            control={form.control}
            name="displayName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <User2 className="h-4 w-4 text-blue-500" />
                  表示名
                </FormLabel>
                <FormControl>
                  <Input placeholder="やまたろう" {...field} />
                </FormControl>
                <FormDescription>
                  サイト上で表示される名前です
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-purple-500" />
                  自己紹介
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="あなたについて教えてください"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  500文字以内で入力してください
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Separator />

        {/* 職業情報 */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">職業情報</h3>
          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-orange-500" />
                  会社名
                </FormLabel>
                <FormControl>
                  <Input placeholder="株式会社FUNDIVE" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="position"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4 text-blue-500" />
                  役職
                </FormLabel>
                <FormControl>
                  <Input placeholder="代表取締役" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-emerald-500" />
                  所在地
                </FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value || undefined}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="所在地を選択" />
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
        </div>

        <Separator />
        {/* ウェブサイトとSNS */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">ウェブサイトとSNS</h3>
          </div>
          <FeatureAccess feature="profileAccess.sns.editable">
            <div className="space-y-4">
              {/* ウェブサイト */}
              <FormField
                control={form.control}
                name="website"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Globe className="h-4 w-4" />
                      ウェブサイト
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="https://example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* SNSリンク */}
              <div className="space-y-4">
                <h4 className="text-sm font-medium">SNSリンク</h4>
                {/* Twitter */}
                <FormField
                  control={form.control}
                  name="social_links.twitter"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Twitter className="h-4 w-4" />
                        Twitter
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="https://twitter.com/username" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* LinkedIn */}
                <FormField
                  control={form.control}
                  name="social_links.linkedin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Linkedin className="h-4 w-4" />
                        LinkedIn
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="https://linkedin.com/in/username" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Facebook */}
                <FormField
                  control={form.control}
                  name="social_links.facebook"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Facebook className="h-4 w-4" />
                        Facebook
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="https://facebook.com/username" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </FeatureAccess>
        </div>
        <Separator />

        {/* スキルと興味 */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">スキルと興味</h3>
          <div className="space-y-4">
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <Wrench className="h-4 w-4 text-indigo-500" />
                スキル
              </FormLabel>
              <div className="flex gap-2">
                <Input
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="新しいスキルを追加"
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addSkill();
                    }
                  }}
                />
                <Button type="button" onClick={addSkill}>
                  追加
                </Button>
              </div>
              <FormDescription>
                カンマ(,)区切りで複数のスキルを一度に追加できます（例: React, TypeScript, Next.js）
              </FormDescription>
              <div className="flex flex-wrap gap-2 mt-2">
                {form.watch("skills").map((skill) => (
                  <Badge key={skill} variant="secondary">
                    {skill}
                    <button
                      type="button"
                      onClick={() => removeSkill(skill)}
                      className="ml-1 hover:text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </FormItem>
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <Lightbulb className="h-4 w-4 text-yellow-500" />
                興味・関心
              </FormLabel>
              <div className="flex gap-2">
                <Input
                  value={newInterest}
                  onChange={(e) => setNewInterest(e.target.value)}
                  placeholder="新しい興味・関心を追加"
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addInterest();
                    }
                  }}
                />
                <Button type="button" onClick={addInterest}>
                  追加
                </Button>
              </div>
              <FormDescription>
                カンマ(,)区切りで複数の興味・関心を一度に追加できます（例: AI, ブロックチェーン, スタートアップ）
              </FormDescription>
              <div className="flex flex-wrap gap-2 mt-2">
                {form.watch("interests").map((interest) => (
                  <Badge key={interest} variant="secondary">
                    {interest}
                    <button
                      type="button"
                      onClick={() => removeInterest(interest)}
                      className="ml-1 hover:text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </FormItem>
          </div>
        </div>

        <Separator />

        {/* 公開設定 */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">公開設定</h3>
          <FormField
            control={form.control}
            name="is_public"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base flex items-center gap-2">
                    {field.value ? (
                      <Eye className="h-4 w-4 text-green-500" />
                    ) : (
                      <EyeOff className="h-4 w-4 text-red-500" />
                    )}
                    プロフィールを公開
                  </FormLabel>
                  <FormDescription>
                    プロフィールを他のユーザーに公開します
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
          <Button type="submit" disabled={isLoading || Object.keys(form.formState.errors).length > 0}>
            {isLoading ? "更新中..." : "プロフィールを更新"}
          </Button>
        </div>
      </form>
    </Form>
  );
} 