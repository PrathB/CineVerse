const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Import route modules
const movieRoutes = require("./routes/movie");
const movieListRoutes = require("./routes/movie-list");
const searchRoutes = require("./routes/search");
const genreRoutes = require("./routes/genre");

// Use routes
app.use("/api/movie", movieRoutes);
app.use("/api/list/movie", movieListRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/genre", genreRoutes);

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "Server is running!" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
});
