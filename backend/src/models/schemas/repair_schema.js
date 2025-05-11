import db from '../../config/db_config.js';

const createRepairTable = async () => {
  try {
    await db.none(`
      CREATE TABLE IF NOT EXISTS repairs (
        repair_id SERIAL PRIMARY KEY,
        vehicle_id INTEGER NOT NULL,
        client_id INTEGER NOT NULL,
        worker_id INTEGER NOT NULL,
        description TEXT NOT NULL,
        date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        status VARCHAR(20) DEFAULT 'Pendiente',
        notes TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE,
        FOREIGN KEY (vehicle_id) REFERENCES vehicles(vehicle_id) ON DELETE CASCADE,
        FOREIGN KEY (client_id) REFERENCES clients(client_id) ON DELETE CASCADE,
        FOREIGN KEY (worker_id) REFERENCES workers(worker_id) ON DELETE CASCADE
      );
    `);
    console.log('Tabla de reparaciones creada o ya existente.');
  } catch (error) {
    console.error('Error al crear la tabla de reparaciones:', error);
  }
};

export default { createRepairTable };