import express from 'express';
import clientController from '../controllers/client_controller.js';
import repairController from '../controllers/repair_controller.js'
import authMiddleware from '../middleware/auth_middleware.js';

const router = express.Router();

router.use(authMiddleware);

router.get('/:id', clientController.getClientById);
router.put('/update/:id', clientController.updateClient);
router.get('/repairs', repairController.getRepairsByClientId);


export default router;
