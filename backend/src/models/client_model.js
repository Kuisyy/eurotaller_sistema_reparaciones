import db from '../config/db_config.js'; 

const createClientTable = async () => {
  try {
    await db.none(`
      CREATE TABLE IF NOT EXISTS clients (
        client_id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        address VARCHAR(255),
        postal_code VARCHAR(10),
        city VARCHAR(50),
        province VARCHAR(50),
        country VARCHAR(50) DEFAULT 'España',
        nif VARCHAR(20) UNIQUE NOT NULL,
        phone VARCHAR(20),
        email VARCHAR(100),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE
      );
    `);
    console.log('Tabla de clientes creada o ya existente.');
  } catch (error) {
    console.error('Error al crear la tabla de clientes:', error);
  }
};

export default { createClientTable };