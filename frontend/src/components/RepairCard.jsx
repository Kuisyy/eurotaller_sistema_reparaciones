import React, { useState } from 'react';
import { FiTool, FiCalendar, FiTruck, FiFileText } from 'react-icons/fi';
import { toast } from 'sonner';
import StarRating from './StarRating';
import { statusColors } from '../constants/colors';

const RepairCard = ({ repair }) => {
  const [rating, setRating] = useState(0);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
    toast.success('Calificación guardada correctamente');
  };

  const getStatusColor = (status) => {
    return statusColors[status] || 'bg-gray-500';
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      {/* Header con estado */}
      <div className={`${getStatusColor(repair.status)} px-6 py-3 flex justify-between items-center`}>
        <h3 className="text-white font-semibold">
          Reparación R-{String(repair.repair_id).padStart(3, '0')}
        </h3>
        <span className="text-white text-sm">
          {repair.status}
        </span>
      </div>

      {/* Contenido principal */}
      <div className="p-6">
        {/* Grid de información */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          {/* Columna izquierda */}
          <div className="space-y-4">
            {/* Vehículo */}
            <div className="flex gap-3">
              <FiTruck className="w-5 h-5 text-[#6e6e6e] mt-1" />
              <div>
                <span className="text-sm text-[#6e6e6e] block">Vehículo</span>
                <p className="font-medium">{repair.vehicle?.registration_number}</p>
                <p className="text-sm text-[#6e6e6e]">
                  {repair.vehicle?.brand} {repair.vehicle?.model}
                </p>
              </div>
            </div>

            {/* Técnico */}
            <div className="flex gap-3">
              <FiTool className="w-5 h-5 text-[#6e6e6e] mt-1" />
              <div>
                <span className="text-sm text-[#6e6e6e] block">Técnico asignado</span>
                <p className="font-medium">{repair.worker_name || 'No asignado'}</p>
              </div>
            </div>
          </div>

          {/* Columna derecha */}
          <div className="space-y-4">
            {/* Fecha */}
            <div className="flex gap-3">
              <FiCalendar className="w-5 h-5 text-[#6e6e6e] mt-1" />
              <div>
                <span className="text-sm text-[#6e6e6e] block">Fecha de entrada</span>
                <p className="font-medium">
                  {new Date(repair.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Descripción */}
        <div className="border-t border-[#e0e0e0] pt-4">
          <div className="flex gap-3">
            <FiFileText className="w-5 h-5 text-[#6e6e6e] mt-1" />
            <div>
              <span className="text-sm text-[#6e6e6e] block mb-1">Descripción</span>
              <p className="text-sm">{repair.description}</p>
            </div>
          </div>
        </div>

        {/* Calificación - Solo si está finalizada */}
        {repair.status === 'Finalizado' && (
          <div className="border-t border-[#e0e0e0] mt-4 pt-4">
            <span className="text-sm text-[#6e6e6e] block mb-2">Calificación del servicio</span>
            <StarRating rating={rating} setRating={handleRatingChange} />
          </div>
        )}
      </div>
    </div>
  );
};

export default RepairCard;