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
      role: userData.role, 
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
      }, userData); 
    } else if (userData.role === 'worker') {
      roleResult = await workerModel.createWorker({
        user_id: createdUser.user_id,
        role: userData.worker_role, 
      }, userData); 
    } else if (userData.role === 'admin') {
      roleResult = await adminModel.createAdmin({ 
        user_id: createdUser.user_id,
      }, userData); 
    }

    res.status(201).json({
      user: createdUser,
      roleResult,
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el usuario', details: error.message }); 
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email y contraseña son requeridos' 
      });
    }

    const user = await userModel.getUserByEmail(email);
    
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'Usuario no encontrado' 
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ 
        success: false, 
        message: 'Contraseña incorrecta' 
      });
    }

    const token = jwt.sign(
      { userId: user.user_id, role: user.role },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.cookie('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
      maxAge: 24 * 60 * 60 * 1000,
      path: '/'
    });

    return res.status(200).json({
      success: true,
      message: 'Login exitoso',
      user: {
        userId: user.user_id,
        role: user.role,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Error en login:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Error en el servidor',
      error: error.message 
    });
  }
};

const logout = (req, res) => {
  res.clearCookie('auth_token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict',
    path: '/',
  });

  res.status(200).json({ message: 'Cierre de sesión exitoso' });
};

export default { register, login, logout };
