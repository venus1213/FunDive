export type ReportType = 'user' | 'project' | 'message';
export type ReportReason = 'spam' | 'inappropriate_content' | 'harassment' | 'scam' | 'other';
export type ReportStatus = 'pending' | 'investigating' | 'resolved' | 'rejected';

export interface Report {
  id: string;
  reporterId: string;
  targetType: ReportType;
  targetId: string;
  reason: ReportReason;
  status: ReportStatus;
  comment?: string | null;
  adminComment?: string | null;
  createdAt: string;
  reporter: {
    id: string;
    name: string;
    email: string;
  };
} 