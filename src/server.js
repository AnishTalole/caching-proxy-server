#!/usr/bin/env node

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const LRUCache = require('./cache');
const { fetchFromAPI } = require('./proxy');
const { logHit, logMiss, getMetrics } = require('./metrics');
const argv = require('./cli');

const app = express();

app.use(cors());

// ✅ ENV + CLI support
const PORT = process.env.PORT || argv.port || 3000;
const TTL = process.env.TTL || argv.ttl || 60;
const MAX_CACHE = process.env.MAX_CACHE || argv.maxCache || 100;

const cache = new LRUCache(MAX_CACHE, TTL);

// ✅ Health check
app.get('/', (req, res) => {
  res.send('Caching Proxy Server is running 🚀');
});

// ✅ Proxy route with timing
app.get('/proxy', async (req, res) => {
  const url = req.query.url;

  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  const start = Date.now(); // ⏱️ start timing

  const cached = cache.get(url);

  if (cached) {
    const responseTime = Date.now() - start;
    console.log(`[HIT] ${url}`);
    logHit(responseTime);
    return res.json(cached);
  }

  try {
    console.log(`[MISS] ${url}`);

    const data = await fetchFromAPI(url);

    const responseTime = Date.now() - start;

    logMiss(responseTime);
    cache.set(url, data);

    res.json(data);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'API fetch failed' });
  }
});

// ✅ Metrics route (updated)
app.get('/metrics', (req, res) => {
  res.json(getMetrics(cache.cache.size, MAX_CACHE));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});