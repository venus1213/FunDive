import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware.js';
import { createNotificationIfEnabled } from './notification.controller.js';
import { mailService } from '../services/mail.service.js';
import { io } from '../index.js';
import { logger } from '../utils/logger.js';
import { prisma } from '../lib/prisma.js';
import { logError } from '../utils/error-logger.js';

// プロジェクトメッセージの作成
export const createProjectMessage = async (req: AuthRequest, res: Response) => {
  try {
    const { projectId, content, mentionedUserIds = [] } = req.body;
    const senderId = req.user?.id;

    if (!senderId) {
      return res.status(401).json({ message: '認証が必要です' });
    }

    const message = await prisma.$transaction(async (tx) => {
      // プロジェクトとユーザー情報の取得
      const [project, sender] = await Promise.all([
        tx.project.findUnique({
          where: { id: projectId },
          include: {
            user: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        }),
        tx.user.findUnique({
          where: { id: senderId },
          select: {
            id: true,
            name: true,
          },
        }),
      ]);

      if (!project) {
        throw new Error('プロジェクトが見つかりません');
      }

      if (!sender) {
        throw new Error('送信者の情報が取得できません');
      }

      // メッセージの作成
      const newMessage = await tx.message.create({
        data: {
          senderId,
          receiverId: project.userId,
          projectId,
          content,
          messageType: 'project',
        },
        include: {
          sender: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      });

      // アクティビティログを記録
      await tx.activityLog.create({
        data: {
          userId: senderId,
          actionType: 'create',
          targetType: 'message',
          targetId: newMessage.id,
          details: {
            action: 'create_project_message',
            projectId,
            mentionedUserIds,
          },
        },
      });

      return { newMessage, project, sender };
    });

    // メンションされたユーザーを関連付け
    if (mentionedUserIds.length > 0) {
      // Raw queryを使用してメンション関係を作成
      await prisma.$executeRaw`
        INSERT INTO "_MentionedInMessages" ("A", "B")
        SELECT ${message.newMessage.id}, unnest(${mentionedUserIds}::text[])
      `;

      // メンションされたユーザーの情報を取得
      const mentionedUsers = await prisma.user.findMany({
        where: {
          id: {
            in: mentionedUserIds
          }
        },
        select: {
          id: true,
          name: true,
          email: true
        }
      });

      // メンションされたユーザーへの通知作成
      await Promise.all(
        mentionedUsers.map(async (user) => {
          await createNotificationIfEnabled(
            user.id,
            'user_mentioned',
            'メッセージでメンションされました',
            `${message.sender.name}さんがプロジェクト「${message.project.title}」のメッセージであなたをメンションしました`,
            projectId,
            false
          );
        })
      );
    }

    // WebSocketで新しいメッセージを通知
    const messageData = {
      id: message.newMessage.id,
      content: message.newMessage.content,
      senderId: message.newMessage.senderId,
      receiverId: message.newMessage.receiverId,
      projectId: message.newMessage.projectId,
      messageType: message.newMessage.messageType,
      isRead: message.newMessage.isRead,
      createdAt: message.newMessage.createdAt,
      sender: {
        id: message.sender.id,
        name: message.sender.name,
      },
    };
    
    logger.info('Emitting message to room:', {
      room: `project:${projectId}`,
      event: `project-message:${projectId}`,
      message: messageData
    });

    io.to(`project:${projectId}`).emit(`project-message:${projectId}`, messageData);

    // 通知の作成（プロジェクトオーナーへ）
    if (senderId !== message.project.userId) {
      await createNotificationIfEnabled(
        message.project.userId,
        'project_commented',
        'プロジェクトにメッセージが届きました',
        `プロジェクト「${message.project.title}」に新しいメッセージが届きました`,
        projectId,
        false
      );
    }

    res.status(201).json(message.newMessage);
  } catch (error) {
    await logError({
      userId: req.user?.id,
      type: 'project_message_create_error',
      error,
      metadata: {
        projectId: req.body.projectId,
        mentionedUserIds: req.body.mentionedUserIds,
      },
    });
    console.error('Project message creation error:', error);
    res.status(500).json({ message: 'メッセージの作成中にエラーが発生しました' });
  }
};

// プロジェクトのメッセージ履歴を取得
export const getProjectMessages = async (req: AuthRequest, res: Response) => {
  try {
    const { projectId } = req.params;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: '認証が必要です' });
    }

    const result = await prisma.$transaction(async (tx) => {
      const project = await tx.project.findUnique({
        where: { id: projectId },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              planType: true
            }
          }
        }
      });

      if (!project) {
        throw new Error('プロジェクトが見つかりません');
      }

      // プランに基づいて取得件数を制限
      let limit: number | undefined;
      if (project.user.planType) {
        switch (project.user.planType) {
          case 'premium':
            limit = 300;
            break;
          case 'standard':
            limit = 50;
            break;
          case 'startup_partner':
            limit = 30;
            break;
          default:
            limit = 20;
        }
      }

      const [messages, totalMessages] = await Promise.all([
        tx.message.findMany({
          where: {
            projectId,
            messageType: 'project',
          },
          include: {
            sender: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
          take: limit,
          orderBy: {
            createdAt: 'desc',
          },
        }),
        tx.message.count({
          where: {
            projectId,
            messageType: 'project',
          },
        }),
      ]);

      // 未読メッセージを既読に更新
      await tx.message.updateMany({
        where: {
          projectId,
          receiverId: userId,
          isRead: false,
        },
        data: {
          isRead: true,
        },
      });

      // アクティビティログを記録
      await tx.activityLog.create({
        data: {
          userId,
          actionType: 'read',
          targetType: 'message',
          details: {
            action: 'get_project_messages',
            projectId,
          },
        },
      });

      return { messages, totalMessages, project, limit };
    });

    res.json({
      messages: result.messages || [],
      pagination: {
        total: result.totalMessages,
        limit: result.limit,
        displayed: result.messages.length
      },
      planType: result.project.user.planType
    });
  } catch (error) {
    await logError({
      userId: req.user?.id,
      type: 'project_message_get_error',
      error,
      metadata: {
        projectId: req.params.projectId,
      },
    });
    console.error('Project messages fetch error:', error);
    res.status(500).json({ message: 'メッセージの取得中にエラーが発生しました' });
  }
};

