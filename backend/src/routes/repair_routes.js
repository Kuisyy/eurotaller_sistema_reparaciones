import express from 'express';
import repairController from '../controllers/repair_controller.js';

const router = express.Router();

router.get('/', repairController.getAllRepairs);
router.get('/:id', repairController.getRepairById);
router.post('/', repairController.createRepair);
router.put('/:id', repairController.updateRepair);
router.delete('/:id', repairController.deleteRepair);

export default router;
