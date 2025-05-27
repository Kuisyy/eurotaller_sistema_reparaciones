import React from 'react';
import { ClipLoader } from 'react-spinners';  // Cambiamos la importación

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center min-h-[400px]">
      <ClipLoader color="#005bac" size={40} />
    </div>
  );
};

export default LoadingSpinner;