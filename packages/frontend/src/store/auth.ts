import { create } from 'zustand';
import type { User } from '@/types/user';
import { loginWithGoogle } from '@/lib/auth';
import { auth } from '@/lib/firebase';
import { api } from '@/lib/api';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  error: string | null;
  needsInitialSetup: boolean;
  setUser: (user: User | null) => void;
  setLoading: (isLoading: boolean) => void;
  setAuthenticated: (isAuthenticated: boolean) => void;
  setError: (error: string | null) => void;
  setNeedsInitialSetup: (needs: boolean) => void;
  logout: () => void;
  handleGoogleSignIn: () => Promise<void>;
  handleInitialSetup: (setupData: { 
    displayName: string; 
    role: 'ENTREPRENEUR' | 'INVESTOR' 
  }) => Promise<void>;
  initializeAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isLoading: true, // 初期状態はローディング中
  isAuthenticated: false,
  isAdmin: false,
  error: null,
  needsInitialSetup: false,
  setUser: (user) => set({ 
    user, 
    isAuthenticated: !!user,
    isAdmin: user?.isAdmin ?? false 
  }),
  setLoading: (isLoading) => set({ isLoading }),
  setAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
  setError: (error) => set({ error }),
  setNeedsInitialSetup: (needs) => set({ needsInitialSetup: needs }),
  logout: () => set({ 
    user: null, 
    isAuthenticated: false,
    isAdmin: false 
  }),
  handleGoogleSignIn: async () => {
    try {
      set({ isLoading: true, error: null });
      
      // loginWithGoogleはポップアップで試み、ブロックされたらリダイレクトにフォールバック
      // リダイレクトの場合、この関数は戻らずリダイレクトが発生する
      await loginWithGoogle();
      
      // ポップアップ認証が成功した場合のみここに到達
      // リダイレクトの場合は、ページリロード後にlogin/page.tsxでリダイレクト結果を処理
    } catch (err) {
      console.error('Googleログインエラー:', err);
      set({ 
        error: err instanceof Error ? err.message : 'ログインに失敗しました',
        isLoading: false
      });
    }
  },
  handleInitialSetup: async (setupData) => {
    try {
      set({ isLoading: true, error: null });

      const currentUser = auth.currentUser;
      if (!currentUser) {
        throw new Error('認証情報が見つかりません');
      }
      const idToken = await currentUser.getIdToken();
      
      const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          email: currentUser.email,
          name: setupData.displayName,
          firebaseUid: currentUser.uid,
          role: setupData.role.toLowerCase(),
          planType: 'free',
          idToken: idToken,
        }),
      });

      if (!response.ok) {
        throw new Error('ユーザー登録に失敗しました');
      }

      const { user: userData } = await response.json();

      const loginResponse = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          idToken,
          email: currentUser.email,
          displayName: setupData.displayName,
          firebaseUid: currentUser.uid
        }),
      });

      if (!loginResponse.ok) {
        throw new Error('ログインに失敗しました');
      }

      const profileResponse = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/profiles/me', {
        credentials: 'include',
      });

      if (!profileResponse.ok) {
        throw new Error('プロフィール情報の取得に失敗しました');
      }

      const profileData = await profileResponse.json();
      const updatedUserData = {
        ...profileData,
        isAdmin: profileData.isAdmin || profileData.role === 'admin',
        profile: {
          ...profileData.profile,
          name: setupData.displayName
        }
      };

      set({ 
        user: updatedUserData, 
        isAuthenticated: true, 
        isAdmin: updatedUserData.isAdmin ?? false,
        needsInitialSetup: false 
      });
    } catch (err) {
      console.error('初期設定エラー:', err);
      set({ error: err instanceof Error ? err.message : '初期設定に失敗しました' });
      throw err;
    } finally {
      set({ isLoading: false });
    }
  },
  initializeAuth: async () => {
    try {
      const firebaseUser = auth.currentUser;
      
      if (!firebaseUser) {
        set({ 
          user: null, 
          isAuthenticated: false, 
          isLoading: false 
        });
        return;
      }

      const idToken = await firebaseUser.getIdToken();
      api.defaults.headers.common['Authorization'] = `Bearer ${idToken}`;

      const loginResponse = await api.post('/auth/login', {
        idToken,
        email: firebaseUser.email,
        displayName: firebaseUser.displayName,
        firebaseUid: firebaseUser.uid
      });

      if (loginResponse.data.isNewUser) {
        set({ 
          user: null,
          needsInitialSetup: true,
          isAuthenticated: false,
          isLoading: false
        });
        return;
      }

      const response = await api.get("/profiles/me");
      const userData = response.data;

      set({
        user: {
          ...userData,
          isAdmin: userData.isAdmin || userData.role === "admin",
        },
        isAuthenticated: true,
        needsInitialSetup: false,
        isLoading: false
      });
    } catch (error) {
      console.error('認証初期化エラー:', error);
      set({ 
        user: null, 
        isAuthenticated: false, 
        isLoading: false,
        error: '認証に失敗しました'
      });
    }
  }
})); 