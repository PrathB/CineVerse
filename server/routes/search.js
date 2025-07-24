const express = require('express');
const router = express.Router();
const { makeRequest } = require('../utils/tmdbClient');

// Search movies
router.get('/movie', async (req, res) => {
  try {
    const { query, page = 1, include_adult = false, language = 'en-US' } = req.query;
    if (!query) {
      return res.status(400).json({ error: 'Search query is required' });
    }
    const data = await makeRequest('/search/movie', { 
      query, 
      page, 
      include_adult, 
      language 
    });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;