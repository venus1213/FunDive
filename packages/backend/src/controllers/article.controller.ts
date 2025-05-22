import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';
import { slugify } from '../utils/string';
import { validateSchema } from '../lib/validator';
import { z } from 'zod';
import { ArticleStatus } from '@prisma/client';

const createArticleSchema = z.object({
  title: z.string().min(1, '記事タイトルは必須です').max(100, 'タイトルは100文字以内にしてください'),
  description: z.string().min(1, '記事の説明は必須です').max(500, '説明は500文字以内にしてください'),
  content: z.string().min(1, '記事の内容は必須です'),
  thumbnail: z.string().url('サムネイルは有効なURLである必要があります'),
  tags: z.array(z.string()).optional(),
  status: z.enum(['draft', 'published', 'archived']).default('draft'),
  publishedAt: z.string().optional(),
});

const updateArticleSchema = createArticleSchema.partial().extend({
  slug: z.string().optional(),
});

// 記事一覧を取得
export const getArticles = async (req: Request, res: Response) => {
  try {
    const { status } = req.query;
    
    // クエリパラメータに基づいてフィルタリング
    const where = status ? {
      status: status.toString().toUpperCase() as ArticleStatus
    } : {};
    
    const articles = await prisma.article.findMany({
      where,
      orderBy: {
        publishedAt: 'desc'
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });
    
    return res.status(200).json({
      success: true,
      data: articles
    });
  } catch (error) {
    console.error('記事一覧取得エラー:', error);
    return res.status(500).json({
      success: false,
      message: '記事一覧の取得中にエラーが発生しました'
    });
  }
};

// 記事の詳細を取得
export const getArticleBySlug = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    
    const article = await prisma.article.findUnique({
      where: { slug },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });
    
    if (!article) {
      return res.status(404).json({
        success: false,
        message: '記事が見つかりません'
      });
    }
    
    return res.status(200).json({
      success: true,
      data: article
    });
  } catch (error) {
    console.error('記事詳細取得エラー:', error);
    return res.status(500).json({
      success: false,
      message: '記事の取得中にエラーが発生しました'
    });
  }
};

// 記事を作成
export const createArticle = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: '認証が必要です'
      });
    }
    
    // バリデーション
    const validationResult = validateSchema(createArticleSchema, req.body);
    if (!validationResult.success) {
      return res.status(400).json({
        success: false,
        message: '入力内容に問題があります',
        errors: validationResult.errors
      });
    }
    
    const { title, description, content, thumbnail, tags, status, publishedAt } = req.body;
    
    // slugを生成（タイトルから）
    let slug = slugify(title);
    
    // 同じslugが存在するか確認
    let existingArticle = await prisma.article.findUnique({
      where: { slug }
    });
    
    // 同じslugが存在する場合は、末尾に数字を追加
    if (existingArticle) {
      let counter = 1;
      let newSlug = `${slug}-${counter}`;
      
      while (await prisma.article.findUnique({ where: { slug: newSlug } })) {
        counter++;
        newSlug = `${slug}-${counter}`;
      }
      
      slug = newSlug;
    }
    
    // 公開日時の設定
    let parsedPublishedAt: Date = status === 'published' ? new Date() : new Date();
    if (publishedAt) {
      parsedPublishedAt = new Date(publishedAt);
    }
    
    // 記事の作成
    const article = await prisma.article.create({
      data: {
        title,
        description,
        content,
        thumbnail,
        slug,
        authorId: userId,
        status: status as ArticleStatus,
        publishedAt: parsedPublishedAt,
        tags: tags || [],
      }
    });
    
    return res.status(201).json({
      success: true,
      data: article,
      message: '記事が作成されました'
    });
  } catch (error) {
    console.error('記事作成エラー:', error);
    return res.status(500).json({
      success: false,
      message: '記事の作成中にエラーが発生しました'
    });
  }
};

