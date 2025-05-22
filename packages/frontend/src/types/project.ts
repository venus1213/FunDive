import { User } from './user';

export type Category = 'tech' | 'finance' | 'retail' | 'healthcare' | 'education' | 'other';

export type ProjectType = 'entrepreneur' | 'investor' | 'cofounder';

export type ProjectStatus = 'draft' | 'active' | 'closed' | 'suspended';

export type ProjectStage = 'idea' | 'mvp' | 'early_stage' | 'growth' | 'mature';

export interface Project {
  id: string;
  userId: string;
  title: string;
  description: string;
  company: string;
  category: Category;
  projectType: ProjectType;
  status: ProjectStatus;
  investmentAmount?: number;
  targetAmount: number;
  currentAmount: number;
  investorCount: number;
  dueDate: string;
  location?: string;
  projectStage?: ProjectStage;
  popularityScore: number;
  createdAt: string;
  updatedAt: string;
  isPublic: boolean;
  tags: string[];
  images: {
    url: string;
    alt: string;
  }[];
  documents: {
    url: string;
    name: string;
    type: string;
  }[];
  user?: User;
  isBookmarked?: boolean;
  bookmarkCount?: number;
  messages?: Message[];
  reports?: Report[];
}

export interface ProjectCreateRequest {
  title: string;
  description: string;
  category: Category;
  projectType: ProjectType;
  status: ProjectStatus;
  investmentAmount?: number;
  location?: string;
  projectStage?: ProjectStage;
}

export interface ProjectUpdateRequest extends Partial<ProjectCreateRequest> {
  status?: ProjectStatus;
}

export interface ProjectListResponse {
  projects: Project[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  planInfo: {
    currentPlan: string;
    projectLimit: number;
    canCreateMore: boolean;
    remainingProjects: number;
    nextPlan: string | null;
  };
}

export interface Bookmark {
  id: string;
  userId: string;
  projectId: string;
  createdAt: string;
  user?: User;
  project?: Project;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  projectId: string;
  content: string;
  isRead: boolean;
  messageType: 'project';
  createdAt: string;
  sender?: {
    id: string;
    name: string;
    email: string;
  };
}

export interface ProjectMessagesResponse {
  messages: Message[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export type MessageType = 'direct' | 'project';

export interface Report {
  id: string;
  reporterId: string;
  targetType: ReportType;
  targetId: string;
  reason: ReportReason;
  status: ReportStatus;
  comment?: string;
  adminComment?: string;
  createdAt: string;
  updatedAt: string;
  reporter?: User;
}

export type ReportType = 'user' | 'project' | 'message';

export type ReportReason = 'spam' | 'inappropriate_content' | 'harassment' | 'scam' | 'other';

export type ReportStatus = 'pending' | 'investigating' | 'resolved' | 'rejected';

export interface ProjectSearchParams {
  status?: ProjectStatus;
  category?: Category;
  projectType?: ProjectType;
  location?: string;
  projectStage?: ProjectStage;
  page?: number;
  limit?: number;
} 