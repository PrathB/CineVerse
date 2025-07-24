const axios = require("axios");
const https = require("https");

const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const BEARER_TOKEN = process.env.TMDB_API_BEARER_TOKEN;
const httpsAgent = new https.Agent({ keepAlive: true });

const tmdbClient = axios.create({
  baseURL: TMDB_BASE_URL,
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${BEARER_TOKEN}`,
  },
  httpsAgent,
  timeout: 5000,
});

const makeRequest = async (endpoint, params = {}) => {
  try {
    const response = await tmdbClient.get(endpoint, { params });
    return response.data;
  } catch (error) {
    throw new Error(
      `TMDB API Error: ${error.response?.data?.status_message || error.message}`
    );
  }
};

module.exports = { makeRequest };
