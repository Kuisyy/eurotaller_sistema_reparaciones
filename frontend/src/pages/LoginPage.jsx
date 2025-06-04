import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import tallerLogo from '../imgs/mechanic.png';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import LoadingSpinner from '../components/LoadingSpinner';


const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { login, user, isAuthenticated, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();

  // Efecto para redirigir si el usuario ya está autenticado
  useEffect(() => {
    if (!authLoading && isAuthenticated && user) {
      redirectBasedOnRole(user.role);
    }
  }, [isAuthenticated, user, authLoading, navigate]);

  // Función para manejar la redirección basada en el rol
  const redirectBasedOnRole = (role) => {
    switch (role) {
      case 'client':
        navigate('/client', { replace: true });
        break;
      case 'worker':
        navigate('/worker', { replace: true });
        break;
      case 'admin':
        navigate('/admin', { replace: true });
        break;
      default:
        navigate('/', { replace: true });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const result = await login(email, password);
      
      if (result.success) {
        // Si el login es exitoso, redirigimos basado en el rol del usuario
        redirectBasedOnRole(result.user.role);
      } else {
        setError(result.message || 'Error al iniciar sesión. Por favor, verifica tus credenciales.');
      }
    } catch (error) {
      console.error('Error en el login:', error);
      setError('Ocurrió un error durante el inicio de sesión');
    } finally {
      setIsLoading(false);
    }
  };

  // Mostrar un indicador de carga mientras se verifica la autenticación
  if (authLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <div className="spinner"></div>
          <p className="mt-4">Verificando sesión...</p>
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  return (
    <div
      className={
        "bg-[#f7f9fb] flex flex-col gap-0 items-center justify-center h-screen w-screen relative "
      }
    >
      <div
        className="bg-[#ffffff] rounded-xl p-8 flex flex-col gap-6 items-start justify-start shrink-0 w-[420px] relative"
        style={{ boxShadow: "0px 4px 20px 0px rgba(0, 0, 0, 0.06)" }}
      >
        <div className="flex flex-col gap-2 items-center justify-center self-stretch shrink-0 relative">
          <div className="flex flex-row gap-3 items-center justify-center self-stretch shrink-0 relative">
            <img
              className="shrink-0 w-7 h-7 relative overflow-visible"
              src={tallerLogo}
              alt="Logo del taller"
            />
            <div className="text-[#005bac] text-left font-['Inter-Bold',_sans-serif] text-2xl leading-[28.8px] font-bold relative">
              EuroTaller{" "}
            </div>
          </div>
          <div className="text-[#6e6e6e] text-center font-['Inter-Regular',_sans-serif] text-base leading-[19.2px] font-normal relative self-stretch">
            Accede a tu cuenta{" "}
          </div>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 items-start justify-start self-stretch shrink-0 relative">
          <div className="flex flex-col gap-2 items-start justify-start self-stretch shrink-0 relative">
            <div className="text-[#2c2c2c] text-left font-['Inter-Medium',_sans-serif] text-sm leading-[16.8px] font-medium relative self-stretch">
              Correo electrónico{" "}
            </div>
            <input
              type="email"
              className="bg-[#ffffff] rounded-lg border-solid border-[#e0e0e0] border pr-4 pl-4 flex flex-row gap-0 items-center justify-start self-stretch shrink-0 h-12 relative text-[#6e6e6e] text-left font-['Inter-Regular',_sans-serif] text-sm leading-[16.8px] font-normal relative"
              placeholder="ejemplo@correo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col gap-2 items-start justify-start self-stretch shrink-0 relative">
            <div className="text-[#2c2c2c] text-left font-['Inter-Medium',_sans-serif] text-sm leading-[16.8px] font-medium relative self-stretch">
              Contraseña{" "}
            </div>
            <div className="relative w-full">
              <input
                type={showPassword ? 'text' : 'password'}
                className="w-full bg-[#ffffff] rounded-lg border-solid border-[#e0e0e0] border pr-12 pl-4 h-12 text-[#6e6e6e] text-left font-['Inter-Regular',_sans-serif] text-sm leading-[16.8px] font-normal"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2"
                aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
              >
                {showPassword ? <FiEyeOff className="text-[#005bac]" /> : <FiEye className="text-[#005bac]" />}
              </button>
            </div>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="bg-[#005bac] rounded-lg flex flex-row gap-0 items-center justify-center self-stretch shrink-0 h-12 relative hover:bg-[#004d91] transition-colors duration-300"
          >
            <div className="text-[#ffffff] text-left font-['Inter-SemiBold',_sans-serif] text-base leading-[19.2px] font-semibold relative">
              {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}{" "}
            </div>
          </button>
          {error && (
            <div className="text-red-500 text-center font-['Inter-Regular',_sans-serif] text-sm leading-[16.8px] font-normal relative self-stretch">
              {error}
            </div>
          )}
          <div className="text-[#0082c8] text-center font-['Inter-Regular',_sans-serif] text-sm leading-[16.8px] font-normal relative self-stretch">
            Si no puedes acceder a tu cuenta, por favor contacta con el taller.
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;