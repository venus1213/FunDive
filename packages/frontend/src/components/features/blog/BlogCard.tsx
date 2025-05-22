import * as React from "react";
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { formatDate } from '@/lib/utils';
import { S3Image } from '@/components/ui/s3-image';
import { ShareButtonsContainer } from './ShareButtonsContainer';

interface BlogCardProps {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  thumbnail: string;
  tags?: string[];
}

export function BlogCard({
  slug,
  title,
  description,
  publishedAt,
  thumbnail,
  tags
}: BlogCardProps) {
  const articleUrl = `/blog/${slug}`;

  return (
    <Link href={articleUrl} className="block h-full">
      <Card className="h-full overflow-hidden hover:shadow-lg transition-all duration-200">
        <div className="relative aspect-[16/9]">
          <S3Image
            src={thumbnail}
            alt={title}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="p-4 space-y-2">
          <h2 className="text-xl font-semibold line-clamp-2">{title}</h2>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {description}
          </p>
          <time className="text-sm text-muted-foreground block">
            {formatDate(publishedAt)}
          </time>
          <div className="flex justify-between items-center pt-2">
            <div className="flex flex-wrap gap-2">
              {tags && tags.length > 0 && 
                tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-1 bg-secondary rounded-full"
                  >
                    {tag}
                  </span>
                ))
              }
              {tags && tags.length > 2 && (
                <span className="text-xs px-2 py-1 bg-secondary rounded-full">
                  +{tags.length - 2}
                </span>
              )}
            </div>
            <ShareButtonsContainer
              url={articleUrl} 
              title={title} 
              description={description}
              size="sm"
              variant="ghost"
            />
          </div>
        </div>
      </Card>
    </Link>
  );
} 