'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { X, Upload } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/components/ui/use-toast';
import { generateS3UploadUrl } from '@/lib/api/s3';
import { S3Image } from '@/components/ui/s3-image';
// import dynamic from 'next/dynamic';

// ReactQuillコンポーネントは現在のReact 19環境でfindDOMNode問題があるため、一時的に無効化
// 後でReactQuillがReact 19に対応したら復元する
// const ReactQuill = dynamic(() => import('react-quill'), { 
//   ssr: false,
//   loading: () => <div className="min-h-[400px] flex items-center justify-center border rounded-md p-4">エディターを読み込み中...</div>
// });

// リッチテキストエディタのCSSをインポート
// import 'react-quill/dist/quill.snow.css';

// バリデーションスキーマの定義
const formSchema = z.object({
  title: z.string().min(1, '記事タイトルは必須です').max(100, 'タイトルは100文字以内にしてください'),
  description: z.string().min(1, '記事の説明は必須です').max(500, '説明は500文字以内にしてください'),
  content: z.string().min(1, '記事の内容は必須です'),
  thumbnail: z.string().url('サムネイルは有効なURLである必要があります'),
  tags: z.array(z.string()).optional(),
  status: z.enum(['draft', 'published', 'archived']),
});

type FormValues = z.infer<typeof formSchema>;

interface ArticleFormProps {
  initialValues?: any;
  onSubmit: (data: FormValues) => void;
  isSubmitting: boolean;
  submitText: string;
  isEditMode?: boolean;
}

