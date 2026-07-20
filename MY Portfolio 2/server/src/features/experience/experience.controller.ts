import { Request, Response } from 'express';
import * as service from './experience.service.js';
import { asyncHandler } from '../../core/asyncHandler.js';

export const getExperience = asyncHandler(async (req: Request, res: Response) => {
  res.json(service.getExperience());
});

export const createExperience = asyncHandler(async (req: Request, res: Response) => {
  const exp = service.createExperience(req.body);
  res.status(201).json(exp);
});

export const updateExperience = asyncHandler(async (req: Request, res: Response) => {
  const exp = service.updateExperience(req.params.id, req.body);
  res.json(exp);
});

export const deleteExperience = asyncHandler(async (req: Request, res: Response) => {
  service.deleteExperience(req.params.id);
  res.json({ success: true, message: 'Experience record removed successfully.' });
});
