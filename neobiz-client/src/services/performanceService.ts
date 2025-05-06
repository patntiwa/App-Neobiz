// src/services/performanceService.ts

/**
 * Permet d'envoyer une métrique de performance de chargement de page une seule fois.
 */

let didReport = false;

export interface PerformanceMetric {
  /** Nom de la métrique (ex: 'pageLoadTime') */
  name: string;
  /** Durée en millisecondes */
  value: number;
  /** Chemin courant (window.location.pathname) */
  path: string;
  /** Identifiant utilisateur (optionnel) */
  userId?: string;
}

/**
 * Mesure et reporte la métrique 'pageLoadTime'.
 * Ne fait rien si déjà appelé une fois.
 *
 * @param userId - Optionnel, identifiant de l'utilisateur
 */
export function reportPageLoadMetric(userId?: string): void {
  if (didReport) return;
  didReport = true;

  // Navigation Timing API Level 2
  const entries = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
  const navEntry = entries[0];
  if (!navEntry) return;

  // Calcul positif et fiable du temps de chargement
  const pageLoadTime = navEntry.loadEventEnd - navEntry.startTime;

  const metric: PerformanceMetric = {
    name: 'pageLoadTime',
    value: pageLoadTime,
    path: window.location.pathname,
    userId,
  };

  // Ici, tu peux envoyer la métrique à ton back,
  // ou juste logger en dev :
  console.log('Performance metric:', metric);
}

/**
 * Alias pour compatibilité avec usePerformanceMonitor.ts
 */
export const trackMetric = reportPageLoadMetric;

/**
 * Default export: objet contenant les deux fonctions
 * pour permettre `import perfService from ...`
 */
export default {
  reportPageLoadMetric,
  trackMetric,
};
