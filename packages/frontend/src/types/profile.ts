import { User } from './user';

/**
 * プロフィール更新リクエスト
 */
export interface ProfileUpdateRequest {
  name?: string | null;
  displayName?: string | null;
  bio?: string | null;
  company?: string | null;
  position?: string | null;
  location?: string | null;
  website?: string | null;
  social_links?: {
    twitter?: string;
    linkedin?: string;
    facebook?: string;
  } | null;
  skills?: string[];
  interests?: string[];
  is_public?: boolean;
  visible_fields?: string[];
  profile_image_url?: string | null;
}

/**
 * プロフィール公開設定リクエスト
 */
export interface ProfileVisibilityRequest {
  is_public: boolean;
  visible_fields: string[];
}

/**
 * プロフィール情報
 */
export interface Profile {
  id: string;
  userId: string;
  displayName?: string;
  bio?: string;
  company?: string;
  position?: string;
  location?: string;
  website?: string;
  profile_image_url?: string;
  social_links?: {
    twitter?: string;
    linkedin?: string;
    facebook?: string;
  };
  skills?: string[];
  interests?: string[];
  is_public: boolean;
  visible_fields: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ProfileVisibility {
  email: boolean;
  socialLinks: boolean;
  projects: boolean;
  activity: boolean;
}

export interface ProfileWithUser extends Profile {
  user: User;
} 