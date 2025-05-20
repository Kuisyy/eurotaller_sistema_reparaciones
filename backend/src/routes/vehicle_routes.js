import express from 'express';
import vehicleController from '../controllers/vehicle_controller.js';
import authMiddleware from '../middleware/auth_middleware.js';

const router = express.Router();

router.use(authMiddleware);

router.get('/all', vehicleController.getAllVehicles);
router.get('/:id', vehicleController.getVehicleById);
router.get('/client/:id', vehicleController.getVehicleByClientId);
router.post('/create', vehicleController.createVehicle);
router.put('/:id', vehicleController.updateVehicle);
router.delete('/:id', vehicleController.deleteVehicle);

export default router;
