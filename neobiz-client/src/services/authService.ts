import axiosInstance from "@/lib/axiosInstance";
import { toast } from "@/hooks/use-toast";

export type UserRole = 'admin' | 'client' | 'freelance';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  company?: string;
  siret?: string;
}

// Utilisateurs par défaut pour démo
const defaultUsers: User[] = [
  {
    id: '1',
    email: 'admin@neobiz.com',
    name: 'Admin NeoBiz',
    role: 'admin',
  },
  {
    id: '2',
    email: 'client@example.com',
    name: 'Jean Client',
    role: 'client',
    company: 'Entreprise XYZ',
  },
  {
    id: '3',
    email: 'freelance@example.com',
    name: 'Sophie Martin',
    role: 'freelance',
    siret: '12345678901234',
  },
];

// Stocker les utilisateurs dans localStorage (simulation de base de données)
const initUsers = () => {
  if (!localStorage.getItem('users')) {
    localStorage.setItem('users', JSON.stringify(defaultUsers));
  }
};

// Session utilisateur
let currentUser: User | null = null;

// Initialiser au chargement
export const initAuth = () => {
  initUsers();
  const savedSession = localStorage.getItem('currentUser');
  if (savedSession) {
    try {
      currentUser = JSON.parse(savedSession);
    } catch (error) {
      console.error('Failed to parse currentUser from localStorage:', error);
      currentUser = null;
    }
  } else {
    currentUser = null; // Ensure currentUser is null if no session exists
  }
};

// Vérifier si l'utilisateur est authentifié
export const checkAuth = async (): Promise<boolean> => {
  try {
    const response = await axiosInstance.get('/user');
    return !!response.data;
  } catch (error) {
    return false;
  }
};

// Login sécurisé avec gestion CSRF
export const login = async (email: string, password: string) => {
  try {
    const response = await axiosInstance.post("/auth/login", { email, password });
    
    if (response.data?.user) {
      // Stocker les informations utilisateur
      localStorage.setItem('currentUser', JSON.stringify(response.data.user));
      
      toast({
        title: "Connexion réussie",
        description: `Bienvenue ${response.data.user.name}`,
      });
    }
    
    return { success: true, user: response.data.user };
  } catch (error) {
    console.error("Erreur de connexion:", error.response?.data || error.message);
    toast({
      title: "Erreur de connexion",
      description: error.response?.data?.message || "Identifiants invalides",
      variant: "destructive",
    });
    return { success: false, message: error.response?.data?.message };
  }
};

// Création de compte sécurisée
export const register = async (userData: {
  email: string;
  name: string;
  password: string;
  role: string;
  company?: string;
  siret?: string;
}) => {
  try {
    const response = await axiosInstance.post("/auth/register", userData);
    
    if (response.data?.user) {
      toast({
        title: "Inscription réussie",
        description: "Votre compte a été créé avec succès",
      });
    }
    
    return { success: true, user: response.data.user };
  } catch (error) {
    console.error("Erreur d'inscription:", error.response?.data || error.message);
    toast({
      title: "Erreur d'inscription",
      description: error.response?.data?.message || "Une erreur est survenue lors de l'inscription",
      variant: "destructive",
    });
    return { success: false, message: error.response?.data?.message };
  }
};

// Déconnexion sécurisée
export const logout = async () => {
  try {
    await axiosInstance.post("/auth/logout");
    localStorage.removeItem('currentUser');
    toast({
      title: "Déconnexion",
      description: "Vous avez été déconnecté avec succès",
    });
    return { success: true };
  } catch (error) {
    console.error("Erreur lors de la déconnexion:", error);
    return { success: false, message: error.response?.data?.message };
  }
};

// Récupération sécurisée du profil utilisateur
export const getCurrentUser = async () => {
  try {
    const response = await axiosInstance.get("/user");
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération du profil:", error);
    return null;
  }
};

// Vérification sécurisée du rôle
export const hasRole = (user: User | null, requiredRole: UserRole): boolean => {
  return user?.role === requiredRole;
};

// Réinitialisation du mot de passe sécurisée
export const requestPasswordReset = async (email: string) => {
  try {
    const response = await axiosInstance.post("/auth/forgot-password", { email });
    toast({
      title: "Demande envoyée",
      description: "Si l'email existe, vous recevrez les instructions de réinitialisation",
    });
    return { success: true, message: response.data?.message };
  } catch (error) {
    console.error("Erreur de réinitialisation:", error);
    return { success: false, message: error.response?.data?.message };
  }
};

// Vérification 2FA sécurisée
export const verify2FA = async (code: string) => {
  try {
    const response = await axiosInstance.post("/auth/verify-2fa", { code });
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Erreur 2FA:", error);
    return { success: false, message: error.response?.data?.message };
  }
};

// Renvoi de l'email de vérification
export const resendVerificationEmail = async () => {
  try {
    const response = await axiosInstance.post("/email/verification-notification");
    toast({
      title: "Email envoyé",
      description: "Un nouvel email de vérification a été envoyé",
    });
    return { success: true, message: response.data?.message };
  } catch (error) {
    console.error("Erreur d'envoi:", error);
    return { success: false, message: error.response?.data?.message };
  }
};

export const forgotPassword = async (email: string) => {
  const response = await axiosInstance.post("/auth/forgot-password", { email });
  return response.data;
};

export const resetPassword = async (data: { token: string; email: string; password: string }) => {
  const response = await axiosInstance.post("/auth/reset-password", data);
  return response.data;
};

export const initializeCsrf = async () => {
  try {
    await axiosInstance.get('/sanctum/csrf-cookie');
  } catch (error) {
    console.error("CSRF initialization error:", error.response?.data || error.message);
    throw error;
  }
};

import type { AuthResponse, LoginCredentials, RegisterData, ApiResponse } from '@/types/auth';

class AuthService {
  static async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await axiosInstance.post<ApiResponse<AuthResponse>>('/auth/login', credentials);
    return response.data.data;
  }

  static async register(data: RegisterData): Promise<AuthResponse> {
    const response = await axiosInstance.post<ApiResponse<AuthResponse>>('/auth/register', data);
    return response.data.data;
  }

  static async logout(): Promise<void> {
    try {
      await axiosInstance.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  }

  static async getCurrentUser(): Promise<AuthResponse> {
    const response = await axiosInstance.get<ApiResponse<AuthResponse>>('/user');
    return response.data.data;
  }

  static async requestPasswordReset(email: string): Promise<{ message: string }> {
    const response = await axiosInstance.post<ApiResponse<{ message: string }>>('/auth/forgot-password', { email });
    return response.data.data;
  }

  static async resetPassword(data: { token: string; email: string; password: string; password_confirmation: string }) {
    const response = await axiosInstance.post<ApiResponse<{ message: string }>>('/auth/reset-password', data);
    return response.data.data;
  }

  static async verifyEmail(token: string): Promise<{ message: string }> {
    const response = await axiosInstance.post<ApiResponse<{ message: string }>>(`/email/verify/${token}`);
    return response.data.data;
  }

  static async resendVerificationEmail(): Promise<{ message: string }> {
    const response = await axiosInstance.post<ApiResponse<{ message: string }>>('/email/verification-notification');
    return response.data.data;
  }

  static async verify2FA(code: string): Promise<{ success: boolean; message?: string }> {
    try {
      const response = await axiosInstance.post<ApiResponse<{ success: boolean }>>('/auth/verify-2fa', { code });
      return { success: response.data.data.success };
    } catch (error) {
      return { success: false, message: "Code de vérification invalide" };
    }
  }
}
