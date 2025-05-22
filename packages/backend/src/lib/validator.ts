import { z } from 'zod';

/**
 * Zodスキーマに基づいてデータを検証するユーティリティ関数
 * @param schema Zodスキーマ
 * @param data 検証するデータ
 * @returns 検証結果（成功または失敗とエラー情報）
 */
export function validateSchema(schema: z.ZodType<any>, data: any) {
  try {
    schema.parse(data);
    return { success: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = error.errors.map((err) => ({
        path: err.path.join('.'),
        message: err.message,
      }));
      return { success: false, errors };
    }
    return { success: false, errors: [{ path: '', message: '検証エラーが発生しました' }] };
  }
} 