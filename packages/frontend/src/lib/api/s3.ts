import { apiClient } from '../api';

interface S3UploadResponse {
  uploadUrl: string;
  fileUrl: string;
}

// S3のバケット名とリージョンを環境変数から取得するか、デフォルト値を使用
const S3_BUCKET = process.env.NEXT_PUBLIC_AWS_S3_BUCKET || 'fundive-c795f';
const S3_REGION = process.env.NEXT_PUBLIC_AWS_REGION || 'ap-northeast-1';

/**
 * 署名付きURLを生成してS3に画像をアップロードする
 * @param fileName ファイル名
 * @param contentType ファイルのMIMEタイプ
 * @returns 署名付きURLとファイルの公開URL
 */
export async function generateS3UploadUrl(fileName: string, contentType: string): Promise<S3UploadResponse> {
  try {
    const response = await apiClient.post<S3UploadResponse>('/s3/upload-url', {
      fileName,
      contentType
    });
    return response;
  } catch (error) {
    console.error('Error generating S3 upload URL:', error);
    throw new Error('S3アップロードURLの生成に失敗しました');
  }
}

/**
 * S3上のファイルのダウンロードURLを取得する
 * @param key S3内のファイルキー
 * @returns 署名付きダウンロードURL
 */
export async function generateS3DownloadUrl(key: string): Promise<string> {
  try {
    const response = await apiClient.get<{ downloadUrl: string }>(`/s3/download-url?key=${encodeURIComponent(key)}`);
    return response.downloadUrl;
  } catch (error) {
    console.error('Error generating S3 download URL:', error);
    throw new Error('S3ダウンロードURLの生成に失敗しました');
  }
}

// 署名付きURL用キャッシュ
interface SignedUrlCache {
  [key: string]: {
    url: string;
    expiry: number;
  }
}

// キャッシュの有効期間（50分 = 3000秒）
const CACHE_TTL = 50 * 60 * 1000;

// メモリ内キャッシュ
const signedUrlCache: SignedUrlCache = {};

/**
 * S3画像の表示用URLを取得する（署名付きURL）
 * @param key S3内のファイルキー
 * @returns 署名付きURL
 */
export async function getImageUrl(key: string): Promise<string> {
  if (!key) return '';
  
  console.log('Getting image URL for key:', key);
  
  // 外部URLの場合はそのまま返す（適切なエスケープが必要）
  if (key.startsWith('http') && !key.includes(`${S3_BUCKET}.s3.`)) {
    return key;
  }
  
  // キーを正規化（S3 URLから抽出された場合）
  let normalizedKey = key;
  if (key.includes(`${S3_BUCKET}.s3.`)) {
    try {
      const s3UrlPattern = new RegExp(`https?://${S3_BUCKET}\\.s3\\.[^/]+\\.amazonaws\\.com/(.+)`);
      const matches = key.match(s3UrlPattern);
      if (matches && matches[1]) {
        normalizedKey = matches[1];
      }
    } catch (error) {
      console.error('Error extracting key from S3 URL:', error);
    }
  }
  
  // 有効なキャッシュがあればそれを返す
  const cacheKey = normalizedKey;
  const now = Date.now();
  if (signedUrlCache[cacheKey] && signedUrlCache[cacheKey].expiry > now) {
    console.log('Returning cached URL for key:', cacheKey);
    return signedUrlCache[cacheKey].url;
  }

  try {
    // 新しい署名付きURLを取得
    console.log('Fetching new signed URL for key:', normalizedKey);
    const response = await apiClient.get<{ imageUrl: string }>(`/s3/view-url?key=${encodeURIComponent(normalizedKey)}`);
    
    console.log('Received response for image URL');
    
    if (!response.imageUrl) {
      throw new Error('署名付きURLの取得に失敗しました');
    }
    
    // キャッシュに保存
    signedUrlCache[cacheKey] = {
      url: response.imageUrl,
      expiry: now + CACHE_TTL
    };
    
    return response.imageUrl;
  } catch (error) {
    console.error('Error generating S3 view URL:', error);
    
    // エラー時は直接S3のURLを構築して返す（署名なし - パブリックアクセスが必要）
    return `https://${S3_BUCKET}.s3.${S3_REGION}.amazonaws.com/${normalizedKey}`;
  }
} 