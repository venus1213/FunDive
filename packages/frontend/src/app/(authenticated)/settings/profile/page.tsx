import * as React from "react";
import { Metadata } from "next";
import { ProfileForm } from "@/components/features/settings/ProfileForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "プロフィール設定 | FUNDIVE",
  description: "プロフィール情報の確認・編集",
};

export default function ProfilePage() {
  return (
    <div className="container max-w-3xl py-8">
      <Card>
        <CardHeader>
          <CardTitle>プロフィール設定</CardTitle>
          <CardDescription>
            あなたのプロフィール情報を確認・編集できます。
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ProfileForm />
        </CardContent>
      </Card>
    </div>
  );
} 