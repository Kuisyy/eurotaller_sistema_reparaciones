import db from '../config/db_config.js';

const getAllWorkers = async () => {
  try {
    const workers = await db.any(
      `SELECT w.worker_id, u.name, u.email, w.role 
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
      `SELECT w.worker_id, u.name, u.email, w.role 
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

const getWorkerByUserId = async (userId) => {
  try {
    const worker = await db.oneOrNone(
      `SELECT w.worker_id
       FROM workers w
       WHERE w.user_id = $1`,
      [userId]
    );
    return worker;
  } catch (error) {
    throw error;
  }
};

const createWorker = async (workerData) => {
  try {
    const { user_id, role } = workerData;
     const newWorker = await db.one(
      `INSERT INTO workers (user_id, role) 
       VALUES ($1, $2) 
       RETURNING worker_id, user_id, role`,
      [user_id, role]
    );
    return newWorker;
  } catch (error) {
    throw error;
  }
};

const updateWorker = async (id, workerData) => {
  try {
    const {  role } = workerData;
    const updatedWorker = await db.oneOrNone(
      `UPDATE workers 
       SET  role = $2
       WHERE worker_id = $1
       RETURNING worker_id, user_id, role`,
      [id, role]
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
  getWorkerByUserId
};
