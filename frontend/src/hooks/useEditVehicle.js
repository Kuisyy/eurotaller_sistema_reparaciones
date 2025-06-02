import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useAuth } from '../context/AuthContext'; 

const useEditVehicle = (vehicleId) => {
  const navigate = useNavigate();
  const { user } = useAuth(); // Obtener el usuario del contexto
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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

  const [clients, setClients] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;

  // Cargar datos del vehículo y lista de clientes
  const fetchVehicleData = async () => {
    try {
      setLoading(true);
      
      // Obtener datos del vehículo
      const vehicleResponse = await fetch(`${API_URL}vehicle/${vehicleId}`, {
        credentials: 'include'
      });

      if (!vehicleResponse.ok) throw new Error('Error al obtener los datos del vehículo');
      const vehicleData = await vehicleResponse.json();

      // Obtener lista de clientes
      const clientsResponse = await fetch(`${API_URL}client/all`, {
        credentials: 'include'
      });

      if (!clientsResponse.ok) throw new Error('Error al obtener la lista de clientes');
      const clientsData = await clientsResponse.json();

      setClients(clientsData);
      setFormData(vehicleData);
      setError(null);
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Actualizar vehículo
  const updateVehicle = async (formData) => {
    try {
      const response = await fetch(`${API_URL}vehicle/update/${vehicleId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Error al actualizar el vehículo');
      }

      toast.success('Vehículo actualizado correctamente');
      // Usar el rol del usuario del contexto
      navigate(`/${user.role}/vehicles`);
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    if (vehicleId) {
      fetchVehicleData();
    }
  }, [vehicleId]);

  return {
    formData,
    setFormData,
    loading,
    error,
    clients,
    updateVehicle
  };
};

export default useEditVehicle;