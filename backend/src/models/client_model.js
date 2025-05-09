import db from '../config/db_config.js';

const getAll = async () => {
    try {
        const clients = await db.any('SELECT * FROM clients');
        return clients;
    } catch (error) {
        throw error; // Propaga el error para que lo maneje el controlador
    }
};

const getById = async (id) => {
    try {
        const client = await db.oneOrNone('SELECT * FROM clients WHERE client_id = $1', [id]);
        return client;
    } catch (error) {
        throw error;
    }
};

const create = async (clientData) => {
  try {
    const { name, address, postal_code, city, province, country, nif, phone, email } = clientData;
    const newClient = await db.one(
      `INSERT INTO clients (name, address, postal_code, city, province, country, nif, phone, email)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       RETURNING *`,
      [name, address, postal_code, city, province, country, nif, phone, email]
    );
    return newClient;
  } catch (error) {
    throw error;
  }
};

const update = async (id, clientData) => {
    try {
        const { name, address, postal_code, city, province, country, nif, phone, email } = clientData;
        const updatedClient = await db.oneOrNone(
            `UPDATE clients SET name = $1, address = $2, postal_code = $3, city = $4, province = $5, 
             country = $6, nif = $7, phone = $8, email = $9, updated_at = CURRENT_TIMESTAMP
             WHERE client_id = $10
             RETURNING *`,
            [name, address, postal_code, city, province, country, nif, phone, email, id]
        );
        return updatedClient;
    } catch (error) {
        throw error;
    }
};

const deleteClient = async (id) => {
    try {
        const deleted = await db.oneOrNone('DELETE FROM clients WHERE client_id = $1 RETURNING *', [id]);
        return deleted ? true : false; // Devuelve true si se eliminó, false si no se encontró
    } catch (error) {
        throw error;
    }
};

export default {
    getAll,
    getById,
    create,
    update,
    delete: deleteClient,
};
