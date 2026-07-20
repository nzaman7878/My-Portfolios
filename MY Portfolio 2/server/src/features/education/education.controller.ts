import { Request, Response } from 'express';
import * as service from './education.service.js';
import { asyncHandler } from '../../core/asyncHandler.js';

export const getEducation = asyncHandler(async (req: Request, res: Response) => {
  res.json(await service.getEducation());
});

export const createEducation = asyncHandler(async (req: Request, res: Response) => {
  const edu = await service.createEducation(req.body);
  res.status(201).json(edu);
});

export const updateEducation = asyncHandler(async (req: Request, res: Response) => {
  const edu = await service.updateEducation(req.params.id, req.body);
  res.json(edu);
});

export const deleteEducation = asyncHandler(async (req: Request, res: Response) => {
  await service.deleteEducation(req.params.id);
  res.json({ success: true, message: 'Education record removed successfully.' });
});
