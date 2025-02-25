import { rateLimit } from 'express-rate-limit';
import argon2 from 'argon2';

// Rate limiting configuration
export const loginRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 attempts per window
  message: 'Trop de tentatives de connexion. Veuillez réessayer plus tard.',
  standardHeaders: true,
  legacyHeaders: false,
});

// Password hashing configuration
const ARGON2_CONFIG = {
  type: argon2.argon2id,
  memoryCost: 65536,
  timeCost: 3,
  parallelism: 1,
};

export const hashPassword = async (password: string): Promise<string> => {
  return await argon2.hash(password, ARGON2_CONFIG);
};

export const verifyPassword = async (
  hashedPassword: string,
  password: string
): Promise<boolean> => {
  return await argon2.verify(hashedPassword, password, ARGON2_CONFIG);
};

// CSRF Token generation
export const generateCSRFToken = (): string => {
  return crypto.randomUUID();
};

// Common password check (simplified version - in production, use a proper password dictionary)
const COMMON_PASSWORDS = new Set([
  'password123',
  '12345678',
  'qwerty123',
  'admin123',
  // Add more common passwords
]);

export const isCommonPassword = (password: string): boolean => {
  return COMMON_PASSWORDS.has(password.toLowerCase());
};

// Suspicious activity detection
interface LoginAttempt {
  ip: string;
  timestamp: number;
  success: boolean;
}

const loginAttempts = new Map<string, LoginAttempt[]>();

export const recordLoginAttempt = (ip: string, success: boolean) => {
  const now = Date.now();
  const attempts = loginAttempts.get(ip) || [];
  
  // Remove attempts older than 15 minutes
  const recentAttempts = attempts.filter(
    attempt => now - attempt.timestamp < 15 * 60 * 1000
  );
  
  recentAttempts.push({ ip, timestamp: now, success });
  loginAttempts.set(ip, recentAttempts);
  
  return recentAttempts;
};

export const isSuspiciousActivity = (ip: string): boolean => {
  const attempts = loginAttempts.get(ip) || [];
  const failedAttempts = attempts.filter(attempt => !attempt.success);
  
  return failedAttempts.length >= 5;
};