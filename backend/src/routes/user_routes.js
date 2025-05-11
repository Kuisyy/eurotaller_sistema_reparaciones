import express from 'express';
import userController from '../controllers/user_controller.js';
import loginController from '../controllers/auth_controller.js';
import authMiddleware from '../middleware/auth_middleware.js';

const router = express.Router();

router.get('/me', authMiddleware, userController.getProfile);

export default router;
