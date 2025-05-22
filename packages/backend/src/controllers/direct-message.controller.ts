import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware.js';
import { createNotificationIfEnabled } from './notification.controller.js';
import { mailService } from '../services/mail.service.js';
import { prisma } from '../lib/prisma.js';
import { logError } from '../utils/error-logger.js';
import NodeCache from 'node-cache';

// メッセージ履歴用キャッシュの設定（TTL: 1分）
export const messageCache = new NodeCache({ stdTTL: 60 });

// 会話一覧用キャッシュの設定（TTL: 30秒）
export const conversationCache = new NodeCache({ stdTTL: 30 });

/**
 * ダイレクトメッセージの送信
 * - 受信者の存在確認
 * - メッセージの作成
 * - 通知の送信
 */
export const sendDirectMessage = async (req: AuthRequest, res: Response) => {
  try {
    const { receiverId, content, mentionedUserIds = [] } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: '認証が必要です' });
    }

    // 送信者と受信者の情報を取得
    const [sender, receiver] = await Promise.all([
      prisma.user.findUnique({
        where: { id: userId }
      }),
      prisma.user.findUnique({
        where: { id: receiverId }
      })
    ]);

    if (!receiver) {
      console.log("receiver：", receiver);      return res.status(410).json({ message: '受信者が見つかりません' });
    }

    if (!sender) {
      return res.status(411).json({ message: '送信者の情報が取得できません' });
    }

    const message = await prisma.$transaction(async (tx) => {
      // メッセージの作成
      const newMessage = await tx.message.create({
        data: {
          senderId: sender.id,
          receiverId: receiver.id,
          content,
          messageType: 'direct',
        },
        include: {
          sender: {
            select: {
              id: true,
              name: true,
              email: true,
              profile: {
                select: {
                  profile_image_url: true,
                  displayName: true
                }
              }
            },
          },
        },
      });

      // アクティビティログを記録
      await tx.activityLog.create({
        data: {
          userId: sender.id,
          actionType: 'create',
          targetType: 'message',
          targetId: newMessage.id,
          details: {
            action: 'send_direct_message',
            receiverId: receiver.id,
          },
        },
      });

      // メンションされたユーザーへの通知処理
      if (Array.isArray(mentionedUserIds) && mentionedUserIds.length > 0) {
        try {
          // メッセージとユーザーのリレーションを作成
          await prisma.$executeRaw`INSERT INTO "_MentionedInMessages" ("A", "B") SELECT ${newMessage.id}, unnest(${mentionedUserIds}::text[])`;

          // メンション相手のユーザー情報
          const mentionedUsers = await prisma.user.findMany({
            where: { id: { in: mentionedUserIds } },
            select: { id: true }
          });

          // 通知を作成
          await Promise.all(
            mentionedUsers.map(u => {
              return createNotificationIfEnabled(
                u.id,
                'user_mentioned',
                'メッセージでメンションされました',
                `${sender.name} さんがあなたをメンションしました`,
                sender.id,
                false
              );
            })
          );
        } catch (mentionError) {
          console.error('Mention notification error:', mentionError);
        }
      }

      return newMessage;
    });

    // キャッシュの削除
    const conversationCacheKey = `conversations:${sender.id}`;
    const messagesCacheKey = `messages:${sender.id}:${receiver.id}:*`;
    const receiverMessagesCacheKey = `messages:${receiver.id}:${sender.id}:*`;

    Promise.all([
      conversationCache.del(conversationCacheKey),
      messageCache.del(messagesCacheKey),
      messageCache.del(receiverMessagesCacheKey),
      conversationCache.del(`conversations:${receiver.id}`),
    ]).catch(console.error);

    // 通知の作成を非同期で実行
    Promise.all([
      createNotificationIfEnabled(
        receiver.id,
        'message_received',
        '新しいメッセージが届きました',
        content,
        userId
      ),
    ]).catch(console.error);

    res.status(201).json(message);
  } catch (error) {
    await logError({
      userId: req.user?.id,
      type: 'direct_message_send_error',
      error,
      metadata: {
        receiverId: req.body.receiverId,
      },
    });
    console.error('Direct message creation error:', error);
    res.status(500).json({ message: 'メッセージの送信中にエラーが発生しました' });
  }
};

/**
 * ユーザーとのメッセージ履歴の取得
 * - メッセージ一覧の取得
 * - 未読メッセージの既読化
 * - ページネーション対応
 */
