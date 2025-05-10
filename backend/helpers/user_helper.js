import db from '../config/db_config.js';

// Obtener el tipo de usuario basado en el user_id
const getUserType = async (user_id) => {
  try {
    // Verificamos si el usuario es un trabajador
    const worker = await db.oneOrNone('SELECT 1 FROM workers WHERE user_id = $1', [user_id]);
    if (worker) {
      return 'worker';  // El usuario es un trabajador
    }

    // Verificamos si el usuario es un cliente
    const client = await db.oneOrNone('SELECT 1 FROM clients WHERE user_id = $1', [user_id]);
    if (client) {
      return 'client';  // El usuario es un cliente
    }

    // Verificamos si el usuario es un administrador
    const admin = await db.oneOrNone('SELECT 1 FROM admin WHERE user_id = $1', [user_id]);
    if (admin) {
      return 'admin';  // El usuario es un administrador
    }

    // Si no se encuentra en ninguna de las tablas, el tipo de usuario no es válido
    return null;  // Si el usuario no está en ninguna tabla, retornamos null
  } catch (error) {
    console.error('Error al obtener el tipo de usuario:', error);
    throw error;  // Propagamos el error para que lo maneje el controlador
  }
};

export default getUserType;
