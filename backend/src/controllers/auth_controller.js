import jwt from 'jsonwebtoken';
import { configDotenv } from 'dotenv';
import bcrypt from 'bcryptjs';
import userModel from '../models/user_model.js';
import clientModel from '../models/client_model.js';
import workerModel from '../models/worker_model.js';
import adminModel from '../models/admin_model.js';

configDotenv();

const JWT_SECRET = process.env.JWT_SECRET;

const register = async (req, res) => {
  const userData = req.body;
  try {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const createdUser = await userModel.createUser({
      name: userData.name,
      email: userData.email,
      password: hashedPassword,
      role: userData.role, // Incluimos el rol del usuario
    });
    let roleResult;
    if (userData.role === 'client') {
      roleResult = await clientModel.createClient({
        user_id: createdUser.user_id,
        address: userData.address,
        postal_code: userData.postal_code,
        city: userData.city,
        province: userData.province,
        country: userData.country,
        nif: userData.nif,
        phone: userData.phone,
      }, userData); // Pasamos userData
    } else if (userData.role === 'worker') {
      roleResult = await workerModel.createWorker({
        user_id: createdUser.user_id,
        role: userData.worker_role, // Usamos el nombre correcto del campo
      }, userData); // Pasamos userData
    } else if (userData.role === 'admin') {
      roleResult = await adminModel.createAdmin({  // Actualizado para que coincida con el modelo
        user_id: createdUser.user_id,
      }, userData); // Pasamos userData
    }

    res.status(201).json({
      user: createdUser,
      roleResult,
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el usuario', details: error.message }); //Incluimos el mensaje de error
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.getUserByEmail(email);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }
    // 3. Obtener el tipo de usuario (cliente, trabajador, administrador)
    let role = user.role; // Obtenemos el rol directamente de la tabla users
    let roleId = null;
    if (role === 'client') {
      const client = await clientModel.getClientByUserId(user.user_id);
      if (client) {
        roleId = client.client_id;
      }
    } else if (role === 'worker') {
      const worker = await workerModel.getWorkerByUserId(user.user_id);
      if (worker) {
        roleId = worker.worker_id;
      }
    } else if (role === 'admin') {
      const admin = await adminModel.getAdminByUserId(user.user_id);
      if (admin) {
        roleId = admin.admin_id;
      }
    }

    const payload = {
      userId: user.user_id,
    };

    const options = {
      expiresIn: '24h',
    };
    const token = jwt.sign(payload, JWT_SECRET, options);
    // Enviar el JWT como una cookie
    res.cookie('auth_token', token, {
      maxAge: 24 * 60 * 60 * 1000, // 24 horas en milisegundos
      httpOnly: true, // Solo accesible por el servidor
      secure: process.env.NODE_ENV === 'production', // Solo se envía por HTTPS en producción
      sameSite: 'Strict', // Protección contra ataques CSRF
      path: '/',
    });
    
    return res.status(200).json({ message: 'Inicio de sesión exitoso',
      user: {
        user_id: user.user_id,
        name: user.name,
        email: user.email,
        role: user.role  
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error en el servidor', details: error.message });
  }
};

const logout = (req, res) => {
  // Limpiar la cookie de autenticación
  res.clearCookie('auth_token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict',
    path: '/',
  });

  // Enviar una respuesta de éxito
  res.status(200).json({ message: 'Cierre de sesión exitoso' });
};

export default { register, login, logout };
