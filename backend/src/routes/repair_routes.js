import express from 'express';
import repairController from '../controllers/repair_controller.js';
import authMiddleware from '../middleware/auth_middleware.js';
import roleMiddleware from '../middleware/role_middleware.js';

const router = express.Router();

router.use(authMiddleware);

router.get('/', repairController.getAllRepairs);
router.get('/:id', repairController.getRepairById);
router.get('/client/:client_id', repairController.getRepairsByClientId);
router.get('/vehicle/:vehicle_id', repairController.getRepairsByVehicleId);
router.get('/worker/:worker_id', repairController.getRepairsByWorkerId); 
router.post('/', repairController.createRepair);
router.put('/:id', repairController.updateRepair);
router.delete('/:id', repairController.deleteRepair);

export default router;
