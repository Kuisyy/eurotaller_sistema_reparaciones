import React, { useState } from 'react';
import ConfirmModal from './ConfirmModal';
import { FiTrash2 } from 'react-icons/fi';

const RepairClientCard = ({ repair, onDelete }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

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
    <>
      <div className="bg-[#ffffff] rounded-xl p-6 flex flex-col gap-4">
        <div className="flex flex-row items-center justify-between self-stretch shrink-0 relative">
          <div className="flex flex-col gap-1 items-start justify-start shrink-0 relative">
            <div className="text-[#2c2c2c] text-left font-['Inter-Bold',_sans-serif] text-lg leading-[21.6px] font-bold relative">
              {repair.vehicle?.registration_number}
            </div>
            <div className="text-[#6e6e6e] text-left font-['Inter-Medium',_sans-serif] text-base leading-[19.2px] font-medium relative">
              {repair.vehicle?.brand} {repair.vehicle?.model}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={handleDeleteClick}
              className="w-9 h-9 rounded-full flex items-center justify-center bg-[#f7f9fb] hover:bg-[#ffe5e5] hover:text-[#e53935] transition-colors"
            >
              <FiTrash2 className="w-4 h-4 text-[#e53935]" />
            </button>
            {getStatusBadge(repair.status)}
          </div>
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

      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={() => {
          onDelete(repair.repair_id);
          setShowDeleteModal(false);
        }}
        title="Eliminar reparación"
        message={`¿Estás seguro de que quieres eliminar la reparación del vehículo ${repair.vehicle?.registration_number}? Esta acción no se puede deshacer.`}
      />
    </>
  );
};

export default RepairClientCard;