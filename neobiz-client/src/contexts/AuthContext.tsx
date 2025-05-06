import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axiosInstance from '@/lib/axiosInstance';
import { useApiError } from '@/hooks/useApiError';
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
  checkAuth: () => Promise<boolean>;
  updateUser: (data: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const INITIAL_STATE: AuthState = {
  user: null,
  isLoading: true,
  isInitialized: false
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>(INITIAL_STATE);
  const navigate = useNavigate();
  const location = useLocation();
  const { handleError } = useApiError();

  const checkAuth = async (): Promise<boolean> => {
    try {
      const response = await axiosInstance.get<AuthResponse>('/user');
      setState(prev => ({ 
        ...prev, 
        user: response.data.user,
        isInitialized: true
      }));
      return true;
    } catch (error) {
      setState(prev => ({ 
        ...prev, 
        user: null,
        isInitialized: true
      }));
      return false;
    }
  };

  useEffect(() => {
    const initAuth = async () => {
      setState(prev => ({ ...prev, isLoading: true }));
      try {
        await checkAuth();
      } catch (error) {
        handleError(error);
      } finally {
        setState(prev => ({ ...prev, isLoading: false }));
      }
    };

    initAuth();
  }, []);

  const login = async (credentials: LoginCredentials) => {
    try {
      setState(prev => ({ ...prev, isLoading: true }));
      const response = await axiosInstance.post<AuthResponse>('/auth/login', credentials);
      setState(prev => ({ ...prev, user: response.data.user }));

      // Récupérer l'URL de redirection depuis l'état de location s'il existe
      const from = (location.state as any)?.from?.pathname || 
        (response.data.user.role === 'admin' ? '/admin/dashboard' : '/dashboard');
      
      navigate(from, { replace: true });
      return { success: true };
    } catch (error) {
      handleError(error);
      return { success: false, message: 'Échec de la connexion' };
    } finally {
      setState(prev => ({ ...prev, isLoading: false }));
    }
  };

  const register = async (data: RegisterData) => {
    try {
      setState(prev => ({ ...prev, isLoading: true }));
      const response = await axiosInstance.post<AuthResponse>('/auth/register', data);
      setState(prev => ({ ...prev, user: response.data.user }));
      
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
    try {
      setState(prev => ({ ...prev, isLoading: true }));
      await axiosInstance.post('/auth/logout');
      setState(prev => ({ ...prev, user: null }));
      navigate('/login');
    } catch (error) {
      handleError(error);
    } finally {
      setState(prev => ({ ...prev, isLoading: false }));
    }
  };

  const updateUser = async (data: Partial<User>) => {
    try {
      setState(prev => ({ ...prev, isLoading: true }));
      const response = await axiosInstance.patch<AuthResponse>('/user', data);
      setState(prev => ({ 
        ...prev, 
        user: response.data.user 
      }));
    } catch (error) {
      handleError(error);
    } finally {
      setState(prev => ({ ...prev, isLoading: false }));
    }
  };

  return (
    <AuthContext.Provider 
      value={{ 
        ...state, 
        login, 
        register,
        logout, 
        checkAuth,
        updateUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
