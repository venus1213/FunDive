import jwt, { Secret, SignOptions } from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { authConfig } from '../config/auth.config.js';

interface UserForToken {
  id: string;
  email: string;
  role: string;
  uid: string;
}

export interface TokenPayload {
  userId: string;
  email: string;
  role: string;
  uid: string;
}

export const generateToken = (user: UserForToken): string => {
  const payload: TokenPayload = {
    userId: user.id,
    email: user.email,
    role: user.role,
    uid: user.uid,
  };

  return jwt.sign(payload, process.env.JWT_SECRET as Secret, {
    expiresIn: authConfig.jwt.accessToken.expiresIn,
  } as SignOptions);
};

export const generateRefreshToken = (user: UserForToken): string => {
  const payload: TokenPayload = {
    userId: user.id,
    email: user.email,
    role: user.role,
    uid: user.uid,
  };

  return jwt.sign(payload, process.env.JWT_REFRESH_SECRET as Secret, {
    expiresIn: authConfig.jwt.refreshToken.expiresIn,
  } as SignOptions);
};

export const verifyToken = (token: string, isRefreshToken: boolean = false): TokenPayload => {
  const secret = isRefreshToken ? process.env.JWT_REFRESH_SECRET : process.env.JWT_SECRET;
  return jwt.verify(token, secret as Secret) as TokenPayload;
};

export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcryptjs.genSalt(10);
  return bcryptjs.hash(password, salt);
};

export const comparePasswords = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  return bcryptjs.compare(password, hashedPassword);
};

export const generateEmailVerificationToken = (): string => {
  return uuidv4();
}; 