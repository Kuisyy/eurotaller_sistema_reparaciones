import express from 'express';
import adminController from '../controllers/admin_controller.js';
import authMiddleware from '../middleware/auth_middleware.js';
import { isAdmin, isWorker } from '../middleware/role_middleware.js';

const router = express.Router();

router.use(authMiddleware, isAdmin);

router.get('/me', adminController.getAdminMe); 
router.put('/update/:id', adminController.updateAdmin);
router.delete('/:id', adminController.deleteAdmin);

export default router;