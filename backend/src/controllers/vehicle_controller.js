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
    console.error("Error creating vehicle:", error);
    res.status(500).json({ error: 'Error al crear el vehículo', details: error.message });
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

const getVehicleByClientId = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!id) {
      return res.status(400).json({ message: 'Se requiere el ID del cliente' });
    }

    const vehicles = await vehicleModel.getVehicleByClientId(id);
    
    // Asegurarnos de que siempre devolvemos un array
    const responseArray = Array.isArray(vehicles) ? vehicles : (vehicles ? [vehicles] : []);
    
    res.status(200).json(responseArray);
  } catch (error) {
    console.error('Error al obtener vehículos del cliente:', error);
    res.status(500).json({ 
      error: 'Error al obtener los vehículos del cliente',
      details: error.message 
    });
  }
};

export default {
  getAllVehicles,
  getVehicleById,
  createVehicle,
  updateVehicle,
  deleteVehicle,
  getVehicleByClientId  // Añadir el nuevo método al export
};
