import { Response } from 'express';
import { NotificationType, Prisma } from '@prisma/client';
import { AuthRequest } from '../middlewares/auth.middleware.js';
import { mailService } from '../services/mail.service.js';
import { prisma } from '../lib/prisma.js';
import { logger } from '../utils/logger.js';
import { logError } from '../utils/error-logger.js';

/**
 * 通知一覧の取得
 * - ページネーション対応
 * - フィルタリング（タイプ、既読状態）
 */
export const getNotifications = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const { page = 1, limit = 20, type, is_read } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    if (!userId) {
      return res.status(401).json({ message: '認証が必要です' });
    }

    const response = await prisma.$transaction(async (tx) => {
      // ユーザーのプラン情報を取得
      const user = await tx.user.findUnique({
        where: { id: userId },
        select: { planType: true }
      });

      // プラン別の制限を設定
      let notificationLimit = 30; // デフォルト（無料プラン）
      switch (user?.planType) {
        case 'startup_partner':
          notificationLimit = 50;
          break;
        case 'standard':
          notificationLimit = 100;
          break;
        case 'premium':
          notificationLimit = 300;
          break;
      }

      // 3ヶ月前の日付を計算
      const threeMonthsAgo = new Date();
      threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

      const where: Prisma.NotificationWhereInput = {
        userId,
        createdAt: {
          gte: threeMonthsAgo // 3ヶ月以内の通知のみ
        },
        ...(type && { type: type as NotificationType }),
        ...(is_read !== undefined && { isRead: is_read === 'true' }),
      };

      const [notifications, total] = await Promise.all([
        tx.notification.findMany({
          where,
          skip,
          take: Math.min(Number(limit), notificationLimit - skip),
          orderBy: {
            createdAt: 'desc',
          },
        }),
        tx.notification.count({ where }),
      ]);

      // 制限を超える古い通知を自動的にアーカイブ
      if (total > notificationLimit) {
        const excessNotifications = await tx.notification.findMany({
          where: {
            userId,
            createdAt: {
              lt: threeMonthsAgo
            }
          },
          orderBy: {
            createdAt: 'asc'
          },
          take: total - notificationLimit
        });

        // アーカイブ処理
        await Promise.all(
          excessNotifications.map(notification => 
            tx.notificationArchive.create({
              data: {
                originalId: notification.id,
                userId: notification.userId,
                type: notification.type,
                title: notification.title,
                content: notification.content,
                relatedId: notification.relatedId,
                createdAt: notification.createdAt
              }
            })
          )
        );

        // アーカイブした通知を削除
        await tx.notification.deleteMany({
          where: {
            id: {
              in: excessNotifications.map(n => n.id)
            }
          }
        });
      }

      // アクティビティログを記録
      await tx.activityLog.create({
        data: {
          userId,
          actionType: 'read',
          targetType: 'notification',
          details: {
            action: 'get_notifications',
            page,
            limit,
          },
        },
      });

      return {
        notifications,
        total,
        user,
        notificationLimit
      };
    });

    res.json({
      notifications: response.notifications,
      pagination: {
        total: Math.min(response.total, response.notificationLimit),
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(Math.min(response.total, response.notificationLimit) / Number(limit)),
      },
      planInfo: {
        currentPlan: response.user?.planType || 'free',
        notificationLimit: response.notificationLimit,
        remaining: response.notificationLimit - response.total
      }
    });
  } catch (error) {
    await logError({
      userId: req.user?.id,
      type: 'notification_list_error',
      error,
      metadata: {
        page: req.query.page,
        limit: req.query.limit,
        type: req.query.type,
      },
    });
    console.error('Notifications fetch error:', error);
    res.status(500).json({ message: '通知の取得中にエラーが発生しました' });
  }
};

/**
 * 通知を既読にする
 */
export const markNotificationAsRead = async (req: AuthRequest, res: Response) => {
  try {
    const { notificationId } = req.params;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: '認証が必要です' });
    }

    const updatedNotification = await prisma.$transaction(async (tx) => {
      const notification = await tx.notification.findFirst({
        where: {
          id: notificationId,
          userId,
        },
      });

      if (!notification) {
        throw new Error('通知が見つかりません');
      }

      const updated = await tx.notification.update({
        where: { id: notificationId },
        data: { isRead: true },
      });

      // アクティビティログを記録
      await tx.activityLog.create({
        data: {
          userId,
          actionType: 'update',
          targetType: 'notification',
          targetId: notificationId,
          details: {
            action: 'mark_notification_as_read',
          },
        },
      });

      return updated;
    });

    res.json(updatedNotification);
  } catch (error) {
    await logError({
      userId: req.user?.id,
      type: 'notification_mark_read_error',
      error,
      metadata: {
        notificationId: req.params.notificationId,
      },
    });
    console.error('Notification update error:', error);
    res.status(500).json({ message: '通知の更新中にエラーが発生しました' });
  }
};

