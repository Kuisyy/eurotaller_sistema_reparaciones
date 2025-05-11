import express from 'express';
import adminController from '../controllers/admin_controller.js';

const router = express.Router();

router.get('/', adminController.getAdmin); 
router.post('/', adminController.createAdmin);
router.put('/:id', adminController.updateAdmin);
router.delete('/:id', adminController.deleteAdmin);

export default router;