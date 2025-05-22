import { apiClient } from '../api';
import type { User } from '@/types/user';
import type { Project } from '@/types/project';
import type { AdminUserSearchParams } from '@/types/api';
import { adminUserSearchParamsSchema } from '@/types/api';

interface PaginationParams {
  page?: number;
  limit?: number;
}

interface BulkUpdateUserStatusParams {
  userIds: string[];
  isVerified: boolean;
}

interface UpdateUserRoleParams {
  role: 'entrepreneur' | 'investor' | 'admin' | 'invited';
  invitationExpires?: string;
}

interface DeleteUserParams {
  reason: string;
  confirm: boolean;
}

interface BulkDeleteUsersParams {
  ids: string[];
  reason: string;
  confirm: boolean;
}

interface ProjectSearchParams {
  title?: string;
  category?: string;
  status?: string;
  createdAtStart?: string;
  createdAtEnd?: string;
  page?: number;
  limit?: number;
}

interface UpdateProjectStatusParams {
  status: 'active' | 'suspended' | 'draft';
}

interface DeleteProjectParams {
  reason: string;
  confirm: boolean;
}

interface InvitationCode {
  id: string;
  code: string;
  maxUses: number;
  usedCount: number;
  expiresAt: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  createdBy: { // 追加
    id: string;
    name: string;
    email: string;
  };
  usedBy: { // 追加
    id: string;
    name: string;
    email: string;
    invitationExpires?: string;
  } | null;
  isUsed: boolean; // 追加
}

interface CreateInvitationCodeParams {
  maxUses: number;
  expiresIn: number;
  durationDays: number;
}

interface UpdateInvitationCodeParams {
  maxUses?: number;
  expiresAt?: string;
  isActive?: boolean;
  durationDays?: number;
}

interface ExtendInvitationParams {
  userId: string;
  extensionDays: number;
}

interface AdminUserResponse {
  users: User[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    hasMore: boolean;
  };
}

interface AdminProjectResponse {
  projects: Project[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    hasMore: boolean;
  };
}

interface EmailTemplateResponse {
  templates: EmailTemplate[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    hasMore: boolean;
  };
}

interface EmailScheduleResponse {
  schedules: EmailSchedule[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    hasMore: boolean;
  };
}

interface EmailLogResponse {
  logs: EmailLog[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    hasMore: boolean;
  };
}

interface InvitationCodeResponse {
  invitationCodes: InvitationCode[]; // 追加
  pagination: {
    total: number;
    page: number;
    limit: number;
    total_pages: number;
  }; // 追加
}

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  body: string;
  type: string;
  variables?: Record<string, any>;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface EmailSchedule {
  id: string;
  templateId: string;
  name: string;
  description: string | null;
  recipientIds: string[];
  scheduleType: 'ONE_TIME' | 'RECURRING';
  cronExpression: string | null;
  sendAt: string | null;
  variables: Record<string, any>;
  status: 'ACTIVE' | 'PAUSED' | 'COMPLETED' | 'CANCELLED';
  lastRunAt: string | null; // 追加
  nextRunAt: string | null;  // 追加
  createdAt: string;
  updatedAt: string;
}

interface EmailLog {
  id: string;
  templateId: string;
  recipientId: string;
  status: string;
  error?: string;
  sentAt: string;
  createdAt: string;
}

