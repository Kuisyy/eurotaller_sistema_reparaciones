import React, { useState } from 'react';
import useRepairForm from '../hooks/useRepairForm';

const CreateRepairPage = () => {
  const { clients, vehicles, selectedClient, setSelectedClient, loading, error } = useRepairForm();
  const [selectedVehicle, setSelectedVehicle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Aquí implementaremos la lógica para crear la reparación
    console.log({
      clientId: selectedClient,
      vehicleId: selectedVehicle,
      description
    });
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="bg-white rounded-xl p-8 shadow-md">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-[#2c2c2c] mb-2">
          Nueva Reparación
        </h2>
        <p className="text-[#6e6e6e]">
          Complete los detalles para registrar una nueva reparación
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-[#2c2c2c] mb-2">
              Cliente
            </label>
            <select
              value={selectedClient}
              onChange={(e) => {
                setSelectedClient(e.target.value);
                setSelectedVehicle(''); // Resetear vehículo seleccionado
              }}
              className="w-full border border-[#e0e0e0] rounded-lg px-4 py-3 bg-white"
            >
              <option value="">Seleccionar cliente</option>
              {clients.map((client) => (
                <option key={client.client_id} value={client.client_id}>
                  {client.name}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-[#2c2c2c] mb-2">
              Vehículo
            </label>
            <select
              value={selectedVehicle}
              onChange={(e) => setSelectedVehicle(e.target.value)}
              disabled={!selectedClient}
              className="w-full border border-[#e0e0e0] rounded-lg px-4 py-3 bg-white"
            >
              <option value="">Seleccionar vehículo</option>
              {vehicles.map((vehicle) => (
                <option key={vehicle.vehicle_id} value={vehicle.vehicle_id}>
                  {vehicle.brand} {vehicle.model} - {vehicle.registration_number}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-[#2c2c2c] mb-2">
            Descripción
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-[#e0e0e0] rounded-lg px-4 py-3"
            rows="4"
            placeholder="Descripción de la reparación"
            required
          />
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            className="px-4 py-2 border border-[#e0e0e0] rounded-lg text-[#6e6e6e]"
            onClick={() => {
              setSelectedClient('');
              setSelectedVehicle('');
              setDescription('');
            }}
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={!selectedClient || !selectedVehicle || !description}
            className="px-6 py-2 bg-[#005bac] text-white rounded-lg hover:bg-[#004d91] disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Crear Reparación
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateRepairPage;
