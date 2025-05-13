import db from '../config/db_config.js';

const getAllVehicles = async () => {
  try {
    const vehicles = await db.any('SELECT * FROM vehicles');
    return vehicles;
  } catch (error) {
    throw error;
  }
};

const getVehicleById = async (id) => {
  try {
    const vehicle = await db.oneOrNone('SELECT * FROM vehicles WHERE vehicle_id = $1', [id]);
    return vehicle;
  } catch (error) {
    throw error;
  }
};

const createVehicle = async (vehicleData) => {
  try {
    const { client_id, brand, model, registration_number, vin, engine_type, engine_code, year_of_manufacture, mileage, color, fuel_type, notes } = vehicleData;
    const newVehicle = await db.one(
      `INSERT INTO vehicles (client_id, brand, model, registration_number, vin, engine_type, engine_code, year_of_manufacture, mileage, color, fuel_type, notes)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
       RETURNING *`,
      [client_id, brand, model, registration_number, vin, engine_type, engine_code, year_of_manufacture, mileage, color, fuel_type, notes]
    );
    return newVehicle;
  } catch (error) {
    throw error;
  }
};

const updateVehicle = async (id, vehicleData) => {
  try {
    const { client_id, brand, model, registration_number, vin, engine_type, engine_code, year_of_manufacture, mileage, color, fuel_type, notes } = vehicleData;
    const updatedVehicle = await db.oneOrNone(
      `UPDATE vehicles SET client_id = $1, brand = $2, model = $3, registration_number = $4, vin = $5, engine_type = $6, engine_code = $7, 
       year_of_manufacture = $8, mileage = $9, color = $10, fuel_type = $11, notes = $12, updated_at = CURRENT_TIMESTAMP
       WHERE vehicle_id = $13
       RETURNING *`,
      [client_id, brand, model, registration_number, vin, engine_type, engine_code, year_of_manufacture, mileage, color, fuel_type, notes, id]
    );
    return updatedVehicle;
  } catch (error) {
    throw error;
  }
};

const deleteVehicle = async (id) => {
  try {
    const deleted = await db.oneOrNone('DELETE FROM vehicles WHERE vehicle_id = $1 RETURNING *', [id]);
    return deleted ? true : false;
  } catch (error) {
    throw error;
  }
};

export default {
  getAllVehicles,
  getVehicleById,
  createVehicle,
  updateVehicle,
  delete: deleteVehicle,
};
