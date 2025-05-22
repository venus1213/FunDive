import { auth } from './firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

/**
 * テスト用のIDトークンを取得する
 * @param email テストユーザーのメールアドレス
 * @returns IDトークン
 */
export const getTestIdToken = async (email: string): Promise<string> => {
  const password = 'testpassword123';

  try {
    // まず既存のユーザーでログインを試みる
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user.getIdToken();
    } catch (error) {
      // ユーザーが存在しない場合は新規作成
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      return userCredential.user.getIdToken();
    }
  } catch (error) {
    console.error('Error getting test ID token:', error);
    throw error;
  }
}; 