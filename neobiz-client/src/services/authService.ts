// src/lib/authService.ts

import axiosInstance from '@/lib/axiosInstance';

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

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  name: string;
  role: UserRole;
  company?: string;
  siret?: string;
}

export default class AuthService {
  /**
   * Authentifie l’utilisateur et stocke la session en localStorage
   */
  static async login(
    credentials: LoginCredentials
  ): Promise<User> {
    const response = await axiosInstance.post<{ user: User }>('/auth/login', credentials);
    const user = response.data.user;
    localStorage.setItem('currentUser', JSON.stringify(user));
    return user;
  }

  /**
   * Crée un nouveau compte utilisateur
   */
  static async register(
    data: RegisterData
  ): Promise<User> {
    const response = await axiosInstance.post<{ user: User }>('/auth/register', data);
    return response.data.user;
  }

  /**
   * Récupère les infos de l’utilisateur connecté
   */
  static async getCurrentUser(): Promise<User | null> {
    try {
      const response = await axiosInstance.get<{ user: User }>('/user');
      return response.data.user;
    } catch {
      return null;
    }
  }

  /**
   * Déconnecte l’utilisateur (détruit la session serveur + supprime la session locale)
   */
  static async logout(): Promise<void> {
    await axiosInstance.post('/auth/logout');
    localStorage.removeItem('currentUser');
  }

  /**
   * Demande de réinitialisation de mot de passe
   */
  static async requestPasswordReset(email: string): Promise<void> {
    await axiosInstance.post('/auth/forgot-password', { email });
  }

  /**
   * Réinitialisation effective du mot de passe
   */
  static async resetPassword(
    token: string,
    email: string,
    password: string
  ): Promise<void> {
    await axiosInstance.post('/auth/reset-password', { token, email, password });
  }

  /**
   * Vérification du code 2FA
   */
  static async verify2FA(code: string): Promise<boolean> {
    const response = await axiosInstance.post<{ success: boolean }>('/auth/verify-2fa', { code });
    return response.data.success;
  }

  /**
   * Renvoi de l’e-mail de vérification
   */
  static async resendVerificationEmail(): Promise<void> {
    await axiosInstance.post('/email/verification-notification');
  }
}

// à la fin de authService.ts
export const verify2FA = AuthService.verify2FA;
export const resendVerificationEmail = AuthService.resendVerificationEmail;