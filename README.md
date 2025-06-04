# API EuroTaller

## Descripción
APPpara la gestión de un taller de reparación de vehículos, que permite administrar usuarios, clientes, trabajadores, vehículos, reparaciones y valoraciones.

## 🚀 Características
- Autenticación JWT mediante cookies
- Gestión completa de usuarios (clientes y trabajadores)
- Control de vehículos y reparaciones
- Sistema de valoraciones
- Arquitectura REST
- Frontend en React con Tailwind CSS
- Responsive

## 📋 Requisitos
- Node.js >= 14.x
- PostgreSQL
- NPM o Yarn
- Docker y Docker Compose (opcional)

## 🛠️ Instalación

### Opción 1: Con Docker Compose (Recomendado)

```bash
# Clonar repositorio
git clone [URL_DEL_REPOSITORIO]
cd eurotaller-api

# Ejecutar con Docker Compose
docker-compose up -d

# La aplicación estará disponible en http://localhost:3000
# PostgreSQL estará disponible en localhost:5432
```

### Opción 2: Instalación Manual

```bash
# Clonar repositorio
git clone [URL_DEL_REPOSITORIO]
cd eurotaller-api

# Instalar dependencias en el backend
cd backend
npm install

# Instalar dependencias en el frontend
cd ../frontend
npm install

# Volver al directorio raíz
cd ..

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tus configuraciones de PostgreSQL

# Configuración del Backend (.env en /backend)
# Crear archivo .env en la carpeta backend con:
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=luis123
DB_NAME=eurotaller
JWT_SECRET=luisjwt
EMAIL_USER=eurotallerjoseluis@gmail.com
EMAIL_APP_PASSWORD=lvkk chgv gpre vsje

# Configuración del Frontend (.env en /frontend)
# Crear archivo .env en la carpeta frontend con:
VITE_API_URL=http://localhost:5000/

# Configurar base de datos PostgreSQL
# Crear base de datos 'eurotaller' en PostgreSQL
# Ejecutar migraciones (si aplica)
cd backend
npm run migrate

# Iniciar servidor backend
npm run dev

# En otra terminal, iniciar frontend
cd frontend
npm run dev
```

### Configuración de Variables de Entorno

#### Backend (.env en /backend)
```bash
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=luis123
DB_NAME=eurotaller
JWT_SECRET=luisjwt
EMAIL_USER=eurotallerjoseluis@gmail.com
EMAIL_APP_PASSWORD=lvkk chgv gpre vsje
```

#### Frontend (.env en /frontend)
```bash
VITE_API_URL=http://localhost:5000/
```

### Configuración de Base de Datos

Asegúrate de tener PostgreSQL instalado y crear la base de datos:

```sql
CREATE DATABASE eurotaller;
CREATE USER eurotaller_user WITH ENCRYPTED PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE eurotaller TO eurotaller_user;
```

## 🔑 Autenticación

Todos los endpoints (excepto login y registro) requieren autenticación mediante JWT almacenado en cookie.

### Headers requeridos
```
Content-Type: application/json
Cookie: jwt=your_jwt_token_here
```

## 📚 Endpoints de la API

### 🔐 Autenticación

#### Iniciar Sesión
```http
POST /auth/login
```

**Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Respuesta Exitosa (200):**
```json
{
  "message": "Login exitoso",
  "user": {
    "userId": "1",
    "role": "client",
    "name": "John Doe",
    "email": "user@example.com"
  }
}
```

#### Registro de Usuario
```http
POST /auth/register
```

**Body para Cliente:**
```json
{
  "name": "Juan Pérez",
  "email": "juan@example.com",
  "password": "password123",
  "role": "client",
  "nif": "12345678A",
  "phone": "911234567",
  "address": "Calle Principal 1",
  "postal_code": "28001",
  "city": "Madrid",
  "province": "Madrid",
  "country": "España"
}
```

**Body para Trabajador:**
```json
{
  "name": "Pedro Técnico",
  "email": "pedro@taller.com",
  "password": "password123",
  "role": "worker",
  "worker_role": "Mecánico",
  "speciality": "Electricidad"
}
```

**Respuesta Exitosa (201):**
```json
{
  "user": {
    "user_id": "1",
    "name": "Juan Pérez",
    "email": "juan@example.com",
    "role": "client"
  },
  "roleResult": {
    "client_id": "1"
    // datos específicos del rol
  }
}
```

#### Verificar Sesión
```http
GET /auth/me
```

**Respuesta (200):**
```json
{
  "userId": "1",
  "role": "client",
  "name": "John Doe",
  "email": "user@example.com"
}
```

#### Cerrar Sesión
```http
POST /auth/logout
```

**Respuesta (200):**
```json
{
  "message": "Logout exitoso"
}
```

---

## 👥 Usuarios

#### Listar Todos los Usuarios
```http
GET /user/all
```
**Autorización:** Requiere rol Admin

**Respuesta (200):**
```json
[
  {
    "user_id": "1",
    "name": "Juan Pérez",
    "email": "juan@example.com",
    "role": "client",
    "isActive": true
  }
]
```

#### Obtener Usuario por ID
```http
GET /user/:userId
```
**Parámetros URL:**
- `userId` (number) - ID del usuario

**Respuesta (200):**
```json
{
  "user_id": "1",
  "name": "Juan Pérez",
  "email": "juan@example.com",
  "role": "client",
  "isActive": true,
  "created_at": "2024-01-01T00:00:00.000Z",
  "updated_at": "2024-01-01T00:00:00.000Z",
  "client_data": {
    "client_id": "1",
    "nif": "12345678A",
    "phone": "911234567",
    "address": "Calle Principal 1",
    "postal_code": "28001",
    "city": "Madrid",
    "province": "Madrid",
    "country": "España"
  }
}
```

