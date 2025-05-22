import { create } from 'zustand';
import { Project, CreateProjectDto, projectsApi } from '../lib/api/projects';

interface ProjectsState {
  projects: Project[];
  isLoading: boolean;
  error: string | null;
  fetchProjects: () => Promise<void>;
  createProject: (data: CreateProjectDto) => Promise<void>;
  joinProject: (id: string) => Promise<void>;
}

export const useProjectsStore = create<ProjectsState>((set) => ({
  projects: [],
  isLoading: false,
  error: null,

  fetchProjects: async () => {
    set({ isLoading: true });
    try {
      const { data } = await projectsApi.getProjects();
      set({ projects: data, error: null });
    } catch (error) {
      set({ error: '読み込みに失敗しました' });
    } finally {
      set({ isLoading: false });
    }
  },

  createProject: async (projectData) => {
    set({ isLoading: true });
    try {
      const { data } = await projectsApi.createProject(projectData);
      set((state) => ({
        projects: [...state.projects, data],
        error: null,
      }));
    } catch (error) {
      set({ error: 'プロジェクトの作成に失敗しました' });
    } finally {
      set({ isLoading: false });
    }
  },

  joinProject: async (id) => {
    try {
      await projectsApi.joinProject(id);
      // TODO: プロジェクトの状態を更新
    } catch (error) {
      set({ error: 'プロジェクトへの参加に失敗しました' });
    }
  },
})); 