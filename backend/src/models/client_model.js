import db from '../config/db_config.js';

const getAllClients = async () => {
  try {
    const clients = await db.any('SELECT * FROM clients');
    return clients;
  } catch (error) {
    throw error;
  }
};

const getClientById = async (id) => {
  try {
    const client = await db.oneOrNone('SELECT * FROM clients WHERE client_id = $1', [id]);
    return client;
  } catch (error) {
    throw error;
  }
};

const getClientByUserId = async (userId) => {
  try {
    const client = await db.oneOrNone('SELECT * FROM clients WHERE client_id = $1', [userId]);
    return client;
  } catch (error) {
    throw error;
  }
};

const createClient = async (clientData) => {
  try {
    const { user_id, address, postal_code, city, province, country, nif, phone, email } = clientData;
    const newClient = await db.one(
      `INSERT INTO clients (user_id, address, postal_code, city, province, country, nif, phone, email)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       RETURNING *`,
      [user_id, address, postal_code, city, province, country, nif, phone, email]
    );
    return newClient;
  } catch (error) {
    throw error;
  }
};

const updateClient = async (id, clientData) => {
  try {
    const { address, postal_code, city, province, country, nif, phone, email } = clientData;
    const updatedClient = await db.oneOrNone(
      `UPDATE clients SET  address = $2, postal_code = $3, city = $4, province = $5, 
             country = $6, nif = $7, phone = $8, email = $9, updated_at = CURRENT_TIMESTAMP
             WHERE client_id = $1
             RETURNING *`,
            [id,  address, postal_code, city, province, country, nif, phone, email]
    );
    return updatedClient;
  } catch (error) {
    throw error;
  }
};

const deleteClient = async (id) => {
  try {
    const deleted = await db.oneOrNone('DELETE FROM clients WHERE client_id = $1 RETURNING *', [id]);
    return deleted ? true : false;
  } catch (error) {
    throw error;
  }
};

export default {
  getAllClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient,
  getClientByUserId
};