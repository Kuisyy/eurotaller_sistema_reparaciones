import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();
const VITE_BASE_DB_URL = import.meta.env.VITE_BASE_DB_URL;

// Función auxiliar para obtener el token de las cookies
const getTokenFromCookies = () => {
  return document.cookie
    .split('; ')
    .find(cookie => cookie.startsWith('auth_token='))
    ?.split('=')[1];
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Cargar el estado desde localStorage si está disponible
  useEffect(() => {
    const token = getTokenFromCookies();
    const storedUser = localStorage.getItem('user'); // Se carga desde localStorage si existe

    if (token && storedUser) {
      setIsAuthenticated(true);
      setUser(JSON.parse(storedUser)); // Poner los datos del usuario en el estado
    }
    setIsLoading(false);
  }, []);

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${VITE_BASE_DB_URL}auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      });
  
      const data = await response.json();
  
      if (response.ok) {
        setIsAuthenticated(true);
        setUser({
          userId: data.user.user_id,
          role: data.user.role,
          name: data.user.name,
          email: data.user.email,
        });
        localStorage.setItem('user', JSON.stringify(data.user)); // Guardar en localStorage
        return { success: true, role: data.user.role };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      return { success: false, message: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    document.cookie = 'auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    localStorage.removeItem('user'); // Limpiar localStorage al cerrar sesión
    setIsAuthenticated(false);
    setUser(null);
  };

  const value = {
    isAuthenticated,
    user,
    login,
    logout,
    isLoading
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
