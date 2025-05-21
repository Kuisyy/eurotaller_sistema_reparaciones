import { useState, useEffect } from 'react';

const useWorkerRepairs = () => {
  const [repairs, setRepairs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [successMessage, setSuccessMessage] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [repairToDelete, setRepairToDelete] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL;
  
  const fetchRepairDetails = async () => {
    try {
      setLoading(true);
      // 1. Obtener todas las reparaciones
      const repairsResponse = await fetch(`${API_URL}repair/all`, {
        credentials: 'include'
      });

      if (!repairsResponse.ok) throw new Error('Error al obtener las reparaciones');
      const repairsData = await repairsResponse.json();

      // 2. Para cada reparación, obtener los detalles del vehículo y cliente
      const repairsWithDetails = await Promise.all(
        repairsData.map(async (repair) => {
          try {
            // Obtener detalles del vehículo
            const vehicleResponse = await fetch(`${API_URL}vehicle/${repair.vehicle_id}`, {
              credentials: 'include'
            });
            const vehicleData = await vehicleResponse.json();

            // Obtener detalles del cliente
            const clientResponse = await fetch(`${API_URL}client/${repair.client_id}`, {
              credentials: 'include'
            });
            const clientData = await clientResponse.json();

            return {
              ...repair,
              vehicle: vehicleData,
              client: clientData
            };
          } catch (error) {
            console.error(`Error fetching details for repair ${repair.repair_id}:`, error);
            return {
              ...repair,
              vehicle: null,
              client: null
            };
          }
        })
      );

      setRepairs(repairsWithDetails);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (repairId) => {
    setRepairToDelete(repairId);
    setShowDeleteModal(true);
  };

  const deleteRepair = async (repairId) => {
    try {
      const response = await fetch(`${API_URL}repair/${repairId}`, {
        method: 'DELETE',
        credentials: 'include'
      });

      if (!response.ok) throw new Error('Error al eliminar la reparación');
      
      await fetchRepairDetails();
      setSuccessMessage('Reparación eliminada correctamente');
      
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setShowDeleteModal(false);
      setRepairToDelete(null);
    }
  };

  // Filtrar reparaciones
  const filteredRepairs = repairs.filter(repair => {
    const matchesStatus = filterStatus === 'all' || repair.status === filterStatus;
    const matchesSearch = searchQuery === '' || 
      repair.vehicle?.registration_number?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      repair.client?.name?.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesStatus && matchesSearch;
  });

  useEffect(() => {
    fetchRepairDetails();
  }, []);

  return {
    repairs: filteredRepairs,
    loading,
    error,
    filterStatus,
    setFilterStatus,
    searchQuery,
    setSearchQuery,
    successMessage,
    showDeleteModal,
    setShowDeleteModal,
    handleDeleteClick,
    repairToDelete,
    deleteRepair,
    refreshRepairs: fetchRepairDetails
  };
};

export default useWorkerRepairs;