import jwt from 'jsonwebtoken';
import { configDotenv } from 'dotenv';

configDotenv();

const JWT_SECRET = process.env.JWT_SECRET; 

const authenticateToken = (req, res, next) => {
  // Obtener el token del encabezado de la solicitud
  const token = req.headers['authorization']?.split(' ')[1];  // El formato esperado es "Bearer <token>"

  if (!token) {
    return res.status(401).json({ message: 'Acceso denegado. No se proporcionó token' });
  }

  // Verificar y decodificar el token
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Token no válido' });
    }

    // Adjuntar el payload decodificado al request para poder usarlo en las rutas
    req.user = decoded;
    next();  // Llamar al siguiente middleware o controlador
  });
};

export default authenticateToken;
