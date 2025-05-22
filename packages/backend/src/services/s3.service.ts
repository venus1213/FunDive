import { S3Client, GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { ErrorWithCode } from '../utils/error-with-code';

export class S3Service {
  private client: S3Client;
  private bucket: string;
  private region: string;

  constructor() {
    this.region = process.env.AWS_REGION || 'ap-northeast-1';
    this.bucket = process.env.AWS_S3_BUCKET || '';

    if (!this.bucket) {
      console.warn('AWS_S3_BUCKET is not set in environment variables');
    }

    this.client = new S3Client({
      region: this.region,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
      },
    });
  }

  /**
   * 画像アップロード用の署名付きURLを生成する
   * @param fileName ファイル名
   * @param contentType ファイルのMIMEタイプ
   * @param expiresIn URLの有効期限（秒）
   * @returns 署名付きURLとファイルの公開URL
   */
  async generateUploadUrl(
    fileName: string,
    contentType: string,
    expiresIn = 60 * 5
  ): Promise<{ uploadUrl: string; fileUrl: string }> {
    if (!this.bucket) {
      throw new ErrorWithCode('S3バケットが設定されていません', 'S3_BUCKET_NOT_CONFIGURED');
    }

    // ファイル名に日時を追加して一意にする
    const timestamp = new Date().getTime();
    const key = `uploads/${timestamp}-${fileName}`;

    // アップロード用の署名付きURLを生成
    const command = new PutObjectCommand({
      Bucket: this.bucket,
      Key: key,
      ContentType: contentType,
    });

    const uploadUrl = await getSignedUrl(this.client, command, { expiresIn });
    
    // ファイルの公開URLを生成
    const fileUrl = `https://${this.bucket}.s3.${this.region}.amazonaws.com/${key}`;

    return { uploadUrl, fileUrl };
  }

  /**
   * ファイルのダウンロード用の署名付きURLを生成する
   * @param key S3内のファイルキー
   * @param expiresIn URLの有効期限（秒）
   * @returns 署名付きURL
   */
  async generateDownloadUrl(key: string, expiresIn = 60 * 5): Promise<string> {
    if (!this.bucket) {
      throw new ErrorWithCode('S3バケットが設定されていません', 'S3_BUCKET_NOT_CONFIGURED');
    }

    const command = new GetObjectCommand({
      Bucket: this.bucket,
      Key: key,
    });

    return getSignedUrl(this.client, command, { expiresIn });
  }

  /**
   * S3内のファイルの公開URLを取得する
   * @param key S3内のファイルキー
   * @returns 公開URL
   */
  getPublicUrl(key: string): string {
    return `https://${this.bucket}.s3.${this.region}.amazonaws.com/${key}`;
  }
}

export const s3Service = new S3Service(); 