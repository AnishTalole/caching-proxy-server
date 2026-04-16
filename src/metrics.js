const metrics = {
  totalRequests: 0,
  cacheHits: 0,
  cacheMisses: 0,
};

function logHit() {
  metrics.totalRequests++;
  metrics.cacheHits++;
}

function logMiss() {
  metrics.totalRequests++;
  metrics.cacheMisses++;
}

function getMetrics() {
  const hitRate =
    metrics.totalRequests === 0
      ? 0
      : ((metrics.cacheHits / metrics.totalRequests) * 100).toFixed(2);

  return {
    ...metrics,
    hitRate: `${hitRate}%`
  };
}

module.exports = { logHit, logMiss, getMetrics };