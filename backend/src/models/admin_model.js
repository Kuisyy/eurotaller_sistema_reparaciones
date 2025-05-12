import db from '../config/db_config.js';

const getAdmin = async () => {
  try {
    const admin = await db.oneOrNone(
      `SELECT a.admin_id, u.name, u.email, a.level
       FROM admin a
       JOIN users u ON a.user_id = u.user_id`
    );
    return admin;
  } catch (error) {
    throw error;
  }
};

const getAdminByUserId = async (userId) => {
  try {
    const admin = await db.oneOrNone(
      `SELECT a.admin_id
       FROM admin a
       WHERE a.user_id = $1`,
      [userId]
    );
    return admin;
  } catch (error) {
    throw error;
  }
};


const createAdmin = async (adminData) => {
  try {
    const { user_id, level } = adminData;
    const newAdmin = await db.one(
      `INSERT INTO admin (user_id, level) 
       VALUES ($1, $2) 
       RETURNING admin_id, user_id, level`,
      [user_id, level]
    );
    return newAdmin;
  } catch (error) {
    throw error;
  }
};

const updateAdmin = async (id, adminData) => {
  try {
    const { level } = adminData;
    const updatedAdmin = await db.oneOrNone(
      `UPDATE admin 
       SET  level = $2
       WHERE admin_id = $1
       RETURNING admin_id, user_id, level`,
      [id, level]
    );
    return updatedAdmin;
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
  getAdmin,
  createAdmin,
  updateAdmin,
  deleteAdmin,
  getAdminByUserId
};