// 記事を更新
export const updateArticle = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;
    
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: '認証が必要です'
      });
    }
    
    // 記事の存在確認
    const existingArticle = await prisma.article.findUnique({
      where: { id },
      include: { author: true }
    });
    
    if (!existingArticle) {
      return res.status(404).json({
        success: false,
        message: '記事が見つかりません'
      });
    }
    
    // 管理者または記事作成者以外は更新不可
    const isAdmin = req.user?.isAdmin;
    const isAuthor = existingArticle.authorId === userId;
    
    if (!isAdmin && !isAuthor) {
      return res.status(403).json({
        success: false,
        message: 'この操作を行う権限がありません'
      });
    }
    
    // バリデーション
    const validationResult = validateSchema(updateArticleSchema, req.body);
    if (!validationResult.success) {
      return res.status(400).json({
        success: false,
        message: '入力内容に問題があります',
        errors: validationResult.errors
      });
    }
    
    const { title, description, content, thumbnail, tags, status, publishedAt, slug } = req.body;
    
    // slugの更新がある場合
    let newSlug = existingArticle.slug;
    if (slug && slug !== existingArticle.slug) {
      newSlug = slugify(slug);
      
      // 同じslugが存在するか確認（ただし、自分自身は除く）
      const duplicateSlug = await prisma.article.findFirst({
        where: {
          slug: newSlug,
          id: { not: id }
        }
      });
      
      if (duplicateSlug) {
        return res.status(400).json({
          success: false,
          message: 'このスラッグは既に使用されています'
        });
      }
    } else if (title && title !== existingArticle.title) {
      // タイトルが変更され、かつslugの指定がない場合は新しいslugを生成
      newSlug = slugify(title);
      
      // 同じslugが存在するか確認（ただし、自分自身は除く）
      let slugExists = await prisma.article.findFirst({
        where: {
          slug: newSlug,
          id: { not: id }
        }
      });
      
      // 同じslugが存在する場合は、末尾に数字を追加
      if (slugExists) {
        let counter = 1;
        let tempSlug = `${newSlug}-${counter}`;
        
        while (await prisma.article.findFirst({ 
          where: { 
            slug: tempSlug,
            id: { not: id }
          } 
        })) {
          counter++;
          tempSlug = `${newSlug}-${counter}`;
        }
        
        newSlug = tempSlug;
      }
    }
    
    // 公開ステータスが変更され、公開になる場合、公開日時を設定
    let parsedPublishedAt = existingArticle.publishedAt;
    if (status === 'published' && existingArticle.status !== 'published') {
      parsedPublishedAt = publishedAt ? new Date(publishedAt) : new Date();
    } else if (publishedAt) {
      parsedPublishedAt = new Date(publishedAt);
    }
    
    // 記事の更新
    const updatedArticle = await prisma.article.update({
      where: { id },
      data: {
        title: title !== undefined ? title : undefined,
        description: description !== undefined ? description : undefined,
        content: content !== undefined ? content : undefined,
        thumbnail: thumbnail !== undefined ? thumbnail : undefined,
        slug: newSlug,
        status: status as ArticleStatus,
        publishedAt: parsedPublishedAt,
        tags: tags !== undefined ? tags : undefined,
      }
    });
    
    return res.status(200).json({
      success: true,
      data: updatedArticle,
      message: '記事が更新されました'
    });
  } catch (error) {
    console.error('記事更新エラー:', error);
    return res.status(500).json({
      success: false,
      message: '記事の更新中にエラーが発生しました'
    });
  }
};

// 記事を削除
export const deleteArticle = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;
    
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: '認証が必要です'
      });
    }
    
    // 記事の存在確認
    const existingArticle = await prisma.article.findUnique({
      where: { id }
    });
    
    if (!existingArticle) {
      return res.status(404).json({
        success: false,
        message: '記事が見つかりません'
      });
    }
    
    // 管理者または記事作成者以外は削除不可
    const isAdmin = req.user?.isAdmin;
    const isAuthor = existingArticle.authorId === userId;
    
    if (!isAdmin && !isAuthor) {
      return res.status(403).json({
        success: false,
        message: 'この操作を行う権限がありません'
      });
    }
    
    // 記事の削除
    await prisma.article.delete({
      where: { id }
    });
    
    return res.status(200).json({
      success: true,
      message: '記事が削除されました'
    });
  } catch (error) {
    console.error('記事削除エラー:', error);
    return res.status(500).json({
      success: false,
      message: '記事の削除中にエラーが発生しました'
    });
  }
}; 