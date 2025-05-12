import jwt from 'jsonwebtoken';
import { configDotenv } from 'dotenv';
import bcrypt from 'bcryptjs';
import userModel from '../models/user_model.js';
import clientController from '../controllers/client_controller.js';
import workerController from '../controllers/worker_controller.js';
import adminController from '../controllers/admin_controller.js';

configDotenv();

const JWT_SECRET = process.env.JWT_SECRET;

const register = async (req, res) => {
  const userData = req.body;
  try {
    // 1. Validar datos (¡muy importante, pero lo omitimos para simplificar!)
    // 2. Hashear la contraseña
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    // 3. Insertar en la tabla users
    const createdUser = await userModel.createUser({
      name: userData.name,
      email: userData.email,
      password: hashedPassword,
    });
    let roleResult;
    // 4. Insertar en la tabla de rol correspondiente, usando los controladores
    if (userData.role === 'client') {
      roleResult = await clientController.createClient({
        user_id: createdUser.user_id,
        address: userData.address,
        postal_code: userData.postal_code,
        city: userData.city,
        province: userData.province,
        country: userData.country,
        nif: userData.nif,
        phone: userData.phone,
        email: userData.email,
      });
    } else if (userData.role === 'worker') {
      roleResult = await workerController.createWorker({
        user_id: createdUser.user_id,
        role: userData.worker_role, // Usamos el nombre correcto del campo
      });
    } else if (userData.role === 'admin') {
      roleResult = await adminController.createAdmin({
        user_id: createdUser.user_id,
        level: userData.level,
      });
    }
    // 5. Generar JWT
    const token = jwt.sign(
      { userId: createdUser.user_id, role: userData.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' },
    );
    // 6. Enviar respuesta
    res.status(201).json({
      user: createdUser,
      token,
      roleResult,
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el usuario', details: error.message }); //Incluimos el mensaje de error
  }
};
export default { register };
