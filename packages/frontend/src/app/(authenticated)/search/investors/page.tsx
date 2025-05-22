import * as React from "react";
import { Metadata } from "next";
import { InvestorSearch } from "@/components/features/search/Investor";

export const metadata: Metadata = {
  title: "投資家を探す | FUNDIVE",
  description: "投資家を検索して、あなたのプロジェクトにマッチする投資家を見つけましょう。",
};

export default function InvestorsSearchPage() {
  return (
    <div className="container py-8">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold">投資家を探す</h1>
          <p className="text-muted-foreground mt-2">
            あなたのプロジェクトにマッチする投資家を見つけましょう。
          </p>
        </div>
        <InvestorSearch />
      </div>
    </div>
  );
} 