import db from '../config/db_config.js';

const getAllClients = async () => {
  try {
    const clients = await db.any(
      `SELECT c.*, u.name, u.role AS user_role
       FROM clients c
       JOIN users u ON c.user_id = u.user_id`
    );
    return clients;
  } catch (error) {
    throw error;
  }
};

const getClientById = async (id) => {
  try {
    const client = await db.oneOrNone(
      `SELECT c.*, u.name, u.role AS user_role
       FROM clients c
       JOIN users u ON c.user_id = u.user_id
       WHERE c.client_id = $1`,
      [id]
    );
    return client;
  } catch (error) {
    throw error;
  }
};

const getClientByUserId = async (userId) => { 
  try {
    const client = await db.oneOrNone(
      `SELECT c.*, u.role AS user_role
       FROM clients c
       JOIN users u ON c.user_id = u.user_id
       WHERE c.user_id = $1`,
      [userId]
    );
    return client;
  } catch (error) {
    throw error;
  }
};

const createClient = async (clientData) => {
  try {
    const { user_id, address, postal_code, city, province, country, nif, phone } = clientData;
    const newClient = await db.one(
      `INSERT INTO clients (user_id, address, postal_code, city, province, country, nif, phone)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING client_id, user_id, address, postal_code, city, province, country, nif, phone`,
      [user_id, address, postal_code, city, province, country, nif, phone]
    );
    return newClient;
  } catch (error) {
    throw error;
  }
};

const updateClient = async (id, clientData) => {
  try {
    const currentClient = await db.oneOrNone(
      'SELECT * FROM clients WHERE user_id = $1', 
      [id]
    );
    
    if (!currentClient) {
      return null;
    }

    // Usar los valores actuales si no se proporcionan nuevos
    const { 
      address = currentClient.address, 
      postal_code = currentClient.postal_code, 
      city = currentClient.city, 
      province = currentClient.province,
      country = currentClient.country,
      nif = currentClient.nif,
      phone = currentClient.phone
    } = clientData;

    const updatedClient = await db.oneOrNone(
      `UPDATE clients 
      SET address = $2, postal_code = $3, city = $4, province = $5,
          country = $6, nif = $7, phone = $8, updated_at = CURRENT_TIMESTAMP
      WHERE user_id = $1
      RETURNING client_id, user_id, address, postal_code, city, province, country, nif, phone, created_at, updated_at`,
      [id, address, postal_code, city, province, country, nif, phone]
    );
    
    return updatedClient;
  } catch (error) {
    console.error('Error en modelo updateClient:', error);
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
  getClientByUserId,
};