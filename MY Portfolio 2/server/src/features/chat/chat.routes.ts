import { Router } from 'express';
import * as controller from './chat.controller.js';

const router = Router();

router.post('/', controller.chat);

export default router;
