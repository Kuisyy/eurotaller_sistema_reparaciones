import workerModel from '../models/worker_model.js';

const getAllWorkers = async (req, res) => {
  try {
    const workers = await workerModel.getAllWorkers();
    res.status(200).json(workers);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los trabajadores' });
  }
};

const getWorkerById = async (req, res) => {
  try {
    const { id } = req.params; 

    const worker = await workerModel.getWorkerById(id);
    if (worker) {
      res.status(200).json(worker);
    } else {
      res.status(404).json({ message: 'Trabajador no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el trabajador' });
  }
};
 
const createWorker = async (req, res) => {
  try {
    const userData = {  
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role, 
    };
    const workerData = { 
      role: req.body.worker_role, 
    };
    const newWorker = await workerModel.createWorker(workerData, userData); // Pasamos ambos objetos
    res.status(201).json(newWorker);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateWorker = async (req, res) => {
  const { id } = req.params;
  const workerData = req.body;
  
  try {
    // Validar que el ID sea válido
    if (!id || isNaN(id)) {
      return res.status(400).json({ message: 'ID de trabajador inválido' });
    }

    // Validar que se envíen datos para actualizar
    if (!workerData || Object.keys(workerData).length === 0) {
      return res.status(400).json({ message: 'No se proporcionaron datos para actualizar' });
    }

    const updatedWorker = await workerModel.updateWorker(id, workerData);
    
    if (updatedWorker) {
      res.status(200).json({
        message: 'Trabajador actualizado exitosamente',
        worker: updatedWorker
      });
    } else {
      res.status(404).json({ message: 'Trabajador no encontrado' });
    }
  } catch (error) {
    console.error('Error al actualizar trabajador:', error);
    res.status(500).json({ 
      error: 'Error interno del servidor',
      message: 'No se pudo actualizar el trabajador'
    });
  }
};

const deleteWorker = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await workerModel.deleteWorker(id);
    if (deleted) {
      res.status(200).json({ message: 'Trabajador eliminado correctamente' });
    } else {
      res.status(404).json({ message: 'Trabajador no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar al trabajador' });
  }
};

export default {
  getAllWorkers,
  getWorkerById,
  createWorker,
  updateWorker,
  deleteWorker,
};