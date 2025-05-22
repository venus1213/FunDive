'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Facebook, Share2 } from 'lucide-react';
import { XIcon } from '@/components/ui/icons/XIcon';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export interface ShareButtonsProps {
  url: string;
  title: string;
  description?: string;
  className?: string;
  size?: 'default' | 'sm' | 'lg' | 'icon';
  variant?: 'default' | 'outline' | 'secondary' | 'ghost';
  showLabel?: boolean;
}

export function ShareButtons({
  url,
  title,
  description = '',
  className = '',
  size = 'default',
  variant = 'outline',
  showLabel = false,
}: ShareButtonsProps) {
  // 現在のURLが相対パスの場合、完全なURLに変換
  const fullUrl = url.startsWith('http') ? url : `${typeof window !== 'undefined' ? window.location.origin : ''}${url}`;
  
  // Xで共有
  const shareOnX = () => {
    const xUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(fullUrl)}`;
    window.open(xUrl, '_blank', 'noopener,noreferrer');
  };

  // Facebookで共有
  const shareOnFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullUrl)}`;
    window.open(facebookUrl, '_blank', 'noopener,noreferrer');
  };

  // ネイティブシェア機能（モバイルデバイス向け）
  const nativeShare = async () => {
    if (typeof navigator.share !== 'undefined') {
      try {
        await navigator.share({
          title: title,
          text: description,
          url: fullUrl,
        });
      } catch (error) {
        // DOMException: AbortErrorはユーザーがキャンセルした場合に発生するため、エラーとして扱わない
        if (error instanceof DOMException && error.name === 'AbortError') {
          // キャンセルされた場合は何もしない
          return;
        }
        console.error('共有に失敗しました:', error);
      }
    } else {
      // フォールバック: クリップボードにコピー
      try {
        await navigator.clipboard.writeText(fullUrl);
        alert('URLをクリップボードにコピーしました');
      } catch (error) {
        console.error('クリップボードへのコピーに失敗しました:', error);
      }
    }
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button onClick={shareOnX} size={size} variant={variant} className="text-[#000000] dark:text-white">
              <XIcon className="h-4 w-4" />
              {showLabel && <span className="ml-2">X</span>}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Xで共有</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button onClick={shareOnFacebook} size={size} variant={variant} className="text-[#1877F2]">
              <Facebook className="h-4 w-4" />
              {showLabel && <span className="ml-2">Facebook</span>}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Facebookで共有</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button onClick={nativeShare} size={size} variant={variant}>
              <Share2 className="h-4 w-4" />
              {showLabel && <span className="ml-2">共有</span>}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>他の方法で共有</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
} 