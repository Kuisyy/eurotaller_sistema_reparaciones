import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { FiEdit2, FiTrash2, FiSearch } from 'react-icons/fi';
import useUsers from '../hooks/useUsers';
import ConfirmModal from '../components/ConfirmModal';

const UsersPage = () => {
  const {
    users,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    deleteUser,
    successMessage,
    showDeleteModal,
    setShowDeleteModal,
    handleDeleteClick,
    userToDelete
  } = useUsers();

  const [selectedFilter, setSelectedFilter] = useState('all');

  // Role badge styles with improved colors
  const getRoleBadgeStyle = (role) => {
    switch (role) {
      case 'admin':
        return 'bg-[#005bac] border-[#004d91]';
      case 'worker':
        return 'bg-[#0082c8] border-[#0073b4]';
      case 'client':
        return 'bg-[#6e6e6e] border-[#5a5a5a]';
      default:
        return 'bg-[#6e6e6e] border-[#5a5a5a]';
    }
  };

  // Filter users based on selected role and search query
  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      const matchesSearch = (
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
      const matchesRole = selectedFilter === 'all' || user.role === selectedFilter;
      return matchesSearch && matchesRole;
    });
  }, [users, searchQuery, selectedFilter]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#005bac]"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-0 items-start justify-start self-stretch flex-1 relative">
      {/* Header - Added padding bottom */}
      <div className="border-solid border-[#e0e0e0] border-b pr-8 pl-8 pb-4 flex flex-row items-center justify-between self-stretch shrink-0 h-16 relative">
        <div className="text-[#2c2c2c] text-left text-lg leading-[21.6px] font-bold">
          Gestión de Usuarios
        </div>
        <div className="flex flex-row gap-4 items-center justify-end">
          <Link
            to="/admin/create-user"
            className="bg-[#005bac] hover:bg-[#004d91] rounded-lg px-4 h-10 flex items-center gap-2 text-white"
          >
            <span className="text-sm font-semibold">Nuevo Usuario</span>
          </Link>
        </div>
      </div>

      {/* Filters - Added padding top */}
      <div className="border-solid border-[#e0e0e0] border-b pr-8 pl-8 pt-4 flex flex-row gap-8 items-end h-12">
        {[
          { id: "all", label: "Todos" },
          { id: "admin", label: "Administradores" },
          { id: "worker", label: "Trabajadores" },
          { id: "client", label: "Clientes" }
        ].map(({ id, label }) => (
          <button
            key={id}
            onClick={() => setSelectedFilter(id)}
            className={`
              flex flex-col items-center justify-between h-full pb-2
              transition-all duration-200 ease-in-out
              ${selectedFilter === id 
                ? "border-b-2 border-[#005bac] text-[#005bac] font-medium" 
                : "text-[#6e6e6e] hover:text-[#005bac]"
              }
            `}
          >
            <span className="text-sm">{label}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="p-8 flex flex-col gap-6 w-full">
        {/* Messages */}
        {error && (
          <div className="bg-red-50 text-red-500 p-4 rounded-lg">
            {error}
          </div>
        )}
        
        {successMessage && (
          <div className="bg-green-50 text-green-600 p-4 rounded-lg flex items-center justify-between">
            <span>{successMessage}</span>
          </div>
        )}

        {/* Improved Search */}
        <div className="flex items-center justify-between">
          <div className="relative w-96">
            <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#6e6e6e]" />
            <input
              type="text"
              placeholder="Buscar por nombre o email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 h-10 border border-[#e0e0e0] rounded-lg focus:outline-none focus:border-[#005bac] transition-colors"
            />
          </div>
        </div>

        {/* Improved Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="bg-[#f7f9fb] border-b border-[#e0e0e0] h-14 px-8 flex items-center">
            <div className="w-24 text-[#6e6e6e] font-semibold text-sm">ID</div>
            <div className="flex-[2] text-[#6e6e6e] font-semibold text-sm">Nombre</div>
            <div className="flex-[2] text-[#6e6e6e] font-semibold text-sm">Email</div>
            <div className="flex-1 text-[#6e6e6e] font-semibold text-sm">Rol</div>
            <div className="flex-1 text-[#6e6e6e] font-semibold text-sm">Fecha creación</div>
            <div className="w-28 text-[#6e6e6e] font-semibold text-sm text-center">Acciones</div>
          </div>

          <div className="divide-y divide-[#e0e0e0]">
            {filteredUsers.map((user) => (
              <div key={user.user_id} className="px-8 py-4 flex items-center hover:bg-[#f7f9fb] transition-colors">
                <div className="w-24 text-sm">U-{String(user.user_id).padStart(3, '0')}</div>
                <div className="flex-[2] flex items-center gap-3">
                  <div className={`${getRoleBadgeStyle(user.role)} w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-semibold shadow-sm`}>
                    {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </div>
                  <span className="text-sm font-medium">{user.name}</span>
                </div>
                <div className="flex-[2] text-sm text-[#6e6e6e]">{user.email}</div>
                <div className="flex-1">
                  <span className={`${getRoleBadgeStyle(user.role)} text-white text-xs font-medium px-3 py-1.5 rounded-full shadow-sm`}>
                    {user.role === 'admin' ? 'Admin' : 
                     user.role === 'worker' ? 'Trabajador' : 'Cliente'}
                  </span>
                </div>
                <div className="flex-1 text-sm text-[#6e6e6e]">
                  {new Date(user.created_at).toLocaleDateString()}
                </div>
                <div className="w-28 flex gap-2 justify-center">
                  <Link
                    to={`/admin/user/${user.user_id}/edit`}
                    className="w-9 h-9 rounded-full flex items-center justify-center bg-[#f7f9fb] hover:bg-[#e6e6e6] transition-colors"
                  >
                    <FiEdit2 className="w-4 h-4 text-[#6e6e6e]" />
                  </Link>
                  <button
                    onClick={() => handleDeleteClick(user.user_id)}
                    className="w-9 h-9 rounded-full flex items-center justify-center bg-[#f7f9fb] hover:bg-[#ffe5e5] hover:text-[#e53935] transition-colors"
                  >
                    <FiTrash2 className="w-4 h-4 text-[#e53935]" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="h-16 px-8 flex items-center justify-between bg-white border-t border-[#e0e0e0]">
            <div className="text-sm text-[#6e6e6e]">
              Mostrando {filteredUsers.length} de {users.length} resultados
            </div>
          </div>
        </div>
      </div>

      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={() => deleteUser(userToDelete)}
        title="Eliminar usuario"
        message="¿Estás seguro de que quieres eliminar este usuario? Esta acción no se puede deshacer."
      />
    </div>
  );
};

export default UsersPage;