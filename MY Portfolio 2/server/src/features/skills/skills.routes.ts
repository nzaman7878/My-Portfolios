import { Router } from 'express';
import * as controller from './skills.controller.js';
import { authenticateAdmin } from '../../middlewares/auth.middleware.js';

const router = Router();

// Public routes
router.get('/', controller.getSkills);

// Admin routes
router.put('/:id', authenticateAdmin, controller.updateSkills);

export default router;
