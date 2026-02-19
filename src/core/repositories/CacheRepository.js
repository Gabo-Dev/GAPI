export class CacheRepository {
  constructor(storage = localStorage) {
    this.storage = storage;
  }

  async set(key, data, ttlMs = 86400000) {
    const cacheEntry = {
      data,
      timestamp: Date.now(),
      ttl: ttlMs,
    };
    this.storage.setItem(key, JSON.stringify(cacheEntry));
  }

  async get(key) {
    const cacheEntry = this.storage.getItem(key);

    if (!cacheEntry) return null;

    try {
      const parsed = JSON.parse(cacheEntry);
      const isExpired = Date.now() - parsed.timestamp > parsed.ttl;

      if (isExpired) {
        this.storage.removeItem(key);
        return null;
      }
      return parsed.data;
    } catch (_error) {
      if(import.meta.env.DEV) console.warn('Cache get failed:', _error.message); 
      this.storage.removeItem(key);
      return null;
    }
  }
  async remove(key) {
    this.storage.removeItem(key);
  }

  async clear() {
    this.storage.clear();
  }
}
