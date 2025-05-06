const ctx: Worker = self as any;

// Map pour stocker les calculs en cache
const calculationsCache = new Map();

// Fonction pour effectuer des calculs intensifs
const performHeavyCalculation = (data: any) => {
  const cacheKey = JSON.stringify(data);
  
  if (calculationsCache.has(cacheKey)) {
    return calculationsCache.get(cacheKey);
  }

  // Simulation de calculs intensifs
  const result = {
    // ... calculs complexes ici
    processedData: data
  };

  calculationsCache.set(cacheKey, result);
  return result;
};

// Écouter les messages du thread principal
ctx.addEventListener('message', (event) => {
  const { type, data, id } = event.data;

  switch (type) {
    case 'PROCESS_DATA':
      const result = performHeavyCalculation(data);
      ctx.postMessage({ type: 'RESULT', id, data: result });
      break;

    case 'CLEAR_CACHE':
      calculationsCache.clear();
      ctx.postMessage({ type: 'CACHE_CLEARED', id });
      break;

    default:
      ctx.postMessage({
        type: 'ERROR',
        id,
        error: `Unknown message type: ${type}`
      });
  }
});

// Gérer les erreurs
ctx.addEventListener('error', (error) => {
  ctx.postMessage({
    type: 'ERROR',
    error: error.message
  });
});