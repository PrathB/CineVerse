const express = require("express");
const router = express.Router();
const { makeRequest } = require("../utils/tmdbClient");

router.get("/:movieId", async (req, res) => {
  try {
    const { movieId } = req.params;
    const { language = "en-US" } = req.query;
    if (!movieId) {
      return res.status(400).json({ error: "Movie ID is required" });
    }
    const data = await makeRequest(`/movie/${movieId}`, { language });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:movieId/release_dates", async (req, res) => {
  try {
    const { movieId } = req.params;
    if (!movieId) {
      return res.status(400).json({ error: "Movie ID is required" });
    }
    const data = await makeRequest(`/movie/${movieId}/release_dates`);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:movieId/similar", async (req, res) => {
  try {
    const { movieId } = req.params;
    const { language = "en-US", page = 1 } = req.query;
    if (!movieId) {
      return res.status(400).json({ error: "Movie ID is required" });
    }
    const data = await makeRequest(`/movie/${movieId}/similar`, {
      language,
      page,
    });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
