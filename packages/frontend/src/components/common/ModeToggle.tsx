"use client"

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';

export function ModeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  // 初期レンダリング時は静的なボタンを返す
  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="w-10 h-10">
        <div className="h-5 w-5" />
        <span className="sr-only">Loading theme</span>
      </Button>
    );
  }
  
  return (
    <Button
      variant="ghost"
      size="icon"
      className="w-10 h-10"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      <div className="relative w-5 h-5">
        <Sun className={`h-5 w-5 absolute transition-all ${theme === 'dark' ? 'scale-0' : 'scale-100'}`} />
        <Moon className={`h-5 w-5 absolute transition-all ${theme === 'dark' ? 'scale-100' : 'scale-0'}`} />
      </div>
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
} 