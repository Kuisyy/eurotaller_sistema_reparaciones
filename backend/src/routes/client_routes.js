import express from 'express';
import clientController from '../controllers/client_controller.js';
import authMiddleware from '../middleware/auth_middleware.js';
import { isClient } from '../middleware/role_middleware.js';

const router = express.Router();

router.use(authMiddleware, isClient);

router.get('/me', clientController.getClientById);
router.put('/me', clientController.updateClient);

export default router;
