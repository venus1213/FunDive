import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/common/ModeToggle';
import * as React from 'react';
export function Header() {
  return (
    <header className="fixed top-0 w-full z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold">FUNDIVE</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <Link href="/#features" className="transition-colors hover:text-foreground/80">
            特徴
          </Link>
          <Link href="/#plans" className="transition-colors hover:text-foreground/80">
            料金プラン
          </Link>
          <Link href="/#testimonials" className="transition-colors hover:text-foreground/80">
            ユーザーの声
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <ModeToggle />
          <Button asChild>
            <Link href="/login">始める</Link>
          </Button>
        </div>
      </div>
    </header>
  );
} 