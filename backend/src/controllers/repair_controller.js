import repairModel from '../models/repair_model.js';

const getAllRepairs = async (req, res) => {
  try {
    const repairs = await repairModel.getAllRepairs();
    res.status(200).json(repairs);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las reparaciones' });
  }
};

const getRepairById = async (req, res) => {
  const { id } = req.params;
  try {
    const repair = await repairModel.getRepairById(id);
    if (repair) {
      res.status(200).json(repair);
    } else {
      res.status(404).json({ message: 'Reparación no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la reparación' });
  }
};

const createRepair = async (req, res) => {
  const repairData = req.body;
  try {
    const newRepair = await repairModel.createRepair(repairData);
    res.status(201).json(newRepair);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la reparación' });
  }
};

const updateRepair = async (req, res) => {
  const { id } = req.params;
  const repairData = req.body;
  try {
    const updatedRepair = await repairModel.updateRepair(id, repairData);
    if (updatedRepair) {
      res.status(200).json(updatedRepair);
    } else {
      res.status(404).json({ message: 'Reparación no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la reparación' });
  }
};

const deleteRepair = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await repairModel.deleteRepair(id);
    if (deleted) {
      res.status(200).json({ message: 'Reparación eliminada correctamente' });
    } else {
      res.status(404).json({ message: 'Reparación no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la reparación' });
  }
};

const getRepairsByClientId = async (req, res) => {
  const { client_id } = req.user.roleId;
  try {
    const repairs = await repairModel.getRepairsByClientId(client_id);
    res.status(200).json(repairs);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las reparaciones del cliente' });
  }
};

const getRepairsByVehicleId = async (req, res) => {
  const { vehicle_id } = req.params;
  try {
    const repairs = await repairModel.getRepairsByVehicleId(vehicle_id);
    res.status(200).json(repairs);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las reparaciones del vehículo' });
  }
};

const getRepairsByWorkerId = async (req, res) => {
  const { worker_id } = req.user.roleId;
  try {
    const repairs = await repairModel.getRepairsByWorkerId(worker_id);
    res.status(200).json(repairs);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las reparaciones del trabajador' });
  }
};


export default {
  getAllRepairs,
  getRepairById,
  createRepair,
  updateRepair,
  deleteRepair,
  getRepairsByClientId,
  getRepairsByVehicleId,
  getRepairsByWorkerId,
};
