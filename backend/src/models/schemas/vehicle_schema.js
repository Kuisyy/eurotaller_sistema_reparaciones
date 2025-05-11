import db from '../../config/db_config.js'; 

const createVehicleTable = async () => {
  try {
    await db.none(`
        CREATE TABLE IF NOT EXISTS vehicles (
            vehicle_id SERIAL PRIMARY KEY,
            client_id INTEGER NOT NULL, -- Clave foránea para relacionar con la tabla de clientes
            brand VARCHAR(50) NOT NULL,   -- Marca del vehículo (ej., Seat, Renault, BMW)
            model VARCHAR(50) NOT NULL,   -- Modelo del vehículo (ej., León, Clio, Serie 3)
            registration_number VARCHAR(20) UNIQUE NOT NULL, -- Matrícula del vehículo (única y obligatoria)
            vin VARCHAR(17) UNIQUE,       -- Número de bastidor (VIN - Vehicle Identification Number, único)
            engine_type VARCHAR(30),     -- Tipo de motor (ej., Gasolina, Diésel, Eléctrico, Híbrido)
            engine_code VARCHAR(30),     -- Código del motor (si aplica)
            year_of_manufacture INTEGER, -- Año de fabricación
            mileage INTEGER,             -- Kilometraje actual
            color VARCHAR(30),           -- Color del vehículo
            fuel_type VARCHAR(20),       -- Tipo de combustible (ej., Gasolina, Diésel) - redundante si engine_type es detallado
            notes TEXT,                  -- Notas adicionales sobre el vehículo
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP WITH TIME ZONE,
            FOREIGN KEY (client_id) REFERENCES clients(client_id) ON DELETE CASCADE
        );
    `);
    console.log('Tabla de vehiculos creada o ya existente.');
  } catch (error) {
    console.error('Error al crear la tabla de vehiculos:', error);
  }
};

export default { createVehicleTable };