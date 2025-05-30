import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import userSchema from './src/models/schemas/user_schema.js';
import workerRoutes from './src/routes/worker_routes.js';
import adminRoutes from './src/routes/admin_routes.js';
import clientSchema from './src/models/schemas/client_schema.js';
import vehicleSchema from './src/models/schemas/vehicle_schema.js';
import repairSchema from './src/models/schemas/repair_schema.js';
import workerSchema from './src/models/schemas/worker_schema.js';
import adminSchema from './src/models/schemas/admin_schema.js';
import clientRoutes from './src/routes/client_routes.js';
import vehicleRoutes from './src/routes/vehicle_routes.js';
import repairRoutes from './src/routes/repair_routes.js';
import authRoutes from './src/routes/auth_routes.js';
import userRoutes from './src/routes/user_routes.js';
import ratingRoutes from './src/routes/rating_routes.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true
}));
app.use(bodyParser.json());
app.use(cookieParser());

// Crear las tablas en el orden correcto
async function createTables() {
  try {
    await userSchema.createUserTable();
    await clientSchema.createClientTable();
    await workerSchema.createWorkerTable();
    await adminSchema.createAdminTable();
    await vehicleSchema.createVehicleTable();
    await repairSchema.createRepairTable();
    console.log("Todas las tablas creadas o ya existentes.");
  } catch (error) {
    console.error("Error al crear las tablas:", error);
    throw error;
  }
}

// Llamar a la función de creación de tablas antes de iniciar el servidor
createTables()
  .then(() => {
    // Usa las rutas
    app.use('/user', userRoutes);
    app.use('/auth', authRoutes);
    app.use('/client', clientRoutes);
    app.use('/vehicle', vehicleRoutes);
    app.use('/repair', repairRoutes);
    app.use('/worker', workerRoutes);
    app.use('/admin', adminRoutes);
    app.use('/rating', ratingRoutes);

    app.get('/', (req, res) => {
      res.send('¡El backend de EuroTaller está funcionando!');
    });

    app.listen(port, () => {
      console.log(`Servidor escuchando en http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("Falló al iniciar el servidor:", error);
  });
