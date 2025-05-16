import { useState, useEffect } from 'react';

const useClientData = () => {
  const [repairs, setRepairs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [clientId, setClientId] = useState(null);

  const VITE_API_URL = import.meta.env.VITE_API_URL;

  const fetchClientData = async () => {
    try {
      setLoading(true);

      // Primero obtener datos del cliente
      const clientResponse = await fetch(`${VITE_API_URL}client/me`, {
        credentials: 'include'
      });

      if (!clientResponse.ok) {
        throw new Error('Error al obtener datos del cliente');
      }

      const clientData = await clientResponse.json();
      setClientId(clientData.client_id);

      // Luego obtener todas las reparaciones del cliente usando la nueva ruta
      const repairsResponse = await fetch(`${VITE_API_URL}repair/client/${clientData.client_id}`, {
        credentials: 'include'
      });

      if (!repairsResponse.ok) {
        throw new Error('Error al obtener las reparaciones del cliente');
      }

      const repairsData = await repairsResponse.json();

      // Obtener información del vehículo para cada reparación
      const repairsWithVehicleInfo = await Promise.all(
        repairsData.map(async (repair) => {
          try {
            const vehicleResponse = await fetch(`${VITE_API_URL}vehicle/${repair.vehicle_id}`, {
              credentials: 'include'
            });

            if (!vehicleResponse.ok) {
              throw new Error(`Error al obtener el vehículo ${repair.vehicle_id}`);
            }

            const vehicleData = await vehicleResponse.json();
            return { ...repair, vehicle: vehicleData, client_id: clientData.client_id };
          } catch (vehicleError) {
            console.error(`Error fetching vehicle ${repair.vehicle_id}:`, vehicleError);
            return { ...repair, vehicle: null, client_id: clientData.client_id };
          }
        })
      );

      setRepairs(repairsWithVehicleInfo);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const refreshData = () => {
    fetchClientData();
  };

  useEffect(() => {
    fetchClientData();
  }, []);

  return { repairs, loading, error, refreshData, clientId };
};

export default useClientData;