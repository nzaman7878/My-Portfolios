import { Request, Response } from 'express';
import * as service from './stats.service.js';
import { asyncHandler } from '../../core/asyncHandler.js';

export const getStats = asyncHandler(async (req: Request, res: Response) => {
  res.json(await service.getStats());
});

export const like = asyncHandler(async (req: Request, res: Response) => {
  const stats = await service.like();
  res.json({ success: true, likes: stats.likes });
});
