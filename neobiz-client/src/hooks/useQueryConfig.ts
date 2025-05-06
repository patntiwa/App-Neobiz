import { useToast } from './use-toast';
import { QueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useApiError } from './useApiError';

export const useQueryConfig = () => {
  const { handleError } = useApiError();
  const { toast } = useToast();

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: (failureCount: number, error: unknown) => {
          if (error instanceof AxiosError) {
            // Ne pas réessayer pour les erreurs 4xx
            if (error.response?.status && error.response.status >= 400 && error.response.status < 500) {
              return false;
            }
          }
          return failureCount < 3;
        },
        staleTime: 1000 * 60 * 5, // 5 minutes
        cacheTime: 1000 * 60 * 30, // 30 minutes
        refetchOnWindowFocus: false,
        refetchOnReconnect: true,
        onError: (error: unknown) => {
          handleError(error);
        },
      },
      mutations: {
        retry: false,
        onSuccess: () => {
          toast({
            title: "Succès",
            description: "L'opération a été effectuée avec succès",
          });
        },
        onError: (error: unknown) => {
          handleError(error);
        },
      },
    },
  });

  return queryClient;
};