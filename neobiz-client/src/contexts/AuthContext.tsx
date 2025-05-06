// src/contexts/AuthContext.tsx

import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import axiosInstance from '@/lib/axiosInstance';
import { useApiError } from '@/hooks/useApiError';
import { reportPageLoadMetric } from '@/services/performanceService';
import type { User, AuthResponse, LoginCredentials, RegisterData } from '@/types/auth';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isInitialized: boolean;
}

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<{ success: boolean; message?: string; twoFactorRequired?: boolean }>;
  register: (data: RegisterData) => Promise<{ success: boolean; message?: string }>;
  logout: () => Promise<void>;
  updateUser: (data: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const INITIAL_STATE: AuthState = {
  user: null,
  isLoading: true,
  isInitialized: false,
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>(INITIAL_STATE);
  const navigate = useNavigate();
  const location = useLocation();
  const { handleError } = useApiError();

  const didInit = useRef(false);
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

  // Vérifie et met à jour l’état user
  const checkAuth = async (): Promise<boolean> => {
    try {
      const { data } = await axiosInstance.get<AuthResponse>('/user');
      setState(prev => ({ ...prev, user: data.user }));
      return true;
    } catch {
      setState(prev => ({ ...prev, user: null }));
      return false;
    }
  };

  // Initialisation CSRF + session + récupération user (une seule fois)
  useEffect(() => {
    if (didInit.current) return;
    const publicPaths = ['/login', '/signup'];
    if (publicPaths.includes(location.pathname)) {
      setState(prev => ({ ...prev, isInitialized: true, isLoading: false }));
      didInit.current = true;
      return;
    }

    didInit.current = true;
    setState(prev => ({ ...prev, isLoading: true }));

    (async () => {
      try {
        // 1) CSRF + session Laravel
        await axios.get(`${API_URL}/sanctum/csrf-cookie`, { withCredentials: true });
        // 2) Récupère l’utilisateur si la session est valide
        await checkAuth();
      } catch (error) {
        handleError(error);
        setState(prev => ({ ...prev, user: null }));
      } finally {
        setState(prev => ({ ...prev, isInitialized: true, isLoading: false }));
      }
    })();
  }, [location.pathname, handleError]);

  // Reporter la métrique de chargement une seule fois après init
  useEffect(() => {
    if (state.isInitialized) {
      reportPageLoadMetric(state.user?.id);
    }
  }, [state.isInitialized, state.user]);

  const login = async (credentials: LoginCredentials): Promise<{ success: boolean; message?: string; twoFactorRequired?: boolean }> => {
    setState(prev => ({ ...prev, isLoading: true }));
    try {
      // 0) Récupérer le cookie CSRF avant le login
      await axios.get(`${API_URL}/sanctum/csrf-cookie`, { withCredentials: true });

      // 1) Envoyer la requête de login avec le nouveau endpoint /auth/login
      // Utiliser `any` temporairement pour inspecter la réponse ou définir un type plus flexible
      // qui peut inclure des indicateurs 2FA et l'objet utilisateur.
      const { data } = await axiosInstance.post<any>('/auth/login', credentials);

      // Vérifier si la 2FA est requise (adaptez "data.two_factor_enabled" à votre réponse API réelle)
      if (data && data.two_factor_enabled === true) {
        // Rediriger vers la page de vérification 2FA.
        // Vous pourriez avoir besoin de stocker temporairement un identifiant ou un jeton si l'API le fournit pour l'étape 2FA.
        navigate('/TwoFactorAuth'); // Assurez-vous que cette route existe et mène à votre composant de saisie de code 2FA.
        return { success: true, twoFactorRequired: true, message: data.message || "Vérification en deux étapes requise." };
      }

      // Si la connexion est directe et réussie (pas de 2FA ou 2FA déjà passée)
      if (data && data.user) {
        setState(prev => ({ ...prev, user: data.user }));

        // Appel de getClientsRequest() après connexion réussie (si nécessaire)
        // getClientsRequest(); 

        const from = (location.state as any)?.from?.pathname
          || (data.user.role === 'admin' ? '/admin/dashboard' : '/dashboard');
        navigate(from, { replace: true });
        return { success: true };
      }
      
      // Si la réponse est 200 OK mais n'a ni indicateur 2FA ni objet utilisateur valide
      throw new Error("Réponse de connexion inattendue du serveur.");

    } catch (error: any) { // Utilisation de 'any' pour un accès flexible à error.response.data
      handleError(error);
      const message = error?.response?.data?.message || error.message || 'Échec de la connexion';
      return { success: false, message };
    } finally {
      setState(prev => ({ ...prev, isLoading: false }));
    }
  };

  const register = async (info: RegisterData) => {
    setState(prev => ({ ...prev, isLoading: true }));
    try {
      const { data } = await axiosInstance.post<AuthResponse>('/auth/register', info);
      setState(prev => ({ ...prev, user: data.user }));
      navigate('/dashboard');
      return { success: true };
    } catch (error) {
      handleError(error);
      return { success: false, message: "Échec de l'inscription" };
    } finally {
      setState(prev => ({ ...prev, isLoading: false }));
    }
  };

  const logout = async () => {
    setState(prev => ({ ...prev, isLoading: true }));
    try {
      await axiosInstance.post('/auth/logout');
      setState(prev => ({ ...prev, user: null }));
      navigate('/login');
    } catch (error) {
      handleError(error);
    } finally {
      setState(prev => ({ ...prev, isLoading: false }));
    }
  };

  const updateUser = async (info: Partial<User>) => {
    setState(prev => ({ ...prev, isLoading: true }));
    try {
      const { data } = await axiosInstance.patch<AuthResponse>('/user', info);
      setState(prev => ({ ...prev, user: data.user }));
    } catch (error) {
      handleError(error);
    } finally {
      setState(prev => ({ ...prev, isLoading: false }));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isLoading: state.isLoading,
        isInitialized: state.isInitialized,
        login,
        register,
        logout,
        updateUser,
      }}
    >
      {state.isInitialized ? children : null}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