export const getDirectMessages = async (req: AuthRequest, res: Response) => {
  try {
    const { userId: otherUserId } = req.params;
    const userId = req.user?.id;
    const { page = 1 } = req.query;

    if (!userId) {
      return res.status(401).json({ message: '認証が必要です' });
    }

    const [currentUser, otherUser] = await Promise.all([
      prisma.user.findUnique({
        where: { id: userId }
      }),
      prisma.user.findUnique({
        where: { id: otherUserId }
      })
    ]);

    if (!currentUser || !otherUser) {
      return res.status(404).json({ message: 'ユーザーが見つかりません' });
    }

    // キャッシュキーの生成
    const cacheKey = `messages:${currentUser.id}:${otherUser.id}:${page}`;
    const cachedMessages = messageCache.get(cacheKey);

    if (cachedMessages) {
      return res.json(cachedMessages);
    }

    const response = await prisma.$transaction(async (tx) => {
      const messages = await tx.message.findMany({
        where: {
          messageType: 'direct',
          OR: [
            { senderId: currentUser.id, receiverId: otherUser.id },
            { senderId: otherUser.id, receiverId: currentUser.id }
          ]
        },
        include: {
          sender: {
            select: {
              id: true,
              name: true,
              email: true,
              profile: true
            }
          },
        },
        orderBy: {
          createdAt: 'asc',
        },
      });

      // 未読メッセージを既読に更新
      await tx.message.updateMany({
        where: {
          messageType: 'direct',
          senderId: otherUser.id,
          receiverId: currentUser.id,
          isRead: false,
        },
        data: {
          isRead: true,
        },
      });

      // アクティビティログを記録（既読更新）
      await tx.activityLog.create({
        data: {
          userId: currentUser.id,
          actionType: 'update',
          targetType: 'message',
          details: {
            action: 'mark_messages_as_read',
            otherUserId: otherUser.id,
          },
        },
      });

      const total = await tx.message.count({
        where: {
          messageType: 'direct',
          OR: [
            { senderId: currentUser.id, receiverId: otherUser.id },
            { senderId: otherUser.id, receiverId: currentUser.id }
          ]
        },
      });

      return {
        messages: messages.map(message => ({
          id: message.id,
          content: message.content,
          createdAt: message.createdAt,
          isSentByMe: message.senderId === currentUser.id,
          isRead: message.isRead,
          sender: {
            id: message.sender.id,
            name: message.sender.name,
            email: message.sender.email,
            profile: message.sender.profile
          }
        })),
        pagination: {
          total,
          page: Number(page),
        },
      };
    });

    // キャッシュに保存
    messageCache.set(cacheKey, response);

    res.json(response);
  } catch (error) {
    await logError({
      userId: req.user?.id,
      type: 'direct_message_get_error',
      error,
      metadata: {
        otherUserId: req.params.userId,
        page: req.query.page,
      },
    });
    console.error('Direct messages fetch error:', error);
    res.status(500).json({ message: 'メッセージの取得中にエラーが発生しました' });
  }
};

/**
 * 会話一覧の取得
 * - 最新のメッセージを基に会話一覧を取得
 * - 未読メッセージ数のカウント
 * - ページネーション対応
 */
export const getConversations = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const { page = 1, limit = 20 } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    if (!userId) {
      return res.status(401).json({ message: '認証が必要です' });
    }

    // キャッシュから会話一覧を取得
    const cacheKey = `conversations:${userId}`;
    const cachedConversations = conversationCache.get(cacheKey);
    
    if (cachedConversations) {
      return res.json(cachedConversations);
    }

    const response = await prisma.$transaction(async (tx) => {
      const conversations = await tx.message.findMany({
        where: {
          messageType: 'direct',
          OR: [
            { senderId: userId },
            { receiverId: userId },
          ],
        },
        orderBy: {
          createdAt: 'desc',
        },
        take: 1000,
        include: {
          sender: {
            select: {
              id: true,
              name: true,
              email: true,
              profile: {
                select: {
                  profile_image_url: true
                }
              }
            },
          },
          receiver: {
            select: {
              id: true,
              name: true,
              email: true,
              profile: {
                select: {
                  profile_image_url: true
                }
              }
            },
          },
        },
      });

      const unreadCounts = await tx.message.groupBy({
        by: ['senderId'],
        where: {
          messageType: 'direct',
          receiverId: userId,
          isRead: false,
        },
        _count: {
          _all: true
        }
      });

      const latestConversations = Array.from(
        conversations.reduce((map, message) => {
          const otherUserId = message.senderId === userId ? message.receiverId : message.senderId;
          if (!map.has(otherUserId) || message.createdAt > map.get(otherUserId)!.createdAt) {
            map.set(otherUserId, message);
          }
          return map;
        }, new Map())
      ).map(([, message]) => message);

      return {
        conversations: latestConversations.slice(skip, skip + Number(limit)).map(message => {
          const otherUser = message.senderId === userId ? message.receiver : message.sender;
          const unreadCount = unreadCounts.find(count => count.senderId === otherUser.id)?._count._all || 0;

          return {
            user: otherUser,
            lastMessage: {
              id: message.id,
              content: message.content,
              createdAt: message.createdAt,
              isRead: message.isRead,
              isSentByMe: message.senderId === userId,
            },
            unreadCount
          };
        }),
        pagination: {
          total: latestConversations.length,
          page: Number(page),
          limit: Number(limit),
          totalPages: Math.ceil(latestConversations.length / Number(limit)),
        },
      };
    });

    console.log("response：", response);
    // キャッシュに保存
    conversationCache.set(cacheKey, response);

    res.json(response);
  } catch (error) {
    await logError({
      userId: req.user?.id,
      type: 'conversation_list_error',
      error,
      metadata: {
        page: req.query.page,
        limit: req.query.limit,
      },
    });
    console.error('Conversations fetch error:', error);
    res.status(500).json({ message: '会話一覧の取得中にエラーが発生しました' });
  }
};

/**
 * ダイレクトメッセージの統計情報を取得
 * - 全メッセージ数
 * - 未読メッセージ数
 */
export const getDirectMessageStats = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: '認証が必要です' });
    }

    // メッセージの統計情報を取得
    const stats = await prisma.$transaction(async (tx) => {
      const [total, unread] = await Promise.all([
        tx.message.count({
          where: {
            messageType: 'direct',
            OR: [
              { senderId: userId },
              { receiverId: userId }
            ]
          }
        }),
        tx.message.count({
          where: {
            messageType: 'direct',
            receiverId: userId,
            isRead: false
          }
        })
      ]);

      return { total, unread };
    });

    res.json(stats);
  } catch (error) {
    await logError({
      userId: req.user?.id,
      type: 'direct_message_stats_error',
      error,
    });
    console.error('Direct message stats fetch error:', error);
    res.status(500).json({ message: 'メッセージの統計情報の取得中にエラーが発生しました' });
  }
};
