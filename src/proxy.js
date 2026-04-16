const axios = require('axios');

async function fetchFromAPI(url) {
  const response = await axios.get(url);
  return response.data;
}

module.exports = { fetchFromAPI };