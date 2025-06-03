import React, { createContext, useState, useEffect, useContext } from 'react';
import { toast } from 'sonner';

const AuthContext = createContext();
const VITE_API_URL = import.meta.env.VITE_API_URL;

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuth = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${VITE_API_URL}auth/me`, {
        credentials: 'include'
      });

      if (response.ok) {
        const userData = await response.json();
        // Verificar si el estado del usuario ha cambiado
        if (
          !user || 
          user.userId !== userData.userId || 
          user.role !== userData.role || 
          user.email !== userData.email
        ) {
          setUser(userData);
          setIsAuthenticated(true);
        }
      } else {
        // Solo actualizar estados y mostrar mensaje si el usuario estaba autenticado
        if (isAuthenticated || user) {
          setUser(null);
          setIsAuthenticated(false);
          if (response.status === 401) {
            toast.error('Sesión expirada');
          }
        }
      }
    } catch (error) {
      if (isAuthenticated || user) {
        setUser(null);
        setIsAuthenticated(false);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${VITE_API_URL}auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password })
      });

      let data;
      const textResponse = await response.text();
      try {
        data = JSON.parse(textResponse);
      } catch (e) {
        console.error('Error parsing response:', textResponse);
        throw new Error('Invalid server response');
      }

      if (response.ok && data.success) {
        setIsAuthenticated(true);
        setUser(data.user);
        toast.success('Inicio de sesión exitoso');
        return { success: true, user: data.user };
      } else {
        toast.error(data.message || 'Error de autenticación');
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Error de conexión');
      return { success: false, message: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await fetch(`${VITE_API_URL}auth/logout`, {
        method: 'POST',
        credentials: 'include'
      });
      setIsAuthenticated(false);
      setUser(null);
      toast.success('Sesión cerrada correctamente');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Error al cerrar sesión');
    }
  };

  const register = async (registrationData) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${VITE_API_URL}auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(registrationData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(`${registrationData.role === 'admin' ? 'Administrador' : 'Usuario'} registrado correctamente`);
        return { success: true, data };
      } else {
        toast.error(data.message || 'Error en el registro');
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('Error de conexión');
      return { success: false, message: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  // Mantener las funciones específicas de registro
  const registerClient = async (clientData) => {
    return register({ ...clientData, role: 'client' });
  };

  const registerWorker = async (workerData) => {
    return register({ ...workerData, role: 'worker' });
  };

  const registerAdmin = async (adminData) => {
    return register({ ...adminData, role: 'admin' });
  };

  // Añadir un interceptor para verificar la autenticación periódicamente
  useEffect(() => {
    const interval = setInterval(() => {
      if (isAuthenticated) {
        checkAuth();
      }
    }, 5 * 60 * 1000); // Verificar cada 5 minutos

    return () => clearInterval(interval);
  }, [isAuthenticated]);

  useEffect(() => {
    checkAuth();
  }, []);

  const value = {
    isAuthenticated,
    user,
    login,
    logout,
    isLoading,
    checkAuth,
    register,
    registerClient,
    registerWorker,
    registerAdmin,
    getRole: () => user?.role,
    getUserId: () => user?.userId
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }
  return context;
};