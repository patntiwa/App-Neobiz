import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface UsePageTransitionOptions {
  timeout?: number;
}

export const usePageTransition = ({ timeout = 300 }: UsePageTransitionOptions = {}) => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsTransitioning(true);
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, timeout);

    return () => clearTimeout(timer);
  }, [location.pathname, timeout]);

  return { isTransitioning };
};