#!/usr/bin/env node

const express = require('express');
const cors = require('cors');
const LRUCache = require('./cache');
const { fetchFromAPI } = require('./proxy');
const { logHit, logMiss, getMetrics } = require('./metrics');
const argv = require('./cli');

const app = express();
app.use(cors());

const PORT = process.env.PORT || argv.port || 3000;
const TTL = process.env.TTL || argv.ttl || 60;
const MAX_CACHE = process.env.MAX_CACHE || argv.maxCache || 100;

const cache = new LRUCache(MAX_CACHE, TTL);

//Health check route
app.get('/', (req, res) => {
  res.send('Caching Proxy Server is running 🚀');
});

// Proxy route
app.get('/proxy', async (req, res) => {
  const url = req.query.url;

  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  const cached = cache.get(url);

  if (cached) {
    console.log(`[HIT] ${url}`);
    logHit();
    return res.json(cached);
  }

  try {
    console.log(`[MISS] ${url}`);
    logMiss();

    const data = await fetchFromAPI(url);

    cache.set(url, data);

    res.json(data);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'API fetch failed' });
  }
});

// Metrics route
app.get('/metrics', (req, res) => {
  res.json(getMetrics());
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});