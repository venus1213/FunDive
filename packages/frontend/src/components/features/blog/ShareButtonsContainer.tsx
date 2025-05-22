'use client';

import * as React from 'react';
import { ShareButtons } from '@/components/ui/share-buttons';

interface ShareButtonsContainerProps {
  url: string;
  title: string;
  description?: string;
  size?: 'default' | 'sm' | 'lg' | 'icon';
  variant?: 'default' | 'outline' | 'secondary' | 'ghost';
}

export function ShareButtonsContainer({
  url,
  title,
  description,
  size,
  variant
}: ShareButtonsContainerProps) {
  // クリックイベントの伝播を防止する
  const handleShareClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div onClick={handleShareClick}>
      <ShareButtons 
        url={url} 
        title={title} 
        description={description}
        size={size}
        variant={variant}
      />
    </div>
  );
} 