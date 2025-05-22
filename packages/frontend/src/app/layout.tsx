import type { Metadata } from "next";
import "./globals.css";
import { RootLayoutClient } from "@/app/layout.client";

export const metadata: Metadata = {
  title: "FUNDIVE - スタートアップのマッチングプラットフォーム",
  description: "投資家、起業家、共同創業者をつなぐプラットフォーム",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body className="antialiased">
        <RootLayoutClient>
          {children}
        </RootLayoutClient>
      </body>
    </html>
  );
} 