/**
 * すべての通知を既読にする
 */
export const markAllNotificationsAsRead = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: '認証が必要です' });
    }

    // トランザクション内で一括更新を実行
    const result = await prisma.$transaction(async (tx) => {
      // 未読の通知数を取得
      const unreadCount = await tx.notification.count({
        where: {
          userId,
          isRead: false,
        },
      });

      // 一括更新を実行
      if (unreadCount > 0) {
        await tx.notification.updateMany({
          where: {
            userId,
            isRead: false,
          },
          data: { isRead: true },
        });
      }

      return unreadCount;
    });

    res.json({
      message: 'すべての通知を既読にしました',
      updated_count: result,
    });
  } catch (error) {
    await logError({
      userId: req.user?.id,
      type: 'notification_mark_all_read_error',
      error,
    });
    console.error('Notifications update error:', error);
    res.status(500).json({ message: '通知の更新中にエラーが発生しました' });
  }
};

/**
 * 通知を送信するかどうかを判断し、条件を満たす場合は通知を作成する
 * @param userId 通知を受け取るユーザーID
 * @param type 通知タイプ
 * @param title 通知タイトル
 * @param content 通知内容
 * @param relatedId 関連ID
 */
export const createNotificationIfEnabled = async (
  userId: string,
  type: NotificationType,
  title: string,
  content: string,
  relatedId: string,
  skipEmail: boolean = false
): Promise<boolean> => {
  try {
    // デフォルトの通知設定を取得
    const settings = await prisma.notificationSetting.findUnique({
      where: { userId },
    }) || await prisma.notificationSetting.create({
      data: {
        userId,
        emailEnabled: true,
        directMessageEnabled: true,
        projectMessageEnabled: true,
        mentionEnabled: true,
      },
    });

    let shouldSendNotification = false;

    switch (type) {
    case 'message_received':
      shouldSendNotification = settings.directMessageEnabled;
      break;
    case 'project_commented':
      shouldSendNotification = settings.projectMessageEnabled;
      break;
    case 'user_mentioned':
      shouldSendNotification = settings.mentionEnabled;
      break;
    default:
      return false;
    }

    // アプリ内通知の作成
    if (shouldSendNotification) {
      await prisma.notification.create({
        data: {
          userId,
          type,
          title,
          content,
          relatedId,
        },
      });

      // メール通知（設定が有効かつスキップしない場合）
      if (settings.emailEnabled && !skipEmail) {
        try {
          if (type === 'message_received') {
            // 受信者・送信者の情報を取得
            const [recipient, sender] = await Promise.all([
              prisma.user.findUnique({
                where: { id: userId },
                select: { name: true },
              }),
              prisma.user.findUnique({
                where: { id: relatedId },
                select: { name: true },
              }),
            ]);

            if (recipient && sender) {
              await mailService.sendNotificationEmail(userId, {
                type: 'message_received',
                data: {
                  recipientName: recipient.name || 'ユーザー',
                  senderName: sender.name || 'ユーザー',
                  message: content,
                },
              });
            }
          } else if (type === 'project_commented') {
            // プロジェクトへのコメント通知
            const [recipient, project, lastMessage] = await Promise.all([
              prisma.user.findUnique({
                where: { id: userId },
                select: { name: true },
              }),
              prisma.project.findUnique({
                where: { id: relatedId },
                select: { title: true },
              }),
              prisma.message.findFirst({
                where: {
                  projectId: relatedId,
                  messageType: 'project',
                },
                orderBy: {
                  createdAt: 'desc',
                },
                select: {
                  content: true,
                  sender: {
                    select: {
                      name: true,
                    },
                  },
                },
              }),
            ]);

            if (recipient && project) {
              await mailService.sendNotificationEmail(userId, {
                type: 'project_commented',
                data: {
                  recipientName: recipient.name || 'ユーザー',
                  commenterName: lastMessage?.sender?.name || 'ユーザー',
                  projectTitle: project.title,
                  comment: lastMessage?.content || content,
                },
              });
            }
          } else if (type === 'user_mentioned') {
            // メンション通知（ダイレクトメッセージ or プロジェクトメッセージ）
            const recipient = await prisma.user.findUnique({
              where: { id: userId },
              select: { name: true },
            });

            if (!recipient) {
              throw new Error('受信者情報が見つかりません');
            }

            // relatedId がプロジェクトIDかユーザーIDかを判定
            const project = await prisma.project.findUnique({
              where: { id: relatedId },
              select: { title: true },
            });

            let senderName = 'ユーザー';
            let messageText = content;

            if (project) {
              // プロジェクトメッセージのメンション
              const lastMsg = await prisma.message.findFirst({
                where: {
                  projectId: relatedId,
                  messageType: 'project',
                },
                orderBy: { createdAt: 'desc' },
                select: {
                  content: true,
                  sender: { select: { name: true } },
                },
              });

              senderName = lastMsg?.sender?.name || senderName;
              messageText = lastMsg?.content || messageText;
            } else {
              // ダイレクトメッセージのメンション（relatedId は送信者ID）
              const sender = await prisma.user.findUnique({
                where: { id: relatedId },
                select: { name: true },
              });
              senderName = sender?.name || senderName;
            }

            if (project) {
              // プロジェクトメッセージでのメンションはプロジェクト用テンプレートで送信
              await mailService.sendNotificationEmail(userId, {
                type: 'project_comment',
                data: {
                  recipientName: recipient.name || 'ユーザー',
                  commenterName: senderName,
                  projectTitle: project.title,
                  comment: messageText,
                },
              });
            } else {
              // ダイレクトメッセージのメンション
              await mailService.sendNotificationEmail(userId, {
                type: 'user_mentioned',
                data: {
                  recipientName: recipient.name || 'ユーザー',
                  senderName,
                  message: messageText,
                },
              });
            }
          }
        } catch (emailError) {
          console.error('メール通知の送信に失敗しました:', emailError);
        }
      }

      return true;
    }

    return false;
  } catch (error) {
    console.error('Error creating notification:', error);
    return false;
  }
};

