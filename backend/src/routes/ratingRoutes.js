import express from 'express';
import { updateRepairRating, getRepairRating } from '../controllers/ratingController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(authMiddleware);

router.put('/repairs/:repairId', updateRepairRating);
router.get('/repairs/:repairId', getRepairRating);

export default router;