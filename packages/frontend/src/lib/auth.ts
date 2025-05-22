import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  signInWithRedirect,
  getRedirectResult
} from 'firebase/auth';
import { auth, googleProvider } from './firebase';
import { useAuthStore } from '@/store/auth';
import { User } from '@/types/user';
import { FirebaseError } from 'firebase/app';

// エラー型の定義
export interface ApiError {
  type: string;
  message: string;
  details?: Record<string, unknown>;
}

interface GoogleAuthNewUser {
  isNewUser: true;
  email: string | null;
  name: string | null;
  firebaseUid: string;
  idToken: string;
}

interface GoogleAuthExistingUser {
  isNewUser: false;
  user: User;  // Userインターフェースは@/types/userで定義
}

type GoogleAuthResult = GoogleAuthNewUser | GoogleAuthExistingUser;

// エラーハンドリング関数
const handleApiError = async (response: Response) => {
  const errorData = await response.json().catch(() => ({}));

  if (response.status === 429) {
    const retryAfter = response.headers.get('Retry-After');
    const waitMinutes = retryAfter ? Math.ceil(parseInt(retryAfter) / 60) : 5;
    throw new Error(`ログイン試行回数が多すぎます。${waitMinutes}分後に再度お試しください。`);
  }

  throw new Error(errorData.message || 'APIエラーが発生しました');
};

export async function loginWithGoogle(): Promise<GoogleAuthResult> {
  try {
    // 既存のセッションをクリア
    await auth.signOut();
    
    // まずはポップアップでログインを試み、ブロックされた場合はリダイレクトにフォールバック
    try {
      console.log('ポップアップ認証を試みます');
      const result = await signInWithPopup(auth, googleProvider);
      
      if (!result) {
        throw new Error('認証に失敗しました');
      }

      console.log('ポップアップ認証成功:', result.user.email);
      return await processLoginResult(result.user);
      
    } catch (error: any) {
      // ポップアップがブロックされた場合、リダイレクト認証に切り替え
      if (error.code === 'auth/popup-blocked' || error.code === 'auth/popup-closed-by-user') {
        console.log('ポップアップがブロックされました。リダイレクト認証に切り替えます');
        await signInWithRedirect(auth, googleProvider);
        
        // リダイレクト後はこの先は実行されない
        return {
          isNewUser: true,
          email: '',
          name: '',
          firebaseUid: '',
          idToken: '',
        };
      }
      
      // その他のエラーは再スロー
      throw error;
    }
  } catch (error) {
    console.error('Google認証エラー:', error);
    throw error;
  }
}

// ログイン成功時の処理を共通化
async function processLoginResult(user: any): Promise<GoogleAuthResult> {
  try {
    const idToken = await user.getIdToken();
    
    const loginResponse = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        idToken,
        email: user.email,
        displayName: user.displayName,
        firebaseUid: user.uid
      }),
    });

    if (!loginResponse.ok) {
      await handleApiError(loginResponse);
    }

    const responseData = await loginResponse.json();

    // 新規ユーザーの場合は、プロフィール情報の取得をスキップ
    if (responseData.isNewUser) {
      useAuthStore.getState().setLoading(false);
      return {
        isNewUser: true,
        email: user.email,
        name: user.displayName,
        firebaseUid: user.uid,
        idToken,
      };
    }

    // 既存ユーザーの場合のみプロフィール情報を取得
    const profileResponse = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/profiles/me', {
      credentials: 'include',
    });

    if (!profileResponse.ok) {
      await handleApiError(profileResponse);
    }

    const profileData = await profileResponse.json();
    const userData = {
      ...profileData,
      isAdmin: profileData.isAdmin || profileData.role === 'admin',
      profile: {
        ...profileData.profile,
        name: profileData.profile?.name || user.displayName || user.email?.split('@')[0] || 'ゲスト'
      }
    };
    
    useAuthStore.getState().setUser(userData);
    useAuthStore.getState().setAuthenticated(true);
    useAuthStore.getState().setLoading(false);
    return {
      isNewUser: false,
      user: userData,
    };
  } catch (error) {
    console.error('ログイン処理エラー:', error);
    throw error;
  }
}

