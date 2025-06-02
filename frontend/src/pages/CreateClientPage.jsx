import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { toast } from 'sonner';
import PasswordInput from '../components/forms/PasswordInput';

const CreateClientPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    postal_code: '',
    city: '',
    province: '',
    country: 'España',
    nif: '',
    password: '',
    confirmPassword: '',
    role: 'client',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { registerClient } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar que las contraseñas coincidan
    if (formData.password !== formData.confirmPassword) {
      toast.error('Las contraseñas no coinciden');
      return;
    }

    const registrationResult = await registerClient(formData);

    if (registrationResult && registrationResult.success) {
      toast.success('Cliente registrado correctamente');
      setFormData({
        name: '',
        email: '',
        phone: '',
        address: '',
        postal_code: '',
        city: '',
        province: '',
        country: 'España',
        nif: '',
        password: '',
        confirmPassword: '',
        role: 'client',
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f9fb] p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {/* Header */}
          <div className="border-b border-[#e0e0e0] px-6 py-4">
            <h1 className="text-lg md:text-xl font-bold text-[#2c2c2c]">
              Registrar Nuevo Cliente
            </h1>
          </div>

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Grid responsive para campos */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Campos básicos */}
              <div className="space-y-4">
                <div className="form-group">
                  <label className="block text-sm font-medium text-[#2c2c2c] mb-2">
                    Nombre *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-[#e0e0e0] 
                    focus:ring-2 focus:ring-[#005bac] focus:border-transparent
                    transition-colors duration-200"
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="block text-sm font-medium text-[#2c2c2c] mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-[#e0e0e0] 
                    focus:ring-2 focus:ring-[#005bac] focus:border-transparent
                    transition-colors duration-200"
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="block text-sm font-medium text-[#2c2c2c] mb-2">
                    Teléfono *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-[#e0e0e0] 
                    focus:ring-2 focus:ring-[#005bac] focus:border-transparent
                    transition-colors duration-200"
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="block text-sm font-medium text-[#2c2c2c] mb-2">
                    Dirección
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-[#e0e0e0] 
                    focus:ring-2 focus:ring-[#005bac] focus:border-transparent
                    transition-colors duration-200"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="form-group">
                    <label className="block text-sm font-medium text-[#2c2c2c] mb-2">
                      Código Postal
                    </label>
                    <input
                      type="text"
                      name="postal_code"
                      value={formData.postal_code}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border border-[#e0e0e0] 
                      focus:ring-2 focus:ring-[#005bac] focus:border-transparent
                      transition-colors duration-200"
                    />
                  </div>
                  <div className="form-group">
                    <label className="block text-sm font-medium text-[#2c2c2c] mb-2">
                      DNI/NIF *
                    </label>
                    <input
                      type="text"
                      name="nif"
                      value={formData.nif}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border border-[#e0e0e0] 
                      focus:ring-2 focus:ring-[#005bac] focus:border-transparent
                      transition-colors duration-200"
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="form-group">
                    <label className="block text-sm font-medium text-[#2c2c2c] mb-2">
                      Población *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border border-[#e0e0e0] 
                      focus:ring-2 focus:ring-[#005bac] focus:border-transparent
                      transition-colors duration-200"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="block text-sm font-medium text-[#2c2c2c] mb-2">
                      Provincia
                    </label>
                    <input
                      type="text"
                      name="province"
                      value={formData.province}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border border-[#e0e0e0] 
                      focus:ring-2 focus:ring-[#005bac] focus:border-transparent
                      transition-colors duration-200"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label className="block text-sm font-medium text-[#2c2c2c] mb-2">
                    País *
                  </label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-[#e0e0e0] 
                    focus:ring-2 focus:ring-[#005bac] focus:border-transparent
                    transition-colors duration-200"
                    required
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="form-group">
                    <label className="block text-sm font-medium text-[#2c2c2c] mb-2">
                      Contraseña *
                    </label>
                    <div className="relative">
                      <PasswordInput
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        show={showPassword}
                        onToggle={() => setShowPassword(!showPassword)}
                        placeholder="Introduce la contraseña"
                        className="w-full px-4 py-2 rounded-lg border border-[#e0e0e0] 
                        focus:ring-2 focus:ring-[#005bac] focus:border-transparent
                        transition-colors duration-200"
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="block text-sm font-medium text-[#2c2c2c] mb-2">
                      Confirmar Contraseña *
                    </label>
                    <div className="relative">
                      <PasswordInput
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        show={showConfirmPassword}
                        onToggle={() => setShowConfirmPassword(!showConfirmPassword)}
                        placeholder="Confirma la contraseña"
                        className="w-full px-4 py-2 rounded-lg border border-[#e0e0e0] 
                        focus:ring-2 focus:ring-[#005bac] focus:border-transparent
                        transition-colors duration-200"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Botones con responsive */}
            <div className="flex flex-col sm:flex-row justify-end gap-4 pt-6">
              <button
                type="button"
                className="w-full sm:w-auto px-6 py-2 border border-[#e0e0e0] 
                rounded-lg text-[#6e6e6e] hover:bg-gray-50
                transition-colors duration-200"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-2 bg-[#005bac] text-white 
                rounded-lg hover:bg-[#004d91]
                transition-colors duration-200"
              >
                Registrar Cliente
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateClientPage;
