import { User, Project, Report, Profile, Message, ActivityLog } from '@prisma/client';

export interface Pagination {
  total: number;
  page: number;
  limit: number;
  total_pages: number;
}

export interface AdminUserListResponse {
  users: User[];
  pagination: Pagination;
}

export interface AdminUserDetailResponse {
  user: User & {
    profile: Profile | null;
    projects: Project[];
    activityLogs: ActivityLog[];
  };
}

export interface AdminProjectListResponse {
  projects: (Project & {
    user: User;
  })[];
  pagination: Pagination;
}

export interface AdminProjectDetailResponse {
  project: Project & {
    user: User;
    messages: Message[];
  };
}

export interface AdminReportListResponse {
  reports: (Report & {
    reporter: User;
  })[];
  pagination: Pagination;
}

export interface AdminReportDetailResponse {
  report: Report & {
    reporter: User;
  };
} 