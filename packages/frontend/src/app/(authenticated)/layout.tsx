"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth";
import { Header } from "@/components/dashboard/Header";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Footer } from "@/components/common/Footer";
import { cn } from "@/lib/utils";

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuthStore();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <div className="fixed top-0 right-0 left-0 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
        <Header />
      </div>
      <div className="flex flex-1 pt-16">
        <div className="hidden md:block fixed left-0 top-16 bottom-0 border-r border-border transition-all duration-300">
          <Sidebar onCollapse={setIsSidebarCollapsed} />
        </div>
        <main className={cn(
          "flex-1 overflow-y-auto p-6 pb-24 transition-all duration-300",
          isSidebarCollapsed ? "md:ml-16" : "md:ml-64"
        )}>
          {children}
        </main>
      </div>
      <div className={cn(
        "mt-auto transition-all duration-300",
        isSidebarCollapsed ? "md:ml-16" : "md:ml-64"
      )}>
        <Footer />
      </div>
    </div>
  );
} 