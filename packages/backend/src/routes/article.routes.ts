import { Router } from 'express';
import * as articleController from '../controllers/article.controller';
import { authenticate, isAdmin } from '../middlewares/auth.middleware';

const router = Router();

// 公開記事の取得（認証不要）
router.get('/', articleController.getArticles);
router.get('/:slug', articleController.getArticleBySlug);

// 記事の作成・更新・削除（認証必須）
router.post('/', authenticate, isAdmin, articleController.createArticle);
router.put('/:id', authenticate, isAdmin, articleController.updateArticle);
router.delete('/:id', authenticate, isAdmin, articleController.deleteArticle);

export default router; 