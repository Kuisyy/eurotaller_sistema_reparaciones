import express from 'express';
import authController from '../controllers/auth_controller.js'; 

const router = express.Router();

// Ruta para el registro de usuarios
router.post('/register', authController.register);

// Ruta para el inicio de sesión de usuarios
// router.post('/login', authController.login);

export default router;