export function ArticleForm({
  initialValues,
  onSubmit,
  isSubmitting,
  submitText = '保存',
  isEditMode = false,
}: ArticleFormProps) {
  const [newTag, setNewTag] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  // 初期値の設定
  const defaultValues: Partial<FormValues> = {
    title: '',
    description: '',
    content: '',
    thumbnail: '',
    tags: [],
    status: 'draft',
  };

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  // 初期値をセット
  useEffect(() => {
    if (initialValues) {
      const formattedValues = {
        ...initialValues,
        // publishedAtは無視
      };
      form.reset(formattedValues);
    }
  }, [initialValues, form]);

  // タグ追加処理
  const handleAddTag = () => {
    if (newTag.trim() === '') return;

    const currentTags = form.getValues('tags') || [];
    if (!currentTags.includes(newTag.trim())) {
      form.setValue('tags', [...currentTags, newTag.trim()]);
      setNewTag('');
    }
  };

  // タグ削除処理
  const handleRemoveTag = (tagToRemove: string) => {
    const currentTags = form.getValues('tags') || [];
    form.setValue(
      'tags',
      currentTags.filter((tag) => tag !== tagToRemove)
    );
  };

  // タグ入力でEnterキーを押した時の処理
  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  // フォーム送信処理
  const onFormSubmit = (values: FormValues) => {
    onSubmit(values);
  };

  // ReactQuillコンポーネントをラップして型エラーを防ぐ
  // 一時的にシンプルなテキストエリアに置き換え
  const QuillEditor = React.useMemo(() => {
    return function QuillWrapper({ value, onChange }: { value: string; onChange: (value: string) => void }) {
      return (
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="min-h-[400px] font-mono"
          placeholder="ここに記事の本文をマークダウンまたはHTMLで入力してください。"
        />
      );
    };
  }, []);

  // ファイルアップロード処理
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>, fieldName: 'thumbnail' | 'content') => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      
      // ファイルサイズチェック (10MB上限)
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: 'エラー',
          description: 'ファイルサイズは10MB以下にしてください。',
          variant: 'destructive',
        });
        return;
      }

      // 画像ファイル形式チェック
      if (!file.type.startsWith('image/')) {
        toast({
          title: 'エラー',
          description: '画像ファイルのみアップロードできます。',
          variant: 'destructive',
        });
        return;
      }

      // S3アップロード用のURLを取得
      const { uploadUrl, fileUrl } = await generateS3UploadUrl(file.name, file.type);
      
      // 署名付きURLを使って直接アップロード
      const uploadResponse = await fetch(uploadUrl, {
        method: 'PUT',
        body: file,
        headers: {
          'Content-Type': file.type,
        },
      });

      if (!uploadResponse.ok) {
        throw new Error('アップロードに失敗しました');
      }

      // アップロード成功時の処理
      if (fieldName === 'thumbnail') {
        // サムネイル画像として設定
        form.setValue('thumbnail', fileUrl);
      } else if (fieldName === 'content') {
        // コンテンツエディタに画像URLを追加
        const currentContent = form.getValues('content');
        const imageMarkdown = `![画像](${fileUrl})\n\n`;
        form.setValue('content', currentContent + imageMarkdown);
      }

      toast({
        title: '成功',
        description: '画像のアップロードが完了しました',
      });
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: 'エラー',
        description: 'アップロードに失敗しました',
        variant: 'destructive',
      });
    } finally {
      setIsUploading(false);
      // ファイル選択をリセット
      event.target.value = '';
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onFormSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>タイトル</FormLabel>
                  <FormControl>
                    <Input placeholder="記事のタイトル" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>説明文</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="記事の簡単な説明（概要）"
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="thumbnail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>サムネイル画像</FormLabel>
                  <div className="flex gap-2">
                    <FormControl className="flex-1">
                      <Input
                        placeholder="画像URLを直接入力するか、S3に画像をアップロードしてください"
                        {...field}
                      />
                    </FormControl>
                    <div className="relative">
                      <Button 
                        type="button" 
                        variant="default" 
                        size="sm"
                        disabled={isUploading}
                        onClick={() => document.getElementById('thumbnail-upload')?.click()}
                      >
                        {isUploading ? '処理中...' : <Upload className="h-4 w-4 mr-1" />}
                        {isUploading ? '' : '画像アップロード'}
                      </Button>
                      <input
                        id="thumbnail-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleFileUpload(e, 'thumbnail')}
                      />
                    </div>
                  </div>
                  {field.value && (
                    <div className="mt-2 overflow-hidden rounded-md border border-input">
                      <S3Image 
                        src={field.value}
                        alt="サムネイルプレビュー" 
                        width={300}
                        height={200}
                        className="w-full max-h-40 object-cover"
                      />
                    </div>
                  )}
                  <p className="text-xs text-muted-foreground mt-1">
                    「画像アップロード」ボタンをクリックして、画像を直接S3にアップロードしてください（10MB以下の画像ファイルのみ）
                  </p>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ステータス</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="ステータスを選択" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="draft">下書き</SelectItem>
                      <SelectItem value="published">公開</SelectItem>
                      <SelectItem value="archived">アーカイブ</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div>
              <FormLabel>タグ</FormLabel>
              <div className="flex mt-1.5">
                <Input
                  placeholder="タグを入力（Enterで追加）"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyDown={handleTagKeyDown}
                  className="flex-1 mr-2"
                />
                <Button
                  type="button"
                  onClick={handleAddTag}
                  variant="secondary"
                >
                  追加
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                {form.watch('tags')?.map((tag) => (
                  <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                    {tag}
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-4 w-4 p-0"
                      onClick={() => handleRemoveTag(tag)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <div>
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <div className="flex justify-between items-center mb-2">
                    <FormLabel className="mb-0">記事本文</FormLabel>
                    <div className="relative">
                      <Button 
                        type="button" 
                        variant="default" 
                        size="sm"
                        className="h-8"
                        disabled={isUploading}
                        onClick={() => document.getElementById('content-upload')?.click()}
                      >
                        {isUploading ? '処理中...' : <Upload className="h-4 w-4 mr-1" />}
                        {isUploading ? '' : '画像を追加'}
                      </Button>
                      <input
                        id="content-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleFileUpload(e, 'content')}
                      />
                    </div>
                  </div>
                  <FormControl>
                    <Card className="min-h-[400px] overflow-hidden border">
                      <CardContent className="p-0">
                        <QuillEditor value={field.value} onChange={field.onChange} />
                      </CardContent>
                    </Card>
                  </FormControl>
                  <FormMessage />
                  <p className="text-xs text-muted-foreground mt-1">
                    記事中に画像を追加するには、「画像を追加」ボタンをクリックしてS3に画像をアップロードしてください。マークダウン形式で挿入されます。
                  </p>
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => window.history.back()}
          >
            キャンセル
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? '保存中...' : submitText}
          </Button>
        </div>
      </form>
    </Form>
  );
} 