#### Actualizar Usuario
```http
PUT /user/update/:userId
```
**Parámetros URL:**
- `userId` (number) - ID del usuario

**Body:**
```json
{
  "name": "Juan Pérez Actualizado",
  "email": "juan.nuevo@example.com"
}
```

#### Eliminar Usuario
```http
DELETE /user/:userId
```
**Parámetros URL:**
- `userId` (number) - ID del usuario

**Respuesta (200):**
```json
{
  "message": "Usuario eliminado correctamente"
}
```

## 🧑‍🤝‍🧑 Clientes

*Documentación pendiente de completar*

## 👷 Trabajadores

#### Obtener Información Personal
```http
GET /worker/me
```
**Descripción:** Obtiene la información del trabajador autenticado

#### Listar Todos los Trabajadores
```http
GET /worker/all
```

#### Obtener Trabajador por ID
```http
GET /worker/:workerId
```
**Parámetros URL:**
- `workerId` (number) - ID del trabajador

#### Actualizar Trabajador
```http
PUT /worker/update/:workerId
```
**Parámetros URL:**
- `workerId` (number) - ID del trabajador

## 🚗 Vehículos

#### Listar Todos los Vehículos
```http
GET /vehicle/all
```

**Respuesta (200):**
```json
[
  {
    "vehicle_id": "1",
    "client_id": "1",
    "brand": "Toyota",
    "model": "Corolla",
    "registration_number": "1234ABC"
  }
]
```

#### Crear Vehículo
```http
POST /vehicle/create
```

**Body:**
```json
{
  "client_id": "1",
  "brand": "Toyota",
  "model": "Corolla",
  "registration_number": "1234ABC",
  "vin": "1HGCM82633A123456",
  "engine_type": "Gasolina",
  "engine_code": "1ZZ-FE",
  "year_of_manufacture": 2020,
  "mileage": 50000,
  "color": "Azul",
  "fuel_type": "Gasolina",
  "notes": "Vehículo en buen estado"
}
```

#### Obtener Vehículo por ID
```http
GET /vehicle/:id
```
**Parámetros URL:**
- `id` (number) - ID del vehículo

#### Obtener Vehículos por Cliente
```http
GET /vehicle/client/:id
```
**Parámetros URL:**
- `id` (number) - ID del cliente

#### Actualizar Vehículo
```http
PUT /vehicle/update/:id
```
**Parámetros URL:**
- `id` (number) - ID del vehículo

#### Eliminar Vehículo
```http
DELETE /vehicle/:id
```
**Parámetros URL:**
- `id` (number) - ID del vehículo

## 🔧 Reparaciones

#### Listar Todas las Reparaciones
```http
GET /repair/all
```

#### Crear Reparación
```http
POST /repair/create
```

**Body:**
```json
{
  "vehicle_id": "1",
  "worker_id": "2",
  "description": "Cambio de aceite",
  "status": "Pendiente",
  "notes": "Cliente solicita revisión completa"
}
```

#### Obtener Reparación por ID
```http
GET /repair/:id
```
**Parámetros URL:**
- `id` (number) - ID de la reparación

#### Obtener Reparaciones por Cliente
```http
GET /repair/client/:client_id
```
**Parámetros URL:**
- `client_id` (number) - ID del cliente

#### Obtener Reparaciones por Vehículo
```http
GET /repair/vehicle/:vehicle_id
```
**Parámetros URL:**
- `vehicle_id` (number) - ID del vehículo

#### Obtener Reparaciones por Usuario
```http
GET /repair/user/:user_id
```
**Parámetros URL:**
- `user_id` (number) - ID del usuario

#### Actualizar Reparación
```http
PUT /repair/update/:id
```
**Parámetros URL:**
- `id` (number) - ID de la reparación

**Body:**
```json
{
  "status": "En curso",
  "notes": "Se detectaron problemas adicionales"
}
```

#### Eliminar Reparación
```http
DELETE /repair/:id
```
**Parámetros URL:**
- `id` (number) - ID de la reparación

## ⭐ Valoraciones

*Documentación pendiente de completar*

---

## 📝 Códigos de Estado HTTP

| Código | Descripción |
|--------|-------------|
| 200 | Operación exitosa |
| 201 | Recurso creado exitosamente |
| 400 | Solicitud incorrecta |
| 401 | No autorizado |
| 403 | Prohibido |
| 404 | Recurso no encontrado |
| 500 | Error interno del servidor |

## 🐛 Manejo de Errores

Las respuestas de error siguen el siguiente formato:

```json
{
  "error": "Descripción del error",
  "message": "Mensaje detallado del error",
  "status": 400
}
```

## 🧪 Testing

```bash
# Ejecutar tests
npm test

# Ejecutar tests con coverage
npm run test:coverage
```

## 📁 Estructura del Proyecto

```
eurotaller-api/
├── src/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── utils/
├── tests/
├── docs/
├── .env.example
├── package.json
└── README.md
```

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)  
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia [TIPO_DE_LICENCIA] - ver el archivo [LICENSE](LICENSE) para más detalles.

## 📞 Contacto

- **Proyecto:** EuroTaller API
- **Desarrollador:** [Tu Nombre]
- **Email:** [tu@email.com]
- **Repositorio:** [URL_DEL_REPOSITORIO]

---

<!-- Copilot: completar documentación de endpoints faltantes basándose en la estructura de autenticación mostrada -->
<!-- TODO: Añadir documentación completa para todos los endpoints de usuarios, clientes, trabajadores, vehículos, reparaciones y valoraciones -->
<!-- Generar ejemplos de uso para cada endpoint con curl y respuestas de error -->
