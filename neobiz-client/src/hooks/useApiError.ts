import { useToast } from '@/hooks/use-toast';
import { AxiosError } from 'axios';

interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
  status?: number;
}

export const useApiError = () => {
  const { toast } = useToast();

  const handleError = (error: unknown, customMessage?: string) => {
    if (error instanceof AxiosError) {
      const apiError = error.response?.data as ApiError;
      
      // Gérer les erreurs de validation
      if (error.response?.status === 422 && apiError.errors) {
        const validationErrors = Object.values(apiError.errors).flat();
        toast({
          variant: "destructive",
          title: "Erreur de validation",
          description: validationErrors.join('\n'),
        });
        return;
      }

      // Gérer les erreurs d'authentification
      if (error.response?.status === 401) {
        toast({
          variant: "destructive",
          title: "Non autorisé",
          description: "Veuillez vous reconnecter pour continuer.",
        });
        return;
      }

      // Gérer les erreurs de permission
      if (error.response?.status === 403) {
        toast({
          variant: "destructive",
          title: "Accès refusé",
          description: "Vous n'avez pas les permissions nécessaires pour effectuer cette action.",
        });
        return;
      }

      // Gérer les erreurs de ressource non trouvée
      if (error.response?.status === 404) {
        toast({
          variant: "destructive",
          title: "Non trouvé",
          description: "La ressource demandée n'existe pas.",
        });
        return;
      }

      // Gérer les erreurs de rate limit
      if (error.response?.status === 429) {
        toast({
          variant: "destructive",
          title: "Trop de requêtes",
          description: "Veuillez patienter quelques instants avant de réessayer.",
        });
        return;
      }

      // Gérer les erreurs serveur
      if (error.response?.status >= 500) {
        toast({
          variant: "destructive",
          title: "Erreur serveur",
          description: import.meta.env.DEV 
            ? apiError.message 
            : "Une erreur inattendue s'est produite. Veuillez réessayer plus tard.",
        });
        return;
      }
    }

    // Gérer les autres types d'erreurs
    toast({
      variant: "destructive",
      title: "Erreur",
      description: customMessage || "Une erreur inattendue s'est produite.",
    });
  };

  return { handleError };
};