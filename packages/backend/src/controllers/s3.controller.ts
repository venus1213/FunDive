import { Request, Response } from 'express';
import { s3Service } from '../services/s3.service';
import { AuthRequest } from '../middlewares/auth.middleware';
import { logError } from '../utils/error-logger';

/**
 * S3アップロード用の署名付きURLを生成するコントローラー
 */
export class S3Controller {
  /**
   * アップロード用の署名付きURLを生成
   * @param req リクエスト
   * @param res レスポンス
   */
  async generateUploadUrl(req: AuthRequest, res: Response) {
    try {
      const { fileName, contentType } = req.body;
      
      // 必須パラメータの検証
      if (!fileName || !contentType) {
        return res.status(400).json({
          error: 'ファイル名とコンテントタイプは必須です'
        });
      }

      // MIMEタイプのバリデーション (画像ファイルのみ許可)
      if (!contentType.startsWith('image/')) {
        return res.status(400).json({
          error: '画像ファイルのみアップロードできます'
        });
      }

      // 署名付きURLの生成
      const { uploadUrl, fileUrl } = await s3Service.generateUploadUrl(
        fileName,
        contentType,
        60 * 5 // 5分間有効
      );

      // レスポンスを返す
      return res.status(200).json({
        uploadUrl,
        fileUrl
      });
    } catch (error) {
      await logError({
        userId: req.user?.id,
        type: 's3_upload_url_error',
        error,
        metadata: {
          fileName: req.body.fileName,
          contentType: req.body.contentType
        }
      });
      
      return res.status(500).json({
        error: 'アップロードURLの生成に失敗しました'
      });
    }
  }

  /**
   * ダウンロード用の署名付きURLを生成
   * @param req リクエスト
   * @param res レスポンス
   */
  async generateDownloadUrl(req: AuthRequest, res: Response) {
    try {
      const { key } = req.query;
      
      if (typeof key !== 'string' || !key) {
        return res.status(400).json({
          error: 'ファイルキーは必須です'
        });
      }

      // 署名付きダウンロードURLの生成
      const downloadUrl = await s3Service.generateDownloadUrl(key);

      // レスポンスを返す
      return res.status(200).json({ downloadUrl });
    } catch (error) {
      await logError({
        userId: req.user?.id,
        type: 's3_download_url_error',
        error,
        metadata: {
          key: req.query.key
        }
      });
      
      return res.status(500).json({
        error: 'ダウンロードURLの生成に失敗しました'
      });
    }
  }

  /**
   * 画像表示用の署名付きURLを生成
   * @param req リクエスト
   * @param res レスポンス
   */
  async generateViewUrl(req: AuthRequest, res: Response) {
    try {
      const { key } = req.query;
      
      if (typeof key !== 'string' || !key) {
        return res.status(400).json({
          error: '画像キーは必須です'
        });
      }

      // 署名付きURLの生成（有効期間1時間）
      const signedUrl = await s3Service.generateDownloadUrl(key, 60 * 60);

      // レスポンスを返す
      return res.status(200).json({ imageUrl: signedUrl });
    } catch (error) {
      await logError({
        userId: req.user?.id,
        type: 's3_view_url_error',
        error,
        metadata: {
          key: req.query.key
        }
      });
      
      return res.status(500).json({
        error: '画像URL生成に失敗しました'
      });
    }
  }
} 