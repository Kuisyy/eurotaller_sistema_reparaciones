import clientModel from '../models/client_model.js';

// Función para obtener todos los clientes
const getAllClients = async (req, res) => {
    try {
        const clients = await clientModel.getAll(); 
        res.status(200).json(clients);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los clientes' });
    }
};

// Función para obtener un cliente por ID
const getClientById = async (req, res) => {
    const { id } = req.params;
    try {
        const client = await clientModel.getById(id);
        if (client) {
            res.status(200).json(client);
        } else {
            res.status(404).json({ message: 'Cliente no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el cliente' });
    }
};

// Función para crear un nuevo cliente
const createClient = async (clientData) => {
    try {
      const newClient = await clientModel.createClient(clientData);
      return newClient; // Devuelve el resultado, no la respuesta HTTP
    } catch (error) {
      throw error;
    }
  };

// Función para actualizar un cliente
const updateClient = async (req, res) => {
    const { id } = req.params;
    const clientData = req.body;
    try {
        const updatedClient = await clientModel.update(id, clientData);
        if (updatedClient) {
            res.status(200).json(updatedClient);
        } else {
            res.status(404).json({ message: 'Cliente no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el cliente' });
    }
};

// Función para eliminar un cliente
const deleteClient = async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await clientModel.delete(id);
        if (deleted) {
            res.status(200).json({ message: 'Cliente eliminado correctamente' });
        } else {
            res.status(404).json({ message: 'Cliente no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el cliente' });
    }
};

export default {
    getAllClients,
    getClientById,
    createClient,
    updateClient,
    deleteClient,
};
