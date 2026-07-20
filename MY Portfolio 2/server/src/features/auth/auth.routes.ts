import { Router } from 'express';
import { loginController, logoutController, verifyController } from './auth.controller.js';
import { authenticateAdmin } from '../../middlewares/auth.middleware.js';

const router = Router();

router.post('/login', loginController);
router.post('/logout', logoutController);
router.get('/verify', authenticateAdmin, verifyController);

export default router;
