import { useState, useEffect } from 'react';
import { toast } from 'sonner';

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
      const repairsResponse = await fetch(`${API_URL}repair/all`, {
        credentials: 'include'
      });

      if (!repairsResponse.ok) throw new Error('Error al obtener las reparaciones');
      const repairsData = await repairsResponse.json();

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

            // Añadir: Obtener detalles del trabajador
            const workerResponse = await fetch(`${API_URL}worker/${repair.worker_id}`, {
              credentials: 'include'
            });
            const workerData = await workerResponse.json();

            return {
              ...repair,
              vehicle: vehicleData,
              client: clientData,
              worker: workerData,
              rating: repair.rating || 0 // Asegurarnos de que siempre tengamos un valor
            };
          } catch (error) {
            console.error(`Error fetching details for repair ${repair.repair_id}:`, error);
            return {
              ...repair,
              vehicle: null,
              client: null,
              worker: null,
              rating: 0
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
      toast.success('Reparación eliminada correctamente');
      
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    } catch (err) {
      toast.error('Error al eliminar la reparación: ' + err.message);
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

  // Ejemplo para cualquier formulario de creación/edición
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // ... submit logic ...
      toast.success('Operación realizada con éxito');
    } catch (err) {
      toast.error('Error: ' + err.message);
    }
  };

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
    refreshRepairs: fetchRepairDetails,
    handleSubmit
  };
};

export default useWorkerRepairs;