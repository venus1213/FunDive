import * as React from "react";
import { Metadata } from "next";
import { EntrepreneurSearch } from "@/components/features/search/entrepreneu";

export const metadata: Metadata = {
  title: "起業家を探す | FUNDIVE",
  description: "起業家を検索して、あなたの投資先となる起業家を見つけましょう。",
};

export default function EntrepreneursSearchPage() {
  return (
    <div className="container py-8">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold">起業家を探す</h1>
          <p className="text-muted-foreground mt-2">
            あなたの投資先となる起業家を見つけましょう。
          </p>
        </div>
        <EntrepreneurSearch />
      </div>
    </div>
  );
} 