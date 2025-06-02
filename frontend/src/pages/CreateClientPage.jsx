import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { toast } from 'sonner';
import PasswordInput from '../components/forms/PasswordInput';

const CreateClientPage = ({ className }) => {
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
    <div
      className={
        "bg-[#f7f9fb] flex flex-row gap-0 items-start justify-start h-[800px] relative " +
        className
      }
    >
      <div className="flex flex-col gap-0 items-start justify-start self-stretch flex-1 relative">
        <div className="border-solid border-[#e0e0e0] border-b pr-8 pl-8 flex flex-row items-center justify-between self-stretch shrink-0 h-16 relative">
          <div className="text-[#2c2c2c] text-left font-['Inter-Bold',_sans-serif] text-lg leading-[21.6px] font-bold relative">
            Registrar Nuevo Cliente{" "}
          </div>
        </div>
        <div className="p-8 flex flex-col gap-6 items-start justify-start self-stretch flex-1 relative">
          <form
            onSubmit={handleSubmit}
            className="bg-[#ffffff] rounded-xl p-8 flex flex-col gap-6 items-start justify-start self-stretch shrink-0 relative"
            style={{ boxShadow: "0px 2px 12px 0px rgba(0, 0, 0, 0.06)" }}
          >
            <div className="flex flex-col gap-2 items-start justify-start self-stretch shrink-0 relative">
              <div className="text-[#2c2c2c] text-left font-['Inter-SemiBold',_sans-serif] text-lg leading-[21.6px] font-semibold relative self-stretch">
                Información del Cliente{" "}
              </div>
              <div className="text-[#6e6e6e] text-left font-['Inter-Regular',_sans-serif] text-sm leading-[16.8px] font-normal relative self-stretch">
                Completa todos los campos para registrar un nuevo cliente{" "}
              </div>
            </div>
            <div className="flex flex-col gap-5 items-start justify-start self-stretch shrink-0 relative">
              <div className="flex flex-row gap-4 items-start justify-start self-stretch shrink-0 relative">
                <div className="flex flex-col gap-2 items-start justify-start flex-1 relative">
                  <div className="text-[#2c2c2c] text-left font-['Inter-Medium',_sans-serif] text-sm leading-[16.8px] font-medium relative self-stretch">
                    Nombre *{" "}
                  </div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="bg-[#ffffff] rounded-lg border-solid border-[#e0e0e0] border pr-4 pl-4 flex flex-row gap-0 items-center justify-start self-stretch shrink-0 h-12 relative"
                    placeholder="Introduce el nombre"
                    required
                  />
                </div>

              </div>
              <div className="flex flex-col gap-2 items-start justify-start self-stretch shrink-0 relative">
                <div className="text-[#2c2c2c] text-left font-['Inter-Medium',_sans-serif] text-sm leading-[16.8px] font-medium relative self-stretch">
                  Email *{" "}
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-[#ffffff] rounded-lg border-solid border-[#e0e0e0] border pr-4 pl-4 flex flex-row gap-0 items-center justify-start self-stretch shrink-0 h-12 relative"
                  placeholder="ejemplo@correo.com"
                  required
                />
              </div>
              <div className="flex flex-col gap-2 items-start justify-start self-stretch shrink-0 relative">
                <div className="text-[#2c2c2c] text-left font-['Inter-Medium',_sans-serif] text-sm leading-[16.8px] font-medium relative self-stretch">
                  Teléfono *{" "}
                </div>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="bg-[#ffffff] rounded-lg border-solid border-[#e0e0e0] border pr-4 pl-4 flex flex-row gap-0 items-center justify-start self-stretch shrink-0 h-12 relative"
                  placeholder="Introduce el teléfono"
                  required
                />
              </div>
              <div className="flex flex-col gap-2 items-start justify-start self-stretch shrink-0 relative">
                <div className="text-[#2c2c2c] text-left font-['Inter-Medium',_sans-serif] text-sm leading-[16.8px] font-medium relative self-stretch">
                  Dirección{" "}
                </div>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="bg-[#ffffff] rounded-lg border-solid border-[#e0e0e0] border pr-4 pl-4 flex flex-row gap-0 items-center justify-start self-stretch shrink-0 h-12 relative"
                  placeholder="Introduce la dirección completa"
                />
              </div>
              <div className="flex flex-row gap-4 items-start justify-start self-stretch shrink-0 relative">
                <div className="flex flex-col gap-2 items-start justify-start flex-1 relative">
                  <div className="text-[#2c2c2c] text-left font-['Inter-Medium',_sans-serif] text-sm leading-[16.8px] font-medium relative self-stretch">
                    Código Postal{" "}
                  </div>
                  <input
                    type="text"
                    name="postal_code"
                    value={formData.postal_code}
                    onChange={handleChange}
                    className="bg-[#ffffff] rounded-lg border-solid border-[#e0e0e0] border pr-4 pl-4 flex flex-row gap-0 items-center justify-start self-stretch shrink-0 h-12 relative"
                    placeholder="Introduce el código postal"
                  />
                </div>
                <div className="flex flex-col gap-2 items-start justify-start flex-1 relative">
                  <div className="text-[#2c2c2c] text-left font-['Inter-Medium',_sans-serif] text-sm leading-[16.8px] font-medium relative self-stretch">
                    DNI/NIF *{" "}
                  </div>
                  <input
                    type="text"
                    name="nif"
                    value={formData.nif}
                    onChange={handleChange}
                    className="bg-[#ffffff] rounded-lg border-solid border-[#e0e0e0] border pr-4 pl-4 flex flex-row gap-0 items-center justify-start self-stretch shrink-0 h-12 relative"
                    placeholder="Introduce el DNI/NIF"
                    required
                  />
                </div>
              </div>
              <div className="flex flex-row gap-4 items-start justify-start self-stretch shrink-0 relative">
                <div className="flex flex-col gap-2 items-start justify-start flex-1 relative">
                  <div className="text-[#2c2c2c] text-left font-['Inter-Medium',_sans-serif] text-sm leading-[16.8px] font-medium relative self-stretch">
                    Población *{" "}
                  </div>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="bg-[#ffffff] rounded-lg border-solid border-[#e0e0e0] border pr-4 pl-4 flex flex-row gap-0 items-center justify-start self-stretch shrink-0 h-12 relative"
                    placeholder="Introduce la población"
                    required
                  />
                </div>
                <div className="flex flex-col gap-2 items-start justify-start flex-1 relative">
                  <div className="text-[#2c2c2c] text-left font-['Inter-Medium',_sans-serif] text-sm leading-[16.8px] font-medium relative self-stretch">
                    Provincia{" "}
                  </div>
                  <input
                    type="text"
                    name="province"
                    value={formData.province}
                    onChange={handleChange}
                    className="bg-[#ffffff] rounded-lg border-solid border-[#e0e0e0] border pr-4 pl-4 flex flex-row gap-0 items-center justify-start self-stretch shrink-0 h-12 relative"
                    placeholder="Introduce la provincia"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2 items-start justify-start self-stretch shrink-0 relative">
                <div className="text-[#2c2c2c] text-left font-['Inter-Medium',_sans-serif] text-sm leading-[16.8px] font-medium relative self-stretch">
                  País *{" "}
                </div>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="bg-[#ffffff] rounded-lg border-solid border-[#e0e0e0] border pr-4 pl-4 flex flex-row gap-0 items-center justify-start self-stretch shrink-0 h-12 relative"
                  placeholder="Introduce el país"
                  required
                />
              </div>
              <div className="flex flex-row gap-4 items-start justify-start self-stretch shrink-0 relative">
                <div className="flex flex-col gap-2 items-start justify-start flex-1 relative">
                  <div className="text-[#2c2c2c] text-left font-['Inter-Medium',_sans-serif] text-sm leading-[16.8px] font-medium relative self-stretch">
                    Contraseña *
                  </div>
                  <div className="relative w-full">
                    <PasswordInput
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      show={showPassword}
                      onToggle={() => setShowPassword(!showPassword)}
                      placeholder="Introduce la contraseña"
                      className="bg-[#ffffff] rounded-lg border-solid border-[#e0e0e0] border pr-4 pl-4 flex flex-row gap-0 items-center justify-start self-stretch shrink-0 h-12 relative w-full"
                      required
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2 items-start justify-start flex-1 relative">
                  <div className="text-[#2c2c2c] text-left font-['Inter-Medium',_sans-serif] text-sm leading-[16.8px] font-medium relative self-stretch">
                    Confirmar Contraseña * 
                  </div>
                  <div className="relative w-full">
                    <PasswordInput
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      show={showConfirmPassword}
                      onToggle={() => setShowConfirmPassword(!showConfirmPassword)}
                      placeholder="Confirma la contraseña"
                      className="bg-[#ffffff] rounded-lg border-solid border-[#e0e0e0] border pr-4 pl-4 flex flex-row gap-0 items-center justify-start self-stretch shrink-0 h-12 relative w-full"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-row gap-4 items-center justify-end self-stretch shrink-0 relative">
              <button
                type="button"
                className="bg-[#ffffff] rounded-lg border-solid border-[#e0e0e0] border pr-4 pl-4 flex flex-row gap-0 items-center justify-center shrink-0 w-[120px] h-12 relative"
              >
                <div className="text-[#6e6e6e] text-left font-['Inter-SemiBold',_sans-serif] text-sm leading-[16.8px] font-semibold relative">
                  Cancelar{" "}
                </div>
              </button>
              <button
                type="submit"
                className="bg-[#005bac] rounded-lg pr-4 pl-4 flex flex-row gap-0 items-center justify-center shrink-0 w-[180px] h-12 relative"
              >
                <div className="text-[#ffffff] text-left font-['Inter-SemiBold',_sans-serif] text-sm leading-[16.8px] font-semibold relative">
                  Registrar Cliente{" "}
                </div>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateClientPage;
