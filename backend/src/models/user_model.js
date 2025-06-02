import db from '../config/db_config.js';

const getAllUsers = async () => {
  try {
    const users = await db.any('SELECT user_id, name, email, role, created_at, updated_at FROM users');
    return users;
  } catch (error) {
    throw error;
  }
};

const getUserById = async (id) => {
  try {
    const user = await db.oneOrNone('SELECT user_id, name, email, role, created_at, updated_at FROM users WHERE user_id = $1', [id]);
    return user;
  } catch (error) {
    throw error;
  }
};

const getUserByEmail = async (email) => {
  try {
    const user = await db.oneOrNone('SELECT user_id, email, password, role FROM users WHERE email = $1', [email]);
    return user;
  } catch (error) {
    throw error;
  }
};

const createUser = async (userData) => {
  try {
    const { name, email, password, role } = userData;
    const newUser = await db.one(
      `INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING user_id, name, email, role, created_at, updated_at`,
      [name, email, password, role]
    );
    return newUser;
  } catch (error) {
    throw error;
  }
};

const updateUser = async (id, userData) => {
  try {
    // Obtener el usuario actual primero para manejar campos no proporcionados
    const currentUser = await db.oneOrNone(
      'SELECT * FROM users WHERE user_id = $1', 
      [id]
    );
    
    if (!currentUser) {
      return null;
    }

    // Usar los valores actuales si no se proporcionan nuevos
    const { 
      name = currentUser.name, 
      email = currentUser.email, 
      password = currentUser.password, 
      role = currentUser.role 
    } = userData;

    const updatedUser = await db.oneOrNone(
      `UPDATE users 
       SET name = $1, email = $2, password = $3, role = $4, updated_at = CURRENT_TIMESTAMP 
       WHERE user_id = $5 
       RETURNING user_id, name, email, role, created_at, updated_at`,
      [name, email, password, role, id]
    );
    
    return updatedUser;
  } catch (error) {
    console.error('Error en modelo updateUser:', error);
    throw error;
  }
};
const deleteUser = async (id) => {
  try {
    const deleted = await db.oneOrNone('DELETE FROM users WHERE user_id = $1 RETURNING user_id', [id]);
    return deleted ? true : false;
  } catch (error) {
    throw error;
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
