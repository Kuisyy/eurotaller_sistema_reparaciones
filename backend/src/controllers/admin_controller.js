import adminModel from '../models/admin_model.js';

const getAdmin = async (req, res) => {
  try {
    const admin = await adminModel.getAdmin();
    res.status(200).json(admin);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el administrador' });
  }
};

const createAdmin = async (adminData) => {
  try {
    const newAdmin = await adminModel.createAdmin(adminData);
    return newAdmin; // Devuelve el resultado, no la respuesta HTTP
  } catch (error) {
    throw error;
  }
};

const updateAdmin = async (req, res) => {
  const { id } = req.params;
  const adminData = req.body;
  try {
    const updatedAdmin = await adminModel.updateAdmin(id, adminData);
    if (updatedAdmin) {
      res.status(200).json(updatedAdmin);
    } else {
      res.status(404).json({ message: 'Administrador no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el administrador' });
  }
};

const deleteAdmin = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await adminModel.deleteAdmin(id);
    if (deleted) {
      res.status(200).json({ message: 'Administrador eliminado correctamente' });
    } else {
      res.status(404).json({ message: 'Administrador no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar al administrador' });
  }
};

export default {
  getAdmin,
  createAdmin,
  updateAdmin,
  deleteAdmin
};