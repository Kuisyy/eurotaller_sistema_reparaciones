import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import tallerLogo from '../imgs/mechanic.png'; 

const LoginPage = ({ className }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const result = await login(email, password);
      
      if (result.success) {
        // Redirección basada en el rol
        if (result.role === 'client') {
          navigate('/client');
        } else if (result.role === 'worker') {
          navigate('/worker');
        } else if (result.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/'); // Redirección por defecto
        }
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

  return (
    <div
      className={
        "bg-[#f7f9fb] flex flex-col gap-0 items-center justify-center h-screen w-screen relative " +
        className
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
            <input
              type="password"
              className="bg-[#ffffff] rounded-lg border-solid border-[#e0e0e0] border pr-4 pl-4 flex flex-row gap-0 items-center justify-start self-stretch shrink-0 h-12 relative text-[#6e6e6e] text-left font-['Inter-Regular',_sans-serif] text-sm leading-[16.8px] font-normal relative"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
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