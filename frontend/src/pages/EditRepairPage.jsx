import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useWorkerRepairs from '../hooks/useWorkerRepairs';
import useRepairForm from '../hooks/useRepairForm';
import { toast } from 'sonner';
import { ClipLoader } from 'react-spinners';

const EditRepairPage = () => {
  const { repairId } = useParams();
  const navigate = useNavigate();
  const { repairs, loading: repairsLoading, error: repairsError } = useWorkerRepairs();
  const { workers, loading: workersLoading, error: workersError } = useRepairForm();
  
  // Modificar formData para incluir todos los campos
  const [formData, setFormData] = useState({
    repair_id: '',
    client_id: '',
    vehicle_id: '',
    worker_id: '',
    description: '',
    notes: '',
    status: '',
    date: '',
    created_at: '',
    updated_at: ''
  });

  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [hasSetInitialData, setHasSetInitialData] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const repair = repairs.find(r => r.repair_id === parseInt(repairId));
    if (repair && !hasSetInitialData) {
      // Copiar todos los campos de la reparación
      setFormData({
        repair_id: repair.repair_id,
        client_id: repair.client_id,
        vehicle_id: repair.vehicle_id,
        worker_id: repair.worker_id,
        description: repair.description,
        notes: repair.notes || '',
        status: repair.status,
        date: repair.date,
        created_at: repair.created_at,
        updated_at: repair.updated_at
      });
      setHasSetInitialData(true);
    }
  }, [repairs, repairId, hasSetInitialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);
    setSubmitError(null);

    try {
      const updatedData = {
        ...formData,
        updated_at: new Date().toISOString()
      };

      const response = await fetch(`${API_URL}repair/update/${repairId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(updatedData)
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Error al actualizar la reparación');
      }

      toast.success('Reparación actualizada correctamente');
      navigate('/worker/repairs');
    } catch (err) {
      toast.error("Error: " + err.message);
      setSubmitError(err.message);
    } finally {
      setSubmitLoading(false);
    }
  };

  if (repairsLoading || workersLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <ClipLoader color="#005bac" size={40} />
      </div>
    );
  }

  const repair = repairs.find(r => r.repair_id === parseInt(repairId));

  if (!repair) {
    toast.error("No se encontró la reparación");
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
        No se encontró la reparación
      </div>
    );
  }

  if (repairsError || workersError) {
    toast.error(repairsError || workersError);
  }

  return (
    <div className="bg-white rounded-xl p-8 shadow-md">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-[#2c2c2c] mb-2">
          Editar Reparación
        </h2>
        <p className="text-[#6e6e6e]">
          Modifique los detalles de la reparación
        </p>
      </div>
      
      {/* Información del cliente y vehículo */}
      <div className="bg-[#f7f9fb] p-4 rounded-lg mb-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-[#6e6e6e]">Cliente</p>
            <p className="font-medium">{repair.client?.name || 'N/A'}</p>
            <p className="text-xs text-[#6e6e6e]">{repair.client?.nif || 'NIF no disponible'}</p>
          </div>
          <div>
            <p className="text-sm text-[#6e6e6e]">Vehículo</p>
            <p className="font-medium">
              {repair.vehicle ? `${repair.vehicle.brand} ${repair.vehicle.model}` : 'N/A'}
            </p>
            <p className="text-xs text-[#6e6e6e]">
              {repair.vehicle?.registration_number || 'Sin matrícula'}
            </p>
          </div>
        </div>
      </div>

      {/* Errores */}
      {(repairsError || workersError) && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6">
          Error: {repairsError || workersError}
        </div>
      )}

      {submitError && toast.error(submitError)}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-[#2c2c2c] mb-2">
              Técnico asignado
            </label>
            <select
              value={formData.worker_id}
              onChange={(e) => setFormData(prev => ({ ...prev, worker_id: e.target.value }))}
              className="w-full border border-[#e0e0e0] rounded-lg px-4 py-3 bg-white"
              required
            >
              <option value="">Seleccionar técnico</option>
              {workers.map((worker) => (
                <option key={worker.worker_id} value={worker.worker_id}>
                  {worker.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#2c2c2c] mb-2">
              Estado
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
              className="w-full border border-[#e0e0e0] rounded-lg px-4 py-3 bg-white"
              required
            >
              <option value="Pendiente">Pendiente</option>
              <option value="En curso">En curso</option>
              <option value="Finalizado">Finalizado</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-[#2c2c2c] mb-2">
            Descripción
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            className="w-full border border-[#e0e0e0] rounded-lg px-4 py-3"
            rows="4"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#2c2c2c] mb-2">
            Notas adicionales
          </label>
          <textarea
            value={formData.notes}
            onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
            className="w-full border border-[#e0e0e0] rounded-lg px-4 py-3"
            rows="4"
          />
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate('/worker/repairs')}
            className="px-4 py-2 border border-[#e0e0e0] rounded-lg text-[#6e6e6e]"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={submitLoading}
            className="px-6 py-2 bg-[#005bac] text-white rounded-lg hover:bg-[#004d91] disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {submitLoading ? (
              <div className="flex items-center gap-2">
                <ClipLoader color="#ffffff" size={16} />
                <span>Guardando...</span>
              </div>
            ) : (
              'Guardar cambios'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditRepairPage;