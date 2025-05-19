import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import tallerLogo from '../imgs/mechanic.png';

export const WorkerSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const isActive = (path) => {
    return location.pathname === path ? 'bg-[#e6f0f9] text-[#005bac]' : 'text-[#6e6e6e]';
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="bg-[#ffffff] border-solid border-[#e0e0e0] border-r flex flex-col justify-between w-60 h-screen">
      <div>
        <div className="bg-[#005bac] pr-4 pl-4 flex flex-row gap-3 items-center h-16">
          <img className="w-7 h-7" src={tallerLogo} alt="Logo" />
          <div className="text-[#ffffff] text-base font-bold">
            EuroTaller
          </div>
        </div>

        <div className="p-4 flex flex-col gap-1">
          <div className="text-[#6e6e6e]  text-xs font-semibold">
            GESTIÓN
          </div>

          <Link
            to="/worker/repairs"
            className={`rounded px-3 flex items-center h-10 ${isActive('/worker/repair')}`}
          >
            <span className="text-sm">Ver Reparaciones</span>
          </Link>

          <Link
            to="/worker/create-repair"
            className={`rounded px-3 flex items-center h-10 ${isActive('/worker/create-repair')}`}
          >
            <span className=" text-sm">Crear reparacion</span>
          </Link>

          <Link
            to="/worker/create-client"
            className={`rounded px-3 flex items-center h-10 ${isActive('/worker/create-client')}`}
          >
            <span className=" text-sm">Crear cliente</span>
          </Link>

          <Link
            to="/worker/create-vehicle"
            className={`rounded px-3 flex items-center h-10 ${isActive('/worker/crear-vehiculo')}`}
          >
            <span className=" text-sm">Crear Vehiculo</span>
          </Link>
        </div>
      </div>

      <div className="p-4 border-t border-[#e0e0e0] space-y-4">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2 text-[#6e6e6e] hover:text-[#005bac] transition-colors duration-300 px-3 py-2 rounded"
        >
          <svg 
            className="w-4 h-4" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          <span className=" text-sm">Cerrar sesión</span>
        </button>
      </div>
    </div>
  );
};
