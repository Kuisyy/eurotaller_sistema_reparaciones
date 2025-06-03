import express from 'express';
import cors from 'cors';
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
import SeedData from './src/models/schemas/seed_data.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://eurotallerfrontend-production.up.railway.app'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['*', 'Authorization'],
}));

app.use(cookieParser());
app.use(express.json());

async function createTables() {
  try {
    console.log('Creando tablas...');
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

async function initializeDatabase() {
  try {
    await createTables();
    
    console.log('Creando datos iniciales...');
    await SeedData.createInitialData();
    
  } catch (error) {
    console.error("Error al inicializar la base de datos:", error);
    throw error;
  }
}

initializeDatabase()
  .then(() => {
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
    process.exit(1); 
  });