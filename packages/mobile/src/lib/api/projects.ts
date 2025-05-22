import { apiClient } from './client';

export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  stage: string;
  members: number;
  thumbnail: string;
}

export interface CreateProjectDto {
  title: string;
  description: string;
  category: string;
  requiredSkills: string[];
}

export const projectsApi = {
  // プロジェクト一覧取得
  getProjects: () => 
    apiClient.get<Project[]>('/projects'),

  // プロジェクト詳細取得
  getProject: (id: string) => 
    apiClient.get<Project>(`/projects/${id}`),

  // プロジェクト作成
  createProject: (data: CreateProjectDto) => 
    apiClient.post<Project>('/projects', data),

  // プロジェクト参加
  joinProject: (id: string) => 
    apiClient.post<void>(`/projects/${id}/join`),
}; 