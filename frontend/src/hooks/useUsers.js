import { useState, useEffect } from 'react';
import { toast } from 'sonner'; 

const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL;

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}user/all`, {
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Error al obtener los usuarios');
      }

      const data = await response.json();
      setUsers(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (userId) => {
    setUserToDelete(userId);
    setShowDeleteModal(true);
  };

  const deleteUser = async (userId) => {
    try {
      const response = await fetch(`${API_URL}user/${userId}`, {
        method: 'DELETE',
        credentials: 'include'
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Error al eliminar el usuario');
      }

      await fetchUsers();
      toast.success('Usuario eliminado correctamente');
      setShowDeleteModal(false);
      setUserToDelete(null);
    } catch (err) {
      toast.error(err.message);
    }
  };

  // Filter users based on search query
  const filteredUsers = users.filter(user => {
    const searchLower = searchQuery.toLowerCase();
    return (
      user.name.toLowerCase().includes(searchLower) ||
      user.email.toLowerCase().includes(searchLower) ||
      user.role.toLowerCase().includes(searchLower)
    );
  });

  // Fetch users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  return {
    users: filteredUsers,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    showDeleteModal,
    setShowDeleteModal,
    userToDelete,
    setUserToDelete,
    handleDeleteClick,
    deleteUser
  };
};

export default useUsers;