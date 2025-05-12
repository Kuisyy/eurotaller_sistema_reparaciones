import express from 'express';
import userController from '../controllers/user_controller.js';
import authenticateToken from '../middleware/auth_middleware.js';

const router = express.Router();

router.get('/me', authenticateToken, userController.getUserById);

export default router;
