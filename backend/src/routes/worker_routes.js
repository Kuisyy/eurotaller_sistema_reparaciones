import express from 'express';
import workerController from '../controllers/worker_controller.js';

const router = express.Router();

router.get('/', workerController.getAllWorkers);
router.get('/:id', workerController.getWorkerById);
router.post('/', workerController.createWorker);
router.put('/:id', workerController.updateWorker);
router.delete('/:id', workerController.deleteWorker);

export default router;