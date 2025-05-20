import express from 'express';
import authMiddleware from '../middleware/auth_middleware.js';
 import userController from '../controllers/user_controller.js';
const router = express.Router();

router.use(authMiddleware);
// Ruta para obtener todos los usuarios
router.get('/all', userController.getAllUsers);

router.get('/:id', userController.getUserById);

router.post('/create', userController.createUser);

router.put('/update/:id', userController.updateUser);

router.delete('/:id', userController.deleteUser);


export default router;