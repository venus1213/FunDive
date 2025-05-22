import { PrismaClient, EmailTemplate, EmailTemplateType, EmailStatus, EmailLog, EmailABTest, EmailABTestResult, EmailSchedule, EmailScheduleType, EmailScheduleStatus, EmailScheduleExecutionLog, EmailScheduleExecutionStatus, Prisma } from '@prisma/client';
import { prisma } from '../lib/prisma.js';
import { sendEmail } from '../lib/email.js';

export class EmailTemplateError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'EmailTemplateError';
  }
}

interface CreateTemplateParams {
  name: string;
  subject: string;
  body: string;
  type: EmailTemplateType;
  variables?: Record<string, any>;
  createdBy: string;
}

interface UpdateTemplateParams {
  name?: string;
  subject?: string;
  body?: string;
  type?: EmailTemplateType;
  variables?: Record<string, any>;
  isActive?: boolean;
  updatedBy: string;
}

interface SendEmailParams {
  templateId: string;
  recipientIds: string[];
  variables?: Record<string, any>;
  sentBy: string;
}

interface Schedule {
  id: string;
  templateId: string;
  name: string;
  description: string | null;
  recipientIds: string[];
  scheduleType: EmailScheduleType;
  cronExpression: string | null;
  sendAt: Date | null;
  variables: Prisma.JsonValue | typeof Prisma.JsonNull;
  status: EmailScheduleStatus;
  nextRunAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

interface CreateScheduleInput {
  templateId: string;
  name: string;
  description?: string | null;
  recipientIds: string[];
  scheduleType: EmailScheduleType;
  cronExpression?: string | null;
  sendAt?: Date | null;
  variables?: Prisma.InputJsonValue | typeof Prisma.JsonNull;
}

interface UpdateScheduleInput {
  name?: string;
  description?: string | null;
  recipientIds?: string[];
  cronExpression?: string | null;
  sendAt?: Date | null;
  variables?: Prisma.InputJsonValue | typeof Prisma.JsonNull;
  status?: EmailScheduleStatus;
}

export class EmailTemplateService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = prisma;
  }

  // 変数の置換処理
  private async replaceVariables(template: string, recipientId: string): Promise<string> {
    try {
      // ユーザー情報の取得
      const user = await this.prisma.user.findFirst({
        where: {
          OR: [
            { id: recipientId },
            { firebaseUid: recipientId }
          ]
        },
        include: {
          profile: true,
        },
      });

      if (!user) {
        throw new EmailTemplateError('ユーザーが見つかりません');
      }

      // プロジェクト情報の取得（ユーザーの最新のプロジェクト）
      const project = await this.prisma.project.findFirst({
        where: { userId: user.id },
        orderBy: { createdAt: 'desc' },
      });

      // プロフィール情報から表示名を取得
      const displayName = user.profile?.displayName || user.name;

      // 変数の定義
      const variables = {
        user: {
          name: user.name,
          email: user.email,
          displayName: displayName,
        },
        project: project ? {
          title: project.title,
          description: project.description,
          category: project.category,
        } : {},
        company: {
          name: user.profile?.company || '',
          position: user.profile?.position || '',
          website: user.profile?.website || '',
        },
        system: {
          date: new Date().toLocaleDateString('ja-JP'),
          time: new Date().toLocaleTimeString('ja-JP'),
          siteUrl: process.env.FRONTEND_URL || 'https://fundive.jp',
        },
      };

      // 変数の置換
      let result = template;
      for (const [category, values] of Object.entries(variables)) {
        for (const [key, value] of Object.entries(values)) {
          const regex = new RegExp(`{{${category}\\.${key}}}`, 'g');
          result = result.replace(regex, String(value || ''));
        }
      }

      return result;
    } catch (error) {
      console.error('変数置換エラー:', error);
      return template; // エラー時は元のテンプレートを返す
    }
  }

  // テンプレートの作成
  async createTemplate(params: CreateTemplateParams): Promise<EmailTemplate> {
    return await this.prisma.$transaction(async (tx) => {
      // 作成者が管理者かチェック
      const creator = await tx.user.findUnique({
        where: { id: params.createdBy },
        select: { isAdmin: true },
      });

      if (!creator?.isAdmin) {
        throw new EmailTemplateError('管理者権限が必要です');
      }

      const template = await tx.emailTemplate.create({
        data: {
          name: params.name,
          subject: params.subject,
          body: params.body,
          type: params.type,
          variables: params.variables || {},
          createdBy: params.createdBy,
        },
      });

      // アクティビティログの記録
      await tx.activityLog.create({
        data: {
          userId: params.createdBy,
          actionType: 'admin_action',
          targetType: 'user',
          details: {
            action: 'create_email_template',
            templateId: template.id,
          },
        },
      });

      return template;
    });
  }

  // テンプレートの更新
  async updateTemplate(id: string, params: UpdateTemplateParams): Promise<EmailTemplate> {
    return await this.prisma.$transaction(async (tx) => {
      // 更新者が管理者かチェック
      const updater = await tx.user.findUnique({
        where: { id: params.updatedBy },
        select: { isAdmin: true },
      });

      if (!updater?.isAdmin) {
        throw new EmailTemplateError('管理者権限が必要です');
      }

      const template = await tx.emailTemplate.update({
        where: { id },
        data: {
          name: params.name,
          subject: params.subject,
          body: params.body,
          type: params.type,
          variables: params.variables,
          isActive: params.isActive,
          updatedBy: params.updatedBy,
        },
      });

      // アクティビティログの記録
      await tx.activityLog.create({
        data: {
          userId: params.updatedBy,
          actionType: 'admin_action',
          targetType: 'user',
          details: {
            action: 'update_email_template',
            templateId: template.id,
          },
        },
      });

      return template;
    });
  }

  // テンプレートの取得
  async getTemplate(id: string): Promise<EmailTemplate | null> {
    return await this.prisma.emailTemplate.findUnique({
      where: { id },
      include: {
        creator: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        updater: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  }

  // テンプレート一覧の取得
  async listTemplates(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;

    const [templates, total] = await Promise.all([
      this.prisma.emailTemplate.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          creator: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          updater: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      }),
      this.prisma.emailTemplate.count(),
    ]);

    return {
      templates,
      pagination: {
        total,
        page,
        limit,
        total_pages: Math.ceil(total / limit),
      },
    };
  }

  // テンプレートの削除
  async deleteTemplate(id: string, userId: string): Promise<void> {
    await this.prisma.$transaction(async (tx) => {
      // 削除者が管理者かチェック
      const user = await tx.user.findUnique({
        where: { id: userId },
        select: { isAdmin: true },
      });

      if (!user?.isAdmin) {
        throw new EmailTemplateError('管理者権限が必要です');
      }

      await tx.emailTemplate.delete({
        where: { id },
      });

      // アクティビティログの記録
      await tx.activityLog.create({
        data: {
          userId,
          actionType: 'admin_action',
          targetType: 'user',
          details: {
            action: 'delete_email_template',
            templateId: id,
          },
        },
      });
    });
  }

  // メールの送信
  async sendEmail(params: SendEmailParams): Promise<EmailLog> {
    console.log('メール送信開始:', {
      templateId: params.templateId,
      recipientIds: params.recipientIds,
      sentBy: params.sentBy
    });

    // トランザクションタイムアウトを30秒に設定
    return await this.prisma.$transaction(async (tx) => {
      // 送信者が管理者かチェック
      const sender = await tx.user.findUnique({
        where: { id: params.sentBy },
        select: { isAdmin: true },
      });

      console.log('送信者情報:', { sender });

      if (!sender?.isAdmin) {
        throw new EmailTemplateError('管理者権限が必要です');
      }

      // テンプレートの取得と検証
      const template = await tx.emailTemplate.findUnique({
        where: { id: params.templateId },
      });

      console.log('テンプレート情報:', { template });

      if (!template) {
        throw new EmailTemplateError('テンプレートが見つかりません');
      }

      if (!template.isActive) {
        throw new EmailTemplateError('無効なテンプレートです');
      }

      // 受信者の検証
      const recipients = await tx.user.findMany({
        where: {
          id: { in: params.recipientIds },
        },
        select: {
          id: true,
          email: true,
        },
      });

      console.log('受信者情報:', { recipients });

      if (recipients.length === 0) {
        throw new EmailTemplateError('有効な受信者が見つかりません');
      }

      // メール送信ログの作成
      const emailLog = await tx.emailLog.create({
        data: {
          templateId: template.id,
          recipientIds: params.recipientIds,
          subject: template.subject,
          body: template.body,
          status: EmailStatus.PENDING,
          sentBy: params.sentBy,
          metadata: {
            variables: params.variables,
            recipientCount: recipients.length,
          } as Record<string, any>,
        },
      });

      console.log('メール送信ログ作成:', { emailLogId: emailLog.id });

      try {
        // トランザクション外でメール送信を実行
        const sendPromises = recipients.map(async (recipient) => {
          try {
            console.log('受信者へのメール送信開始:', { recipientId: recipient.id });

            const subject = await this.replaceVariables(template.subject, recipient.id);
            const body = await this.replaceVariables(template.body, recipient.id);

            // カスタム変数の適用
            let finalSubject = subject;
            let finalBody = body;
            if (params.variables) {
              Object.entries(params.variables).forEach(([key, value]) => {
                const regex = new RegExp(`{{${key}}}`, 'g');
                finalSubject = finalSubject.replace(regex, String(value));
                finalBody = finalBody.replace(regex, String(value));
              });
            }

            console.log('送信内容:', {
              to: recipient.email,
              subject: finalSubject,
              bodyLength: finalBody.length
            });

            // メール送信
            await sendEmail({
              to: recipient.email,
              subject: finalSubject,
              html: finalBody,
              from: `"Fundive サポート" <${process.env.SMTP_FROM}>`
            });

            console.log('メール送信成功:', { recipientId: recipient.id });
            return { success: true, recipientId: recipient.id };
          } catch (error) {
            console.error('個別メール送信エラー:', { recipientId: recipient.id, error });
            return { success: false, recipientId: recipient.id, error };
          }
        });

        // 全ての送信を待機
        const results = await Promise.all(sendPromises);
        const allSuccess = results.every(r => r.success);

        // 送信結果を記録
        await tx.emailLog.update({
          where: { id: emailLog.id },
          data: { 
            status: allSuccess ? EmailStatus.SENT : EmailStatus.FAILED,
            metadata: {
              variables: (emailLog.metadata as Record<string, any>)?.variables,
              recipientCount: (emailLog.metadata as Record<string, any>)?.recipientCount,
              sendResults: JSON.stringify(results)
            } as Prisma.JsonObject,
          },
        });

        console.log('メール送信完了');
        return emailLog;
      } catch (error) {
        console.error('メール送信エラー:', error);
        
        // 送信失敗を記録
        await tx.emailLog.update({
          where: { id: emailLog.id },
          data: { 
            status: EmailStatus.FAILED,
            metadata: {
              variables: (emailLog.metadata as Record<string, any>)?.variables,
              recipientCount: (emailLog.metadata as Record<string, any>)?.recipientCount,
              error: error instanceof Error ? error.message : '不明なエラー'
            } as Prisma.JsonObject,
          },
        });

        throw error;
      }
    }, {
      timeout: 30000 // 30秒
    });
  }

  // 送信履歴の取得
  async getEmailLogs(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;

    const [logs, total] = await Promise.all([
      this.prisma.emailLog.findMany({
        skip,
        take: limit,
        orderBy: { sentAt: 'desc' },
        include: {
          template: true,
          sender: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      }),
      this.prisma.emailLog.count(),
    ]);

    return {
      logs,
      pagination: {
        total,
        page,
        limit,
        total_pages: Math.ceil(total / limit),
      },
    };
  }

  // プレビューデータの更新
  async updatePreviewData(id: string, previewData: Record<string, any>): Promise<EmailTemplate> {
    return await this.prisma.emailTemplate.update({
      where: { id },
      data: { previewData },
    });
  }

  // テンプレートのプレビュー生成
  async generatePreview(templateId: string, recipientId?: string, variables?: Record<string, any>): Promise<{ subject: string; body: string }> {
    const template = await this.prisma.emailTemplate.findUnique({
      where: { id: templateId },
    });

    if (!template) {
      throw new EmailTemplateError('テンプレートが見つかりません');
    }

    let finalVariables: Record<string, any> = {
      system: {
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
        siteUrl: process.env.FRONTEND_URL || 'http://localhost:3000',
      },
    };

    // ユーザー情報の取得と変数の設定
    if (recipientId) {
      const user = await this.prisma.user.findUnique({
        where: { id: recipientId },
        include: {
          profile: true,
        },
      });

      if (user) {
        finalVariables.user = {
          name: user.name,
          email: user.email,
          displayName: user.profile?.displayName || user.name,
        };
      }
    }

    // カスタム変数の追加
    if (variables) {
      finalVariables = { ...finalVariables, ...variables };
    }

    // 変数の置換処理
    const replaceVariables = (text: string, vars: Record<string, any>, prefix = ''): string => {
      let result = text;

      const findPaths = (obj: Record<string, any>, currentPrefix = '') => {
        for (const [key, value] of Object.entries(obj)) {
          const path = currentPrefix ? `${currentPrefix}.${key}` : key;
          if (value && typeof value === 'object') {
            findPaths(value, path);
          } else {
            const isSystemVariable = path.startsWith('system.');
            if (isSystemVariable || (value !== undefined && value !== null)) {
              const valueStr = String(value || '');
              const regex = new RegExp(`{{${path}}}`, 'g');
              result = result.replace(regex, valueStr);
            }
          }
        }
      };

      findPaths(vars);
      return result;
    };

    let subject = replaceVariables(template.subject, finalVariables);
    let body = replaceVariables(template.body, finalVariables);

    return { subject, body };
  }

  // A/Bテストの作成
  async createABTest(params: {
    templateId: string;
    name: string;
    description?: string;
    variantA: { subject: string; body: string };
    variantB: { subject: string; body: string };
    startDate: Date;
    endDate: Date;
  }): Promise<EmailABTest> {
    return await this.prisma.emailABTest.create({
      data: {
        templateId: params.templateId,
        name: params.name,
        description: params.description,
        variantA: params.variantA,
        variantB: params.variantB,
        startDate: params.startDate,
        endDate: params.endDate,
      },
    });
  }

  // A/Bテストの結果記録
  async recordABTestResult(params: {
    testId: string;
    variant: string;
    emailId: string;
    opened: boolean;
    clicked: boolean;
  }): Promise<EmailABTestResult> {
    return await this.prisma.emailABTestResult.create({
      data: params,
    });
  }

  // A/Bテストの結果集計
  async getABTestResults(testId: string) {
    const results = await this.prisma.emailABTestResult.groupBy({
      by: ['variant'],
      where: { testId },
      _count: {
        opened: true,
        clicked: true,
      },
    });

    return results;
  }

  // A/Bテストの完了処理
  async completeABTest(testId: string, winningVariant: string): Promise<EmailABTest> {
    return await this.prisma.emailABTest.update({
      where: { id: testId },
      data: {
        status: 'COMPLETED',
        winningVariant,
        metrics: await this.getABTestResults(testId),
      },
    });
  }

  // スケジュールの作成
  async createSchedule(input: CreateScheduleInput): Promise<Schedule> {
    return this.prisma.emailSchedule.create({
      data: {
        ...input,
        status: EmailScheduleStatus.ACTIVE,
        variables: input.variables ?? Prisma.JsonNull,
      },
    });
  }

  // スケジュールの更新
  async updateSchedule(id: string, input: UpdateScheduleInput): Promise<Schedule> {
    return this.prisma.emailSchedule.update({
      where: { id },
      data: {
        ...input,
        variables: input.variables ?? Prisma.JsonNull,
      },
    });
  }

  // スケジュール実行のログ記録
  async logScheduleExecution(params: {
    scheduleId: string;
    status: EmailScheduleExecutionStatus;
    emailLogId?: string;
    error?: string;
  }): Promise<EmailScheduleExecutionLog> {
    return this.prisma.emailScheduleExecutionLog.create({
      data: params,
    });
  }

  // スケジュール一覧の取得
  async listSchedules(page: number, limit: number): Promise<{ data: Schedule[]; total: number }> {
    const offset = (page - 1) * limit;
    const [schedules, total] = await Promise.all([
      this.prisma.emailSchedule.findMany({
        skip: offset,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.emailSchedule.count(),
    ]);

    return {
      data: schedules,
      total,
    };
  }

  // スケジュールの取得
  async getSchedule(id: string): Promise<Schedule | null> {
    return this.prisma.emailSchedule.findUnique({
      where: { id },
    });
  }

  // スケジュールの削除
  async deleteSchedule(id: string): Promise<void> {
    try {
      await this.prisma.$transaction(async (tx) => {
        // スケジュールの存在確認
        const schedule = await tx.emailSchedule.findUnique({
          where: { id },
        });

        if (!schedule) {
          throw new EmailTemplateError('スケジュールが見つかりません');
        }

        // キャンセル済みかどうかの確認
        if (schedule.status !== 'CANCELLED') {
          throw new EmailTemplateError('キャンセル済みのスケジュールのみ削除できます');
        }

        // 関連する実行ログの削除
        await tx.emailScheduleExecutionLog.deleteMany({
          where: { scheduleId: id },
        });

        // スケジュールの削除
        await tx.emailSchedule.delete({
          where: { id },
        });
      });
    } catch (error) {
      if (error instanceof EmailTemplateError) {
        throw error;
      }
      console.error('スケジュール削除エラー:', error);
      throw new EmailTemplateError('スケジュールの削除に失敗しました');
    }
  }
} 