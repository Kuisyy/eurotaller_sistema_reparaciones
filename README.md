# eurotaller_sistema_reparaciones
Sistema web de gestión para EuroTaller, desarrollado para registrar vehículos, clientes y reparaciones. 

Aquí tienes un ejemplo de cómo se verían los datos JSON que se envían al backend para crear un usuario, según el rol:

Crear un Cliente
{
  "name": "Luis Pérez",
  "email": "luis.perez@example.com",
  "password": "miContraseñaSegura",
  "role": "client",
  "address": "Calle Falsa, 123",
  "postal_code": "12345",
  "city": "Ejemploville",
  "province": "Ejemploprovincia",
  "country": "España",
  "nif": "12345678X",
  "phone": "911223344"
}

Crear un Trabajador
{
  "name": "María García",
  "email": "maria.garcia@example.com",
  "password": "otraContraseñaSegura",
  "role": "worker",
  "worker_role": "Mecánico",
  "hire_date": "2023-01-15"
}

Crear un Administrador
{
  "name": "Javier López",
  "email": "javier.lopez@example.com",
  "password": "contrasenaAdmin",
  "role": "admin",
  "level": 1
}

En el ejemplo, el campo "role" especifica el rol del usuario que se va a crear, y los campos subsiguientes, como "address", "postal_code", "worker_role", y "level", proporcionan detalles específicos para cada rol.