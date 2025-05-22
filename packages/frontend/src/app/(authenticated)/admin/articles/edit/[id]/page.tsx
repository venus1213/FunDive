'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  Button 
} from '@/components/ui';
import { useToast } from '@/components/ui/use-toast';
import { ArticleForm } from '@/components/features/admin/ArticleForm';
import { ArrowLeft } from 'lucide-react';
import { articleApi, Article } from '@/lib/api/article';

// ローディングコンポーネント
const Loader = () => (
  <div className="flex items-center justify-center">
    <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
  </div>
);

interface EditArticlePageProps {
  params: Promise<{ id: string }> | { id: string };
}

export default function EditArticlePage({ params }: EditArticlePageProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [article, setArticle] = useState<Article | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [articleId, setArticleId] = useState<string>('');
  
  // Next.jsの警告を回避するため、useEffectでparamsからidを安全に取得
  useEffect(() => {
    // Promiseの可能性を考慮してparamsを解決
    const resolveParams = async () => {
      try {
        const resolvedParams = await Promise.resolve(params);
        if (resolvedParams && typeof resolvedParams === 'object' && 'id' in resolvedParams) {
          setArticleId(resolvedParams.id);
        }
      } catch (error) {
        console.error('パラメータの解決に失敗しました:', error);
        router.push('/admin/articles');
      }
    };
    
    resolveParams();
  }, [params, router]);

  useEffect(() => {
    const fetchArticle = async () => {
      if (!articleId) return;
      
      setIsLoading(true);
      try {
        // 特定の記事を取得
        const article = await articleApi.getArticle(articleId);
        setArticle(article);
      } catch (error) {
        console.error('記事の取得に失敗しました', error);
        toast({
          title: '記事の取得に失敗しました',
          description: '時間をおいて再度お試しください',
          variant: 'destructive',
        });
        router.push('/admin/articles');
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticle();
  }, [articleId, router, toast]);

  const handleSubmit = async (formData: any) => {
    if (!articleId) return;
    
    setIsSubmitting(true);
    try {
      await articleApi.updateArticle(articleId, formData);
      toast({
        title: '記事を更新しました',
        description: '記事が正常に更新されました',
      });
      router.push('/admin/articles');
    } catch (error: any) {
      console.error('記事の更新に失敗しました', error);
      toast({
        title: '記事の更新に失敗しました',
        description: error.response?.data?.message || '時間をおいて再度お試しください',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container py-8">
      <div className="flex items-center mb-6">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => router.push('/admin/articles')}
          className="mr-2"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-3xl font-bold">記事編集</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>記事情報</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-8">
              <Loader />
            </div>
          ) : article ? (
            <ArticleForm 
              initialValues={article} 
              onSubmit={handleSubmit} 
              isSubmitting={isSubmitting} 
              submitText="更新する"
              isEditMode
            />
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              記事が見つかりませんでした
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 