// ユーザー一覧取得
export const adminApi = {
  getUsers: async (params: AdminUserSearchParams = {}) => {
    // パラメータのバリデーション
    const validatedParams = adminUserSearchParamsSchema.parse(params);
    const response = await apiClient.get<AdminUserResponse>('/admin/users', { params: validatedParams });
    return response;
  },

  searchUsers: async (params: AdminUserSearchParams = {}) => {
    // パラメータのバリデーション
    const validatedParams = adminUserSearchParamsSchema.parse(params);
    const response = await apiClient.get<AdminUserResponse>('/admin/users/search', { params: validatedParams });
    return response;
  },

  getUserDetail: async (userId: string) => {
    const response = await apiClient.get<{ user: User }>(`/admin/users/${userId}`);
    // UserDetail型に合わせて戻り値を変換
    return {
      ...response.user,
      activityLogs: response.user.activityLogs || [],
      projects: response.user.projects || [],
      reports: response.user.reports || [],
    };
  },

  updateUserStatus: async (userId: string, isVerified: boolean) => {
    const response = await apiClient.put<void>(`/admin/users/${userId}/status`, { isVerified });
    return response;
  },

  bulkUpdateUserStatus: async (params: BulkUpdateUserStatusParams) => {
    const response = await apiClient.put<void>('/admin/users/bulk-status', params);
    return response;
  },

  updateUserRole: async (userId: string, params: UpdateUserRoleParams) => {
    const response = await apiClient.put<void>(`/admin/users/${userId}/role`, params);
    return response;
  },

  updateInvitationExpiry: async (userId: string, expiryDate: string) => {
    const response = await apiClient.put<void>(`/admin/users/${userId}/invitation-expiry`, { expiryDate });
    return response;
  },

  deleteUser: async (userId: string, params: DeleteUserParams) => {
    const response = await apiClient.delete<void>(`/admin/users/${userId}`, { data: params });
    return response;
  },

  bulkDeleteUsers: async (params: BulkDeleteUsersParams) => {
    const response = await apiClient.post<void>('/admin/users/bulk-delete', params);
    return response;
  },

  registerAdmin: async (userId: string) => {
    const response = await apiClient.post<void>(`/admin/users/${userId}/register-admin`);
    return response;
  },

  // プロジェクト検索
  searchProjects: async (params: ProjectSearchParams = {}) => {
    const response = await apiClient.get<AdminProjectResponse>('/admin/projects/search', { params });
    return response;
  },

  getProjectDetail: async (projectId: string) => {
    const response = await apiClient.get<{ project: Project }>(`/admin/projects/${projectId}`);
    return response.project;
  },

  updateProjectStatus: async (projectId: string, params: UpdateProjectStatusParams) => {
    const response = await apiClient.put<void>(`/admin/projects/${projectId}/status`, params);
    return response;
  },

  deleteProject: async (projectId: string, params: DeleteProjectParams) => {
    const response = await apiClient.delete<void>(`/admin/projects/${projectId}`, { data: params });
    return response;
  },

  // メールテンプレート関連
  getEmailTemplates: async (params: PaginationParams = {}) => {
    const response = await apiClient.get<EmailTemplateResponse>('/admin-email/templates', { params });
    return response;
  },

  getEmailTemplateDetail: async (templateId: string) => {
    const response = await apiClient.get<EmailTemplate>(`/admin-email/templates/${templateId}`);
    return response;
  },

  createEmailTemplate: async (data: {
    name: string;
    subject: string;
    body: string;
    type: string;
    variables?: Record<string, any>;
  }) => {
    const response = await apiClient.post<EmailTemplate>('/admin-email/templates', data);
    return response;
  },

  updateEmailTemplate: async (templateId: string, data: {
    name?: string;
    subject?: string;
    body?: string;
    type?: string;
    variables?: Record<string, any>;
    isActive?: boolean;
  }) => {
    const response = await apiClient.put<EmailTemplate>(`/admin-email/templates/${templateId}`, data);
    return response;
  },

  deleteEmailTemplate: async (templateId: string) => {
    const response = await apiClient.delete<void>(`/admin-email/templates/${templateId}`);
    return response;
  },

  generatePreview: async (templateId: string, recipientId?: string, customVariables?: Record<string, any>) => {
    const response = await apiClient.post<{ preview: string }>(`/admin-email/templates/${templateId}/preview`, {
      recipientId,
      variables: customVariables
    });
    return response;
  },

  // メールスケジュール関連
  getEmailSchedules: async (params: PaginationParams = {}) => {
    const response = await apiClient.get<EmailScheduleResponse>('/admin-email/schedules', { params });
    return response;
  },

  getEmailScheduleDetail: async (scheduleId: string) => {
    const response = await apiClient.get<EmailSchedule>(`/admin-email/schedules/${scheduleId}`);
    return response;
  },

  createEmailSchedule: async (data: {
    templateId: string;
    name: string;
    description?: string;
    recipientIds: string[];
    scheduleType: 'ONE_TIME' | 'RECURRING';
    cronExpression?: string;
    sendAt?: string;
    variables?: Record<string, any>;
  }) => {
    const response = await apiClient.post<EmailSchedule>('/admin-email/schedules', data);
    return response;
  },

  updateEmailSchedule: async (scheduleId: string, data: {
    name?: string;
    description?: string;
    recipientIds?: string[];
    cronExpression?: string;
    sendAt?: string;
    variables?: Record<string, any>;
    status?: 'ACTIVE' | 'PAUSED' | 'COMPLETED' | 'CANCELLED';
  }) => {
    const response = await apiClient.put<EmailSchedule>(`/admin-email/schedules/${scheduleId}`, data);
    return response;
  },

  deleteEmailSchedule: async (scheduleId: string) => {
    const response = await apiClient.delete<void>(`/admin-email/schedules/${scheduleId}`);
    return response;
  },

  // メール送信履歴関連
  getEmailLogs: async (params: PaginationParams = {}) => {
    const response = await apiClient.get<EmailLogResponse>('/admin-email/logs', { params });
    return response;
  },

  getEmailLogDetail: async (logId: string) => {
    const response = await apiClient.get<EmailLog>(`/admin-email/logs/${logId}`);
    return response;
  },

  sendEmail: async (data: {
    templateId: string;
    recipientIds: string[];
    variables?: Record<string, any>;
  }) => {
    const response = await apiClient.post<void>('/admin-email/send', data);
    return response;
  },

  // 招待コード一覧の取得
  getInvitationCodes: async (params: PaginationParams = {}) => {
    const response = await apiClient.get<InvitationCodeResponse>('/admin/invitation-codes', { params });
    return response;
  },

  // 招待コードの作成
  createInvitationCode: async (params: CreateInvitationCodeParams) => {
    const response = await apiClient.post<InvitationCode>('/admin/invitation-codes', params);
    return response;
  },

  // 招待コードの更新
  updateInvitationCode: async (id: string, params: UpdateInvitationCodeParams) => {
    const response = await apiClient.put<InvitationCode>(`/admin/invitation-codes/${id}`, params);
    return response;
  },

  // 招待コードの削除
  deleteInvitationCode: async (id: string) => {
    const response = await apiClient.delete<void>(`/admin/invitation-codes/${id}`);
    return response;
  },

  // 招待コードの有効/無効を切り替え
  toggleInvitationCodeActive: async (id: string, isActive: boolean) => {
    const response = await apiClient.put<void>(`/admin/invitation-codes/${id}/toggle-active`, { isActive: !isActive });
    return response;
  },

  // 招待期限の延長
  extendInvitation: async (params: ExtendInvitationParams) => {
    const response = await apiClient.post<void>(`/admin/users/${params.userId}/extend-invitation`, {
      extensionDays: params.extensionDays
    });
    return response;
  }
};

