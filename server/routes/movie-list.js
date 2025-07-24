const express = require("express");
const router = express.Router();
const { makeRequest } = require("../utils/tmdbClient");

router.get("/popular", async (req, res) => {
  try {
    const { language = "en-US", page = 1 } = req.query;
    const data = await makeRequest(`/movie/popular`, { language, page });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/top_rated", async (req, res) => {
  try {
    const { language = "en-US", page = 1 } = req.query;
    const data = await makeRequest(`/movie/top_rated`, { language, page });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/upcoming", async (req, res) => {
  try {
    const { language = "en-US", page = 1 } = req.query;
    const data = await makeRequest(`/movie/upcoming`, { language, page });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/trending", async (req, res) => {
  try {
    const { language = "en-US", time_window = "day" } = req.query;
    const data = await makeRequest(`/trending/movie/${time_window}`, {
      language,
    });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
