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
  const { id } = req.params;
  try {
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
  const workerData = req.body;
  try {
    const newWorker = await workerModel.createWorker(workerData);
    res.status(201).json(newWorker);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el trabajador' });
  }
};

const updateWorker = async (req, res) => {
  const { id } = req.params;
  const workerData = req.body;
  try {
    const updatedWorker = await workerModel.updateWorker(id, workerData);
    if (updatedWorker) {
      res.status(200).json(updatedWorker);
    } else {
      res.status(404).json({ message: 'Trabajador no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el trabajador' });
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