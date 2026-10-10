import { useCallback, useEffect, useState } from 'react';
import adminService from '../services/adminService';
import { ApiError } from '@/services/api/errors';

/**
 * useAdminCollection
 * Loads a managed collection and exposes create / update / remove operations
 * that write through to the same source of truth the public pages read.
 */

type ManagedKey = 'programs' | 'workshops' | 'announcements' | 'rndProjects';

export interface UseAdminCollectionResult<T> {
  items: T[];
  isLoading: boolean;
  error: string | null;
  reload: () => Promise<void>;
  create: (item: T) => Promise<void>;
  update: (id: string, item: T) => Promise<void>;
  remove: (id: string) => Promise<void>;
  restoreSeed: () => Promise<void>;
}

const messageFor = (err: unknown, fallback: string): string =>
  err instanceof ApiError ? err.userMessage : err instanceof Error ? err.message : fallback;

export const useAdminCollection = <T extends { id: string }>(
  key: ManagedKey
): UseAdminCollectionResult<T> => {
  const [items, setItems] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const reload = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      setItems((await adminService.list(key)) as unknown as T[]);
    } catch (err: unknown) {
      setError(messageFor(err, 'Unable to load these records.'));
    } finally {
      setIsLoading(false);
    }
  }, [key]);

  useEffect(() => {
    void reload();
  }, [reload]);

  const create = useCallback(
    async (item: T) => {
      setItems((await adminService.create(key, item as never)) as unknown as T[]);
    },
    [key]
  );

  const update = useCallback(
    async (id: string, item: T) => {
      setItems((await adminService.update(key, id, item as never)) as unknown as T[]);
    },
    [key]
  );

  const remove = useCallback(
    async (id: string) => {
      setItems((await adminService.remove(key, id)) as unknown as T[]);
    },
    [key]
  );

  const restoreSeed = useCallback(async () => {
    setItems((await adminService.restoreSeed(key)) as unknown as T[]);
  }, [key]);

  return { items, isLoading, error, reload, create, update, remove, restoreSeed };
};

export default useAdminCollection;
