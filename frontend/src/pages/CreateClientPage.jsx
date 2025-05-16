const CreateClientPage = ({ className }) => {
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
          <div
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
                  <div className="bg-[#ffffff] rounded-lg border-solid border-[#e0e0e0] border pr-4 pl-4 flex flex-row gap-0 items-center justify-start self-stretch shrink-0 h-12 relative">
                    <div className="text-[#6e6e6e] text-left font-['Inter-Regular',_sans-serif] text-sm leading-[16.8px] font-normal relative">
                      Introduce el nombre{" "}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2 items-start justify-start flex-1 relative">
                  <div className="text-[#2c2c2c] text-left font-['Inter-Medium',_sans-serif] text-sm leading-[16.8px] font-medium relative self-stretch">
                    Apellidos *{" "}
                  </div>
                  <div className="bg-[#ffffff] rounded-lg border-solid border-[#e0e0e0] border pr-4 pl-4 flex flex-row gap-0 items-center justify-start self-stretch shrink-0 h-12 relative">
                    <div className="text-[#6e6e6e] text-left font-['Inter-Regular',_sans-serif] text-sm leading-[16.8px] font-normal relative">
                      Introduce los apellidos{" "}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-row gap-4 items-start justify-start self-stretch shrink-0 relative">
                <div className="flex flex-col gap-2 items-start justify-start flex-1 relative">
                  <div className="text-[#2c2c2c] text-left font-['Inter-Medium',_sans-serif] text-sm leading-[16.8px] font-medium relative self-stretch">
                    Email *{" "}
                  </div>
                  <div className="bg-[#ffffff] rounded-lg border-solid border-[#e0e0e0] border pr-4 pl-4 flex flex-row gap-0 items-center justify-start self-stretch shrink-0 h-12 relative">
                    <div className="text-[#6e6e6e] text-left font-['Inter-Regular',_sans-serif] text-sm leading-[16.8px] font-normal relative">
                      ejemplo@correo.com{" "}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2 items-start justify-start flex-1 relative">
                  <div className="text-[#2c2c2c] text-left font-['Inter-Medium',_sans-serif] text-sm leading-[16.8px] font-medium relative self-stretch">
                    Teléfono *{" "}
                  </div>
                  <div className="bg-[#ffffff] rounded-lg border-solid border-[#e0e0e0] border pr-4 pl-4 flex flex-row gap-0 items-center justify-start self-stretch shrink-0 h-12 relative">
                    <div className="text-[#6e6e6e] text-left font-['Inter-Regular',_sans-serif] text-sm leading-[16.8px] font-normal relative">
                      Introduce el teléfono{" "}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2 items-start justify-start self-stretch shrink-0 relative">
                <div className="text-[#2c2c2c] text-left font-['Inter-Medium',_sans-serif] text-sm leading-[16.8px] font-medium relative self-stretch">
                  Dirección{" "}
                </div>
                <div className="bg-[#ffffff] rounded-lg border-solid border-[#e0e0e0] border pr-4 pl-4 flex flex-row gap-0 items-center justify-start self-stretch shrink-0 h-12 relative">
                  <div className="text-[#6e6e6e] text-left font-['Inter-Regular',_sans-serif] text-sm leading-[16.8px] font-normal relative">
                    Introduce la dirección completa{" "}
                  </div>
                </div>
              </div>
              <div className="flex flex-row gap-4 items-start justify-start self-stretch shrink-0 relative">
                <div className="flex flex-col gap-2 items-start justify-start flex-1 relative">
                  <div className="text-[#2c2c2c] text-left font-['Inter-Medium',_sans-serif] text-sm leading-[16.8px] font-medium relative self-stretch">
                    Población *{" "}
                  </div>
                  <div className="bg-[#ffffff] rounded-lg border-solid border-[#e0e0e0] border pr-4 pl-4 flex flex-row gap-0 items-center justify-start self-stretch shrink-0 h-12 relative">
                    <div className="text-[#6e6e6e] text-left font-['Inter-Regular',_sans-serif] text-sm leading-[16.8px] font-normal relative">
                      Introduce la población{" "}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2 items-start justify-start flex-1 relative">
                  <div className="text-[#2c2c2c] text-left font-['Inter-Medium',_sans-serif] text-sm leading-[16.8px] font-medium relative self-stretch">
                    Código Postal{" "}
                  </div>
                  <div className="bg-[#ffffff] rounded-lg border-solid border-[#e0e0e0] border pr-4 pl-4 flex flex-row gap-0 items-center justify-start self-stretch shrink-0 h-12 relative">
                    <div className="text-[#6e6e6e] text-left font-['Inter-Regular',_sans-serif] text-sm leading-[16.8px] font-normal relative">
                      Introduce el código postal{" "}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-row gap-4 items-center justify-end self-stretch shrink-0 relative">
              <div className="bg-[#ffffff] rounded-lg border-solid border-[#e0e0e0] border pr-4 pl-4 flex flex-row gap-0 items-center justify-center shrink-0 w-[120px] h-12 relative">
                <div className="text-[#6e6e6e] text-left font-['Inter-SemiBold',_sans-serif] text-sm leading-[16.8px] font-semibold relative">
                  Cancelar{" "}
                </div>
              </div>
              <div className="bg-[#005bac] rounded-lg pr-4 pl-4 flex flex-row gap-0 items-center justify-center shrink-0 w-[180px] h-12 relative">
                <div className="text-[#ffffff] text-left font-['Inter-SemiBold',_sans-serif] text-sm leading-[16.8px] font-semibold relative">
                  Registrar Cliente{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateClientPage;