import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ApiError } from '../core/ApiError.js';
import { env } from '../config/env.js';

export interface AuthenticatedRequest extends Request {
  user?: { username: string };
}

export const authenticateAdmin = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new ApiError(401, 'Access denied. Mock token missing or invalid format.');
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, env.JWT_SECRET) as { username: string };
    req.user = decoded;
    next();
  } catch (error) {
    next(new ApiError(403, 'Failed to authenticate token. Stale or invalid session.'));
  }
};
