import { Request, Response } from 'express';
import { login } from './auth.service.js';
import { asyncHandler } from '../../core/asyncHandler.js';
import { env } from '../../config/env.js';

export const loginController = asyncHandler(async (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required.' });
  }

  const result = await login(username, password);
  
  res.cookie('admin_token', result.token, {
    httpOnly: true,
    secure: env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 1000 // 1 hour
  });

  return res.json({ username: result.username });
});

export const logoutController = asyncHandler(async (req: Request, res: Response) => {
  res.clearCookie('admin_token');
  return res.json({ message: 'Logged out successfully.' });
});

export const verifyController = asyncHandler(async (req: any, res: Response) => {
  return res.json({ authenticated: true, user: req.user });
});
