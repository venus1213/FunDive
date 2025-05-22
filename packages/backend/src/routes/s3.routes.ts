import { Router } from 'express';
import { S3Controller } from '../controllers/s3.controller';
import { authenticate } from '../middlewares/auth.middleware';

const s3Routes = Router();
const s3Controller = new S3Controller();

// 認証済みユーザーのみが利用可能なルート
s3Routes.use(authenticate);

// アップロード用の署名付きURL生成エンドポイント
s3Routes.post('/upload-url', s3Controller.generateUploadUrl.bind(s3Controller));

// ダウンロード用の署名付きURL生成エンドポイント
s3Routes.get('/download-url', s3Controller.generateDownloadUrl.bind(s3Controller));

// 画像表示用の署名付きURL生成エンドポイント
s3Routes.get('/view-url', s3Controller.generateViewUrl.bind(s3Controller));

export default s3Routes; 