import jwt from 'jsonwebtoken';
import { configDotenv } from 'dotenv';

configDotenv();

const JWT_SECRET = process.env.JWT_SECRET;

const authenticateToken = (req, res, next) => {
  const token = req.cookies.auth_token;

  if (!token) {
    return res.status(401).json({ 
      message: 'No autorizado - Sesión no iniciada' 
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; 
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      res.clearCookie('auth_token');
      return res.status(401).json({ 
        message: 'Sesión expirada' 
      });
    }
    return res.status(403).json({ 
      message: 'Token inválido' 
    });
  }
};

export default authenticateToken;
