import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

// Routes communes qui devraient être préchargées
const commonRoutes = {
  dashboard: () => import('../pages/Dashboard'),
  settings: () => import('../pages/dashboard/Settings'),
  profile: () => import('../pages/dashboard/Profile'),
};

// Routes spécifiques à l'admin
const adminRoutes = {
  adminDashboard: () => import('../pages/AdminDashboard'),
  users: () => import('../pages/admin/Users'),
  statistics: () => import('../pages/admin/Statistics'),
};

export const usePrefetchRoutes = (role: 'admin' | 'client' | 'freelance' = 'client') => {
  const location = useLocation();
  const navigate = useNavigate();

  // Précharger les routes en fonction du rôle
  useEffect(() => {
    const routesToPrefetch = {
      ...commonRoutes,
      ...(role === 'admin' ? adminRoutes : {}),
    };

    // Utiliser les modules dynamiques uniquement en production
    if (import.meta.env.PROD) {
      Object.values(routesToPrefetch).forEach(routeModule => {
        // Précharger la route mais ne pas l'exécuter
        routeModule().then(() => {
          // Route préchargée avec succès
        }).catch(error => {
          console.error('Failed to prefetch route:', error);
        });
      });
    }
  }, [role]);

  // Observer les liens dans la page pour le préchargement
  const observeLinks = () => {
    const links = document.querySelectorAll('a[href^="/"]');
    
    links.forEach(link => {
      const href = link.getAttribute('href');
      if (!href) return;

      // Créer un observateur pour chaque lien
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              // Précharger la route quand le lien est visible
              const path = href.split('?')[0];
              import(`../pages${path}`).catch(() => {
                // Ignorer les erreurs de préchargement
              });
              // Arrêter d'observer une fois préchargé
              observer.unobserve(entry.target);
            }
          });
        },
        { rootMargin: '50px' }
      );

      observer.observe(link);
    });
  };

  return { observeLinks };
};