import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import useClientData from '../hooks/useClientData';
import tallerLogo from '../imgs/mechanic.png';

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

  // Ya no necesitamos filtrar por cliente_id aquí
  const filteredRepairs = repairs;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#005bac]"></div>
      </div>
    );
  }

  return (
    <div className="bg-[#f7f9fb] flex flex-col gap-0 items-start justify-start h-[800px] relative">
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

        {error && (
          <div className="bg-red-50 text-red-500 p-4 rounded-lg">
            {error}
          </div>
        )}

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-[#f7f9fb] border-b border-[#e0e0e0]">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-[#6e6e6e]">ID</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-[#6e6e6e]">Vehículo</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-[#6e6e6e]">Descripción</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-[#6e6e6e]">Técnico</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-[#6e6e6e]">Fecha</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-[#6e6e6e]">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e0e0e0]">
              {filteredRepairs.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-[#6e6e6e]">
                    No hay reparaciones {filterStatus !== 'all' ? `en estado ${filterStatus}` : 'registradas'}
                  </td>
                </tr>
              ) : (
                filteredRepairs.map((repair) => (
                  <tr key={repair.repair_id} className="hover:bg-[#f7f9fb] transition-colors">
                    <td className="px-6 py-4 text-sm">R-{String(repair.repair_id).padStart(3, '0')}</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">{repair.vehicle?.registration_number}</span>
                        <span className="text-xs text-[#6e6e6e]">{repair.vehicle?.brand} {repair.vehicle?.model}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm">{repair.description}</td>
                    <td className="px-6 py-4 text-sm">{repair.worker_name || 'N/A'}</td>
                    <td className="px-6 py-4 text-sm">
                      {new Date(repair.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`
                        px-3 py-1.5 rounded-full text-xs font-medium
                        ${repair.status === 'Pendiente' ? 'bg-[#f59e0b] text-white' : ''}
                        ${repair.status === 'En curso' ? 'bg-[#005bac] text-white' : ''}
                        ${repair.status === 'Finalizado' ? 'bg-[#84bd00] text-white' : ''}
                      `}>
                        {repair.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ClientPage;
