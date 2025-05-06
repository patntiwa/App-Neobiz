import axios, { AxiosError } from "axios";
import { useToast } from "@/hooks/use-toast";

// Instance Axios avec configuration de base
const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/api`,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    'X-Requested-With': 'XMLHttpRequest'
  },
  withCredentials: true // Important pour CORS et les cookies CSRF
});

// État pour suivre l'initialisation CSRF
let isCSRFInitialized = false;

// Intercepteur pour les requêtes
axiosInstance.interceptors.request.use(
  async (config) => {
    // Ne pas appeler /sanctum/csrf-cookie pour elle-même ou pour les requêtes GET
    if (!isCSRFInitialized && config.method !== 'get' && !config.url?.includes('/sanctum/csrf-cookie')) {
      try {
        isCSRFInitialized = true;
        await axiosInstance.get('/sanctum/csrf-cookie');
      } catch (error) {
        console.error('Failed to fetch CSRF cookie:', error);
        isCSRFInitialized = false;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Intercepteur pour les réponses
axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    // Gérer les erreurs 401 (non authentifié)
    if (error.response?.status === 401) {
      // Nettoyer les données d'authentification
      localStorage.removeItem('user');
      
      // Rediriger vers la page de connexion seulement si nous ne sommes pas déjà dessus
      if (!window.location.pathname.includes('/login')) {
        window.location.href = '/login';
      }
    }

    // Gérer les erreurs 419 (CSRF token expiré)
    if (error.response?.status === 419) {
      isCSRFInitialized = false;
      // Récupérer un nouveau token CSRF et réessayer la requête
      return axiosInstance.get('/sanctum/csrf-cookie').then(() => {
        return axiosInstance(error.config);
      });
    }

    // Ne pas exposer les détails des erreurs en production
    if (import.meta.env.PROD) {
      const safeError = new Error(
        error.response?.data?.message || "Une erreur est survenue"
      );
      return Promise.reject(safeError);
    }

    // Créer un message d'erreur utilisateur convivial
    const userMessage = error.response?.data?.message || 'Une erreur est survenue';
    
    // Afficher le toast d'erreur si nous ne sommes pas en train de gérer une redirection auth
    if (error.response?.status !== 401) {
      const toast = useToast();
      toast.toast({
        title: "Erreur",
        description: userMessage,
        variant: "destructive",
      });
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;