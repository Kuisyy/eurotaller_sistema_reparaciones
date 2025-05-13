import express from 'express';
import clientController from '../controllers/client_controller.js';
import repairController from '../controllers/repair_controller.js'
import authMiddleware from '../middleware/auth_middleware.js';
import { isAdmin, isClient, isWorker } from '../middleware/role_middleware.js';


const router = express.Router();

router.use(authMiddleware, isClient );

router.get('/me', clientController.getClientMe);
router.put('/update/:id', clientController.updateClient);
router.get('/repairs', repairController.getRepairsByClientId);


export default router;