/**
 * 通知設定の取得
 */
export const getNotificationSettings = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: '認証が必要です' });
    }

    const settings = await prisma.$transaction(async (tx) => {
      const existingSettings = await tx.notificationSetting.findUnique({
        where: { userId },
      });

      if (!existingSettings) {
        const defaultSettings = await tx.notificationSetting.create({
          data: {
            userId,
            emailEnabled: true,
            directMessageEnabled: true,
            projectMessageEnabled: true,
            mentionEnabled: true,
          },
        });

        // アクティビティログを記録
        await tx.activityLog.create({
          data: {
            userId,
            actionType: 'create',
            targetType: 'notification',
            details: {
              action: 'create_default_settings',
            },
          },
        });

        return defaultSettings;
      }

      return existingSettings;
    });

    res.json({ settings, planType: 'free' });
  } catch (error) {
    await logError({
      userId: req.user?.id,
      type: 'notification_settings_get_error',
      error,
    });
    console.error('Notification settings fetch error:', error);
    res.status(500).json({ message: '通知設定の取得中にエラーが発生しました' });
  }
};

/**
 * 通知設定の更新
 */
export const updateNotificationSettings = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const {
      emailEnabled,
      directMessageEnabled,
      projectMessageEnabled,
      mentionEnabled
    } = req.body;

    if (!userId) {
      return res.status(401).json({ message: '認証が必要です' });
    }

    const updatedSettings = await prisma.$transaction(async (tx) => {
      const settings = await tx.notificationSetting.upsert({
        where: { userId },
        create: {
          userId,
          emailEnabled,
          directMessageEnabled,
          projectMessageEnabled,
          mentionEnabled,
        },
        update: {
          emailEnabled,
          directMessageEnabled,
          projectMessageEnabled,
          mentionEnabled,
        },
      });

      // アクティビティログを記録
      await tx.activityLog.create({
        data: {
          userId,
          actionType: 'update',
          targetType: 'notification',
          details: {
            action: 'update_settings',
            changes: {
              emailEnabled,
              directMessageEnabled,
              projectMessageEnabled,
              mentionEnabled,
            },
          },
        },
      });

      return settings;
    });

    res.json({ message: '通知設定を更新しました', settings: updatedSettings });
  } catch (error) {
    await logError({
      userId: req.user?.id,
      type: 'notification_settings_update_error',
      error,
      metadata: req.body,
    });
    console.error('Notification settings update error:', error);
    res.status(500).json({ message: '通知設定の更新中にエラーが発生しました' });
  }
};

/**
 * アーカイブされた通知の取得
 */
export const getArchivedNotifications = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const { page = 1, limit = 20 } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    if (!userId) {
      return res.status(401).json({ message: '認証が必要です' });
    }

    const response = await prisma.$transaction(async (tx) => {
      const [archives, total] = await Promise.all([
        tx.notificationArchive.findMany({
          where: { userId },
          skip,
          take: Number(limit),
          orderBy: { createdAt: 'desc' }
        }),
        tx.notificationArchive.count({
          where: { userId }
        })
      ]);

      // アクティビティログを記録
      await tx.activityLog.create({
        data: {
          userId,
          actionType: 'read',
          targetType: 'notification',
          details: {
            action: 'get_archived_notifications',
            page,
            limit,
          },
        },
      });

      return { archives, total };
    });

    res.json({
      archives: response.archives,
      pagination: {
        total: response.total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(response.total / Number(limit))
      }
    });
  } catch (error) {
    await logError({
      userId: req.user?.id,
      type: 'notification_archive_list_error',
      error,
      metadata: {
        page: req.query.page,
        limit: req.query.limit,
      },
    });
    logger.error('Archived notifications fetch error:', error);
    res.status(500).json({ message: 'アーカイブされた通知の取得中にエラーが発生しました' });
  }
}; 