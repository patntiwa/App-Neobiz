import { useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import PerformanceService from '@/services/performanceService';

export const usePerformanceMonitor = () => {
  const location = useLocation();
  const { user } = useAuth();

  const measurePerformance = useCallback(() => {
    // Mesurer le temps de chargement de la page
    if (window.performance && window.performance.timing) {
      const timing = window.performance.timing;
      const pageLoadTime = timing.loadEventEnd - timing.navigationStart;
      
      PerformanceService.trackMetric({
        name: 'pageLoadTime',
        value: pageLoadTime,
        path: location.pathname,
        userId: user?.id
      });
    }

    // Mesurer le First Contentful Paint
    const paintMetrics = performance.getEntriesByType('paint');
    const firstContentfulPaint = paintMetrics.find(
      ({ name }) => name === 'first-contentful-paint'
    );

    if (firstContentfulPaint) {
      PerformanceService.trackMetric({
        name: 'firstContentfulPaint',
        value: firstContentfulPaint.startTime,
        path: location.pathname,
        userId: user?.id
      });
    }

    // Mesurer les Web Vitals
    const webVitals = PerformanceService.getWebVitals();
    if (webVitals) {
      Object.entries(webVitals).forEach(([name, value]) => {
        if (value !== undefined) {
          PerformanceService.trackMetric({
            name,
            value,
            path: location.pathname,
            userId: user?.id
          });
        }
      });
    }
  }, [location.pathname, user?.id]);

  useEffect(() => {
    // Observer la performance au chargement
    window.addEventListener('load', measurePerformance);

    // Observer les changements de route
    measurePerformance();

    // Nettoyer
    return () => {
      window.removeEventListener('load', measurePerformance);
    };
  }, [location.pathname, measurePerformance]);

  // Fonction utilitaire pour marquer les points de performance importants
  const markPerformancePoint = useCallback((name: string, value?: number) => {
    if (performance.mark) {
      performance.mark(name);
    }

    if (value !== undefined) {
      PerformanceService.trackMetric({
        name,
        value,
        path: location.pathname,
        userId: user?.id
      });
    }
  }, [location.pathname, user?.id]);

  const getMetricsSummary = useCallback(() => {
    return PerformanceService.getMetricsSummary();
  }, []);

  return { 
    markPerformancePoint,
    getMetricsSummary
  };
};