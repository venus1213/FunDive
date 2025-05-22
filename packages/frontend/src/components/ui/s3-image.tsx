'use client';

import { useState, useEffect } from 'react';
import Image, { ImageProps } from 'next/image';
import { getImageUrl } from '@/lib/api/s3';
import { cn } from '@/lib/utils';
import { Skeleton } from './skeleton';

interface S3ImageProps extends Omit<ImageProps, 'src'> {
  src: string;
  fallbackSrc?: string;
  fallbackComponent?: React.ReactNode;
  showLoader?: boolean;
  imageClassName?: string;
}

// Next.js Image特有のプロパティ（通常のimg要素には渡さないもの）
const NEXTJS_IMAGE_PROPS = [
  'quality',
  'priority',
  'loading',
  'placeholder',
  'blurDataURL',
  'unoptimized',
  'onLoadingComplete',
  'layout',
  'objectFit',
  'objectPosition',
  'lazyBoundary',
  'lazyRoot',
  'sizes',
  'fill',
];

/**
 * S3から画像を表示するためのコンポーネント
 * 自動的に署名付きURLを取得する
 */
export function S3Image({
  src,
  fallbackSrc = '/placeholder.jpg',
  alt = '画像',
  fallbackComponent,
  showLoader = true,
  width,
  height,
  imageClassName,
  className,
  ...props
}: S3ImageProps) {
  const [imageSrc, setImageSrc] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [useRegularImg, setUseRegularImg] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;
    
    async function loadImage() {
      if (!src) {
        setIsLoading(false);
        setError(true);
        return;
      }

      setIsLoading(true);
      setError(false);

      try {
        // URLがhttpから始まるかどうかで処理を分ける
        if (src.startsWith('http')) {
          // S3のURLかどうかをチェック
          if (src.includes('fundive-c795f.s3')) {
            // S3のURLからキー部分を抽出
            const urlObj = new URL(src);
            // パス部分をキーとして使用（先頭の/を除く）
            const s3Key = urlObj.pathname.startsWith('/') 
              ? urlObj.pathname.substring(1) 
              : urlObj.pathname;
            
            console.log('Extracted S3 key from URL:', s3Key);
            
            try {
              // 署名付きURLを取得
              if (s3Key) {
                const signedUrl = await getImageUrl(s3Key);
                console.log('Received signed URL:', signedUrl);
                
                if (isMounted) {
                  setImageSrc(signedUrl);
                  // 署名付きURLの場合は通常のimg要素を使用
                  setUseRegularImg(true);
                  setIsLoading(false);
                }
              } else {
                throw new Error('S3キーを抽出できませんでした');
              }
            } catch (err) {
              // 署名付きURL取得に失敗した場合は、元のURLをそのまま使用
              if (isMounted) {
                setImageSrc(src);
                setUseRegularImg(false);
                setIsLoading(false);
              }
            }
          } else {
            // S3以外の外部URLの場合はそのまま使用
            if (isMounted) {
              setImageSrc(src);
              setUseRegularImg(false);
              setIsLoading(false);
            }
          }
        } else {
          // httpで始まらない場合は、S3のキーと見なす
          console.log('Getting signed URL for key:', src);
          try {
            const signedUrl = await getImageUrl(src);
            console.log('Received signed URL:', signedUrl);
            
            if (isMounted) {
              setImageSrc(signedUrl);
              // 署名付きURLの場合は通常のimg要素を使用
              setUseRegularImg(true);
              setIsLoading(false);
            }
          } catch (err) {
            // キー直接指定の場合も署名付きURL取得に失敗した場合は、フォールバックを使用
            if (isMounted) {
              setError(true);
              setIsLoading(false);
              setImageSrc(fallbackSrc);
            }
          }
        }
      } catch (err) {
        if (isMounted) {
          console.error('Image loading error:', err);
          setError(true);
          setIsLoading(false);
          // エラー時はフォールバック画像を表示
          setImageSrc(fallbackSrc);
        }
      }
    }

    loadImage();

    return () => {
      isMounted = false;
    };
  }, [src, fallbackSrc]);

  if (error && fallbackComponent) {
    return <>{fallbackComponent}</>;
  }

  // propsをNext.js Image用とimg要素用に分離
  const nextImageProps: any = {};
  const imgProps: any = {
    src: imageSrc || fallbackSrc,
    alt: alt as string,
    className: cn('max-w-full h-auto', imageClassName),
    onError: () => setImageSrc(fallbackSrc),
  };

  // 標準的なimg属性として扱えるプロパティの追加
  if (width) imgProps.width = Number(width) || undefined;
  if (height) imgProps.height = Number(height) || undefined;
  
  // 残りのプロパティを振り分け
  Object.keys(props).forEach(key => {
    if (NEXTJS_IMAGE_PROPS.includes(key)) {
      nextImageProps[key] = (props as any)[key];
    } else {
      imgProps[key] = (props as any)[key];
    }
  });

  // fill属性の特別処理
  if (nextImageProps.fill) {
    delete imgProps.width;
    delete imgProps.height;
    imgProps.className = cn(imgProps.className, 'w-full h-full object-cover');
  }

  return (
    <div className={cn('relative', className)}>
      {isLoading && showLoader ? (
        <Skeleton className={cn('h-full w-full', className)} />
      ) : useRegularImg ? (
        // 署名付きURLの場合は通常のimg要素を使用
        <img {...imgProps} />
      ) : (
        // 通常のURLの場合はNext.jsのImage componentを使用
        <Image
          src={imageSrc || fallbackSrc}
          alt={alt as string}
          width={width}
          height={height}
          className={cn(imageClassName)}
          onError={() => setImageSrc(fallbackSrc)}
          {...nextImageProps}
        />
      )}
    </div>
  );
} 