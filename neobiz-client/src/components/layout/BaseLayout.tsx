import React, { Suspense, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePageTransition } from '@/hooks/usePageTransition';
import { usePerformanceMonitor } from '@/hooks/usePerformanceMonitor';

interface BaseLayoutProps {
  children: React.ReactNode;
  className?: string;
  isLoading?: boolean;
}

const LoadingSpinner = () => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
    <div className="relative">
      <div className="absolute -inset-1.5 animate-pulse rounded-full bg-accent/20" />
      <Loader2 className="h-8 w-8 animate-spin text-accent" />
    </div>
  </div>
);

const BaseLayout: React.FC<BaseLayoutProps> = ({ 
  children, 
  className,
  isLoading = false 
}) => {
  const { isTransitioning } = usePageTransition();
  const { markPerformancePoint } = usePerformanceMonitor();
  const showLoader = isLoading || isTransitioning;

  useEffect(() => {
    // Marquer le début du rendu du layout
    markPerformancePoint('layout-render-start');

    return () => {
      // Marquer la fin du rendu du layout
      markPerformancePoint('layout-render-end');
    };
  }, [markPerformancePoint]);

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <div className={cn(
        'min-h-screen transition-all duration-300',
        showLoader && 'opacity-50 pointer-events-none',
        className
      )}>
        {showLoader && <LoadingSpinner />}
        <div className={cn(
          'animate-fade-up animate-duration-300',
          showLoader && 'opacity-0'
        )}>
          {children}
        </div>
      </div>
    </Suspense>
  );
};

export default BaseLayout;