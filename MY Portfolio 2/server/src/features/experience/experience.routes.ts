import { Router } from 'express';
import * as controller from './experience.controller.js';
import { authenticateAdmin } from '../../middlewares/auth.middleware.js';

const router = Router();

// Public routes
router.get('/', controller.getExperience);

// Admin routes
router.post('/', authenticateAdmin, controller.createExperience);
router.put('/:id', authenticateAdmin, controller.updateExperience);
router.delete('/:id', authenticateAdmin, controller.deleteExperience);

export default router;
