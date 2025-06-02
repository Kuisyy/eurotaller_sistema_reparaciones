import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import useClientData from '../hooks/useClientData';
import tallerLogo from '../imgs/mechanic.png';
import RepairCard from '../components/RepairCard';
import { toast } from 'sonner';
import LoadingSpinner from '../components/LoadingSpinner';

const ClientPage = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { 
    repairs, 
    loading, 
    error, 
    filterStatus, 
    setFilterStatus 
  } = useClientData();

  // Lista de estados posibles
  const statusOptions = ['all', 'Pendiente', 'En curso', 'Finalizado'];

  // Filtrar reparaciones según el estado seleccionado
  const filteredRepairs = repairs.filter(repair => {
    return filterStatus === 'all' || repair.status === filterStatus;
  });

  if (loading) return <LoadingSpinner />;

  const handleLogout = () => {
    logout();
    navigate('/login');
    toast.success('Sesión cerrada correctamente');
  };

  return (
    <div className="min-h-screen bg-[#f7f9fb] flex flex-col">
      {/* Header - Responsive */}
      <div className="bg-[#005bac] px-4 md:px-6 flex items-center justify-between h-16">
        {/* Logo section */}
        <div className="flex items-center gap-3">
          <img
            className="w-7 h-7"
            src={tallerLogo}
            alt="Logo del taller"
          />
          <div className="text-white font-bold text-base md:text-lg">
            EuroTaller
          </div>
        </div>

        {/* Logout button */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-[#0082c8] hover:bg-[#006da8] 
          transition-colors duration-300 rounded-lg px-3 md:px-4 py-2 text-white text-sm"
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
          <span className="hidden sm:inline">Salir</span>
        </button>
      </div>

      {/* Content - Responsive padding and layout */}
      <div className="p-4 md:p-8 flex flex-col gap-6 flex-grow">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h2 className="text-xl md:text-2xl font-bold text-[#2c2c2c]">
              Mis Reparaciones
            </h2>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 w-full sm:w-auto">
              <span className="text-[#6e6e6e] text-sm whitespace-nowrap">
                Filtrar por estado:
              </span>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full sm:w-auto border border-[#e0e0e0] rounded-lg 
                px-3 py-2 text-sm bg-white focus:outline-none 
                focus:border-[#005bac]"
              >
                {statusOptions.map((status) => (
                  <option key={status} value={status}> 
                    {status === 'all' ? 'Todos' : status}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <p className="text-[#6e6e6e] text-sm md:text-base">
            Consulta el estado de tus vehículos y reparaciones
          </p>
        </div>

        {/* Repairs list with responsive spacing */}
        {filteredRepairs.length === 0 ? (
          <div className="text-center text-[#6e6e6e] py-8">
            No hay reparaciones {filterStatus !== 'all' ? `en estado ${filterStatus}` : 'registradas'}
          </div>
        ) : (
          <div className="grid gap-4 sm:gap-6">
            {filteredRepairs.map((repair) => (
              <RepairCard 
                key={repair.repair_id} 
                repair={repair}
                className="w-full"
              />
            ))}
          </div>
        )}
      </div>

      {error && toast.error(error)}
    </div>
  );
};

export default ClientPage;
