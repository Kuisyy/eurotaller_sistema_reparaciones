import React, { createContext, useState, useEffect, useContext } from 'react';
import { toast } from 'sonner';

const AuthContext = createContext();
const VITE_API_URL = import.meta.env.VITE_API_URL;

// Función auxiliar para obtener el token de las cookies
const getTokenFromCookies = () => {
  return document.cookie
    .split('; ')
    .find(cookie => cookie.startsWith('auth_token='))
    ?.split('=')[1];
};

const getUserFromLocalStorage = () => {
  try {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  } catch (error) {
    console.error("Error parsing user from localStorage:", error);
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [authError, setAuthError] = useState(null); // Para errores de autenticación/registro
  const [authSuccess, setAuthSuccess] = useState(null); // Para mensajes de éxito

  const checkAuth = async () => {
    setIsLoading(true);

    // Primero intentamos obtener el token de las cookies
    const token = getTokenFromCookies();

    // También verificamos si hay datos de usuario en localStorage
    const storedUser = getUserFromLocalStorage();

    // Si no hay token ni datos de usuario almacenados, no estamos autenticados
    if (!token && !storedUser) {
      setIsAuthenticated(false);
      setUser(null);
      setIsLoading(false);
      return;
    }

    // Si hay un token, verificamos con el servidor
    if (token) {
      try {
        const response = await fetch(`${VITE_API_URL}auth/check-auth`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          setIsAuthenticated(true);
          setUser({
            userId: data.userId,
            role: data.role,
            name: data.user,
            email: data.email
          });
          // Actualizar localStorage con los datos más recientes
          localStorage.setItem('user', JSON.stringify(data));
        } else {
          // Si la verificación falla, pero tenemos datos en localStorage,
          // podemos usar esos datos para mantener la sesión
          if (storedUser) {
            setIsAuthenticated(true);
            setUser(storedUser);
          } else {
            setIsAuthenticated(false);
            setUser(null);
            localStorage.removeItem('user');
          }
        }
      } catch (error) {
        console.error("Error checking auth:", error);
        // Si hay un error en la verificación pero tenemos datos almacenados,
        // usamos esos datos para mantener la sesión (modo offline)
        if (storedUser) {
          setIsAuthenticated(true);
          setUser(storedUser);
        } else {
          setIsAuthenticated(false);
          setUser(null);
          localStorage.removeItem('user');
        }
      }
    } else if (storedUser) {
      // Si no hay token pero hay datos en localStorage, restauramos la sesión
      setIsAuthenticated(true);
      setUser(storedUser);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    checkAuth(); // Verificar la autenticación al cargar el componente
  }, []);

  const login = async (email, password) => {
    setIsLoading(true);
    setAuthError(null); // Limpiar errores previos
    try {
      const response = await fetch(`${VITE_API_URL}auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      });

      const data = await response.json();

      if (response.ok) {
        const userData = {
          userId: data.user.userId,
          role: data.user.role,
          name: data.user.name,
          email: data.user.email,
        };

        setIsAuthenticated(true);
        setUser(userData);

        // Guardar en localStorage para recuperar la sesión después
        localStorage.setItem('user', JSON.stringify(userData));
        toast.success('Inicio de sesión exitoso');

        return { success: true, user: userData };
      } else {
        setAuthError(data.message || 'Error de autenticación');
        toast.error('Error de inicio de sesión: ' + (data.message || 'Error de autenticación'));
        return { success: false, message: data.message || 'Error de autenticación' };
      }
    } catch (error) {
      console.error("Login error:", error);
      setAuthError(error.message || 'Error en el servidor');
      toast.error('Error de inicio de sesión: ' + (error.message || 'Error en el servidor'));
      return { success: false, message: error.message || 'Error en el servidor' };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    // Eliminar cookie de autenticación
    document.cookie = "auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    // Eliminar datos de usuario del localStorage
    localStorage.removeItem('user');
    // Actualizar estado
    setIsAuthenticated(false);
    setUser(null);
    toast.success('Sesión cerrada correctamente');
  };

  const register = async (registrationData) => {
    setIsLoading(true);
    setAuthError(null);
    setAuthSuccess(null);
    
    try {
      const response = await fetch(`${VITE_API_URL}auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(registrationData),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Registro exitoso:', data);
        setAuthSuccess(`${registrationData.role === 'admin' ? 'Administrador' : 'Trabajador'} registrado correctamente.`);
        return { success: true, data };
      } else {
        setAuthError(data.message || 'Error en el registro.');
        return { success: false, message: data.message || 'Error en el registro.' };
      }
    } catch (error) {
      console.error("Registration error:", error);
      setAuthError(error.message || 'Error de conexión con el servidor.');
      return { success: false, message: error.message || 'Error de conexión con el servidor.' };
    } finally {
      setIsLoading(false);
    }
  };

  const registerClient = async (clientData) => {
    return register({ ...clientData, role: 'client' });
  };

  const registerWorker = async (workerData) => {
    return register({ ...workerData, role: 'worker' });
  };

  const registerAdmin = async (adminData) => {
    return register({ ...adminData, role: 'admin' });
  };

  const value = {
    isAuthenticated,
    user,
    login,
    logout,
    isLoading,
    checkAuth,
    register,        // Función general de registro
    registerClient,  // Función específica para clientes
    registerWorker,  // Función específica para trabajadores
    registerAdmin,   // Función específica para administradores
    authError,
    authSuccess,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para usar el contexto de autenticación
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("UseAuth must be used within an AuthProvider");
  }
  return context;
};