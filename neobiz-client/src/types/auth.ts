export type UserRole = 'admin' | 'client' | 'freelance';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  company?: string;
  siret?: string;
  createdAt: string;
  updatedAt: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  name: string;
  password: string;
  password_confirmation: string;
  company?: string;
  siret?: string;
  role?: UserRole;
}

export interface AuthResponse {
  user: User;
  token?: string;
  message?: string;
}

export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  meta?: {
    current_page: number;
    from: number;
    last_page: number;
    path: string;
    per_page: number;
    to: number;
    total: number;
  };
}