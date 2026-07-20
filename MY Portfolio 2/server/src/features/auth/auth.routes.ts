import { Router } from 'express';
import { loginController, verifyController } from './auth.controller.js';
import { authenticateAdmin } from '../../middlewares/auth.middleware.js';

const router = Router();

router.post('/login', loginController);
router.get('/verify', authenticateAdmin, verifyController);

export default router;
