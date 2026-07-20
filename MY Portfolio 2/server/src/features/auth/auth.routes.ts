import { Router } from 'express';
import { loginController, logoutController, verifyController } from './auth.controller.js';
import { authenticateAdmin } from '../../middlewares/auth.middleware.js';

import rateLimit from 'express-rate-limit';

const router = Router();

// Rate limit for login: max 5 requests per 15 minutes
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { message: 'Too many login attempts. Please try again after 15 minutes.' },
  standardHeaders: true,
  legacyHeaders: false,
});

router.post('/login', loginLimiter, loginController);
router.post('/logout', logoutController);
router.get('/verify', authenticateAdmin, verifyController);

export default router;
