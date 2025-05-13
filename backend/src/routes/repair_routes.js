import express from 'express';
import repairController from '../controllers/repair_controller.js';
import authMiddleware from '../middleware/auth_middleware.js';
import { isWorker } from '../middleware/role_middleware.js';

const router = express.Router();

router.use(authMiddleware, isWorker);

router.get('/', repairController.getAllRepairs);
router.get('/:id', repairController.getRepairById);
router.get('/vehicle/:vehicle_id', repairController.getRepairsByVehicleId);
router.post('/create', repairController.createRepair);
router.put('/:id', repairController.updateRepair);
router.delete('/:id', repairController.deleteRepair);

export default router;
