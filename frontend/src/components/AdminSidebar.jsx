import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import tallerLogo from '../imgs/mechanic.png';
import { 
  FiUsers, 
  FiUserPlus, 
  FiTool, 
  FiPlusCircle, 
  FiTruck,
  FiLogOut 
} from 'react-icons/fi';

export const AdminSidebar = () => {
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
    <div className="bg-[#ffffff] border-solid border-[#e0e0e0] border-r flex flex-col h-full w-64 overflow-y-auto">
      <div>
        <div className="bg-[#005bac] px-4 flex items-center h-16">
          <img className="w-7 h-7" src={tallerLogo} alt="Logo" />
          <div className="text-[#ffffff] text-base font-bold ml-3">
            EuroTaller Admin
          </div>
        </div>

        <nav className="p-4 flex flex-col gap-1">
          {/* Sección Usuarios */}
          <div className="text-[#6e6e6e] text-xs font-semibold mb-2">
            USUARIOS
          </div>
          <Link
            to="/admin/users"
            className={`rounded px-3 py-2 flex items-center gap-3 ${isActive('/admin/users')}`}
          >
            <FiUsers className="w-4 h-4 shrink-0" />
            <span className="text-sm truncate">Gestionar Usuarios</span>
          </Link>
          <Link
            to="/admin/create-user"
            className={`rounded px-3 py-2 flex items-center gap-3 ${isActive('/admin/create-user')}`}
          >
            <FiUserPlus className="w-4 h-4 shrink-0" />
            <span className="text-sm truncate">Crear Usuario</span>
          </Link>

          {/* Sección Reparaciones */}
          <div className="text-[#6e6e6e] text-xs font-semibold mt-4 mb-2">
            REPARACIONES
          </div>
          <Link
            to="/admin/repairs"
            className={`rounded px-3 py-2 flex items-center gap-3 ${isActive('/admin/repairs')}`}
          >
            <FiTool className="w-4 h-4 shrink-0" />
            <span className="text-sm truncate">Ver Reparaciones</span>
          </Link>
          <Link
            to="/admin/create-repair"
            className={`rounded px-3 py-2 flex items-center gap-3 ${isActive('/admin/create-repair')}`}
          >
            <FiPlusCircle className="w-4 h-4 shrink-0" />
            <span className="text-sm truncate">Crear Reparación</span>
          </Link>

          {/* Sección Vehículos */}
          <div className="text-[#6e6e6e] text-xs font-semibold mt-4 mb-2">
            VEHÍCULOS
          </div>
          <Link
            to="/admin/vehicles"
            className={`rounded px-3 py-2 flex items-center gap-3 ${isActive('/admin/vehicles')}`}
          >
            <FiTruck className="w-4 h-4 shrink-0" />
            <span className="text-sm truncate">Ver Vehículos</span>
          </Link>
          <Link
            to="/admin/create-vehicle"
            className={`rounded px-3 py-2 flex items-center gap-3 ${isActive('/admin/create-vehicle')}`}
          >
            <FiPlusCircle className="w-4 h-4 shrink-0" />
            <span className="text-sm truncate">Crear Vehículo</span>
          </Link>
        </nav>
      </div>

      <div className="mt-auto p-4 border-t border-[#e0e0e0]">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 text-[#6e6e6e] hover:text-[#005bac] 
          transition-colors duration-300 px-3 py-2 rounded"
        >
          <FiLogOut className="w-4 h-4 shrink-0" />
          <span className="text-sm truncate">Cerrar sesión</span>
        </button>
      </div>
    </div>
  );
};