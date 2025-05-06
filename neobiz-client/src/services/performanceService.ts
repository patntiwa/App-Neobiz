interface PerformanceMetric {
  name: string;
  value: number;
  timestamp: number;
  path?: string;
  userId?: string;
}

class PerformanceService {
  private static metrics: PerformanceMetric[] = [];
  private static maxStoredMetrics = 100;

  static trackMetric(metric: Omit<PerformanceMetric, 'timestamp'>) {
    this.metrics.push({
      ...metric,
      timestamp: Date.now()
    });

    // Garder seulement les dernières métriques
    if (this.metrics.length > this.maxStoredMetrics) {
      this.metrics = this.metrics.slice(-this.maxStoredMetrics);
    }

    // En développement, log dans la console
    if (import.meta.env.DEV) {
      console.log('Performance metric:', metric);
    }

    // En production, on pourrait envoyer à un service d'analytics
    if (import.meta.env.PROD) {
      this.sendToAnalytics(metric);
    }
  }

  static getWebVitals() {
    if ('web-vital' in performance.getEntriesByType('navigation')) {
      const navigationEntry = performance.getEntriesByType('navigation')[0] as any;
      return {
        fcp: navigationEntry.firstContentfulPaint,
        lcp: navigationEntry.largestContentfulPaint,
        fid: navigationEntry.firstInputDelay,
        cls: navigationEntry.cumulativeLayoutShift,
      };
    }
    return null;
  }

  private static async sendToAnalytics(metric: PerformanceMetric) {
    // TODO: Implémenter l'envoi à un service d'analytics
    // Par exemple Google Analytics, Sentry, ou un service personnalisé
    try {
      // const response = await fetch('your-analytics-endpoint', {
      //   method: 'POST',
      //   body: JSON.stringify(metric),
      // });
    } catch (error) {
      console.error('Failed to send metric to analytics:', error);
    }
  }

  static getMetricsSummary() {
    if (this.metrics.length === 0) return null;

    const summary = this.metrics.reduce((acc, metric) => {
      if (!acc[metric.name]) {
        acc[metric.name] = {
          min: metric.value,
          max: metric.value,
          total: metric.value,
          count: 1,
        };
      } else {
        const current = acc[metric.name];
        current.min = Math.min(current.min, metric.value);
        current.max = Math.max(current.max, metric.value);
        current.total += metric.value;
        current.count += 1;
      }
      return acc;
    }, {} as Record<string, { min: number; max: number; total: number; count: number }>);

    // Calculer les moyennes
    Object.keys(summary).forEach(key => {
      const metric = summary[key];
      metric.average = metric.total / metric.count;
    });

    return summary;
  }
}

export default PerformanceService;