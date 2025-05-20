import { useState, useEffect } from 'react';

const useVehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [successMessage, setSuccessMessage] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL;

  const fetchVehicles = async () => {
    try {
      setLoading(true);
      // Obtener los vehículos
      const response = await fetch(`${API_URL}vehicle/all`, {
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Error al obtener los vehículos');
      }

      const vehiclesData = await response.json();

      // Obtener información detallada de los clientes para cada vehículo
      const vehiclesWithClientInfo = await Promise.all(
        vehiclesData.map(async (vehicle) => {
          try {
            const clientResponse = await fetch(`${API_URL}client/${vehicle.client_id}`, {
              credentials: 'include'
            });

            if (!clientResponse.ok) {
              throw new Error(`Error al obtener el cliente ${vehicle.client_id}`);
            }

            const clientData = await clientResponse.json();
            return {
              ...vehicle,
              client: {
                ...clientData,
                name: clientData.name,
                nif: clientData.nif,
                phone: clientData.phone,
                email: clientData.email,
                address: clientData.address,
                city: clientData.city
              }
            };
          } catch (clientError) {
            console.error(`Error fetching client ${vehicle.client_id}:`, clientError);
            return vehicle;
          }
        })
      );

      setVehicles(vehiclesWithClientInfo);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteVehicle = async (vehicleId) => {
    if (!window.confirm('¿Estás seguro de que quieres eliminar este vehículo?')) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}vehicle/${vehicleId}`, {
        method: 'DELETE',
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Error al eliminar el vehículo');
      }

      await fetchVehicles();
      setSuccessMessage('Vehículo eliminado correctamente');
      
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    } catch (err) {
      setError(err.message);
    }
  };

  const updateVehicle = async (vehicleId, vehicleData) => {
    try {
      const response = await fetch(`${API_URL}vehicle/${vehicleId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(vehicleData)
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Error al actualizar el vehículo');
      }

      await fetchVehicles();
      setSuccessMessage('Vehículo actualizado correctamente');
      
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);

      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      await Promise.all([
        fetchVehicles()
      ]);
    };

    fetchInitialData();
  }, []);

  return {
    vehicles,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    deleteVehicle,
    updateVehicle,
    successMessage,
    refreshVehicles: fetchVehicles
  };
};

export default useVehicles;