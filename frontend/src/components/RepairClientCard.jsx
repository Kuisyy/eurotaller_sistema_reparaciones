import React from 'react';

const RepairClientCard = ({ repair }) => {
  
  const getStatusBadge = (status) => {
    const statusConfig = {
      'Finalizado': 'bg-[#84bd00]',
      'En curso': 'bg-[#005bac]',
      'Pendiente': 'bg-[#f59e0b]'
    };

    return (
      <div className={`${statusConfig[status] || 'bg-gray-500'} rounded-2xl pt-1.5 pr-3 pb-1.5 pl-3 flex flex-row gap-0 items-center justify-center shrink-0 relative`}>
        <div className="text-[#ffffff] text-left font-['Inter-SemiBold',_sans-serif] text-sm leading-[16.8px] font-semibold relative">
          {status}
        </div>
      </div>
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES');
  };

  return (
    <div
      className="bg-[#ffffff] rounded-xl p-6 flex flex-col gap-4 items-start justify-start self-stretch shrink-0 relative"
      style={{ boxShadow: "0px 2px 12px 0px rgba(0, 0, 0, 0.06)" }}
    >
      <div className="flex flex-row items-center justify-between self-stretch shrink-0 relative">
        <div className="flex flex-col gap-1 items-start justify-start shrink-0 relative">
          <div className="text-[#2c2c2c] text-left font-['Inter-Bold',_sans-serif] text-lg leading-[21.6px] font-bold relative">
            {repair.vehicle?.registration_number}
          </div>
          <div className="text-[#6e6e6e] text-left font-['Inter-Medium',_sans-serif] text-base leading-[19.2px] font-medium relative">
            {repair.vehicle?.brand} {repair.vehicle?.model}
          </div>
        </div>
        {getStatusBadge(repair.status)}
      </div>

      <div className="flex flex-col gap-3 items-start justify-start self-stretch shrink-0 relative">
        <div className="flex flex-row items-center justify-between self-stretch shrink-0 relative">
          <div className="text-[#6e6e6e] text-left font-['Inter-Medium',_sans-serif] text-sm leading-[16.8px] font-medium relative">
            Fecha de entrada:
          </div>
          <div className="text-[#2c2c2c] text-left font-['Inter-Medium',_sans-serif] text-sm leading-[16.8px] font-medium relative">
            {formatDate(repair.date)}
          </div>
        </div>
        <div className="flex flex-row items-center justify-between self-stretch shrink-0 relative">
          <div className="text-[#6e6e6e] text-left font-['Inter-Medium',_sans-serif] text-sm leading-[16.8px] font-medium relative">
            Descripción:
          </div>
          <div className="text-[#2c2c2c] text-left font-['Inter-Medium',_sans-serif] text-sm leading-[16.8px] font-medium relative">
            {repair.description}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RepairClientCard;