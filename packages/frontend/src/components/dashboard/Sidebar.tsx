"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  MessageSquare,
  Bell,
  Settings,
  Rocket,
  PlusCircle,
  UserSearch,
  Building2,
  Mail,
  MessageCircle,
  BellRing,
  UserCircle,
  CreditCard,
  LogOut,
  FolderKanban,
  Briefcase,
  FileSearch,
  BookMarked,
  Menu,
  ChevronRight,
  ChevronLeft,
  ShieldCheck,
  HandshakeIcon,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/auth";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useState, useEffect } from "react";
import { logout } from "@/lib/auth";

const navigation = [
  {
    name: "ダッシュボード",
    href: "/dashboard",
    icon: LayoutDashboard,
    iconColor: "text-blue-500",
  },
  {
    name: "ユーザー検索",
    icon: Users,
    iconColor: "text-purple-500",
    submenu: [
      {
        name: "投資家を探す",
        href: "/search/investors",
        icon: Briefcase,
        iconColor: "text-purple-400",
      },
      {
        name: "起業家を探す",
        href: "/search/entrepreneurs",
        icon: Building2,
        iconColor: "text-purple-400",
      },
    ],
  },
  {
    name: "プロジェクト",
    icon: Rocket,
    iconColor: "text-emerald-500",
    submenu: [
      {
        name: "マイプロジェクト",
        href: "/projects/my",
        icon: FolderKanban,
        iconColor: "text-emerald-400",
      },
      {
        name: "プロジェクト作成",
        href: "/projects/create",
        icon: PlusCircle,
        iconColor: "text-emerald-400",
      },
      {
        name: "プロジェクト検索",
        href: "/projects/search",
        icon: FileSearch,
        iconColor: "text-emerald-400",
      },
      {
        name: "ブックマーク",
        href: "/bookmarks",
        icon: BookMarked,
        iconColor: "text-emerald-400",
      },
    ],
  },
  {
    name: "メッセージ",
    icon: MessageSquare,
    iconColor: "text-sky-500",
    submenu: [
      {
        name: "ダイレクトメッセージ",
        href: "/messages/direct",
        icon: Mail,
        iconColor: "text-sky-400",
      },
      {
        name: "プロジェクトメッセージ",
        href: "/messages/projects",
        icon: MessageCircle,
        iconColor: "text-sky-400",
      },
    ],
  },
  {
    name: "通知",
    icon: Bell,
    iconColor: "text-amber-500",
    submenu: [
      {
        name: "通知一覧",
        href: "/notifications",
        icon: BellRing,
        iconColor: "text-amber-400",
      },
      {
        name: "通知設定",
        href: "/notifications/settings",
        icon: Settings,
        iconColor: "text-amber-400",
      },
    ],
  },
  {
    name: "管理者メニュー",
    icon: ShieldCheck,
    iconColor: "text-fuchsia-500",
    adminOnly: true,
    submenu: [
      {
        name: "ユーザー管理",
        href: "/admin/users",
        icon: Users,
        iconColor: "text-fuchsia-400",
      },
      {
        name: "プロジェクト管理",
        href: "/admin/projects",
        icon: FolderKanban,
        iconColor: "text-fuchsia-400",
      },
      {
        name: "記事管理",
        href: "/admin/articles",
        icon: FileText,
        iconColor: "text-fuchsia-400",
      },
      {
        name: "メール管理",
        href: "/admin/email",
        icon: Mail,
        iconColor: "text-fuchsia-400",
      },
      {
        name: "招待コード管理",
        href: "/admin/invitation-codes",
        icon: UserSearch,
        iconColor: "text-fuchsia-400",
      },
      {
        name: "統計・分析",
        href: "/admin/dashboard",
        icon: LayoutDashboard,
        iconColor: "text-fuchsia-400",
      },

    ],
  },
  {
    name: "設定",
    icon: Settings,
    iconColor: "text-gray-500",
    submenu: [
      {
        name: "プロフィール",
        href: "/settings/profile",
        icon: UserCircle,
        iconColor: "text-gray-400",
      },
      {
        name: "プラン設定",
        href: "/settings/billing",
        icon: CreditCard,
        iconColor: "text-gray-400",
      },
      {
        name: "招待コード設定",
        href: "/settings/invitation",
        icon: UserSearch,
        iconColor: "text-gray-400",
      },
    ],
  },
  {
    name: "支援相談窓口",
    href: "/consultation/mna",
    icon: HandshakeIcon,
    iconColor: "text-orange-500",
  },
  {
    name: "ログアウト",
    icon: LogOut,
    iconColor: "text-destructive",
    onClick: async (router: any) => {
      try {
        await logout();
        router.push("/login");
      } catch (error) {
        console.error("ログアウトエラー:", error);
      }
    }
  },
];

