import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiEdit2, FiTrash2, FiSearch } from 'react-icons/fi';
import useWorkerRepairs from '../hooks/useWorkerRepairs';
import ConfirmModal from '../components/ConfirmModal';
import { statusColors } from '../constants/colors';
import StarRating from '../components/StarRating';

const StatusBadge = ({ status }) => (
  <div className={`${statusColors[status]} rounded-xl px-2 py-1 inline-flex items-center justify-center`}>
    <span className="text-white text-xs font-medium">{status}</span>
  </div>
);

const WorkerPage = ({ className }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [repairToDelete, setRepairToDelete] = useState(null);
  
  const {
    repairs,
    loading,
    error,
    filterStatus,
    setFilterStatus,
    searchQuery,
    setSearchQuery,
    deleteRepair,
    successMessage
  } = useWorkerRepairs();

  const handleDeleteClick = (repairId) => {
    setRepairToDelete(repairId);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (repairToDelete) {
      deleteRepair(repairToDelete);
      setShowDeleteModal(false);
      setRepairToDelete(null);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#005bac]"></div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col gap-0 items-start justify-start self-stretch flex-1 relative ${className}`}>
      {/* Header con responsive */}
      <div className="border-b border-[#e0e0e0] px-4 md:px-8 py-4 flex flex-col md:flex-row justify-between items-start md:items-center w-full gap-4">
        <Link 
          to="/worker/create-repair"
          className="bg-[#005bac] hover:bg-[#004d91] transition-colors px-4 py-2 rounded-lg text-white flex items-center gap-2 w-full md:w-auto justify-center md:justify-start"
        >
          <span className="text-sm font-semibold">Nueva Reparación</span>
        </Link>
      </div>

      <div className="p-4 md:p-8 space-y-6 w-full">
        {/* Mensajes de error y éxito */}
        {error && (
          <div className="bg-red-50 text-red-500 p-4 rounded-lg">
            {error}
          </div>
        )}
        
        {successMessage && (
          <div className="bg-green-50 text-green-600 p-4 rounded-lg flex items-center justify-between">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              {successMessage}
            </div>
          </div>
        )}

        {/* Filtros con responsive */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="relative flex-1 w-full md:max-w-md">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#6e6e6e]" />
            <input
              type="text"
              placeholder="Buscar por matrícula o cliente..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-[#e0e0e0] rounded-lg focus:outline-none focus:border-[#005bac]"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-full md:w-auto border border-[#e0e0e0] rounded-lg px-4 py-2 focus:outline-none focus:border-[#005bac]"
          >
            <option value="all">Todos los estados</option>
            <option value="Pendiente">Pendiente</option>
            <option value="En curso">En curso</option>
            <option value="Finalizado">Finalizado</option>
          </select>
        </div>

        {/* Tabla con scroll horizontal para móviles */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]"> {/* Cambiado de 1000px a 800px para consistencia */}
              <thead className="bg-[#f7f9fb] border-b border-[#e0e0e0]">
                <tr>
                  <th className="w-24 px-4 sm:px-6 py-4 text-left text-sm font-semibold text-[#6e6e6e]">ID</th>
                  <th className="flex-[2] px-4 sm:px-6 py-4 text-left text-sm font-semibold text-[#6e6e6e]">Vehículo</th>
                  <th className="flex-[2] px-4 sm:px-6 py-4 text-left text-sm font-semibold text-[#6e6e6e]">Cliente</th>
                  <th className="flex-1 px-4 sm:px-6 py-4 text-left text-sm font-semibold text-[#6e6e6e]">Técnico</th>
                  <th className="hidden sm:table-cell flex-1 px-4 sm:px-6 py-4 text-left text-sm font-semibold text-[#6e6e6e]">Descripción</th>
                  <th className="w-32 px-4 sm:px-6 py-4 text-left text-sm font-semibold text-[#6e6e6e]">Estado</th>
                  {/* Nueva columna para calificación */}
                  <th className="w-32 px-4 sm:px-6 py-4 text-center text-sm font-semibold text-[#6e6e6e]">Valoración</th>
                  <th className="w-28 px-4 sm:px-6 py-4 text-center text-sm font-semibold text-[#6e6e6e]">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e0e0e0]">
                {repairs.map((repair) => (
                  <tr key={repair.repair_id} className="hover:bg-[#f7f9fb]">
                    <td className="w-24 px-4 sm:px-6 py-4">
                      <span className="text-sm font-medium whitespace-nowrap">
                        R-{String(repair.repair_id).padStart(3, '0')}
                      </span>
                    </td>
                    <td className="flex-[2] px-4 sm:px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium truncate">
                          {repair.vehicle?.registration_number || 'N/A'}
                        </span>
                        <span className="text-xs text-[#6e6e6e] truncate">
                          {repair.vehicle ? `${repair.vehicle.brand} ${repair.vehicle.model}` : 'No disponible'}
                        </span>
                      </div>
                    </td>
                    <td className="flex-[2] px-4 sm:px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium truncate">
                          {repair.client?.name || 'N/A'}
                        </span>
                        <span className="text-xs text-[#6e6e6e] truncate">
                          {repair.client?.nif || 'Sin NIF'}
                        </span>
                      </div>
                    </td>
                    <td className="flex-1 px-4 sm:px-6 py-4">
                      <span className="text-sm truncate">
                        {repair.worker?.name || 'N/A'}
                      </span>
                    </td>
                    <td className="hidden sm:table-cell flex-1 px-4 sm:px-6 py-4">
                      <span className="text-sm truncate">
                        {repair.description}
                      </span>
                    </td>
                    <td className="w-32 px-4 sm:px-6 py-4">
                      <StatusBadge status={repair.status} />
                    </td>
                    {/* Nueva celda para calificación */}
                    <td className="w-32 px-4 sm:px-6 py-4">
                      <div className="flex justify-center">
                        {repair.status === 'Finalizado' ? (
                          repair.rating ? (
                            <StarRating
                              rating={repair.rating}
                              readonly={true}
                            />
                          ) : (
                            <span className="text-sm text-[#6e6e6e]">Sin valorar</span>
                          )
                        ) : (
                          <span className="text-sm text-[#6e6e6e]">Pendiente</span>
                        )}
                      </div>
                    </td>
                    
                    <td className="w-28 px-4 sm:px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <Link
                          to={`/worker/repair/${repair.repair_id}/edit`}
                          className="p-2 hover:bg-[#f7f9fb] rounded-full transition-colors"
                        >
                          <FiEdit2 className="w-4 h-4 text-[#6e6e6e]" />
                        </Link>
                        <button
                          onClick={() => handleDeleteClick(repair.repair_id)}
                          className="p-2 hover:bg-[#f7f9fb] rounded-full transition-colors"
                        >
                          <FiTrash2 className="w-4 h-4 text-[#e53935]" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal de confirmación */}
        <ConfirmModal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={handleConfirmDelete}
          title="Eliminar reparación"
          message="¿Estás seguro de que quieres eliminar esta reparación? Esta acción no se puede deshacer."
        />
      </div>
    </div>
  );
};

export default WorkerPage;