import express from 'express';
import clientController from '../controllers/client_controller.js';
import repairController from '../controllers/repair_controller.js'
import authMiddleware from '../middleware/auth_middleware.js';
import { isAdmin, isClient, isWorker } from '../middleware/role_middleware.js';


const router = express.Router();

router.use(authMiddleware );

router.get('/all', clientController.getAllClients);
router.get('/me', clientController.getClientMe);
router.get('/:id', clientController.getClientById);
router.put('/update/:id', clientController.updateClient);

export default router;
