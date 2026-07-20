import { Router } from 'express';
import * as controller from './stats.controller.js';

const router = Router();

router.get('/', controller.getStats);
router.post('/like', controller.like);

export default router;
