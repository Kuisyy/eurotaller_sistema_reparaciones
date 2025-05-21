import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { FiEye, FiEyeOff } from "react-icons/fi";
// Importamos los iconos que necesitamos
import { FiUsers, FiTool, FiUser } from "react-icons/fi";

const CreateUserPage = () => {
  const navigate = useNavigate();
  const { register, authError } = useAuth();
  const [selectedRole, setSelectedRole] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
    // Campos para cliente
    address: "",
    postal_code: "",
    city: "",
    province: "",
    country: "España",
    nif: "",
    phone: "",
    // Campos para trabajador
    worker_role: "",
    // Estado común
    isActive: true
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState(null);

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setFormData(prev => ({ ...prev, role }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      if (formData.password !== formData.confirmPassword) {
        setError("Las contraseñas no coinciden");
        return;
      }

      // Preparar los datos según el rol seleccionado
      let dataToSend = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        isActive: formData.isActive
      };

      // Añadir campos específicos según el rol
      if (selectedRole === 'client') {
        dataToSend = {
          ...dataToSend,
          phone: formData.phone,
          nif: formData.nif,
          address: formData.address,
          postal_code: formData.postal_code,
          city: formData.city,
          province: formData.province,
          country: formData.country
        };
      } else if (selectedRole === 'worker') {
        dataToSend = {
          ...dataToSend,
          worker_role: formData.worker_role
        };
      }

      await register(dataToSend);
      navigate('/admin/users');
    } catch (err) {
      setError(err.message || authError);
    }
  };

  const renderClientFields = () => (
    <>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-[#2c2c2c]">
            Teléfono *
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="h-12 px-4 rounded-lg border border-[#e0e0e0] focus:outline-none focus:border-[#005bac]"
            placeholder="Introduce el teléfono"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-[#2c2c2c]">
            DNI/NIF *
          </label>
          <input
            type="text"
            name="nif"
            value={formData.nif}
            onChange={handleInputChange}
            className="h-12 px-4 rounded-lg border border-[#e0e0e0] focus:outline-none focus:border-[#005bac]"
            placeholder="Introduce el DNI/NIF"
            required
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-[#2c2c2c]">
            Dirección
          </label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            className="h-12 px-4 rounded-lg border border-[#e0e0e0] focus:outline-none focus:border-[#005bac]"
            placeholder="Introduce la dirección"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-[#2c2c2c]">
            Código Postal
          </label>
          <input
            type="text"
            name="postal_code"
            value={formData.postal_code}
            onChange={handleInputChange}
            className="h-12 px-4 rounded-lg border border-[#e0e0e0] focus:outline-none focus:border-[#005bac]"
            placeholder="Introduce el código postal"
          />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-[#2c2c2c]">
            Ciudad
          </label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            className="h-12 px-4 rounded-lg border border-[#e0e0e0] focus:outline-none focus:border-[#005bac]"
            placeholder="Introduce la ciudad"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-[#2c2c2c]">
            Provincia
          </label>
          <input
            type="text"
            name="province"
            value={formData.province}
            onChange={handleInputChange}
            className="h-12 px-4 rounded-lg border border-[#e0e0e0] focus:outline-none focus:border-[#005bac]"
            placeholder="Introduce la provincia"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-[#2c2c2c]">
            País
          </label>
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleInputChange}
            className="h-12 px-4 rounded-lg border border-[#e0e0e0] focus:outline-none focus:border-[#005bac]"
            placeholder="Introduce el país"
          />
        </div>
      </div>
    </>
  );

  const renderWorkerFields = () => (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-[#2c2c2c]">
        Rol del trabajador *
      </label>
      <select
        name="worker_role"
        value={formData.worker_role}
        onChange={handleInputChange}
        className="h-12 px-4 rounded-lg border border-[#e0e0e0] focus:outline-none focus:border-[#005bac]"
        required
      >
        <option value="">Selecciona un rol</option>
        <option value="mecanico">Mecánico</option>
        <option value="administrativo">Administrativo</option>
        <option value="electricista">Electricista</option>
      </select>
    </div>
  );

  return (
    <div className="bg-[#ffffff] rounded-xl p-8 flex flex-col gap-8 items-start justify-start self-stretch relative shadow-sm">
      {/* Header */}
      <div className="flex flex-col gap-2 items-start justify-start self-stretch">
        <h1 className="text-[#2c2c2c] text-lg font-semibold">
          Crear Nuevo Usuario
        </h1>
        <p className="text-[#6e6e6e] text-sm">
          Selecciona el tipo de usuario que deseas crear
        </p>
      </div>

      {/* Role Selection - Always visible */}
      <div className="flex flex-col gap-5 w-full">
        <h2 className="text-[#2c2c2c] text-base font-semibold">
          Tipo de Usuario
        </h2>
        <div className="grid grid-cols-3 gap-4">
          {[
            { 
              id: 'admin', 
              label: 'Administrador', 
              color: 'bg-[#005bac]', 
              icon: FiUsers 
            },
            { 
              id: 'worker', 
              label: 'Trabajador', 
              color: 'bg-[#0082c8]', 
              icon: FiTool 
            },
            { 
              id: 'client', 
              label: 'Cliente', 
              color: 'bg-[#6e6e6e]', 
              icon: FiUser 
            }
          ].map(role => (
            <button
              key={role.id}
              onClick={() => handleRoleSelect(role.id)}
              className={`flex items-center gap-3 p-4 rounded-lg border transition-all
                ${selectedRole === role.id 
                  ? `${role.color} text-white border-transparent` 
                  : 'border-[#e0e0e0] hover:border-[#005bac] hover:bg-[#f7f9fb]'
                }`}
            >
              <div className={`${role.color} rounded-xl w-8 h-8 flex items-center justify-center`}>
                <role.icon className="w-4 h-4 text-white" />
              </div>
              <span className="font-medium">{role.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Form - Shows when role is selected */}
      {selectedRole && (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full">
          {error && (
            <div className="bg-red-50 text-red-500 p-4 rounded-lg">
              {error}
            </div>
          )}

          {/* Common Fields */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-[#2c2c2c]">
                Nombre *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="h-12 px-4 rounded-lg border border-[#e0e0e0] focus:outline-none focus:border-[#005bac]"
                placeholder="Introduce el nombre"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-[#2c2c2c]">
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="h-12 px-4 rounded-lg border border-[#e0e0e0] focus:outline-none focus:border-[#005bac]"
                placeholder="ejemplo@correo.com"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-[#2c2c2c]">
                Contraseña *
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full h-12 px-4 rounded-lg border border-[#e0e0e0] focus:outline-none focus:border-[#005bac]"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6e6e6e]"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-[#2c2c2c]">
                Confirmar Contraseña *
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full h-12 px-4 rounded-lg border border-[#e0e0e0] focus:outline-none focus:border-[#005bac]"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6e6e6e]"
                >
                  {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>
          </div>

          {/* Role Specific Fields */}
          {selectedRole === 'client' && renderClientFields()}
          {selectedRole === 'worker' && renderWorkerFields()}

          {/* Form Actions */}
          <div className="flex justify-end gap-4 pt-4 border-t border-[#e0e0e0]">
            <button
              type="button"
              onClick={() => navigate('/admin/users')}
              className="px-6 h-12 rounded-lg border border-[#e0e0e0] text-[#6e6e6e] font-semibold"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-8 h-12 rounded-lg bg-[#005bac] text-white font-semibold hover:bg-[#004d91]"
            >
              Crear Usuario
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default CreateUserPage;
