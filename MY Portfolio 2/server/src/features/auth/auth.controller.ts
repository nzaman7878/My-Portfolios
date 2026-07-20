import { Request, Response } from 'express';
import { login } from './auth.service.js';
import { asyncHandler } from '../../core/asyncHandler.js';
import { ApiResponse } from '../../core/ApiResponse.js';

export const loginController = asyncHandler(async (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required.' });
  }

  const result = await login(username, password);
  return res.json(result);
});

export const verifyController = asyncHandler(async (req: any, res: Response) => {
  return res.json({ authenticated: true, user: req.user });
});
