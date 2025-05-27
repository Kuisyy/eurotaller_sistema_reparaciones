import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { ClipLoader } from 'react-spinners';

const CreateVehiclePage = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitError, setSubmitError] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL;

  const [formData, setFormData] = useState({
    client_id: '',
    brand: '',
    model: '',
    registration_number: '',
    vin: '',
    engine_type: '',
    engine_code: '',
    year_of_manufacture: '',
    mileage: '',
    color: '',
    fuel_type: '',
    notes: ''
  });

  // Opciones para los tipos de motor y combustible
  const engineTypes = ['Gasolina', 'Diésel', 'Eléctrico', 'Híbrido'];
  const fuelTypes = ['Gasolina', 'Diésel', 'Eléctrico', 'GLP', 'GNC'];


  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}client/all`, {
        credentials: 'include'
      });

      if (!response.ok) throw new Error('Error al obtener los clientes');
      
      const data = await response.json();
      setClients(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError(null);
    
    try {
      const response = await fetch(`${API_URL}vehicle/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Error al crear el vehículo');
      }

      // Reset form
      setFormData({
        client_id: '',
        brand: '',
        model: '',
        registration_number: '',
        vin: '',
        engine_type: '',
        engine_code: '',
        year_of_manufacture: '',
        mileage: '',
        color: '',
        fuel_type: '',
        notes: ''
      });

      toast.success('Vehículo creado correctamente');

    } catch (err) {
      toast.error("Error: " + err.message);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <ClipLoader color="#005bac" size={40} />
      </div>
    );
  }

  if (error) {
    toast.error(error);
  }

  return (
    <div className="bg-white rounded-xl p-8 shadow-md">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-[#2c2c2c] mb-2">
          Nuevo Vehículo
        </h2>
        <p className="text-[#6e6e6e]">
          Complete los detalles para registrar un nuevo vehículo
        </p>
      </div>

      {/* Mostrar error de carga de clientes */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6">
          Error al cargar los clientes: {error}
        </div>
      )}

      {submitError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6">
          Error: {submitError}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Cliente */}
          <div>
            <label className="block text-sm font-medium text-[#2c2c2c] mb-2">
              Cliente *
            </label>
            <select
              name="client_id"
              value={formData.client_id}
              onChange={handleChange}
              className="w-full border border-[#e0e0e0] rounded-lg px-4 py-3 bg-white"
              required
            >
              <option value="">Seleccionar cliente</option>
              {clients.map((client) => (
                <option key={client.client_id} value={client.client_id}>
                  {client.name} - {client.nif}
                </option>
              ))}
            </select>
          </div>

          {/* Marca */}
          <div>
            <label className="block text-sm font-medium text-[#2c2c2c] mb-2">
              Marca *
            </label>
            <input
              type="text"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              className="w-full border border-[#e0e0e0] rounded-lg px-4 py-3"
              required
            />
          </div>

          {/* Modelo */}
          <div>
            <label className="block text-sm font-medium text-[#2c2c2c] mb-2">
              Modelo *
            </label>
            <input
              type="text"
              name="model"
              value={formData.model}
              onChange={handleChange}
              className="w-full border border-[#e0e0e0] rounded-lg px-4 py-3"
              required
            />
          </div>

          {/* Matrícula */}
          <div>
            <label className="block text-sm font-medium text-[#2c2c2c] mb-2">
              Matrícula *
            </label>
            <input
              type="text"
              name="registration_number"
              value={formData.registration_number}
              onChange={handleChange}
              className="w-full border border-[#e0e0e0] rounded-lg px-4 py-3"
              required
            />
          </div>

          {/* VIN */}
          <div>
            <label className="block text-sm font-medium text-[#2c2c2c] mb-2">
              Número de bastidor (VIN)
            </label>
            <input
              type="text"
              name="vin"
              value={formData.vin}
              onChange={handleChange}
              className="w-full border border-[#e0e0e0] rounded-lg px-4 py-3"
              maxLength="17"
            />
          </div>

          {/* Tipo de motor */}
          <div>
            <label className="block text-sm font-medium text-[#2c2c2c] mb-2">
              Tipo de motor
            </label>
            <select
              name="engine_type"
              value={formData.engine_type}
              onChange={handleChange}
              className="w-full border border-[#e0e0e0] rounded-lg px-4 py-3 bg-white"
            >
              <option value="">Seleccionar tipo</option>
              {engineTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          {/* Código de motor */}
          <div>
            <label className="block text-sm font-medium text-[#2c2c2c] mb-2">
              Código de motor
            </label>
            <input
              type="text"
              name="engine_code"
              value={formData.engine_code}
              onChange={handleChange}
              className="w-full border border-[#e0e0e0] rounded-lg px-4 py-3"
            />
          </div>

          {/* Año de fabricación */}
          <div>
            <label className="block text-sm font-medium text-[#2c2c2c] mb-2">
              Año de fabricación
            </label>
            <input
              type="number"
              name="year_of_manufacture"
              value={formData.year_of_manufacture}
              onChange={handleChange}
              className="w-full border border-[#e0e0e0] rounded-lg px-4 py-3"
              min="1900"
              max={new Date().getFullYear()}
            />
          </div>

          {/* Kilometraje */}
          <div>
            <label className="block text-sm font-medium text-[#2c2c2c] mb-2">
              Kilometraje
            </label>
            <input
              type="number"
              name="mileage"
              value={formData.mileage}
              onChange={handleChange}
              className="w-full border border-[#e0e0e0] rounded-lg px-4 py-3"
              min="0"
            />
          </div>

          {/* Color */}
          <div>
            <label className="block text-sm font-medium text-[#2c2c2c] mb-2">
              Color
            </label>
            <input
              type="text"
              name="color"
              value={formData.color}
              onChange={handleChange}
              className="w-full border border-[#e0e0e0] rounded-lg px-4 py-3"
            />
          </div>

          {/* Tipo de combustible */}
          <div>
            <label className="block text-sm font-medium text-[#2c2c2c] mb-2">
              Tipo de combustible
            </label>
            <select
              name="fuel_type"
              value={formData.fuel_type}
              onChange={handleChange}
              className="w-full border border-[#e0e0e0] rounded-lg px-4 py-3 bg-white"
            >
              <option value="">Seleccionar combustible</option>
              {fuelTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Notas */}
        <div>
          <label className="block text-sm font-medium text-[#2c2c2c] mb-2">
            Notas adicionales
          </label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            className="w-full border border-[#e0e0e0] rounded-lg px-4 py-3"
            rows="4"
          />
        </div>

        {/* Botones */}
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => setFormData({
              client_id: '',
              brand: '',
              model: '',
              registration_number: '',
              vin: '',
              engine_type: '',
              engine_code: '',
              year_of_manufacture: '',
              mileage: '',
              color: '',
              fuel_type: '',
              notes: ''
            })}
            className="px-4 py-2 border border-[#e0e0e0] rounded-lg text-[#6e6e6e]"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-[#005bac] text-white rounded-lg hover:bg-[#004d91]"
          >
            Crear Vehículo
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateVehiclePage;