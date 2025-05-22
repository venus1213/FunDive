import { Router, IRouter } from 'express';
import { getStats } from '../controllers/stats.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';

const router: IRouter = Router();

router.get('/', authenticate, getStats);

export default router; 