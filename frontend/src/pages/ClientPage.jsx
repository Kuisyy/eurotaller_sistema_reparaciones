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
    <div className="bg-[#f7f9fb] flex flex-col gap-0 items-start justify-start h-[800px] relative">
      {/* Remove local Toaster since it's in App.jsx */}
      {error && toast.error(error)}
      
      {/* Header */}
      <div className="bg-[#005bac] pr-6 pl-6 flex flex-row items-center justify-between self-stretch shrink-0 h-16 relative">
        {/* Logo section */}
        <div className="flex flex-row gap-3 items-center justify-start self-stretch shrink-0 relative">
          <img
            className="shrink-0 w-7 h-7 relative overflow-visible"
            src={tallerLogo}
            alt="Logo del taller"
          />
          <div className="text-[#ffffff] text-left font-['Inter-Bold',_sans-serif] text-lg leading-[21.6px] font-bold relative">
            EuroTaller
          </div>
        </div>

        {/* User and logout section */}
        <div className="flex flex-row items-center gap-6">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-[#0082c8] hover:bg-[#006da8] transition-colors duration-300 rounded-lg px-4 py-2 text-white text-sm font-['Inter-SemiBold',_sans-serif]"
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
            Salir
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-8 flex flex-col gap-6 w-full">
        <div className="flex flex-col gap-2 mb-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-[#2c2c2c]">
              Mis Reparaciones
            </h2>
            <div className="flex items-center gap-3">
              <span className="text-[#6e6e6e] text-sm">Filtrar por estado:</span>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="border border-[#e0e0e0] rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:border-[#005bac]"
              >
                {statusOptions.map((status) => (
                  <option key={status} value={status}> 
                    {status === 'all' ? 'Todos' : status}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <p className="text-[#6e6e6e]">Consulta el estado de tus vehículos y reparaciones</p>
        </div>

        {filteredRepairs.length === 0 ? (
          <div className="text-center text-[#6e6e6e] py-8">
            No hay reparaciones {filterStatus !== 'all' ? `en estado ${filterStatus}` : 'registradas'}
          </div>
        ) : (
          <div className="flex flex-col gap-4 w-full">
            {filteredRepairs.map((repair) => (
              <RepairCard key={repair.repair_id} repair={repair} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientPage;
