import { z } from 'zod';

// Zodのバリデーションエラー型
export const zodErrorSchema = z.object({
  code: z.string(),
  path: z.array(z.string().or(z.number())),
  message: z.string(),
});

export type ZodValidationError = z.infer<typeof zodErrorSchema>;

// APIレスポンスの共通型定義
export type ApiResponse<T> = T & {
  meta?: {
    pagination?: {
      total: number;
      page: number;
      limit: number;
      hasMore: boolean;
    };
  };
}

// エラーレスポンスの型定義
export interface ApiErrorDetails {
  [field: string]: string | ZodValidationError[];
}

export interface ApiError {
  message: string;
  code: string;
  details?: ApiErrorDetails;
  validationErrors?: ZodValidationError[];
}

export interface ErrorResponse {
  error: ApiError;
}

// APIのステータスコード
export const API_ERROR_CODES = {
  UNAUTHORIZED: 'UNAUTHORIZED',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  NOT_FOUND: 'NOT_FOUND',
  SERVER_ERROR: 'SERVER_ERROR',
  NETWORK_ERROR: 'NETWORK_ERROR',
  INVALID_INPUT: 'INVALID_INPUT',
  FORBIDDEN: 'FORBIDDEN',
  CONFLICT: 'CONFLICT',
} as const;

export type ApiErrorCode = typeof API_ERROR_CODES[keyof typeof API_ERROR_CODES];

// 共通のクエリパラメータ型
export interface PaginationParams {
  page?: number;
  limit?: number;
}

// 検索パラメータ
export interface SearchParams extends PaginationParams {
  query?: string;
  filters?: Record<string, string | number | boolean>;
  sort?: string;
  order?: 'asc' | 'desc';
}

// Zodのバリデーションエラーをフォーマットする関数
export const formatZodError = (error: ZodValidationError): string => {
  return `${error.path.join('.')}: ${error.message}`;
};

// 共通の検索パラメータ
export const searchParamsSchema = z.object({
  page: z.number().optional(),
  limit: z.number().optional(),
});

// 一般ユーザー向け検索パラメータ
export const userSearchParamsSchema = searchParamsSchema.extend({
  q: z.string().optional(),
  role: z.enum(['entrepreneur', 'investor']).optional(),
  skills: z.array(z.string()).optional(),
  location: z.string().optional(),
  excludeUserId: z.string().optional(),
});

// 管理者向け検索パラメータ
export const adminUserSearchParamsSchema = searchParamsSchema.extend({
  email: z.string().optional(),
  name: z.string().optional(),
  role: z.enum(['entrepreneur', 'investor', 'admin', 'invited']).optional(),
  isVerified: z.boolean().optional(),
  createdAtStart: z.string().optional(),
  createdAtEnd: z.string().optional(),
  planType: z.enum(['free','startup_partner','standard','premium']).optional(),
});

export type UserSearchParams = z.infer<typeof userSearchParamsSchema>;
export type AdminUserSearchParams = z.infer<typeof adminUserSearchParamsSchema>; 