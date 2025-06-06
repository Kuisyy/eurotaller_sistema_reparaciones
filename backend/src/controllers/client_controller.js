import clientModel from '../models/client_model.js';

// Función para obtener todos los clientes
const getAllClients = async (req, res) => {
    try {
        const clients = await clientModel.getAllClients(); 
        res.status(200).json(clients);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los clientes' });
    }
};

// Función para obtener un cliente por ID
const getClientMe = async (req, res) => {
    const  id  = req.user.userId;
    try {
        const client = await clientModel.getClientByUserId(id);
        if (client) {
            res.status(200).json(client);
        } else {
            res.status(404).json({ message: 'Cliente no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el cliente' });
    }
};

// Función para obtener un cliente por ID
const getClientById = async (req, res) => {
    const { id } = req.params;
    try {
        const client = await clientModel.getClientById(id);
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
const createClient = async (req, res) => {
    try {
        const userData = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            role: req.body.role
        };
        const clientData = {
          address: req.body.address,
          postal_code: req.body.postal_code,
          city: req.body.city,
          province: req.body.province,
          country: req.body.country,
          nif: req.body.nif,
          phone: req.body.phone
        };
        const newClient = await clientModel.createClient(clientData, userData);
        res.status(201).json(newClient);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
};

// Función para actualizar un cliente
const updateClient = async (req, res) => {
  const { id } = req.params;
  const clientData = req.body;
  
  try {
    if (!id || isNaN(id)) {
      return res.status(400).json({ message: 'ID de cliente inválido' });
    }

    if (!clientData || Object.keys(clientData).length === 0) {
      return res.status(400).json({ message: 'No se proporcionaron datos para actualizar' });
    }

    const updatedClient = await clientModel.updateClient(id, clientData);
    
    if (updatedClient) {
      res.status(200).json({
        message: 'Cliente actualizado exitosamente',
        client: updatedClient
      });
    } else {
      res.status(404).json({ message: 'Cliente no encontrado' });
    }
  } catch (error) {
    console.error('Error al actualizar cliente:', error);
    res.status(500).json({ 
      error: 'Error interno del servidor',
      message: 'No se pudo actualizar el cliente'
    });
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
    getClientMe,
    createClient,
    updateClient,
    deleteClient,
};
