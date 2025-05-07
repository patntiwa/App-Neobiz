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
  login: (credentials: LoginCredentials) => Promise<{ success: boolean; message?: string }>;
  register: (data: RegisterData) => Promise<{ success: boolean; message?: string }>;
  logout: () => Promise<void>;
  updateUser: (data: Partial<User>) => Promise<void>;
  hasRole: (role: string) => boolean; // Ajout de la fonction hasRole
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

  // Fonction utilitaire pour vérifier si l'utilisateur a un rôle spécifique
  const hasRole = (roleName: string): boolean => {
    return state.user?.roles?.includes(roleName) ?? false;
  };

  const login = async (credentials: LoginCredentials) => {
    setState(prev => ({ ...prev, isLoading: true }));
    try {
      // 1. Récupération du cookie CSRF
      await axios.get(`${API_URL}/sanctum/csrf-cookie`, { withCredentials: true });
  
      // 2. Tentative de connexion
      const { data } = await axiosInstance.post<AuthResponse>('/auth/login', credentials);
  
      // 3. Vérification de la réponse
      if (!data?.user?.roles) {
        throw new Error('Réponse de connexion invalide : structure de données incorrecte');
      }
  
      // Debug: Afficher les données reçues
      console.log('Données utilisateur reçues:', data.user);
  
      // 4. Mise à jour de l'état
      setState(prev => ({ ...prev, user: data.user }));
  
      // 5. Détermination de la redirection
      const determineRedirectPath = (): string => {
        // Priorité à la redirection précédente si elle existe
        const fromPath = (location.state as any)?.from?.pathname;
        if (fromPath) {
          console.log('Redirection vers le chemin précédent:', fromPath);
          return fromPath;
        }
  
        // Hiérarchie des redirections par rôle
        const roleRedirects: Record<string, string> = {
          'super_admin': '/admin/dashboard',
          'admin': '/admin/dashboard',
          'project_manager': '/pm/dashboard',
          'freelancer': '/freelancer/projects',
          'client': '/dashboard',
          'accountant': '/accounting',
          'support_agent': '/support'
        };
  
        // Trouver le premier rôle correspondant
        for (const role of data.user.roles) {
          if (roleRedirects[role]) {
            console.log(`Redirection pour le rôle ${role}:`, roleRedirects[role]);
            return roleRedirects[role];
          }
        }
  
        // Fallback par défaut
        console.log('Redirection par défaut vers /dashboard');
        return '/dashboard';
      };
  
      // 6. Exécution de la redirection
      const redirectPath = determineRedirectPath();
      navigate(redirectPath, { replace: true });
  
      return { success: true };
  
    } catch (error: any) {
      // Gestion d'erreur améliorée
      let errorMessage = 'Échec de la connexion';
      
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || 
                      error.response?.data?.error ||
                      error.message;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
  
      console.error('Erreur de connexion:', errorMessage);
      return { success: false, message: errorMessage };
  
    } finally {
      setState(prev => ({ ...prev, isLoading: false }));
    }
  };


  const register = async (info: RegisterData) => {
    setState(prev => ({ ...prev, isLoading: true }));
    try {
      const { data } = await axiosInstance.post<AuthResponse>('/auth/register', info);
      if (data.user?.roles) {
        setState(prev => ({ ...prev, user: data.user }));
        navigate('/dashboard'); // Par défaut pour les nouveaux comptes
        return { success: true };
      }
      throw new Error('Réponse incomplète');
    } catch (error: any) {
      handleError(error);
      let specificMessage = "Échec de l'inscription. Veuillez vérifier les informations fournies.";
      if (axios.isAxiosError(error) && error.response?.data) {
        const responseData = error.response.data;
        // Si le backend renvoie un objet 'errors' (typique avec Laravel pour les erreurs de validation)
        if (responseData.errors && typeof responseData.errors === 'object') {
          specificMessage = Object.values(responseData.errors).flat().join(' ');
        } else if (responseData.message && typeof responseData.message === 'string') {
          specificMessage = responseData.message;
        }
      }
      return { success: false, message: specificMessage };
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
        hasRole, // Exposer hasRole dans le contexte
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
