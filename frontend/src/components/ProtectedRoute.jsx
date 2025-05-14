import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, user, isLoading } = useAuth();
  const location = useLocation();

  // Mientras se carga el estado de autenticación, mostramos un loader o nada
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#005bac]"></div>
      </div>
    );
  }

  // Si no está autenticado, redirigir al login guardando la ubicación actual
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Si el rol no está permitido, redirigir a una página por defecto
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  // Si todo está bien, renderizar el contenido
  return children;
};

export default ProtectedRoute;
