const loaders = document.querySelectorAll(".loader");

const genreMap = {};

const genreUrl = `${TMDB_BASE_URL}/genre/movie/list?language=en`;
const endpoints = {
  trending: [
    "#trending-movies-list",
    `${TMDB_BASE_URL}/trending/movie/week?language=en-US`,
  ],
  popular: [
    "#popular-movies-list",
    `${TMDB_BASE_URL}/movie/popular?language=en-US`,
  ],
  topRated: [
    "#top-rated-movies-list",
    `${TMDB_BASE_URL}/movie/top_rated?language=en-US`,
  ],
  upcoming: [
    "#upcoming-movies-list",
    `${TMDB_BASE_URL}/movie/upcoming?language=en-US`,
  ],
};

// Fetch and render movies for given endpoint
async function fetchMovies(url, containerSelector) {
  loaders.forEach((loader) => {
    showLoader(loader);
  });
  try {
    const response = await fetch(url, options);
    const { results } = await response.json();

    renderMovies(
      results.slice(0, 8),
      document.querySelector(containerSelector)
    );
  } catch (err) {
    console.error("Fetch error:", err);
  } finally {
    loaders.forEach((loader) => {
      hideLoader(loader);
    });
  }
}

// Initialize the app
async function init() {
  await fetchGenreMap();
  for (let key in endpoints) {
    const [selector, url] = endpoints[key];
    fetchMovies(url, selector);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  init();
});
