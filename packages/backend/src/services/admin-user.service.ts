import { PrismaClient, Role, PlanType } from '@prisma/client';
import { prisma } from '../lib/prisma';
import { getAuth } from 'firebase-admin/auth';

export class AdminUserError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AdminUserError';
  }
}

interface UserSearchParams {
  email?: string;
  name?: string;
  role?: Role;
  planType?: PlanType;
  isVerified?: boolean;
  createdAtStart?: Date;
  createdAtEnd?: Date;
}

interface BulkUpdateUserStatusParams {
  userIds: string[];
  isVerified: boolean;
}

interface UpdateUserRoleParams {
  userId: string;
  role: Role;
  invitationExpires?: Date;
  invitedBy?: string;
}

export class AdminUserService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = prisma;
  }

  // ユーザー検索機能
  async searchUsers(params: UserSearchParams, page: number = 1, limit: number = 10) {
    // 空のクエリの場合は全件取得
    if (!params.email && !params.name && !params.role && !params.planType && params.isVerified === undefined && !params.createdAtStart && !params.createdAtEnd) {
      const [users, total] = await Promise.all([
        this.prisma.user.findMany({
          include: {
            profile: true,
          },
          skip: (page - 1) * limit,
          take: limit,
          orderBy: { createdAt: 'desc' },
        }),
        this.prisma.user.count(),
      ]);

      console.log('全件取得結果:', { total, userCount: users.length });
      return {
        users,
        pagination: {
          total,
          page,
          limit,
          total_pages: Math.ceil(total / limit),
        },
      };
    }

    // 検索条件がある場合
    const where = {
      ...(params.email && { email: { contains: params.email } }),
      ...(params.name && { name: { contains: params.name } }),
      ...(params.role && { role: params.role }),
      ...(params.planType && { planType: params.planType }),
      ...(params.isVerified !== undefined && { isVerified: params.isVerified }),
      ...(params.createdAtStart && params.createdAtEnd && {
        createdAt: {
          gte: params.createdAtStart,
          lte: params.createdAtEnd,
        },
      }),
    };

    console.log('検索条件:', where);

    const [users, total] = await Promise.all([
      this.prisma.user.findMany({
        where,
        include: {
          profile: true,
        },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.user.count({ where }),
    ]);

    console.log('検索結果:', {
      条件あり: true,
      total,
      userCount: users.length,
      users: users.map(u => ({ id: u.id, email: u.email }))
    });

    return {
      users,
      pagination: {
        total,
        page,
        limit,
        total_pages: Math.ceil(total / limit),
      },
    };
  }

  // ユーザーの一括ステータス更新
  async bulkUpdateUserStatus(params: BulkUpdateUserStatusParams) {
    return await this.prisma.$transaction(async (tx) => {
      const updatedUsers = await Promise.all(
        params.userIds.map(async (userId) => {
          const user = await tx.user.update({
            where: { id: userId },
            data: { isVerified: params.isVerified },
            include: { profile: true },
          });

          // アクティビティログの記録
          await tx.activityLog.create({
            data: {
              userId,
              actionType: 'admin_action',
              targetType: 'user',
              details: {
                action: 'bulk_update_status',
                isVerified: params.isVerified,
              },
            },
          });

          return user;
        })
      );

      return updatedUsers;
    });
  }

  // ユーザーロールの更新
  async updateUserRole(params: UpdateUserRoleParams) {
    return await this.prisma.$transaction(async (tx) => {
      const user = await tx.user.findUnique({
        where: { id: params.userId },
      });

      if (!user) {
        throw new AdminUserError('ユーザーが見つかりません');
      }

      // Firebaseのカスタムクレームを更新
      if (user.firebaseUid) {
        const auth = getAuth();
        await auth.setCustomUserClaims(user.firebaseUid, { role: params.role });
      }

      const updateData: any = {
        role: params.role,
      };

      // 招待情報の更新
      if (params.invitationExpires) {
        updateData.invitationExpires = params.invitationExpires;
        updateData.invitedBy = params.invitedBy;
      } else {
        // 招待情報をクリア
        updateData.invitationExpires = null;
        updateData.invitedBy = null;
      }

      const updatedUser = await tx.user.update({
        where: { id: params.userId },
        data: updateData,
        include: { profile: true },
      });

      // アクティビティログの記録
      await tx.activityLog.create({
        data: {
          userId: params.userId,
          actionType: 'admin_action',
          targetType: 'user',
          details: {
            action: 'update_role',
            previousRole: user.role,
            newRole: params.role,
            invitationExpires: updateData.invitationExpires,
            invitedBy: updateData.invitedBy,
          },
        },
      });

      return updatedUser;
    });
  }

  // 招待期限の更新
  async updateInvitationExpiry(userId: string, newExpiryDate: Date) {
    return await this.prisma.$transaction(async (tx) => {
      const user = await tx.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        throw new AdminUserError('ユーザーが見つかりません');
      }

      if (!user.invitationExpires || !user.invitedBy) {
        throw new AdminUserError('招待ユーザーではありません');
      }

      const updatedUser = await tx.user.update({
        where: { id: userId },
        data: {
          invitationExpires: newExpiryDate,
        },
        include: { profile: true },
      });

      // アクティビティログの記録
      await tx.activityLog.create({
        data: {
          userId,
          actionType: 'admin_action',
          targetType: 'user',
          details: {
            action: 'update_invitation_expiry',
            previousExpiry: user.invitationExpires,
            newExpiry: newExpiryDate,
          },
        },
      });

      return updatedUser;
    });
  }
} 