// Google認証済みユーザーの新規登録
export async function registerGoogleUser(userData: {
  firebaseUid: string;
  email: string;
  name: string;
  role: 'entrepreneur' | 'investor';
  planType: 'free' | 'standard' | 'premium' | 'startup_partner';
  idToken: string;
}) {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        email: userData.email,
        name: userData.name,
        firebaseUid: userData.firebaseUid,
        role: userData.role,
        planType: userData.planType,
        idToken: userData.idToken,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('登録エラーの詳細:', {
        status: response.status,
        statusText: response.statusText,
        error: errorData,
      });
      const errorMessage = errorData.message || 'ユーザー登録に失敗しました';
      throw new Error(errorMessage);
    }

    const data = await response.json();
    useAuthStore.getState().setUser(data.user);
    return data.user;
  } catch (error) {
    console.error('Google登録エラー:', error);
    throw error;
  }
}

export async function loginWithEmail(email: string, password: string) {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    const { user } = result;

    // バックエンドにユーザー情報を送信
    const idToken = await user.getIdToken();
    const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ idToken }),
    });

    if (!response.ok) {
      useAuthStore.getState().setLoading(false);
      throw new Error('ログインに失敗しました');
    }

    // プロフィール情報を取得
    const profileResponse = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/profiles/me', {
      credentials: 'include',
    });

    if (!profileResponse.ok) {
      throw new Error('プロフィール情報の取得に失敗しました');
    }

    const profileData = await profileResponse.json();
    const userData = {
      ...profileData,
      isAdmin: profileData.isAdmin || profileData.role === 'admin'
    };
    useAuthStore.getState().setUser(userData);
    useAuthStore.getState().setLoading(false);
    return userData;
  } catch (error) {
    console.error('ログインエラー:', error);
    useAuthStore.getState().setLoading(false);
    throw error;
  }
}

export interface RegisterWithEmailData {
  name: string
  role: 'entrepreneur' | 'investor'
  planType: 'free' | 'standard' | 'premium' | 'startup_partner'
}

export async function registerWithEmail(
  email: string,
  password: string,
  data: RegisterWithEmailData
) {
  try {
    // Firebaseでユーザーを作成
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    const { user } = userCredential

    // ユーザー名を設定
    await updateProfile(user, {
      displayName: data.name,
    })

    // IDトークンを取得
    const idToken = await user.getIdToken()

    // バックエンドにユーザー情報を送信
    const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        email: user.email,
        name: data.name,
        firebaseUid: user.uid,
        role: data.role,
        planType: data.planType,
        idToken: idToken,
      }),
    })

    if (!response.ok) {
      throw new Error('バックエンドでの登録に失敗しました')
    }

    return user
  } catch (error) {
    if (error instanceof FirebaseError) {
      switch (error.code) {
        case 'auth/email-already-in-use':
          throw new Error('このメールアドレスは既に使用されています')
        case 'auth/invalid-email':
          throw new Error('無効なメールアドレスです')
        case 'auth/operation-not-allowed':
          throw new Error('メール/パスワードでの登録が無効になっています')
        case 'auth/weak-password':
          throw new Error('パスワードが弱すぎます')
        default:
          throw new Error('登録中にエラーが発生しました')
      }
    }
    throw error
  }
}

export async function logout() {
  try {
    // 1. Firebaseからのログアウト
    await signOut(auth);

    // 2. バックエンドへのログアウトリクエスト
    const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/auth/logout', { 
      method: 'POST',
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('バックエンドでのログアウトに失敗しました');
    }

    // 3. フロントエンドのステート初期化
    useAuthStore.getState().logout();

    // 4. Cookieのクリア
    document.cookie.split(";").forEach((c) => {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });

  } catch (error) {
    console.error('ログアウトエラー:', error);
    // エラーを上位に伝播させて、UIでハンドリングできるようにする
    throw new Error('ログアウトに失敗しました。もう一度お試しください。');
  }
}

export async function resetPassword(email: string) {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    console.error('パスワードリセットエラー:', error);
    throw error;
  }
}

/**
 * リダイレクト認証の結果を処理する関数
 */
export async function handleRedirectResult(): Promise<GoogleAuthResult | null> {
  try {
    console.log('リダイレクト結果を処理中...');
    const result = await getRedirectResult(auth);
    
    if (!result) {
      console.log('リダイレクト結果なし');
      return null;
    }
    
    console.log('リダイレクト認証成功:', result.user.email);
    
    // ログイン処理
    return await processLoginResult(result.user);
  } catch (error) {
    console.error('リダイレクト結果処理エラー:', error);
    throw error;
  }
} 