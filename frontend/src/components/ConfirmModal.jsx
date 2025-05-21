import React from 'react';

const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-[400px] shadow-lg">
        <h3 className="text-lg font-semibold text-[#2c2c2c] mb-2">
          {title || "Confirmar acción"}
        </h3>
        <p className="text-[#6e6e6e] mb-6">
          {message || "¿Estás seguro de que quieres realizar esta acción?"}
        </p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-[#e0e0e0] rounded-lg text-[#6e6e6e] hover:bg-[#f7f9fb]"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-[#e53935] text-white rounded-lg hover:bg-[#d32f2f]"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;