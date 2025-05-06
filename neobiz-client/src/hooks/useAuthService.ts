import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useApiError } from './useApiError';
import * as AuthService from '@/services/authService';

export const useAuthService = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { handleError } = useApiError();
  const { setUser } = useAuth();

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await AuthService.login({ email, password });
      setUser(response.user);
      
      // Redirection basée sur le rôle
      if (response.user.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/dashboard');
      }
      
      return { success: true };
    } catch (error) {
      handleError(error, 'Échec de la connexion');
      return { success: false, error };
    } finally {
      setIsLoading(false);
    }
  }, [navigate, handleError, setUser]);

  const register = useCallback(async (data: {
    email: string;
    name: string;
    password: string;
  }) => {
    setIsLoading(true);
    try {
      const response = await AuthService.register(data);
      navigate('/login', { 
        state: { message: 'Inscription réussie. Vous pouvez maintenant vous connecter.' }
      });
      return { success: true };
    } catch (error) {
      handleError(error, "L'inscription a échoué");
      return { success: false, error };
    } finally {
      setIsLoading(false);
    }
  }, [navigate, handleError]);

  const logout = useCallback(async () => {
    try {
      await AuthService.logout();
      setUser(null);
      navigate('/login');
    } catch (error) {
      handleError(error, 'La déconnexion a échoué');
    }
  }, [navigate, handleError, setUser]);

  return {
    login,
    register,
    logout,
    isLoading
  };
};