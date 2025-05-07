// Dans vos types auth.ts
export interface User {
  id: number;
  name: string;
  email: string;
  is_active: boolean;
  roles: string[]; // Tableau de rôles
}

export interface AuthResponse {
  message?: string;
  user: User;
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
  role?: string[];
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