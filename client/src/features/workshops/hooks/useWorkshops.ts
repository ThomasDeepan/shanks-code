import { useCallback, useEffect, useState } from 'react';
import workshopService from '../services/workshopService';
import type { Workshop } from '../types';

/**
 * useWorkshops
 * Shared data hook for the public workshops surfaces so the homepage preview and
 * the `/workshops` page read exactly the same records the admin manages.
 * Handles the four required UI states: loading, success, empty and error.
 */
export interface UseWorkshopsResult {
  workshops: Workshop[];
  isLoading: boolean;
  error: string | null;
  reload: () => void;
}

export const useWorkshops = (): UseWorkshopsResult => {
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      setWorkshops(await workshopService.getWorkshops());
    } catch {
      setError('Unable to load workshop information right now.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  return { workshops, isLoading, error, reload: () => void load() };
};

export default useWorkshops;
