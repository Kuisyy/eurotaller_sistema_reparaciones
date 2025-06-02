import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import tallerLogo from '../imgs/mechanic.png';
import { 
  FiTool, 
  FiPlusCircle, 
  FiUserPlus, 
  FiTruck,
  FiLogOut 
} from 'react-icons/fi';

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
          {/* Sección de Reparaciones */}
          <div className="text-[#6e6e6e] text-xs font-semibold mt-4">
            REPARACIONES
          </div>
          <Link
            to="/worker/repairs"
            className={`rounded px-3 flex items-center h-10 gap-3 ${isActive('/worker/repairs')}`}
          >
            <FiTool className="w-4 h-4" />
            <span className="text-sm">Ver Reparaciones</span>
          </Link>
          <Link
            to="/worker/create-repair"
            className={`rounded px-3 flex items-center h-10 gap-3 ${isActive('/worker/create-repair')}`}
          >
            <FiPlusCircle className="w-4 h-4" />
            <span className="text-sm">Crear Reparación</span>
          </Link>

          {/* Sección de Vehículos */}
          <div className="text-[#6e6e6e] text-xs font-semibold mt-4">
            VEHÍCULOS
          </div>
          <Link
            to="/worker/vehicles"
            className={`rounded px-3 flex items-center h-10 gap-3 ${isActive('/worker/vehicles')}`}
          >
            <FiTruck className="w-4 h-4" />
            <span className="text-sm">Ver Vehículos</span>
          </Link>
          <Link
            to="/worker/create-vehicle"
            className={`rounded px-3 flex items-center h-10 gap-3 ${isActive('/worker/create-vehicle')}`}
          >
            <FiTruck className="w-4 h-4" />
            <span className="text-sm">Crear Vehículo</span>
          </Link>

          {/* Sección de Clientes */}
          <div className="text-[#6e6e6e] text-xs font-semibold mt-4">
            CLIENTES
          </div>
          <Link
            to="/worker/create-client"
            className={`rounded px-3 flex items-center h-10 gap-3 ${isActive('/worker/create-client')}`}
          >
            <FiUserPlus className="w-4 h-4" />
            <span className="text-sm">Crear Cliente</span>
          </Link>
        </div>
      </div>

      <div className="p-4 border-t border-[#e0e0e0] space-y-4">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 text-[#6e6e6e] hover:text-[#005bac] transition-colors duration-300 px-3 py-2 rounded"
        >
          <FiLogOut className="w-4 h-4" />
          <span className="text-sm">Cerrar sesión</span>
        </button>
      </div>
    </div>
  );
};
