import { Router } from 'express';
import * as controller from './project.controller.js';
import { authenticateAdmin } from '../../middlewares/auth.middleware.js';

const router = Router();

// Public routes
router.get('/', controller.getProjects);
router.post('/:id/click', controller.clickProject);

// Admin routes
router.post('/', authenticateAdmin, controller.createProject);
router.put('/:id', authenticateAdmin, controller.updateProject);
router.delete('/:id', authenticateAdmin, controller.deleteProject);

export default router;
