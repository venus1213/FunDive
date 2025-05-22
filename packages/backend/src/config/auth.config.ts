import dotenv from 'dotenv';

dotenv.config();

export const authConfig = {
  jwt: {
    secret: process.env.JWT_SECRET || 'your-secret-key',
    accessToken: {
      expiresIn: '24h',
    },
    refreshToken: {
      expiresIn: '7d',
    },
  },
  cookie: {
    accessToken: {
      name: 'accessToken',
      maxAge: 24 * 60 * 60 * 1000, // 24時間
    },
    refreshToken: {
      name: 'refreshToken',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7日
    },
  },
  emailVerificationExpiration: 86400, // 24 hours
  passwordResetExpiration: 3600, // 1 hour
  email: {
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587', 10),
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
    from: process.env.SMTP_FROM,
  },
  frontend: {
    url: process.env.FRONTEND_URL || 'http://localhost:3000',
  },
}; 