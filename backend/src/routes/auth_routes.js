import express from 'express';
import authController from '../controllers/auth_controller.js'; 
import authMiddleware from '../middleware/auth_middleware.js';
import userModel from '../models/user_model.js';

const router = express.Router();

// Ruta para el registro de usuarios
router.post('/register', authController.register);

// Ruta para el inicio de sesión de usuarios
router.post('/login', authController.login);

router.post('/logout', authController.logout);

router.get('/me', authMiddleware, async (req, res) => {
  try {
    const user = await userModel.getUserById(req.user.userId);
    if (!user) {
      return res.status(404).json({ 
        message: 'Usuario no encontrado' 
      });
    }

    res.json({
      userId: user.user_id,
      role: user.role,
      name: user.name,
      email: user.email
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error al obtener datos del usuario' 
    });
  }
});

export default router;
