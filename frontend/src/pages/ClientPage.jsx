import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import useClientData from '../hooks/useClientData';
import RepairClientCard from '../components/RepairClientCard.jsx';
import tallerLogo from '../imgs/mechanic.png';

const ClientPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { repairs, loading, error, refreshData } = useClientData();

  useEffect(() => {
    refreshData();
  }, [user]); 

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
          <div className="flex items-center gap-3">
            <div className="text-[#ffffff] text-left font-['Inter-Medium',_sans-serif] text-sm leading-[16.8px] font-medium">
              {user?.name}
            </div>
            <div className="bg-[#0082c8] rounded-[18px] w-9 h-9 flex items-center justify-center">
              <div className="text-[#ffffff] font-['Inter-SemiBold',_sans-serif] text-sm leading-[16.8px] font-semibold">
                {user?.name?.split(' ').map(word => word[0]).join('')}
              </div>
            </div>
          </div>
          
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
      <div className="p-8 flex flex-col gap-6 items-start justify-start self-stretch flex-1 relative">
        <div className="flex flex-col gap-2 items-start justify-start self-stretch shrink-0 relative">
          <div className="text-[#2c2c2c] text-left font-['Inter-Bold',_sans-serif] text-2xl leading-[28.8px] font-bold relative self-stretch">
            Mis Vehículos
          </div>
          <div className="text-[#6e6e6e] text-left font-['Inter-Regular',_sans-serif] text-base leading-[19.2px] font-normal relative self-stretch">
            Consulta el estado de tus vehículos y reparaciones
          </div>
        </div>

        {/* Repairs List */}
        <div className="flex flex-col gap-4 items-start justify-start self-stretch shrink-0 relative">
          {error && (
            <div className="text-red-500 p-4 rounded-lg bg-red-50 w-full">
              {error}
            </div>
          )}

          {repairs.length === 0 ? (
            <div className="text-gray-500 text-center w-full p-4">
              No hay reparaciones registradas
            </div>
          ) : (
            repairs.map((repair) => (
              <RepairClientCard key={repair.repair_id} repair={repair} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientPage;
