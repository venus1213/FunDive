import { apiClient } from '../api';
import type { ApiResponse } from '@/types/api';

interface InvitationCode {
  code: string;
  expiresAt: string;
  currentUses: number;
  maxUses: number;
  isActive: boolean;
  createdBy: {
    id: string;
    name: string;
  };
}

interface InvitationValidation {
  valid: boolean;
  code: string;
  expiresAt: string;
  currentUses: number;
  maxUses: number;
  createdBy: {
    id: string;
    name: string;
  };
}

interface InvitationUseResponse {
  success: boolean;
  message?: string;
}

interface InvitationStatus {
  isValid: boolean;
  isVerified: boolean;
  isAdmin: boolean;
  invitationExpires?: string;
  invitedBy?: {
    id: string;
    name: string;
  };
}

export const invitationApi = {
  validateCode: async (code: string): Promise<InvitationValidation> => {
    const response = await apiClient.post<InvitationValidation>('/invitations/validate', { code });
    return response;
  },

  useCode: async (code: string): Promise<InvitationUseResponse> => {
    const response = await apiClient.post<InvitationUseResponse>('/invitations/use', { code });
    return response;
  },

  getStatus: async (): Promise<InvitationStatus> => {
    const response = await apiClient.get<InvitationStatus>('/invitations/status');
    return response;
  }
};

/**
 * 招待コードの検証
 * @param code 招待コード
 */
export const validateInvitationCode = async (code: string): Promise<InvitationValidation> => {
  const response = await apiClient.post<InvitationValidation>('/invitations/validate', { code });
  return response;
};

/**
 * 招待コードの利用
 * @param code 招待コード
 */
export const applyInvitationCode = async (code: string): Promise<InvitationUseResponse> => {
  const response = await apiClient.post<InvitationUseResponse>('/invitations/use', { code });
  return response;
};

export const getInvitationStatus = async (): Promise<InvitationStatus> => {
  const response = await apiClient.get<InvitationStatus>('/invitations/status');
  return response;
}; 