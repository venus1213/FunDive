import { Request } from 'express';
import { User } from '@prisma/client';

export interface ProfileUpdateRequest {
  name?: string;
  displayName?: string;
  bio?: string;
  company?: string;
  position?: string;
  location?: string;
  website?: string;
  social_links?: {
    twitter?: string;
    linkedin?: string;
    facebook?: string;
  };
  skills?: string[];
  interests?: string[];
  is_public?: boolean;
}

export interface ProfileVisibilityRequest {
  is_public: boolean;
  visible_fields: Array<'bio' | 'company' | 'position' | 'location' | 'website' | 'social_links' | 'skills' | 'interests'>;
}

export interface AuthenticatedRequest {
  user?: User;
  [key: string]: any;
} 