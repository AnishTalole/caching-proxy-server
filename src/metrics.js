const metrics = {
  totalRequests: 0,
  cacheHits: 0,
  cacheMisses: 0,
  totalResponseTime: 0,
  cacheResponseTime: 0,
  apiResponseTime: 0,
  startTime: Date.now()
};

function logHit(responseTime) {
  metrics.totalRequests++;
  metrics.cacheHits++;
  metrics.totalResponseTime += responseTime;
  metrics.cacheResponseTime += responseTime;
}

function logMiss(responseTime) {
  metrics.totalRequests++;
  metrics.cacheMisses++;
  metrics.totalResponseTime += responseTime;
  metrics.apiResponseTime += responseTime;
}

function getMetrics(cacheSize, maxCache) {
  const hitRate =
    metrics.totalRequests === 0
      ? 0
      : ((metrics.cacheHits / metrics.totalRequests) * 100).toFixed(2);

  const avgResponse =
    metrics.totalRequests === 0
      ? 0
      : (metrics.totalResponseTime / metrics.totalRequests).toFixed(2);

  const avgCache =
    metrics.cacheHits === 0
      ? 0
      : (metrics.cacheResponseTime / metrics.cacheHits).toFixed(2);

  const avgAPI =
    metrics.cacheMisses === 0
      ? 0
      : (metrics.apiResponseTime / metrics.cacheMisses).toFixed(2);

  const uptime = ((Date.now() - metrics.startTime) / 1000).toFixed(0);

  return {
    totalRequests: metrics.totalRequests,
    cacheHits: metrics.cacheHits,
    cacheMisses: metrics.cacheMisses,
    hitRate: `${hitRate}%`,
    avgResponseTime: `${avgResponse} ms`,
    avgCacheResponseTime: `${avgCache} ms`,
    avgApiResponseTime: `${avgAPI} ms`,
    cacheSize,
    cacheUtilization: `${((cacheSize / maxCache) * 100).toFixed(2)}%`,
    uptime: `${uptime}s`
  };
}

module.exports = { logHit, logMiss, getMetrics };