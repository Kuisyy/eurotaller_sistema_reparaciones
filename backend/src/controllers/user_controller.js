import userModel from '../models/user_model.js';
import bcrypt from 'bcryptjs'; // Importa bcrypt para hashear contraseñas

// Función para obtener todos los usuarios
const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los usuarios' });
  }
};

// Función para obtener un usuario por ID
const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userModel.getUserById(id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el usuario' });
  }
};

// Función para obtener un usuario por email
const getUserByEmail = async (req, res) => {
  const { email } = req.params;
  try {
    const user = await userModel.getUserByEmail(email);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el usuario' });
  }
};

// Función para crear un nuevo usuario
const createUser = async (req, res) => {
  const userData = req.body;
  try {
    // Hashear la contraseña antes de guardarla
    const hashedPassword = await bcrypt.hash(userData.password, 10); 
    userData.password = hashedPassword;
    const newUser = await userModel.createUser(userData);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el usuario' });
  }
};

// Función para actualizar un usuario
const updateUser = async (req, res) => {
  const { id } = req.params;
  const userData = req.body;
  
  try {
    // Validar que el ID sea válido
    if (!id || isNaN(id)) {
      return res.status(400).json({ message: 'ID de usuario inválido' });
    }

    // Validar que se envíen datos para actualizar
    if (!userData || Object.keys(userData).length === 0) {
      return res.status(400).json({ message: 'No se proporcionaron datos para actualizar' });
    }

    // Hashear la contraseña si se proporciona en la actualización
    if (userData.password) {
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      userData.password = hashedPassword;
    }

    const updatedUser = await userModel.updateUser(id, userData);
    
    if (updatedUser) {
      res.status(200).json({
        message: 'Usuario actualizado exitosamente',
        user: updatedUser
      });
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (error) {
    console.error('Error al actualizar usuario:', error);
    res.status(500).json({ 
      error: 'Error interno del servidor',
      message: 'No se pudo actualizar el usuario'
    });
  }
};
// Función para eliminar un usuario
const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await userModel.deleteUser(id);
    if (deleted) {
      res.status(200).json({ message: 'Usuario eliminado correctamente' });
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el usuario' });
  }
};

export default {
  getAllUsers,
  getUserById,
  getUserByEmail,
  createUser,
  updateUser,
  deleteUser,
};
