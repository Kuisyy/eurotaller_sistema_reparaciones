import React, { useState, useEffect } from 'react';
import useRepairForm from '../hooks/useRepairForm';

const CreateRepairPage = () => {
  const { clients, vehicles, workers, selectedClient, setSelectedClient, loading, error } = useRepairForm();
  const [selectedVehicle, setSelectedVehicle] = useState('');
  const [selectedWorker, setSelectedWorker] = useState('');
  const [description, setDescription] = useState('');
  const [notes, setNotes] = useState('');
  const [status, setStatus] = useState('Pendiente');
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL;

  // Para depuración - verificar que workers está cargando correctamente
  useEffect(() => {
  }, [workers]);

  // Resetear el mensaje de éxito después de 3 segundos
  useEffect(() => {
    if (submitSuccess) {
      const timer = setTimeout(() => {
        setSubmitSuccess(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [submitSuccess]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);
    setSubmitError(null);

    // Verificar que tenemos los datos necesarios
    if (!selectedClient || !selectedVehicle || !selectedWorker || !description) {
      setSubmitError("Todos los campos obligatorios deben completarse");
      setSubmitLoading(false);
      return;
    }

    try {
      const repairData = {
        vehicle_id: parseInt(selectedVehicle),
        client_id: parseInt(selectedClient),
        worker_id: parseInt(selectedWorker),
        description,
        status,
        notes: notes || null
      };

      const response = await fetch(`${API_URL}repair/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(repairData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al crear la reparación');
      }

      const responseData = await response.json();
      console.log("Respuesta del servidor:", responseData);

      setSelectedClient('');
      setSelectedVehicle('');
      setSelectedWorker('');
      setDescription('');
      setNotes('');
      setStatus('Pendiente');
      setSubmitSuccess(true);
    } catch (err) {
      console.error("Error en la creación de la reparación:", err);
      setSubmitError(err.message);
    } finally {
      setSubmitLoading(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#005bac]"></div>
    </div>;
  }

  if (error) {
    return <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
      Error: {error}
    </div>;
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

      {submitSuccess && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-6">
          Reparación creada con éxito ✅
        </div>
      )}

      {submitError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6">
          Error: {submitError}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-[#2c2c2c] mb-2">
              Cliente
            </label>
            <select
              value={selectedClient}
              onChange={(e) => {
                setSelectedClient(e.target.value);
                setSelectedVehicle(''); 
              }}
              className="w-full border border-[#e0e0e0] rounded-lg px-4 py-3 bg-white"
              required
            >
              <option value="">Seleccionar cliente</option>
              {clients.map((client) => (
                <option key={client.client_id} value={client.client_id}>
                  {client.name} - NIF: {client.nif} - Tel: {client.phone}
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
              required
            >
              <option value="">Seleccionar vehículo</option>
              {vehicles.map((vehicle) => (
                <option key={vehicle.vehicle_id} value={vehicle.vehicle_id}>
                  {vehicle.brand} {vehicle.model} - {vehicle.registration_number}
                </option>
              ))}
            </select>
          </div>

          <div>
          <label className="block text-sm font-medium text-[#2c2c2c] mb-2">
            Técnico asignado
          </label>
          <select
            value={selectedWorker}
            onChange={(e) => setSelectedWorker(e.target.value)}
            className="w-full border border-[#e0e0e0] rounded-lg px-4 py-3 bg-white"
            required
          >
            <option value="">Seleccionar técnico</option>
            {workers && workers.length > 0 ? (
              workers.map((worker) => (
                <option key={worker.worker_id} value={worker.worker_id}>
                  {worker.name} - {worker.role}
                </option>
              ))
            ) : (
              <option value="" disabled>No hay técnicos disponibles</option>
            )}
          </select>
        </div>

          <div>
            <label className="block text-sm font-medium text-[#2c2c2c] mb-2">
              Estado
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full border border-[#e0e0e0] rounded-lg px-4 py-3 bg-white"
            >
              <option value="Pendiente">Pendiente</option>
              <option value="En curso">En curso</option>
              <option value="Finalizado">Finalizado</option>
              <option value="Cancelada">Cancelada</option>
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
            placeholder="Descripción detallada de la reparación"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#2c2c2c] mb-2">
            Notas adicionales
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full border border-[#e0e0e0] rounded-lg px-4 py-3"
            rows="3"
            placeholder="Notas adicionales (opcional)"
          />
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            className="px-4 py-2 border border-[#e0e0e0] rounded-lg text-[#6e6e6e]"
            onClick={() => {
              setSelectedClient('');
              setSelectedVehicle('');
              setSelectedWorker('');
              setDescription('');
              setNotes('');
              setStatus('Pendiente');
            }}
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={submitLoading || !selectedClient || !selectedVehicle || !selectedWorker || !description}
            className="px-6 py-2 bg-[#005bac] text-white rounded-lg hover:bg-[#004d91] disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {submitLoading ? (
              <span className="flex items-center">
                <span className="animate-spin h-4 w-4 mr-2 border-t-2 border-b-2 border-white rounded-full"></span>
                Creando...
              </span>
            ) : (
              'Crear Reparación'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateRepairPage;