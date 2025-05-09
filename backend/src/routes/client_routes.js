import express from 'express';
import clientController from '../controllers/client_controller.js'; 

const router = express.Router();

// Define las rutas y las asocia a las funciones del controlador
router.get('/', clientController.getAllClients);       
router.get('/:id', clientController.getClientById);    
router.post('/', clientController.createClient);     
router.put('/:id', clientController.updateClient);    
router.delete('/:id', clientController.deleteClient); 

export default router;
