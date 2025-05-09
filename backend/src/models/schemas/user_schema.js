import db from '../../config/db_config.js';

const createUserTable = async () => {
  try {
    await db.none(`
      CREATE TABLE users (
        user_id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL, -- Almacenar el hash de la contraseña, no la contraseña en texto plano
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE
      );
    `);
    console.log('Tabla de usuarios creada o ya existente.');
  } catch (error) {
    console.error('Error al crear la tabla de usuarios:', error);
  }
};

export default { createUserTable };