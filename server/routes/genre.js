const express = require("express");
const router = express.Router();
const { makeRequest } = require("../utils/tmdbClient");

router.get("/movie", async (req, res) => {
  try {
    const { language = "en" } = req.query;
    const data = await makeRequest("/genre/movie/list", { language });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
