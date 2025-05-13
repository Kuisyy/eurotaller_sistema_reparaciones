import db from '../../config/db_config.js';

const createClientTable = async () => {
  try {
    await db.none(`
      CREATE TABLE clients (
        client_id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL, -- Clave foránea que referencia a la tabla users
        address VARCHAR(255),
        postal_code VARCHAR(10),
        city VARCHAR(50),
        province VARCHAR(50),
        country VARCHAR(50) DEFAULT 'España',
        nif VARCHAR(20) UNIQUE NOT NULL,
        phone VARCHAR(20),
        FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
      );
    `);
    console.log('Tabla de clientes creada o ya existente.');
  } catch (error) {
    console.error('Error al crear la tabla de clientes:', error);
  }
};

export default { createClientTable };
