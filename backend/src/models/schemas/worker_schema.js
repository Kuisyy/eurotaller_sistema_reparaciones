import db from '../../config/db_config.js';

const createWorkerTable = async () => {
  try {
    await db.none(`
      CREATE TABLE workers (
        worker_id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL,
        role VARCHAR(50),
        FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
      );
    `);
    console.log('Tabla de trabajadores creada o ya existente.');
  } catch (error) {
    console.error('Error al crear la tabla de trabajadores:', error);
  }
};

export default { createWorkerTable };