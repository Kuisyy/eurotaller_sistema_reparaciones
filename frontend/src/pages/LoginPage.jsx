const LoginPage = ({ className }) => {
  return (
    <div
      className={
        "bg-[#f7f9fb] flex flex-col gap-0 items-center justify-center h-screen w-screen relative " +
        className
      }
    >
      <div
        className="bg-[#ffffff] rounded-xl p-8 flex flex-col gap-6 items-start justify-start shrink-0 w-[420px] relative"
        style={{ boxShadow: "0px 4px 20px 0px rgba(0, 0, 0, 0.06)" }}
      >
        <div className="flex flex-col gap-2 items-center justify-center self-stretch shrink-0 relative">
          <div className="flex flex-row gap-3 items-center justify-center self-stretch shrink-0 relative">
            <img
              className="shrink-0 w-10 h-10 relative overflow-visible"
              src="logo-icon0.svg"
            />
            <div className="text-[#005bac] text-left font-['Inter-Bold',_sans-serif] text-2xl leading-[28.8px] font-bold relative">
              EuroTaller{" "}
            </div>
          </div>
          <div className="text-[#6e6e6e] text-center font-['Inter-Regular',_sans-serif] text-base leading-[19.2px] font-normal relative self-stretch">
            Accede a tu cuenta{" "}
          </div>
        </div>
        <div className="flex flex-col gap-4 items-start justify-start self-stretch shrink-0 relative">
          <div className="flex flex-col gap-2 items-start justify-start self-stretch shrink-0 relative">
            <div className="text-[#2c2c2c] text-left font-['Inter-Medium',_sans-serif] text-sm leading-[16.8px] font-medium relative self-stretch">
              Correo electrónico{" "}
            </div>
            <div className="bg-[#ffffff] rounded-lg border-solid border-[#e0e0e0] border pr-4 pl-4 flex flex-row gap-0 items-center justify-start self-stretch shrink-0 h-12 relative">
              <div className="text-[#6e6e6e] text-left font-['Inter-Regular',_sans-serif] text-sm leading-[16.8px] font-normal relative">
                ejemplo@correo.com{" "}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 items-start justify-start self-stretch shrink-0 relative">
            <div className="text-[#2c2c2c] text-left font-['Inter-Medium',_sans-serif] text-sm leading-[16.8px] font-medium relative self-stretch">
              Contraseña{" "}
            </div>
            <div className="bg-[#ffffff] rounded-lg border-solid border-[#e0e0e0] border pr-4 pl-4 flex flex-row gap-0 items-center justify-start self-stretch shrink-0 h-12 relative">
              <div className="text-[#6e6e6e] text-left font-['Inter-Regular',_sans-serif] text-sm leading-[16.8px] font-normal relative">
                ••••••••{" "}
              </div>
            </div>
          </div>
          <div className="flex flex-row gap-2 items-center justify-start self-stretch shrink-0 relative">
            <div className="bg-[#ffffff] rounded border-solid border-[#e0e0e0] border flex flex-row gap-0 items-center justify-center shrink-0 w-5 h-5 relative"></div>
            <div className="text-[#6e6e6e] text-left font-['Inter-Regular',_sans-serif] text-sm leading-[16.8px] font-normal relative">
              Recordar sesión{" "}
            </div>
          </div>
          <div className="bg-[#005bac] rounded-lg flex flex-row gap-0 items-center justify-center self-stretch shrink-0 h-12 relative">
            <div className="text-[#ffffff] text-left font-['Inter-SemiBold',_sans-serif] text-base leading-[19.2px] font-semibold relative">
              Iniciar sesión{" "}
            </div>
          </div>
          <div className="text-[#0082c8] text-center font-['Inter-Regular',_sans-serif] text-sm leading-[16.8px] font-normal relative self-stretch">
            ¿Olvidaste tu contraseña?{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;