// ダッシュボード関連のAPI
interface DashboardStats {
  userStats: {
    totalUsers: number;
    activeUsers: number;
    verifiedUsers: number;
    invitedUsers: number;
    activeUserRate: number;
    verificationRate: number;
    usersByPlan: Record<string, number>;
  };
  invitationStats: {
    totalCodes: number;
    activeCodes: number;
    expiredCodes: number;
    usedCodes: number;
    usageRate: number;
    recentUsage: Array<{
      code: string;
      maxUses: number;
      currentUses: number;
      createdAt: string;
      updatedAt: string;
    }>;
  };
  emailStats: {
    totalEmails: number;
    successfulEmails: number;
    failedEmails: number;
    successRate: number;
    failureRate: number;
    templateStats: Array<{
      templateId: string;
      _count: number;
      template: {
        name: string;
      };
    }>;
    recentFailures: Array<{
      id: string;
      templateId: string;
      status: string;
      sentAt: string;
      template: {
        name: string;
      };
    }>;
  };
  errorStats: {
    errorsByType: Array<{
      type: string;
      _count: number;
    }>;
    errorsByUser: Array<{
      userId: string;
      _count: number;
    }>;
    recentErrors: Array<{
      id: string;
      type: string;
      error: string;
      createdAt: string;
      user?: {
        id: string;
        email: string;
      };
    }>;
    errorTrend: Array<{
      type: string;
      _count: number;
    }>;
    totalErrors: number;
  };
}

