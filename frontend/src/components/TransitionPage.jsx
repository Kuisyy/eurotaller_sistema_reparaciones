import { useState, useEffect } from 'react';

const TransitionPage = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Pequeño delay para asegurar la animación
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 50);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`
        transform transition-all duration-300 ease-out
        ${isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-4'
        }
      `}
    >
      {children}
    </div>
  );
};

export default TransitionPage;