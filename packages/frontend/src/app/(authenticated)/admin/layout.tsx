"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth";
import { useToast } from "@/components/ui/use-toast";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { isAdmin } = useAuthStore();
  const { toast } = useToast();

  useEffect(() => {
    if (!isAdmin) {
      toast({
        title: "アクセス権限がありません",
        description: "管理者以外はアクセスできません",
        variant: "destructive",
      });
      router.push("/dashboard");
    }
  }, [isAdmin, router, toast]);

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {children}
    </div>
  );
}