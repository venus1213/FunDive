'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Button,
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Badge,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui';
import { formatDate } from '@/lib/utils';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { articleApi, Article, ArticlesResponse } from '@/lib/api/article';

// 確認ダイアログコンポーネント
const useConfirm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<{
    title: string;
    description: string;
    confirmText: string;
    cancelText: string;
  }>({
    title: '',
    description: '',
    confirmText: '確認',
    cancelText: 'キャンセル'
  });
  const [resolve, setResolve] = useState<(value: boolean) => void>(() => () => {});
  
  const confirm = (newOptions: { title: string; description: string; confirmText: string; cancelText: string }) => {
    setOptions(newOptions);
    setIsOpen(true);
    return new Promise<boolean>((res) => {
      setResolve(() => res);
    });
  };
  
  const handleConfirm = () => {
    setIsOpen(false);
    resolve(true);
  };
  
  const handleCancel = () => {
    setIsOpen(false);
    resolve(false);
  };
  
  return { confirm, isOpen, setIsOpen, options, handleConfirm, handleCancel };
};

// ローディングコンポーネント
const Loader = () => (
  <div className="flex items-center justify-center">
    <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
  </div>
);

export default function ArticlesAdminPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { confirm, isOpen, setIsOpen, options, handleConfirm, handleCancel } = useConfirm();
  const [isLoading, setIsLoading] = useState(true);
  const [articles, setArticles] = useState<Article[]>([]);
  const [filter, setFilter] = useState<'all' | 'published' | 'draft' | 'archived'>('all');
  
  // 記事一覧を取得
  const fetchArticles = async () => {
    setIsLoading(true);
    try {
      const articles = await articleApi.getArticles();
      setArticles(Array.isArray(articles) ? articles : []);
    } catch (error) {
      console.error('記事の取得に失敗しました', error);
      toast({
        title: '記事の取得に失敗しました',
        description: '時間をおいて再度お試しください',
        variant: 'destructive',
      });
      setArticles([]);
    } finally {
      setIsLoading(false);
    }
  };

  // 初回読み込み時に記事一覧を取得
  useEffect(() => {
    fetchArticles();
  }, []);

  // 記事を削除
  const handleDeleteArticle = async (id: string, title: string) => {
    const confirmed = await confirm({
      title: '記事を削除しますか？',
      description: `"${title}" を削除します。この操作は元に戻せません。`,
      confirmText: '削除する',
      cancelText: 'キャンセル',
    });

    if (confirmed) {
      try {
        await articleApi.deleteArticle(id);
        toast({
          title: '記事を削除しました',
          description: '記事が正常に削除されました',
        });
        // 記事一覧を再取得
        fetchArticles();
      } catch (error) {
        console.error('記事の削除に失敗しました', error);
        toast({
          title: '記事の削除に失敗しました',
          description: '時間をおいて再度お試しください',
          variant: 'destructive',
        });
      }
    }
  };

  // フィルタリングされた記事の取得
  const getFilteredArticles = () => {
    if (!Array.isArray(articles)) {
      console.error('articlesが配列ではありません:', articles);
      return [];
    }
    
    if (filter === 'all') {
      return articles;
    }
    return articles.filter(article => article.status.toLowerCase() === filter);
  };

  const filteredArticles = getFilteredArticles();

  // ステータスに応じたバッジの色を返す
  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'published':
        return <Badge variant="default" className="bg-green-500 hover:bg-green-600">公開中</Badge>;
      case 'draft':
        return <Badge variant="secondary">下書き</Badge>;
      case 'archived':
        return <Badge variant="outline">アーカイブ</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="container py-8">
      {/* 確認ダイアログ */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{options.title}</DialogTitle>
            <DialogDescription>{options.description}</DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-row justify-end gap-2 pt-4">
            <Button
              variant="outline"
              onClick={handleCancel}
            >
              {options.cancelText}
            </Button>
            <Button
              variant="destructive"
              onClick={handleConfirm}
            >
              {options.confirmText}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">記事管理</h1>
        <Button onClick={() => router.push('/admin/articles/new')}>
          <Plus className="mr-2 h-4 w-4" /> 新規記事
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>記事一覧</CardTitle>
          <CardDescription>公開・下書き・アーカイブされた記事を管理します</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" value={filter} onValueChange={(value) => setFilter(value as any)}>
            <TabsList className="mb-4">
              <TabsTrigger value="all">全て</TabsTrigger>
              <TabsTrigger value="published">公開中</TabsTrigger>
              <TabsTrigger value="draft">下書き</TabsTrigger>
              <TabsTrigger value="archived">アーカイブ</TabsTrigger>
            </TabsList>
            
            <TabsContent value={filter}>
              {isLoading ? (
                <div className="flex justify-center py-8">
                  <Loader />
                </div>
              ) : !Array.isArray(filteredArticles) || filteredArticles.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  記事がありません
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>タイトル</TableHead>
                        <TableHead>公開日</TableHead>
                        <TableHead>ステータス</TableHead>
                        <TableHead>作成者</TableHead>
                        <TableHead className="text-right">操作</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {Array.isArray(filteredArticles) && filteredArticles.map((article) => (
                        <TableRow key={article.id}>
                          <TableCell className="font-medium">{article.title}</TableCell>
                          <TableCell>
                            {article.publishedAt ? formatDate(article.publishedAt) : '-'}
                          </TableCell>
                          <TableCell>{getStatusBadge(article.status)}</TableCell>
                          <TableCell>{article.author?.name || article.author?.email || '-'}</TableCell>
                          <TableCell className="text-right space-x-2">
                            <Button 
                              variant="outline" 
                              size="icon"
                              onClick={() => window.open(`/blog/${article.slug}`, '_blank')}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="outline" 
                              size="icon"
                              onClick={() => router.push(`/admin/articles/edit/${article.id}`)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="outline" 
                              size="icon"
                              onClick={() => handleDeleteArticle(article.id, article.title)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
} 