interface SidebarContentProps {
  onItemClick?: () => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

function SidebarContent({ onItemClick, isCollapsed, onToggleCollapse }: SidebarContentProps) {
  const pathname = usePathname();
  const { user, isAdmin } = useAuthStore();
  const router = useRouter();
  const [openMenus, setOpenMenus] = useState<string[]>([]);

  const hasConsultationAccess = !!user && (
    isAdmin || 
    user.role === 'investor' || 
    user.planType !== 'free' || 
    !!user.invitedBy
  );

  const filteredNavigation = navigation
    .filter(item => {
      if (item.name === '支援相談窓口' && !hasConsultationAccess) return false;
      if (item.adminOnly && !isAdmin) return false;
      return true;
    })
    .map(item => {
      if (item.submenu) {
        const filteredSub = item.submenu.filter(sub => {
          if (user?.role === 'investor' && sub.href === '/search/investors') {
            return false;
          }
          return true;
        });
        return { ...item, submenu: filteredSub };
      }
      return item;
    });

  const toggleSubmenu = (menuName: string) => {
    setOpenMenus(prev => 
      prev.includes(menuName) 
        ? prev.filter(name => name !== menuName)
        : [...prev, menuName]
    );
  };

  useEffect(() => {
    const handleOpenSubmenu = (event: CustomEvent<{ menuName: string }>) => {
      const { menuName } = event.detail;
      if (!openMenus.includes(menuName)) {
        setOpenMenus(prev => [...prev, menuName]);
      }
    };
    
    window.addEventListener('openSidebarSubmenu', handleOpenSubmenu as EventListener);
    return () => {
      window.removeEventListener('openSidebarSubmenu', handleOpenSubmenu as EventListener);
    };
  }, [openMenus]);

  return (
    <div className={cn(
      "flex h-full flex-col bg-card relative transition-all duration-300",
      isCollapsed ? "w-16" : "w-64"
    )}>
      <Button
        variant="ghost"
        size="icon"
        className="absolute -right-4 top-2 z-50 h-8 w-8 rounded-full border bg-background"
        onClick={onToggleCollapse}
      >
        {isCollapsed ? (
          <ChevronRight className="h-4 w-4" />
        ) : (
          <ChevronLeft className="h-4 w-4" />
        )}
      </Button>
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-3">
          {filteredNavigation.map((item) => (
            <div key={item.name}>
              {item.onClick ? (
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start hover:bg-accent hover:text-accent-foreground",
                    item.name === "ログアウト" ? "text-destructive hover:text-destructive" : ""
                  )}
                  onClick={() => {
                    item.onClick(router);
                    onItemClick?.();
                  }}
                >
                  <div className="flex items-center space-x-3">
                    <item.icon className={cn("h-4 w-4", item.iconColor)} />
                    {!isCollapsed && <span>{item.name}</span>}
                  </div>
                </Button>
              ) : item.href ? (
                <Button
                  variant="ghost"
                  asChild
                  className={cn(
                    "w-full justify-start hover:bg-accent hover:text-accent-foreground",
                    item.name === "ログアウト" 
                      ? "text-destructive hover:text-destructive"
                      : "",
                    pathname === item.href && "bg-accent/50 text-accent-foreground"
                  )}
                  onClick={onItemClick}
                >
                  <Link href={item.href} className="flex items-center space-x-3">
                    <item.icon className={cn(
                      "h-4 w-4",
                      item.iconColor
                    )} />
                    {!isCollapsed && <span>{item.name}</span>}
                  </Link>
                </Button>
              ) : (
                <>
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full justify-between hover:bg-accent hover:text-accent-foreground",
                      openMenus.includes(item.name) && "bg-accent/50"
                    )}
                    onClick={() => toggleSubmenu(item.name)}
                    data-menu={item.name}
                  >
                    <div className="flex items-center space-x-3">
                      <item.icon className={cn("h-4 w-4", item.iconColor)} />
                      {!isCollapsed && <span className="text-sm font-medium">{item.name}</span>}
                    </div>
                    {!isCollapsed && (
                      <ChevronRight className={cn(
                        "h-4 w-4 transition-transform duration-200",
                        openMenus.includes(item.name) && "rotate-90"
                      )} />
                    )}
                  </Button>
                  {item.submenu && openMenus.includes(item.name) && (
                    <div className={cn(
                      "ml-4 space-y-1 mt-1",
                      isCollapsed && "ml-2"
                    )}>
                      {item.submenu.map((subItem) => (
                        <Button
                          key={subItem.name}
                          variant="ghost"
                          asChild
                          className={cn(
                            "w-full justify-start text-sm hover:bg-accent hover:text-accent-foreground",
                            pathname === subItem.href && "bg-accent/50 text-accent-foreground",
                            isCollapsed && "px-2"
                          )}
                          onClick={onItemClick}
                        >
                          <Link
                            href={subItem.href}
                            className="flex items-center space-x-3"
                          >
                            <subItem.icon className={cn("h-4 w-4", subItem.iconColor)} />
                            {!isCollapsed && <span>{subItem.name}</span>}
                          </Link>
                        </Button>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
          <div>
            <Button
              variant="ghost"
              className="w-full justify-start hover:bg-accent hover:text-accent-foreground"
              onClick={onItemClick}
            >
              <div className="flex items-center space-x-3">
                {!isCollapsed && <span className="text-sm font-medium">{user?.profile?.name || "ユーザー"}</span>}
              </div>
            </Button>
          </div>
        </nav>
      </div>
    </div>
  );
}

export function Sidebar({ onCollapse }: { onCollapse?: (collapsed: boolean) => void }) {
  const [open, setOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleToggleCollapse = (collapsed: boolean) => {
    setIsCollapsed(collapsed);
    onCollapse?.(collapsed);
  };

  return (
    <>
      {/* デスクトップサイドバー */}
      <div className="hidden md:block">
        <SidebarContent 
          isCollapsed={isCollapsed} 
          onToggleCollapse={() => handleToggleCollapse(!isCollapsed)} 
        />
      </div>

      {/* モバイルサイドバー */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild className="md:hidden">
          <Button variant="ghost" size="icon" className="w-10 h-10">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-80">
          <SheetHeader className="px-4 py-2">
            <SheetTitle>メニュー</SheetTitle>
          </SheetHeader>
          <SidebarContent 
            onItemClick={() => setOpen(false)} 
            isCollapsed={false}
            onToggleCollapse={() => {}}
          />
        </SheetContent>
      </Sheet>
    </>
  );
} 