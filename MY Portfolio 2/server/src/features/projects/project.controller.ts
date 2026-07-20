import { Request, Response } from 'express';
import * as service from './project.service.js';
import { asyncHandler } from '../../core/asyncHandler.js';

export const getProjects = asyncHandler(async (req: Request, res: Response) => {
  res.json(await service.getProjects());
});

export const clickProject = asyncHandler(async (req: Request, res: Response) => {
  const result = await service.trackProjectClick(req.params.id);
  res.json({ success: true, projectViews: result.views, totalClicks: result.totalClicks });
});

export const createProject = asyncHandler(async (req: Request, res: Response) => {
  const project = await service.createProject(req.body);
  res.status(201).json(project);
});

export const updateProject = asyncHandler(async (req: Request, res: Response) => {
  const project = await service.updateProject(req.params.id, req.body);
  res.json(project);
});

export const deleteProject = asyncHandler(async (req: Request, res: Response) => {
  await service.deleteProject(req.params.id);
  res.json({ success: true, message: 'Project removed successfully.' });
});
