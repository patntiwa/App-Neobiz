import { useEffect, useCallback, useRef } from 'react';

type WorkerMessage = {
  type: string;
  id: string;
  data?: any;
  error?: string;
};

type WorkerCallback = (result: any) => void;

export const useWorker = () => {
  const workerRef = useRef<Worker | null>(null);
  const callbacksRef = useRef<Map<string, WorkerCallback>>(new Map());

  useEffect(() => {
    // Créer le worker uniquement côté client
    if (typeof window !== 'undefined') {
      workerRef.current = new Worker(
        new URL('../workers/performanceWorker.ts', import.meta.url),
        { type: 'module' }
      );

      // Configurer le gestionnaire de messages
      workerRef.current.onmessage = (event: MessageEvent<WorkerMessage>) => {
        const { type, id, data, error } = event.data;

        const callback = callbacksRef.current.get(id);
        if (callback) {
          if (type === 'ERROR') {
            callback({ error });
          } else {
            callback({ data });
          }
          callbacksRef.current.delete(id);
        }
      };
    }

    return () => {
      workerRef.current?.terminate();
    };
  }, []);

  const processData = useCallback(<T>(data: T): Promise<any> => {
    if (!workerRef.current) {
      return Promise.reject(new Error('Worker not initialized'));
    }

    return new Promise((resolve, reject) => {
      const id = crypto.randomUUID();

      callbacksRef.current.set(id, ({ data, error }) => {
        if (error) {
          reject(new Error(error));
        } else {
          resolve(data);
        }
      });

      workerRef.current.postMessage({
        type: 'PROCESS_DATA',
        id,
        data
      });
    });
  }, []);

  const clearCache = useCallback((): Promise<void> => {
    if (!workerRef.current) {
      return Promise.reject(new Error('Worker not initialized'));
    }

    return new Promise((resolve, reject) => {
      const id = crypto.randomUUID();

      callbacksRef.current.set(id, ({ error }) => {
        if (error) {
          reject(new Error(error));
        } else {
          resolve();
        }
      });

      workerRef.current.postMessage({
        type: 'CLEAR_CACHE',
        id
      });
    });
  }, []);

  return {
    processData,
    clearCache,
    isSupported: typeof Window !== 'undefined' && 'Worker' in window
  };
};