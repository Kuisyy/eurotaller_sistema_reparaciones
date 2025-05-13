import db from '../config/db_config.js';

const getAdminByUserId = async (userId) => {
  try {
    const admin = await db.oneOrNone(
      `SELECT a.admin_id, u.name, u.email, u.role AS user_role
      FROM admin a
      JOIN users u ON a.user_id = u.user_id
      WHERE a.user_id = $1`,
     [userId]
    );
    return admin;
  } catch (error) {
    throw error;
  }
};

const getAdminById = async (id) => {
  try {
    const admin = await db.oneOrNone(
      `SELECT a.admin_id, u.name, u.email, u.role AS user_role
       FROM admin a
       JOIN users u ON a.user_id = u.user_id
       WHERE a.admin_id = $1`,
      [id]
    );
    return admin;
  } catch (error) {
    throw error;
  }
};

const createAdmin = async (adminData) => {
  try {
    const { user_id } = adminData; // Solo necesitamos el user_id
    const newAdmin = await db.one(
      `INSERT INTO admin (user_id)
       VALUES ($1)
       RETURNING admin_id, user_id`,
      [user_id]
    );
    return newAdmin;
  } catch (error) {
    throw error;
  }
};

const deleteAdmin = async (id) => {
  try {
    const deleted = await db.oneOrNone('DELETE FROM admin WHERE admin_id = $1 RETURNING admin_id', [id]);
    return deleted ? true : false;
  } catch (error) {
    throw error;
  }
};

export default {
  createAdmin,
  deleteAdmin,
  getAdminByUserId,
  getAdminById
};
