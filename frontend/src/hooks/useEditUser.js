import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const useEditUser = (userId) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
    isActive: true,
  });

  const API_URL = import.meta.env.VITE_API_URL;

  const fetchUserData = async () => {
    try {
      setLoading(true);
      // 1. Obtener datos base del usuario
      const userResponse = await fetch(`${API_URL}user/${userId}`, {
        credentials: 'include'
      });

      if (!userResponse.ok) throw new Error('Error al obtener los datos del usuario');
      const userData = await userResponse.json();

      // 2. Preparar datos base evitando nulls
      let combinedData = {
        name: userData.name || '',
        email: userData.email || '',
        password: '', // Siempre vacío
        role: userData.role || '',
        isActive: userData.isActive ?? true,
      };

      // 3. Obtener datos adicionales según el rol
      if (userData.role === 'client' && userData.client_id) {
        const clientResponse = await fetch(`${API_URL}client/${userData.client_id}`, {
          credentials: 'include'
        });
        
        if (clientResponse.ok) {
          const clientData = await clientResponse.json();
          combinedData = {
            ...combinedData,
            client_id: userData.client_id,
            nif: clientData.nif || '',
            phone: clientData.phone || '',
            address: clientData.address || '',
            postal_code: clientData.postal_code || '',
            city: clientData.city || '',
            province: clientData.province || '',
            country: clientData.country || '',
          };
        }
      } else if (userData.role === 'worker' && userData.worker_id) {
        const workerResponse = await fetch(`${API_URL}worker/${userData.worker_id}`, {
          credentials: 'include'
        });

        if (workerResponse.ok) {
          const workerData = await workerResponse.json();
          combinedData = {
            ...combinedData,
            worker_id: userData.worker_id,
            worker_role: workerData.worker_role || '',
          };
        }
      }

      setFormData(combinedData);
    } catch (err) {
      toast.error('Error al cargar los datos del usuario');
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (formData) => {
    try {
      // 1. Actualizar datos base del usuario
      const userUpdateData = {};
      if (formData.name?.trim()) userUpdateData.name = formData.name.trim();
      if (formData.email?.trim()) userUpdateData.email = formData.email.trim();
      if (formData.password?.trim()) userUpdateData.password = formData.password.trim();
      userUpdateData.isActive = formData.isActive;

      const userResponse = await fetch(`${API_URL}user/update/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(userUpdateData)
      });

      if (!userResponse.ok) throw new Error('Error al actualizar usuario');

      // 2. Actualizar datos específicos según rol
      if (formData.role === 'client' && formData.client_id) {
        const clientUpdateData = {};
        ['nif', 'phone', 'address', 'postal_code', 'city', 'province', 'country']
          .forEach(field => {
            if (formData[field]?.trim()) clientUpdateData[field] = formData[field].trim();
          });

        if (Object.keys(clientUpdateData).length > 0) {
          const clientResponse = await fetch(`${API_URL}client/update/${formData.client_id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(clientUpdateData)
          });

          if (!clientResponse.ok) throw new Error('Error al actualizar datos de cliente');
        }
      } else if (formData.role === 'worker' && formData.worker_id) {
        if (formData.worker_role?.trim()) {
          const workerResponse = await fetch(`${API_URL}worker/update/${formData.worker_id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ worker_role: formData.worker_role.trim() })
          });

          if (!workerResponse.ok) throw new Error('Error al actualizar datos de trabajador');
        }
      }

      toast.success('Usuario actualizado correctamente');
      navigate('/admin/users');
    } catch (error) {
      toast.error(error.message || 'Error al actualizar usuario');
    }
  };

  useEffect(() => {
    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  return {
    formData,
    setFormData,
    loading,
    updateUser
  };
};

export default useEditUser;