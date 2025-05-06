// src/lib/axiosInstance.ts

import axios, { AxiosError, AxiosRequestConfig } from 'axios';

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8000';
let csrfInitialized = false;

const axiosInstance = axios.create({
  baseURL: `${API_URL}/api`,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
});

// Avant chaque requête (y compris login/register/logout), on s’assure d’avoir le cookie CSRF
axiosInstance.interceptors.request.use(
  async (config: AxiosRequestConfig) => {
    const url = config.url ?? '';
    // N’appeler CSRF-cookie qu’une seule fois et en dehors de l’instance pour éviter la récursion
    if (!csrfInitialized && !url.includes('/sanctum/csrf-cookie')) {
      csrfInitialized = true;
      await axios.get(`${API_URL}/sanctum/csrf-cookie`, {
        withCredentials: true,
      });
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Gestion centralisée des réponses
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const status = error.response?.status;

    // CSRF expiré ou non initialisé → réinitialiser et réessayer une fois
    if (status === 419) {
      csrfInitialized = false;
      try {
        await axios.get(`${API_URL}/sanctum/csrf-cookie`, { withCredentials: true });
        // @ts-ignore re-tentative de la requête originale
        return axiosInstance(error.config);
      } catch {
        // si ça rate encore, on passe à la rejection
      }
    }

    // Non authentifié → rediriger vers login
    if (status === 401) {
      localStorage.removeItem('currentUser');
      if (!window.location.pathname.includes('/login')) {
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
