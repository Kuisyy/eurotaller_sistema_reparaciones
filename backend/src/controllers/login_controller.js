import jwt from 'jsonwebtoken';
import userModel from '../models/user_model';  
import bcrypt from 'bcryptjs';
import { getUserType } from '../utils/userUtils';  // Ajusta si usas una utilidad para obtener el tipo

const JWT_SECRET = 'tu_clave_secreta';  // Cambia esto por una clave secreta robusta y guárdala en un archivo .env

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

    // Opciones del token (por ejemplo, expiración del token)
    const options = {
      expiresIn: '1h', // El token expirará en 1 hora
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

export default { login };
