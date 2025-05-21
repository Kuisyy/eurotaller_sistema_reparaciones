import repairModel from '../models/repair_model.js';
import workerModel from '../models/worker_model.js';

const getAllRepairs = async (req, res) => {
  try {
    const repairs = await repairModel.getAllRepairs();

    const responseArray = Array.isArray(repairs) ? repairs : (repairs ? [repairs] : []);

    res.status(200).json(responseArray);
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

    const worker = await workerModel.getWorkerById(repairData.worker_id);
    if (!worker) {
      return res.status(400).json({ message: 'No se encontró un trabajador asociado al usuario.' });
    }
    const workerId = worker.worker_id;

    const newRepairData = {
      ...repairData,
      worker_id: workerId, 
    };

    // 3. Creamos la reparación
    const newRepair = await repairModel.createRepair(newRepairData);
    res.status(201).json(newRepair);

  } catch (error) {
    console.error("Error al crear la reparación:", error);
    res.status(500).json({ error: 'Error al crear la reparación', details: error.message });
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
  const  { id }  = req.params;
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
  const { client_id } = req.params;
  try {
    const repairs = await repairModel.getRepairsByClientId(client_id);

    const responseArray = Array.isArray(repairs) ? repairs : (repairs ? [repairs] : []);

    res.status(200).json(responseArray);
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

const getRepairsByUserId = async (req, res) => {
  const { user_id } = req.params; // Cambiado de worker_id a user_id para consistencia
  try {
    const repairs = await repairModel.getRepairsByUserId(user_id);
    const responseArray = Array.isArray(repairs) ? repairs : repairs ? [repairs] : [];
    res.status(200).json(responseArray);
  } catch (error) {
    console.error('Error al obtener reparaciones:', error);
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
  getRepairsByUserId  
};
