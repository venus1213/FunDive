import { apiClient } from '../api';
import type { ApiResponse } from '@/types/api';
import { PlanType, Role } from '@/types/user';

interface PlanLimits {
  planType: PlanType;
  isAdmin: boolean;
  role?: Role;
  invitationExpires?: string;
  limits: {
    maxProjects: number;
    maxTeamMembers: number;
    maxStorage: number;
  };
  currentUsage: {
    projects: number;
    teamMembers: number;
    storage: number;
  };
}

export const planApi = {
  getPlanLimits: async () => {
    const response = await apiClient.get<PlanLimits>('/profiles/plan-limits');
    return response;
  }
}; 