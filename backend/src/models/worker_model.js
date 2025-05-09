import db from '../config/db_config.js';

const getAllWorkers = async () => {
  try {
    const workers = await db.any(
      `SELECT w.worker_id, u.name, u.email, w.role, w.hire_date 
       FROM workers w
       JOIN users u ON w.user_id = u.user_id`
    );
    return workers;
  } catch (error) {
    throw error;
  }
};

const getWorkerById = async (id) => {
  try {
    const worker = await db.oneOrNone(
      `SELECT w.worker_id, u.name, u.email, w.role, w.hire_date 
       FROM workers w
       JOIN users u ON w.user_id = u.user_id
       WHERE w.worker_id = $1`,
      [id]
    );
    return worker;
  } catch (error) {
    throw error;
  }
};

const createWorker = async (workerData) => {
  try {
    const { user_id, role, hire_date } = workerData;
     const newWorker = await db.one(
      `INSERT INTO workers (user_id, role, hire_date) 
       VALUES ($1, $2, $3) 
       RETURNING worker_id, user_id, role, hire_date`,
      [user_id, role, hire_date]
    );
    return newWorker;
  } catch (error) {
    throw error;
  }
};

const updateWorker = async (id, workerData) => {
  try {
    const { user_id, role, hire_date } = workerData;
    const updatedWorker = await db.oneOrNone(
      `UPDATE workers 
       SET user_id = $1, role = $2, hire_date = $3
       WHERE worker_id = $4
       RETURNING worker_id, user_id, role, hire_date`,
      [user_id, role, hire_date, id]
    );
    return updatedWorker;
  } catch (error) {
    throw error;
  }
};

const deleteWorker = async (id) => {
  try {
    const deleted = await db.oneOrNone('DELETE FROM workers WHERE worker_id = $1 RETURNING worker_id', [id]);
    return deleted ? true : false;
  } catch (error) {
    throw error;
  }
};

export default {
  getAllWorkers,
  getWorkerById,
  createWorker,
  updateWorker,
  deleteWorker,
};