import { Request, Response } from 'express';
import * as service from './skills.service.js';
import { asyncHandler } from '../../core/asyncHandler.js';

export const getSkills = asyncHandler(async (req: Request, res: Response) => {
  res.json(service.getSkills());
});

export const updateSkills = asyncHandler(async (req: Request, res: Response) => {
  const skills = service.updateSkills(req.params.id, req.body.skills);
  res.json(skills);
});
