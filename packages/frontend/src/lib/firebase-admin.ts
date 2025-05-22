import { getApps, initializeApp, cert, App } from 'firebase-admin/app'

export function getFirebaseAdminApp(): App {
  const apps = getApps()
  if (apps.length > 0) {
    return apps[0]
  }

  const serviceAccount = {
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  }

  return initializeApp({
    credential: cert(serviceAccount),
  })
} 