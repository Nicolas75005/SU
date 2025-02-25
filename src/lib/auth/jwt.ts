import jwt from 'jsonwebtoken';
import { AdminUser } from '../../types/admin';

const JWT_SECRET = process.env.VITE_JWT_SECRET || 'your-secret-key';
const JWT_EXPIRES_IN = '30m'; // 30 minutes
const REFRESH_TOKEN_EXPIRES_IN = '7d'; // 7 days

interface TokenPayload {
  userId: string;
  email: string;
  role: string;
}

export const generateTokens = (user: AdminUser) => {
  const payload: TokenPayload = {
    userId: user.id,
    email: user.email,
    role: user.role,
  };

  const accessToken = jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });

  const refreshToken = jwt.sign(payload, JWT_SECRET, {
    expiresIn: REFRESH_TOKEN_EXPIRES_IN,
  });

  return { accessToken, refreshToken };
};

export const verifyToken = (token: string): TokenPayload | null => {
  try {
    return jwt.verify(token, JWT_SECRET) as TokenPayload;
  } catch (error) {
    return null;
  }
};

export const refreshAccessToken = (refreshToken: string): string | null => {
  try {
    const payload = verifyToken(refreshToken);
    if (!payload) return null;

    const newAccessToken = jwt.sign(
      {
        userId: payload.userId,
        email: payload.email,
        role: payload.role,
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    return newAccessToken;
  } catch (error) {
    return null;
  }
};