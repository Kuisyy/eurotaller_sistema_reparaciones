import repairModel from '../models/repair_model.js';
import workerModel from '../models/worker_model.js';
import clientModel from '../models/client_model.js';
import userModel from '../models/user_model.js';
import transporter from '../config/email_config.js';

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
    const currentRepair = await repairModel.getRepairById(id);
    if (!currentRepair) {
      return res.status(404).json({ message: 'Reparación no encontrada' });
    }

    const updatedRepair = await repairModel.updateRepair(id, repairData);
    if (!updatedRepair) {
      return res.status(404).json({ message: 'Error al actualizar la reparación' });
    }

    if (repairData.status === 'Finalizado' && currentRepair.status !== 'Finalizado') {
      const client = await clientModel.getClientById(updatedRepair.client_id);
      if (!client) {
        console.error('Cliente no encontrado para la reparación:', id);
        return res.status(200).json(updatedRepair);
      }

      const user = await userModel.getUserById(client.user_id);
      if (!user || !user.email) {
        console.error('Usuario/email no encontrado para el cliente:', client.client_id);
        return res.status(200).json(updatedRepair);
      }

      // Enviar email
      const mailOptions = {
        from: 'eurotallerjoseluis@gmail.com',
        to: user.email,
        subject: 'Reparación Finalizada - EuroTaller',
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px;">
            <h2 style="color: #005bac;">¡Hola ${user.name}!</h2>
            <p>Nos complace informarte que tu reparación (ID: R-${String(updatedRepair.repair_id).padStart(3, '0')}) ha sido finalizada.</p>
            <p>Puedes pasar a recoger tu vehículo en nuestro taller.</p>
            <p>Detalles de la reparación:</p>
            <ul>
              <li>Descripción: ${updatedRepair.description}</li>
              <li>Fecha de finalización: ${new Date().toLocaleDateString()}</li>
            </ul>
            <p>¡Gracias por confiar en EuroTaller!</p>
            <hr>
            <p style="color: #666; font-size: 12px;">
              Este es un mensaje automático. Por favor, no responda a este correo. 
              Si tiene alguna consulta, contacte directamente con el taller.
            </p>
          </div>
        `
      };

      try {
        await transporter.sendMail(mailOptions);
        console.log('Email enviado al cliente:', user.email);
      } catch (emailError) {
        console.error('Error al enviar email:', emailError);
        // No devolvemos error al cliente si falla el email
      }
    }

    res.status(200).json(updatedRepair);
  } catch (error) {
    console.error('Error en updateRepair:', error);
    res.status(500).json({ 
      error: 'Error al actualizar la reparación',
      details: error.message 
    });
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