interface ProjectStats {
  total: number;
  newProjectsCount: number;
  activeProjectsCount: number;
  categoryDistribution: Array<{
    category: string;
    _count: number;
  }>;
  stageDistribution: Array<{
    projectStage: string;
    _count: number;
  }>;
  popularProjects: Array<{
    id: string;
    title: string;
    description: string;
    category: string;
    popularityScore: number;
    _count: {
      bookmarks: number;
    };
  }>;
}

export interface TimeSeriesStats {
  projectCreation: Array<{
    createdAt: string;
    _count: number;
  }>;
  userRegistration: Array<{
    createdAt: string;
    _count: number;
  }>;
  emailSending: Array<{
    createdAt: string;
    _count: number;
  }>;
  interval: 'day' | 'week' | 'month';
  startDate: string;
  endDate: string;
}

interface ErrorLogDetails {
  logs: Array<{
    id: string;
    type: string;
    error: string;
    metadata: any;
    createdAt: string;
    user?: {
      id: string;
      name: string;
      email: string;
    };
  }>;
  total: number;
  typeDistribution: Array<{
    type: string;
    _count: number;
  }>;
  period: number;
}

export const adminDashboardApi = {
  // ダッシュボード全体の統計を取得
  getDashboardStats: async (period?: number): Promise<DashboardStats> => {
    const params = new URLSearchParams();
    if (period) params.append('period', period.toString());
    const response = await apiClient.get<DashboardStats>('/admin-dashboard', { params });
    return response;
  },

  // プロジェクト統計を取得
  getProjectStats: async (period?: number): Promise<ProjectStats> => {
    const params = new URLSearchParams();
    if (period) params.append('period', period.toString());
    const response = await apiClient.get<ProjectStats>('/admin-dashboard/projects', { params });
    return response;
  },

  // 期間別のデータ集計を取得
  getTimeSeriesStats: async (
    startDate: Date,
    endDate: Date,
    interval?: 'day' | 'week' | 'month'
  ): Promise<TimeSeriesStats> => {
    const params = new URLSearchParams({
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
    });
    if (interval) params.append('interval', interval);
    const response = await apiClient.get<TimeSeriesStats>('/admin-dashboard/time-series', { params });
    return response;
  },

  // エラーログの詳細を取得
  getErrorLogDetails: async (period?: number, type?: string): Promise<ErrorLogDetails> => {
    const params = new URLSearchParams();
    if (period) params.append('period', period.toString());
    if (type) params.append('type', type);
    const response = await apiClient.get<ErrorLogDetails>('/admin-dashboard/errors/details', { params });
    return response;
  },

  // キャッシュをクリア
  clearCache: async (period?: number): Promise<{ message: string }> => {
    const params = new URLSearchParams();
    if (period) params.append('period', period.toString());
    const response = await apiClient.delete<{ message: string }>('/admin-dashboard/cache', { params });
    return response;
  },

  // エラーログの削除
  deleteErrorLogs: async (ids: string[]): Promise<{ message: string }> => {
    const response = await apiClient.delete<{ message: string }>('/admin-dashboard/errors', { data: { ids } });
    return response;
  },
}; 