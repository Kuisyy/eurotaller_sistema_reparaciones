import express from 'express';
import workerController from '../controllers/worker_controller.js';
import repairController from '../controllers/repair_controller.js';
import authMiddleware from '../middleware/auth_middleware.js';
import { isWorker } from '../middleware/role_middleware.js';

const router = express.Router();

router.use(authMiddleware);

router.get('/me', workerController.getWorkerById);
router.get('/all', workerController.getAllWorkers);
router.get('/:id', workerController.getWorkerById);
router.put('/update/:id', workerController.updateWorker);

export default router;
