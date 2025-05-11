import db from '../config/db_config.js';

const getAllRepairs = async () => {
  try {
    const repairs = await db.any('SELECT * FROM repairs');
    return repairs;
  } catch (error) {
    throw error;
  }
};

const getRepairById = async (id) => {
  try {
    const repair = await db.oneOrNone('SELECT * FROM repairs WHERE repair_id = $1', [id]);
    return repair;
  } catch (error) {
    throw error;
  }
};

const createRepair = async (repairData) => {
  try {
    const { vehicle_id, client_id, description, date, total_amount, status, notes } = repairData;
    const newRepair = await db.one(
      `INSERT INTO repairs (vehicle_id, client_id, description, date, total_amount, status, notes)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [vehicle_id, client_id, description, date, total_amount, status, notes]
    );
    return newRepair;
  } catch (error) {
    throw error;
  }
};

const updateRepair = async (id, repairData) => {
  try {
    const { vehicle_id, client_id, description, date, total_amount, status, notes } = repairData;
    const updatedRepair = await db.oneOrNone(
      `UPDATE repairs SET vehicle_id = $1, client_id = $2, description = $3, date = $4, total_amount = $5, status = $6, notes = $7, updated_at = CURRENT_TIMESTAMP
       WHERE repair_id = $8
       RETURNING *`,
      [vehicle_id, client_id, description, date, total_amount, status, notes, id]
    );
    return updatedRepair;
  } catch (error) {
    throw error;
  }
};

const deleteRepair = async (id) => {
  try {
    const deleted = await db.oneOrNone('DELETE FROM repairs WHERE repair_id = $1 RETURNING *', [id]);
    return deleted ? true : false;
  } catch (error) {
    throw error;
  }
};

const getRepairsByClientId = async (client_id) => {
  try {
    const repairs = await db.any('SELECT * FROM repairs WHERE client_id = $1', [client_id]);
    return repairs;
  } catch (error) {
    throw error;
  }
};

const getRepairsByVehicleId = async (vehicle_id) => {
  try {
    const repairs = await db.any('SELECT * FROM repairs WHERE vehicle_id = $1', [vehicle_id]);
    return repairs;
  } catch (error) {
    throw error;
  }
};

const getRepairsByWorkerId = async (worker_id) => {
  try {
    const repairs = await db.any('SELECT * FROM repairs WHERE worker_id = $1', [worker_id]);
    return repairs;
  } catch (error) {
    throw error;
  }
};


export default {
  getAllRepairs,
  getRepairById,
  createRepair,
  updateRepair,
  delete: deleteRepair,
  getRepairsByClientId,
  getRepairsByVehicleId,
  getRepairsByWorkerId,
};
