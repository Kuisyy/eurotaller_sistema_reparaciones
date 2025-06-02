import { useState, useEffect } from 'react';

const TransitionPage = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div
      className={`transform transition-all duration-300 ease-in-out
      ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
    >
      {children}
    </div>
  );
};

export default TransitionPage;