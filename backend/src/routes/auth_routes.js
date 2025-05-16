import express from 'express';
import authController from '../controllers/auth_controller.js'; 
import authMiddleware from '../middleware/auth_middleware.js';

const router = express.Router();

// Ruta para el registro de usuarios
router.post('/register', authController.register);

// Ruta para el inicio de sesión de usuarios
 router.post('/login', authController.login);

 router.post('/logout', authController.logout);

 router.get("/check-auth", authMiddleware, async (req, res) => {
    try {
      const user = await userModel.getUserById(req.userId);
      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
 
      res.status(200).json({
        message: "Autenticado",
        userId: req.userId,
        role: user.role,
      });
    } catch (error) {
      console.error("Error en /check-auth:", error);
      res.status(500).json({ message: "Error al verificar la autenticación", details: error.message });
    }
  });

export default router;
