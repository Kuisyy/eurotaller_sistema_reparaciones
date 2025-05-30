import express from 'express';
import { updateRepairRating, getRepairRating } from '../controllers/ratingController.js';
import authMiddleware from '../middleware/auth_middleware.js';

const router = express.Router();

router.use(authMiddleware);

router.put('/repair/:repairId', updateRepairRating);
router.get('/repair/:repairId', getRepairRating);

export default router;