import { Router } from 'express';
import * as controller from './education.controller.js';
import { authenticateAdmin } from '../../middlewares/auth.middleware.js';

const router = Router();

// Public routes
router.get('/', controller.getEducation);

// Admin routes
router.post('/', authenticateAdmin, controller.createEducation);
router.put('/:id', authenticateAdmin, controller.updateEducation);
router.delete('/:id', authenticateAdmin, controller.deleteEducation);

export default router;
