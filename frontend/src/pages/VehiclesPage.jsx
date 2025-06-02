import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { FiEdit2, FiTrash2, FiSearch } from "react-icons/fi";
import useVehicles from "../hooks/useVehicles.js";
import ConfirmModal from '../components/ConfirmModal';
import { useAuth } from '../context/AuthContext';

const VehiclesPage = () => {
  const { user } = useAuth();
  const {
    vehicles,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    handleDeleteClick, // Usamos este en lugar de deleteVehicle
    showDeleteModal,
    setShowDeleteModal,
    confirmDelete,
    successMessage
  } = useVehicles();

  const [selectedFilter, setSelectedFilter] = useState("all");

  // Filter vehicles based on search query and fuel type
  const filteredVehicles = useMemo(() => {
    return vehicles.filter((vehicle) => {
      const matchesSearch =
        vehicle.registration_number
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        vehicle.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vehicle.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vehicle.client?.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter =
        selectedFilter === "all" || vehicle.fuel_type === selectedFilter;
      return matchesSearch && matchesFilter;
    });
  }, [vehicles, searchQuery, selectedFilter]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#005bac]"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-0 items-start justify-start self-stretch flex-1 relative">
      {/* Header */}
      <div className="border-b border-[#e0e0e0] px-4 sm:px-8 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center w-full gap-4">
        <div className="text-[#2c2c2c] text-left text-lg leading-[21.6px] font-bold">
          Gestión de Vehículos
        </div>
        <Link
          to={`/${user.role}/create-vehicle`}
          className="bg-[#005bac] hover:bg-[#004d91] rounded-lg px-4 h-10 flex items-center gap-2 text-white w-full sm:w-auto justify-center"
        >
          <span className="text-sm font-semibold">Nuevo Vehículo</span>
        </Link>
      </div>

      {/* Filters */}
      <div className="border-solid border-[#e0e0e0] border-b px-4 sm:px-8 pt-4 overflow-x-auto">
        <div className="flex flex-row gap-4 sm:gap-8 items-end min-h-[48px] w-max sm:w-auto">
          {[
            { id: "all", label: "Todos" },
            { id: "Gasolina", label: "Gasolina" },
            { id: "Diésel", label: "Diésel" },
            { id: "Eléctrico", label: "Eléctrico" },
            { id: "Híbrido", label: "Híbrido" },
          ].map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setSelectedFilter(id)}
              className={`
                flex flex-col items-center justify-between h-full pb-2
                transition-all duration-200 ease-in-out whitespace-nowrap
                ${
                  selectedFilter === id
                    ? "border-b-2 border-[#005bac] text-[#005bac] font-medium"
                    : "text-[#6e6e6e] hover:text-[#005bac]"
                }
              `}
            >
              <span className="text-sm">{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-8 flex flex-col gap-6 w-full">
        {/* Messages */}
        {error && (
          <div className="bg-red-50 text-red-500 p-4 rounded-lg">
            {error}
          </div>
        )}

        {successMessage && (
          <div className="bg-green-50 text-green-600 p-4 rounded-lg flex items-center justify-between">
            <span>{successMessage}</span>
          </div>
        )}

        {/* Search */}
        <div className="flex items-center justify-between">
          <div className="relative w-full sm:w-96">
            <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#6e6e6e]" />
            <input
              type="text"
              placeholder="Buscar por matrícula, marca o cliente..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 h-10 border border-[#e0e0e0] rounded-lg focus:outline-none focus:border-[#005bac] transition-colors"
            />
          </div>
        </div>

        {/* Vehicles Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <div className="bg-[#f7f9fb] border-b border-[#e0e0e0] h-14 px-4 sm:px-8 flex items-center min-w-[800px]">
              <div className="w-32 text-[#6e6e6e] font-semibold text-sm">Matrícula</div>
              <div className="flex-[2] text-[#6e6e6e] font-semibold text-sm">Vehículo</div>
              <div className="flex-[2] text-[#6e6e6e] font-semibold text-sm">Cliente</div>
              <div className="flex-1 text-[#6e6e6e] font-semibold text-sm">Tipo</div>
              <div className="hidden sm:block flex-1 text-[#6e6e6e] font-semibold text-sm">Año</div>
              <div className="w-28 text-[#6e6e6e] font-semibold text-sm text-center">Acciones</div>
            </div>

            <div className="divide-y divide-[#e0e0e0] min-w-[800px]">
              {filteredVehicles.map((vehicle) => (
                <div
                  key={vehicle.vehicle_id}
                  className="px-4 sm:px-8 py-4 flex items-center hover:bg-[#f7f9fb] transition-colors"
                >
                  <div className="w-32 text-sm font-medium">
                    {vehicle.registration_number}
                  </div>
                  <div className="flex-[2] flex flex-col">
                    <span className="text-sm font-medium truncate">
                      {vehicle.brand} {vehicle.model}
                    </span>
                    <span className="text-xs text-[#6e6e6e] truncate">
                      VIN: {vehicle.vin || "No disponible"}
                    </span>
                  </div>
                  <div className="flex-[2] flex flex-col">
                    <span className="text-sm font-medium truncate">
                      {vehicle.client?.name || "N/A"}
                    </span>
                    <span className="text-xs text-[#6e6e6e] truncate">
                      {vehicle.client?.nif || "Sin NIF"}
                    </span>
                  </div>
                  <div className="flex-1">
                    <span className="bg-[#f0f0f0] text-[#2c2c2c] text-xs font-medium px-3 py-1.5 rounded-full whitespace-nowrap">
                      {vehicle.fuel_type}
                    </span>
                  </div>
                  <div className="hidden sm:block flex-1 text-sm text-[#6e6e6e]">
                    {vehicle.year_of_manufacture}
                  </div>
                  <div className="w-28 flex gap-2 justify-center">
                    <Link
                      to={`/${user.role}/vehicles/${vehicle.vehicle_id}/edit`}
                      className="w-9 h-9 rounded-full flex items-center justify-center bg-[#f7f9fb] hover:bg-[#e6e6e6] transition-colors"
                    >
                      <FiEdit2 className="w-4 h-4 text-[#6e6e6e]" />
                    </Link>
                    <button
                      onClick={() => handleDeleteClick(vehicle.vehicle_id)}
                      className="w-9 h-9 rounded-full flex items-center justify-center bg-[#f7f9fb] hover:bg-[#ffe5e5] hover:text-[#e53935] transition-colors"
                    >
                      <FiTrash2 className="w-4 h-4 text-[#e53935]" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="h-16 px-4 sm:px-8 flex items-center justify-between bg-white border-t border-[#e0e0e0]">
            <div className="text-sm text-[#6e6e6e]">
              Mostrando {filteredVehicles.length} de {vehicles.length} resultados
            </div>
          </div>
        </div>
      </div>

      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={confirmDelete}
        title="Eliminar vehículo"
        message="¿Estás seguro de que quieres eliminar este vehículo? Esta acción no se puede deshacer."
      />
    </div>
  );
};

export default VehiclesPage;
