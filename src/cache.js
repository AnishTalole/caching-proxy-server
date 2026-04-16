class LRUCache {
  constructor(maxSize, ttl) {
    this.maxSize = maxSize;
    this.ttl = ttl * 1000;
    this.cache = new Map();
  }

  get(key) {
    if (!this.cache.has(key)) return null;

    const value = this.cache.get(key);

    // Check expiry
    if (Date.now() > value.expiry) {
      this.cache.delete(key);
      return null;
    }

    // Move to end (recently used)
    this.cache.delete(key);
    this.cache.set(key, value);

    return value.data;
  }

  set(key, data) {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    }

    this.cache.set(key, {
      data,
      expiry: Date.now() + this.ttl
    });

    // Remove LRU
    if (this.cache.size > this.maxSize) {
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
  }
}

module.exports = LRUCache;