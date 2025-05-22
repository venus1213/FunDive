'use client';

import * as React from 'react';
import { useState } from 'react';
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
import { articleApi } from '@/lib/api/article';

export default function NewArticlePage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (formData: any) => {
    setIsSubmitting(true);
    try {
      await articleApi.createArticle(formData);
      toast({
        title: '記事を作成しました',
        description: '記事が正常に作成されました',
      });
      router.push('/admin/articles');
    } catch (error: any) {
      console.error('記事の作成に失敗しました', error);
      toast({
        title: '記事の作成に失敗しました',
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
        <h1 className="text-3xl font-bold">新規記事作成</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>記事情報</CardTitle>
        </CardHeader>
        <CardContent>
          <ArticleForm 
            onSubmit={handleSubmit} 
            isSubmitting={isSubmitting} 
            submitText="作成する"
          />
        </CardContent>
      </Card>
    </div>
  );
} 