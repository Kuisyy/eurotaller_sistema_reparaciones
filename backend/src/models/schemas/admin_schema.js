import db from '../../config/db_config.js';

const createAdminTable = async () => {
  try {
    await db.none(`
      CREATE TABLE admin (
        admin_id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL UNIQUE,
        FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
      );
    `);
    console.log('Tabla de administrador creada o ya existente.');
  } catch (error) {
    console.error('Error al crear la tabla de administrador:', error);
  }
};

export default { createAdminTable };