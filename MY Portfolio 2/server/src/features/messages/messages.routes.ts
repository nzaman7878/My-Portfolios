import { Router } from 'express';
import * as controller from './messages.controller.js';
import { authenticateAdmin } from '../../middlewares/auth.middleware.js';

const router = Router();

// Public routes
router.post('/', controller.createMessage);

// Admin routes
router.get('/', authenticateAdmin, controller.getMessages);
router.put('/:id/read', authenticateAdmin, controller.markAsRead);
router.delete('/:id', authenticateAdmin, controller.deleteMessage);

export default router;