// プロジェクトメッセージの統計情報を取得
export const getProjectMessageStats = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: '認証が必要です' });
    }

    const stats = await prisma.$transaction(async (tx) => {
      const [total, unread] = await Promise.all([
        tx.message.count({
          where: {
            messageType: 'project',
            OR: [
              { senderId: userId },
              { receiverId: userId }
            ]
          }
        }),
        tx.message.count({
          where: {
            messageType: 'project',
            receiverId: userId,
            isRead: false
          }
        })
      ]);

      // アクティビティログを記録
      await tx.activityLog.create({
        data: {
          userId,
          actionType: 'read',
          targetType: 'message',
          details: {
            action: 'get_project_message_stats',
          },
        },
      });

      return { total, unread };
    });

    return res.json(stats);
  } catch (error) {
    await logError({
      userId: req.user?.id,
      type: 'project_message_stats_error',
      error,
    });
    console.error('Failed to get project message stats:', error);
    return res.status(500).json({ message: '統計情報の取得に失敗しました' });
  }
};

// プロジェクトメッセージ一覧を取得
export const getProjectMessageList = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: '認証が必要です' });
    }

    const result = await prisma.$transaction(async (tx) => {
      const projects = await tx.project.findMany({
        where: {
          OR: [
            { userId },
            { messages: { some: { senderId: userId } } }
          ]
        },
        include: {
          messages: {
            where: { messageType: 'project' },
            orderBy: { createdAt: 'desc' },
            take: 1,
            include: {
              sender: {
                select: {
                  id: true,
                  name: true
                }
              }
            }
          }
        }
      });

      const unreadCounts = await tx.message.groupBy({
        by: ['projectId'],
        where: {
          messageType: 'project',
          receiverId: userId,
          isRead: false,
          projectId: {
            in: projects.map(p => p.id)
          }
        },
        _count: true
      });

      // アクティビティログを記録
      await tx.activityLog.create({
        data: {
          userId,
          actionType: 'read',
          targetType: 'message',
          details: {
            action: 'get_project_message_list',
          },
        },
      });

      return { projects, unreadCounts };
    });

    // 未読数のマップを作成
    const unreadCountMap = new Map(
      result.unreadCounts.map(count => [count.projectId, count._count])
    );

    // プロジェクトを自分のものとそれ以外に分類
    interface FormattedProject {
      id: string;
      projectId: string;
      projectTitle: string;
      lastMessage: {
        content: string;
        createdAt: Date;
        sender: {
          id: string;
          name: string;
        };
      };
      unreadCount: number;
    }

    const myProjects: FormattedProject[] = [];
    const otherProjects: FormattedProject[] = [];

    for (const project of result.projects) {
      if (project.messages.length === 0) continue;

      const formattedProject: FormattedProject = {
        id: project.id,
        projectId: project.id,
        projectTitle: project.title,
        lastMessage: {
          content: project.messages[0].content,
          createdAt: project.messages[0].createdAt,
          sender: {
            id: project.messages[0].sender.id,
            name: project.messages[0].sender.name ?? '不明なユーザー'
          }
        },
        unreadCount: unreadCountMap.get(project.id) || 0
      };

      if (project.userId === userId) {
        myProjects.push(formattedProject);
      } else {
        otherProjects.push(formattedProject);
      }
    }

    // 最新のメッセージの日時でソート
    const sortByDate = (a: typeof myProjects[0], b: typeof myProjects[0]) => {
      return new Date(b.lastMessage.createdAt).getTime() - new Date(a.lastMessage.createdAt).getTime();
    };

    myProjects.sort(sortByDate);
    otherProjects.sort(sortByDate);

    res.json({
      myProjects,
      otherProjects,
      total: result.projects.length,
      pagination: {
        total: result.projects.length,
        page: 1,
        limit: result.projects.length,
        totalPages: 1
      }
    });
  } catch (error) {
    await logError({
      userId: req.user?.id,
      type: 'project_message_list_error',
      error,
    });
    console.error('Project message list fetch error:', error);
    res.status(500).json({ message: 'メッセージ一覧の取得中にエラーが発生しました' });
  }
}; 