import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '@/contexts/AuthContext';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import BaseLayout from '@/components/layout/BaseLayout';
import { useQueryConfig } from '@/hooks/useQueryConfig';
import App from '@/App';

export const Root: React.FC = () => {
  const queryClient = useQueryConfig();

  return (
    <React.StrictMode>
      <ErrorBoundary>
        <BrowserRouter>
          <QueryClientProvider client={queryClient}>
            <TooltipProvider>
              <AuthProvider>
                <BaseLayout>
                  <App />
                  <Toaster />
                  <Sonner />
                </BaseLayout>
              </AuthProvider>
            </TooltipProvider>
          </QueryClientProvider>
        </BrowserRouter>
      </ErrorBoundary>
    </React.StrictMode>
  );
};