import swaggerJSDoc from 'swagger-jsdoc';
import { readFileSync } from 'fs';
import { join } from 'path';

const configPath = join(process.cwd(), 'src/config');
const packageJson = JSON.parse(
  readFileSync(join(configPath, '../../package.json'), 'utf8')
);

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'FUNDIVE API',
    version: packageJson.version,
    description: 'FUNDIVE APIドキュメント',
    license: {
      name: 'Private',
    },
  },
  servers: [
    {
      url: process.env.API_URL || 'http://localhost:8000',
      description: process.env.NODE_ENV === 'production' ? '本番環境' : '開発環境',
    },
  ],
  tags: [
    { name: 'Auth', description: '認証関連' },
    { name: 'Projects', description: 'プロジェクト管理' },
    { name: 'Messages', description: 'メッセージング' },
    { name: 'Subscriptions', description: 'サブスクリプション管理' },
    { name: 'Admin', description: '管理者機能' },
    { name: 'Profile', description: 'プロフィール管理' },
  ],
  components: {
    securitySchemes: {
      cookieAuth: {
        type: 'apiKey',
        in: 'cookie',
        name: 'accessToken',
        description: 'アクセストークン（JWT）をクッキーで送信',
      },
    },
    schemas: {
      ValidationError: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            description: 'バリデーションエラーメッセージ'
          },
          errors: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                field: {
                  type: 'string',
                  description: 'エラーが発生したフィールド'
                },
                message: {
                  type: 'string',
                  description: 'エラーの詳細メッセージ'
                }
              }
            }
          }
        }
      },
      Error: {
        type: 'object',
        properties: {
          error: {
            type: 'object',
            properties: {
              type: {
                type: 'string',
                enum: [
                  'VALIDATION_ERROR',
                  'AUTHENTICATION_ERROR',
                  'AUTHORIZATION_ERROR',
                  'RATE_LIMIT_EXCEEDED',
                  'RESOURCE_NOT_FOUND',
                  'PLAN_LIMIT_EXCEEDED',
                  'INTERNAL_SERVER_ERROR',
                  'SUBSCRIPTION_ERROR',
                  'PAYMENT_ERROR',
                  'DATABASE_ERROR'
                ],
                description: 'エラータイプ'
              },
              message: {
                type: 'string',
                description: 'エラーメッセージ'
              },
              details: {
                type: 'object',
                description: 'エラーの詳細情報（開発環境のみ）'
              }
            }
          }
        }
      },
      PlanLimits: {
        type: 'object',
        properties: {
          free: {
            type: 'object',
            properties: {
              maxProjects: { type: 'integer', example: 1 },
              canSendMessages: { type: 'boolean', example: false },
            },
          },
          standard: {
            type: 'object',
            properties: {
              maxProjects: { type: 'integer', example: 3 },
              canSendMessages: { type: 'boolean', example: true },
            },
          },
          premium: {
            type: 'object',
            properties: {
              maxProjects: { type: 'integer', example: -1 },
              canSendMessages: { type: 'boolean', example: true },
            },
          },
        },
      },
    },
    parameters: {
      pageParam: {
        in: 'query',
        name: 'page',
        schema: {
          type: 'integer',
          default: 1,
          minimum: 1,
        },
        description: 'ページ番号',
      },
      limitParam: {
        in: 'query',
        name: 'limit',
        schema: {
          type: 'integer',
          default: 10,
          minimum: 1,
          maximum: 100,
        },
        description: '1ページあたりの件数',
      },
    },
    responses: {
      ValidationErrorResponse: {
        description: 'バリデーションエラー',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/ValidationError'
            },
            example: {
              message: 'バリデーションエラー',
              errors: [
                {
                  field: 'email',
                  message: '有効なメールアドレスを入力してください'
                },
                {
                  field: 'password',
                  message: 'パスワードは8文字以上である必要があります'
                }
              ]
            }
          }
        }
      },
      UnauthorizedError: {
        description: '認証エラー',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Error',
            },
            example: {
              error: {
                type: 'AUTHENTICATION_ERROR',
                message: '認証が必要です',
              },
            },
          },
        },
      },
      RateLimitError: {
        description: 'レート制限エラー',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Error',
            },
            example: {
              error: {
                type: 'RATE_LIMIT_EXCEEDED',
                message: 'リクエスト回数が制限を超えました。15分後に再度お試しください。',
              },
            },
          },
        },
      },
      PlanLimitError: {
        description: 'プラン制限エラー',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Error',
            },
            example: {
              error: {
                type: 'PLAN_LIMIT_EXCEEDED',
                message: 'この機能を利用するにはプランのアップグレードが必要です。',
              },
            },
          },
        },
      },
    },
  },
  security: [
    {
      cookieAuth: [],
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./src/**/*.routes.ts', './src/routes/*.ts'],
};

export const swaggerSpec = swaggerJSDoc(options); 