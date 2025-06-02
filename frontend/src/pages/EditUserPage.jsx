import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import LoadingSpinner from '../components/LoadingSpinner';
import useEditUser from '../hooks/useEditUser';

const EditUserPage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  
  const {
    formData,
    setFormData,
    loading,
    error,
    updateUser
  } = useEditUser(userId);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateUser(formData);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="bg-white rounded-xl p-4 sm:p-8 shadow-md">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-[#2c2c2c] mb-2">
          Editar Usuario
        </h2>
        <p className="text-[#6e6e6e]">
          Modifique los datos del usuario
        </p>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {/* Campos comunes */}
          <div>
            <label className="block text-sm font-medium text-[#2c2c2c] mb-2">
              Nombre
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full border border-[#e0e0e0] rounded-lg px-4 py-3"
              placeholder="Dejar vacío para no cambiar"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#2c2c2c] mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full border border-[#e0e0e0] rounded-lg px-4 py-3"
              placeholder="Dejar vacío para no cambiar"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#2c2c2c] mb-2">
              Nueva Contraseña
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full border border-[#e0e0e0] rounded-lg px-4 py-3 pr-10"
                placeholder="Dejar en blanco para mantener la actual"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                {showPassword ? <FiEyeOff className="w-5 h-5 text-[#6e6e6e]" /> : <FiEye className="w-5 h-5 text-[#6e6e6e]" />}
              </button>
            </div>
          </div>

          {/* Campos específicos de cliente */}
          {formData.role === 'client' && (
            <>
              <div className="sm:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-sm font-medium text-[#2c2c2c] mb-2">
                    DNI/NIF
                  </label>
                  <input
                    type="text"
                    name="nif"
                    value={formData.nif}
                    onChange={handleInputChange}
                    className="w-full border border-[#e0e0e0] rounded-lg px-4 py-3"
                    placeholder="Dejar vacío para no cambiar"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#2c2c2c] mb-2">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full border border-[#e0e0e0] rounded-lg px-4 py-3"
                    placeholder="Dejar vacío para no cambiar"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-[#2c2c2c] mb-2">
                    Dirección
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full border border-[#e0e0e0] rounded-lg px-4 py-3"
                    placeholder="Dejar vacío para no cambiar"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#2c2c2c] mb-2">
                    Código Postal
                  </label>
                  <input
                    type="text"
                    name="postal_code"
                    value={formData.postal_code}
                    onChange={handleInputChange}
                    className="w-full border border-[#e0e0e0] rounded-lg px-4 py-3"
                    placeholder="Dejar vacío para no cambiar"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#2c2c2c] mb-2">
                    Ciudad
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full border border-[#e0e0e0] rounded-lg px-4 py-3"
                    placeholder="Dejar vacío para no cambiar"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#2c2c2c] mb-2">
                    Provincia
                  </label>
                  <input
                    type="text"
                    name="province"
                    value={formData.province}
                    onChange={handleInputChange}
                    className="w-full border border-[#e0e0e0] rounded-lg px-4 py-3"
                    placeholder="Dejar vacío para no cambiar"
                  />
                </div>
              </div>
            </>
          )}

          {/* Campos específicos de trabajador */}
          {formData.role === 'worker' && (
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-[#2c2c2c] mb-2">
                Rol del trabajador
              </label>
              <select
                name="worker_role"
                value={formData.worker_role}
                onChange={handleInputChange}
                className="w-full border border-[#e0e0e0] rounded-lg px-4 py-3"
              >
                <option value="">Sin cambios</option>
                <option value="mecanico">Mecánico</option>
                <option value="administrativo">Administrativo</option>
                <option value="electricista">Electricista</option>
              </select>
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row justify-end gap-4 pt-6">
          <button
            type="button"
            onClick={() => navigate('/admin/users')}
            className="w-full sm:w-auto px-6 py-2 border border-[#e0e0e0] rounded-lg text-[#6e6e6e]"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-2 bg-[#005bac] text-white rounded-lg hover:bg-[#004d91]"
          >
            Guardar Cambios
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditUserPage;