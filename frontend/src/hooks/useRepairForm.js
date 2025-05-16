import { useState, useEffect } from 'react';

const useRepairForm = () => {
  const [clients, setClients] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [selectedClient, setSelectedClient] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL;   

  // Obtener todos los clientes
  const fetchClients = async () => {
    try {
      setLoading(true); // Añadir esto al inicio
      const response = await fetch(`${API_URL}client`, {
        credentials: 'include'
      });
      
      if (!response.ok) throw new Error('Error al obtener los clientes');
      
      const data = await response.json();
      setClients(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Obtener vehículos de un cliente específico
  const fetchVehiclesByClient = async (clientId) => {
    if (!clientId) {
      setVehicles([]);
      return;
    }

    try {
      setLoading(true); // Añadir esto al inicio
      const response = await fetch(`${API_URL}vehicle/client/${clientId}`, {
        credentials: 'include'
      });
      
      if (!response.ok) throw new Error('Error al obtener los vehículos');
      
      const data = await response.json();
      setVehicles(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      setVehicles([]);
    } finally {
      setLoading(false);
    }
  };

  // Cargar clientes al montar el componente 
  useEffect(() => {
    fetchClients();
  }, []);

  // Cargar vehículos cuando se selecciona un cliente
  useEffect(() => {
    if (selectedClient) {
      fetchVehiclesByClient(selectedClient);
    }
  }, [selectedClient]);

  return {
    clients,
    vehicles,
    selectedClient,
    setSelectedClient,
    loading,
    error
  };
};

export default useRepairForm;