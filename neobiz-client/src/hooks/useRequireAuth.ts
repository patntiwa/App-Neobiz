import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface UseRequireAuthOptions {
  redirectTo?: string;
  requiredRole?: 'admin' | 'client' | 'freelance';
}

export const useRequireAuth = (options: UseRequireAuthOptions = {}) => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { redirectTo = '/login', requiredRole } = options;

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        // Rediriger vers la page de connexion avec l'URL actuelle en state
        navigate(redirectTo, { state: { from: location }, replace: true });
      } else if (requiredRole && user.role !== requiredRole) {
        // Rediriger vers le dashboard approprié si le rôle ne correspond pas
        const dashboardPath = user.role === 'admin' ? '/admin/dashboard' : '/dashboard';
        navigate(dashboardPath, { replace: true });
      }
    }
  }, [user, isLoading, navigate, location, redirectTo, requiredRole]);

  return { user, isLoading };
};