import vehicleModel from '../models/vehicle_model.js';

const getAllVehicles = async (req, res) => {
  try {
    const vehicles = await vehicleModel.getAllVehicles();
    res.status(200).json(vehicles);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los vehículos' });
  }
};

const getVehicleById = async (req, res) => {
  const { id } = req.params;
  try {
    const vehicle = await vehicleModel.getVehicleById(id);
    if (vehicle) {
      res.status(200).json(vehicle);
    } else {
      res.status(404).json({ message: 'Vehículo no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el vehículo' });
  }
};

const createVehicle = async (req, res) => {
  const vehicleData = req.body;
  try {
    const newVehicle = await vehicleModel.createVehicle(vehicleData);
    res.status(201).json(newVehicle);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el vehículo' });
  }
};

const updateVehicle = async (req, res) => {
  const { id } = req.params;
  const vehicleData = req.body;
  try {
    const updatedVehicle = await vehicleModel.updateVehicle(id, vehicleData);
    if (updatedVehicle) {
      res.status(200).json(updatedVehicle);
    } else {
      res.status(404).json({ message: 'Vehículo no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el vehículo' });
  }
};

const deleteVehicle = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await vehicleModel.deleteVehicle(id);
    if (deleted) {
      res.status(200).json({ message: 'Vehículo eliminado correctamente' });
    } else {
      res.status(404).json({ message: 'Vehículo no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el vehículo' });
  }
};

export default {
  getAllVehicles,
  getVehicleById,
  createVehicle,
  updateVehicle,
  deleteVehicle,
};
