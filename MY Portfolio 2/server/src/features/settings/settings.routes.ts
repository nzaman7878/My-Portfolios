import express from 'express';
import { getSettings, updateSettings } from './settings.controller.js';
import { authenticateAdmin } from '../../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/', getSettings);
router.put('/', authenticateAdmin, updateSettings);

export default router;
