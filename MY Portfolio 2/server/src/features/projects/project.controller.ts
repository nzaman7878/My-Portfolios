import { Request, Response } from 'express';
import * as service from './project.service.js';
import { asyncHandler } from '../../core/asyncHandler.js';

export const getProjects = asyncHandler(async (req: Request, res: Response) => {
  res.json(service.getProjects());
});

export const clickProject = asyncHandler(async (req: Request, res: Response) => {
  const result = service.trackProjectClick(req.params.id);
  res.json({ success: true, projectViews: result.views, totalClicks: result.totalClicks });
});

export const createProject = asyncHandler(async (req: Request, res: Response) => {
  const project = service.createProject(req.body);
  res.status(201).json(project);
});

export const updateProject = asyncHandler(async (req: Request, res: Response) => {
  const project = service.updateProject(req.params.id, req.body);
  res.json(project);
});

export const deleteProject = asyncHandler(async (req: Request, res: Response) => {
  service.deleteProject(req.params.id);
  res.json({ success: true, message: 'Project removed successfully.' });
});
