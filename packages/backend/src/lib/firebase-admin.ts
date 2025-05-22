import { getApps, initializeApp, cert, ServiceAccount } from 'firebase-admin/app';
import dotenv from 'dotenv';

// 環境変数の読み込み
dotenv.config();

export const initAdmin = () => {
  try {
    if (getApps().length === 0) {
      // 必要な環境変数の存在確認
      const projectId = process.env.FIREBASE_PROJECT_ID;
      const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
      const privateKey = process.env.FIREBASE_PRIVATE_KEY;

      if (!projectId || !clientEmail || !privateKey) {
        throw new Error('Required Firebase Admin environment variables are not set');
      }

      console.log('Initializing Firebase Admin with:', {
        projectId,
        clientEmail,
        privateKeyExists: !!privateKey
      });

      const serviceAccount = {
        projectId,
        clientEmail,
        privateKey: privateKey.replace(/\\n/g, '\n'),
      } as ServiceAccount;

      initializeApp({
        credential: cert(serviceAccount),
      });

      console.log('Firebase Admin initialized successfully');
    }
  } catch (error) {
    console.error('Firebase Admin initialization error:', error);
    throw error;
  }
}; 