// src/hooks/usePerformanceMonitor.ts

import { useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import PerformanceService from '@/services/performanceService';

export const usePerformanceMonitor = () => {
  const location = useLocation();
  const { user } = useAuth();

  // Mesure et envoie la métrique pageLoadTime une seule fois
  const measurePerformance = useCallback(() => {
    PerformanceService.trackMetric(user?.id);
  }, [user?.id]);

  useEffect(() => {
    // À l'événement 'load'
    window.addEventListener('load', measurePerformance);

    // Et immédiatement lors du mount (route change inclus)
    measurePerformance();

    return () => {
      window.removeEventListener('load', measurePerformance);
    };
  }, [location.pathname, measurePerformance]);

  // Pour marquer manuellement un point de performance
  const markPerformancePoint = useCallback((name: string) => {
    if (performance.mark) {
      performance.mark(name);
    }
  }, []);

  return {
    markPerformancePoint,
  };
};
