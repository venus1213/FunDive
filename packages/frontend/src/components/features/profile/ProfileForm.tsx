"use client";

import * as React from "react";
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FeatureAccess } from "@/components/features/access/FeatureAccess";

const defaultVisibleFields = ['bio', 'company', 'position', 'location', 'website', 'social_links', 'skills', 'interests'];

const profileFormSchema = z.object({
  name: z.string().min(1, '名前は必須です'),
  bio: z.string().optional().or(z.literal('')),
  company: z.string().optional().or(z.literal('')),
  position: z.string().optional().or(z.literal('')),
  location: z.string().optional().or(z.literal('')),
  website: z.string().optional().or(z.literal('')),
  social_links: z.object({
    twitter: z.string().optional().or(z.literal('')),
    linkedin: z.string().optional().or(z.literal('')),
    facebook: z.string().optional().or(z.literal(''))
  }).optional().default({}),
  skills: z.array(z.string()).optional().default([]),
  interests: z.array(z.string()).optional().default([]),
  is_public: z.boolean().optional().default(true),
  visible_fields: z.array(z.string()).optional().default(defaultVisibleFields)
});

type ProfileFormData = z.infer<typeof profileFormSchema>;

export function ProfileForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      social_links: {},
      skills: [],
      interests: [],
      is_public: true,
      visible_fields: defaultVisibleFields,
    },
  });

  const onSubmit = async (data: ProfileFormData) => {
    // ... submit logic ...
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* 基本情報 */}
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">名前</Label>
          <Input
            id="name"
            type="text"
            {...register("name")}
          />
          {errors.name && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>
        {/* ... その他の基本情報フィールド ... */}
      </div>

      {/* SNS情報 */}
      <FeatureAccess feature="profileAccess.sns.editable">
        <div className="space-y-4">
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="website">ウェブサイト</Label>
              <Input
                id="website"
                type="url"
                placeholder="https://example.com"
                {...register("website")}
              />
              {errors.website && (
                <p className="text-sm text-red-500">{errors.website.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="twitter">Twitter</Label>
              <Input
                id="twitter"
                type="url"
                placeholder="https://twitter.com/username"
                {...register("social_links.twitter")}
              />
              {errors.social_links?.twitter && (
                <p className="text-sm text-red-500">{errors.social_links.twitter.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="linkedin">LinkedIn</Label>
              <Input
                id="linkedin"
                type="url"
                placeholder="https://linkedin.com/in/username"
                {...register("social_links.linkedin")}
              />
              {errors.social_links?.linkedin && (
                <p className="text-sm text-red-500">{errors.social_links.linkedin.message}</p>
              )}
            </div>
          </div>
        </div>
      </FeatureAccess>

      <Button type="submit" className="mt-6" disabled={isSubmitting}>
        {isSubmitting ? "保存中..." : "保存"}
      </Button>
    </form>
  );
} 