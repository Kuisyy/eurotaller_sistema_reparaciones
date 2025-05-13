import adminModel from '../models/admin_model.js';

const getAdminMe = async (req, res) => {
  try {
    const adminId = req.user.userId; 
    const admin = await adminModel.getAdminByUserId(adminId);
    if (!admin) {
      return res.status(404).json({ message: 'Administrador no encontrado' });
    }
    res.status(200).json(admin);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createAdmin = async (req, res) => {
  try {
    const userData = {  // Extraemos los datos del usuario
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role, // El rol del usuario
    };
    const adminData = { // Extraemos los datos del admin
      user_id: req.body.user_id,
    };
    const newAdmin = await adminModel.createAdmin(adminData, userData); // Pasamos ambos objetos
    res.status(201).json(newAdmin);
  } catch (error) {
    res.status(500).json({ error: error.message });
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
  getAdminMe,
  createAdmin,
  updateAdmin,
  deleteAdmin
};