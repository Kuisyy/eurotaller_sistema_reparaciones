import jwt from 'jsonwebtoken';
import { configDotenv } from 'dotenv';
import bcrypt from 'bcryptjs';
import userModel from '../models/user_model.js';  
import { getUserType } from '../helpers/user_helper.js';  

configDotenv();

const JWT_SECRET = procces.env.JWT_SECRET;

// Controlador de login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Verificar si el usuario existe
    const user = await userModel.getUserByEmail(email); // Ajusta el modelo según sea necesario
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // 2. Verificar la contraseña (compara la contraseña ingresada con el hash almacenado)
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    // 3. Obtener el tipo de usuario (cliente, trabajador, administrador)
    const userType = await getUserType(user.user_id);
    if (!userType) {
      return res.status(404).json({ message: 'Tipo de usuario no encontrado' });
    }

    // 4. Crear el JWT
    const payload = {
      user_id: user.user_id,
      user_type: userType,  // El tipo de usuario se pasa al payload
    };

    const options = {
      expiresIn: '24h', // El token expirará en 1 hora
    };

    // Firmar el token (esto crea el JWT)
    const token = jwt.sign(payload, JWT_SECRET, options);

    // 5. Enviar el token en la respuesta
    return res.status(200).json({
      message: 'Login exitoso',
      token,  // El token se envía al cliente
      user: {
        user_id: user.user_id,
        name: user.name,
        email: user.email,
        user_type: userType,  // Devolver también el tipo de usuario
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error en el servidor' });
  }
};

// Controlador de register
const register = async (req, res) => {
  try {
    // Primero obtenemos el token del header de la solicitud
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(403).json({ message: 'No autorizado, token no encontrado' });
    }

    // Decodificamos el token para obtener la información del usuario (user_id, user_type)
    const decoded = jwt.verify(token, JWT_SECRET);
    const { user_id, user_type } = decoded;  // Estos valores deben estar en el payload del JWT

    // 1. Comprobamos si el usuario tiene un rol de trabajador o administrador
    if (user_type !== 'worker' && user_type !== 'admin') {
      return res.status(403).json({ message: 'No autorizado, solo trabajadores y administradores pueden registrar usuarios' });
    }

    // 2. Extraemos los datos de la solicitud
    const { name, email, password, role, additionalDetails } = req.body; // Esperamos estos datos en el cuerpo de la solicitud

    // 3. Verificar si el correo ya está registrado
    const existingUser = await userModel.getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'El correo ya está registrado' });
    }

    // 4. Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10); // Encriptamos la contraseña con 10 rondas de sal

    // 5. Crear el nuevo usuario (sin rol, solo el usuario básico)
    const newUser = await userModel.createUser({ name, email, password: hashedPassword });

    let createdRole;
    // 6. Si es un trabajador, el nuevo usuario será un cliente por defecto
    if (user_type === 'worker') {
      // El trabajador crea clientes, por defecto asignamos el rol de "cliente"
      createdRole = await clientModel.createClient({
        user_id: newUser.user_id,
        ...additionalDetails  // Detalles adicionales del cliente (como dirección, teléfono, etc.)
      });
    }
    
    // 7. Si el usuario es un administrador, puede elegir el rol
    if (user_type === 'admin') {
      if (role !== 'client' && role !== 'worker' && role !== 'admin') {
        return res.status(400).json({ message: 'Rol no válido, debe ser "client", "worker" o "admin"' });
      }

      // Si es un cliente
      if (role === 'client') {
        createdRole = await clientModel.createClient({
          user_id: newUser.user_id,
          ...additionalDetails  // Detalles adicionales del cliente
        });
      }
      
      // Si es un trabajador
      if (role === 'worker') {
        createdRole = await workerModel.createWorker({
          user_id: newUser.user_id,
          role: 'worker', // El rol será siempre "worker"
          hire_date: new Date(),  // Suponemos que los trabajadores son contratados en el momento de la creación
        });
      }
      
      // Si es un administrador, no es necesario hacer nada más, ya que solo almacenamos al usuario.
      if (role === 'admin') {
        // El administrador no necesita más detalles, ya que no registramos administradores de esta manera.
        // Podrías agregar más detalles si lo consideras necesario, pero aquí lo dejamos tal cual.
      }
    }

    // 8. Obtener el tipo de usuario
    const userType = await getUserType(newUser.user_id);
    if (!userType) {
      return res.status(404).json({ message: 'Tipo de usuario no encontrado' });
    }

    // 9. Crear el JWT
    const payload = {
      user_id: newUser.user_id,
      user_type: userType,  // El tipo de usuario se pasa al payload
    };

    const options = {
      expiresIn: '24h', // El token expirará en 1 hora
    };

    const newToken = jwt.sign(payload, JWT_SECRET, options);

    // 10. Enviar el token y la información del nuevo usuario en la respuesta
    return res.status(201).json({
      message: 'Usuario registrado con éxito',
      token: newToken,  // El token JWT
      user: {
        user_id: newUser.user_id,
        name: newUser.name,
        email: newUser.email,
        user_type: userType,  // Devolver también el tipo de usuario
      },
      role: createdRole || null,  // Devolver la información del rol creado (cliente, trabajador, etc.)
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error en el servidor' });
  }
};
export default { login, register };
