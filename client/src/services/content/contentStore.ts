/**
 * Browser-side content store (development / mock mode only).
 *
 * Purpose: let the Admin Dashboard perform real CRUD in mock mode, and have the
 * PUBLIC pages read the same records — so an admin edit is visible on
 * `/programs`, `/workshops`, `/rnd` and the homepage without touching JSX.
 *
 * Guarantees:
 *   - Existing verified content is preserved: every collection is SEEDED from the
 *     project's original datasets the first time it is read, so nothing is lost.
 *   - Live mode never uses this store. In `VITE_API_MODE=live` the admin
 *     service calls the REST API and the backend becomes the single source of
 *     truth (see `features/admin/services/adminService.ts`).
 *   - No credentials, keys or secrets are stored here — only public content.
 */

const STORAGE_PREFIX = 'shanks_code_content_v1';

export type CollectionKey = 'programs' | 'workshops' | 'announcements' | 'rndProjects';

interface StoredCollection<T> {
  version: number;
  items: T[];
}

const isBrowser = (): boolean => typeof window !== 'undefined' && !!window.localStorage;

const storageKey = (key: CollectionKey): string => `${STORAGE_PREFIX}.${key}`;

const readRaw = <T>(key: CollectionKey): StoredCollection<T> | null => {
  if (!isBrowser()) return null;

  try {
    const raw = window.localStorage.getItem(storageKey(key));
    if (!raw) return null;
    return JSON.parse(raw) as StoredCollection<T>;
  } catch {
    return null;
  }
};

const writeRaw = <T>(key: CollectionKey, items: T[]): void => {
  if (!isBrowser()) return;

  try {
    const payload: StoredCollection<T> = { version: 1, items };
    window.localStorage.setItem(storageKey(key), JSON.stringify(payload));
  } catch {
    // Storage unavailable or quota exceeded — the in-memory seed still works
    // for the current session.
  }
};

/**
 * Reads a collection, seeding it from `seed` on first access.
 * Always returns a defensive copy so callers cannot mutate stored state.
 */
export const readCollection = <T>(key: CollectionKey, seed: T[]): T[] => {
  const stored = readRaw<T>(key);

  if (stored && Array.isArray(stored.items)) {
    return stored.items.map((item) => ({ ...item }) as T);
  }

  const items = seed.map((item) => ({ ...item }) as T);
  writeRaw(key, items);
  return items;
};

/** Replaces the whole collection (used after a successful backend write). */
export const writeCollection = <T>(key: CollectionKey, items: T[]): T[] => {
  writeRaw(key, items);
  return items.map((item) => ({ ...item }) as T);
};

export const insertItem = <T extends { id: string }>(
  key: CollectionKey,
  seed: T[],
  item: T
): T[] => writeCollection(key, [...readCollection(key, seed), item]);

export const updateItem = <T extends { id: string }>(
  key: CollectionKey,
  seed: T[],
  id: string,
  patch: Partial<T>
): T[] =>
  writeCollection(
    key,
    readCollection(key, seed).map((item) => (item.id === id ? { ...item, ...patch } : item))
  );

export const removeItem = <T extends { id: string }>(
  key: CollectionKey,
  seed: T[],
  id: string
): T[] => writeCollection(key, readCollection(key, seed).filter((item) => item.id !== id));

/**
 * Restores a collection to its seeded (original) content.
 * Exposed in the admin so content can always be rolled back to the verified
 * baseline shipped with the project.
 */
export const resetCollection = <T>(key: CollectionKey, seed: T[]): T[] =>
  writeCollection(key, seed);

const contentStore = {
  readCollection,
  writeCollection,
  insertItem,
  updateItem,
  removeItem,
  resetCollection,
};

export default contentStore;
