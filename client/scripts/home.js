const loaders = document.querySelectorAll(".loader");

const genreMap = {};

const genreUrl = `${PROXY_API_BASE_URL}/api/genre/movie`;
const endpoints = {
  trending: [
    "#trending-movies-list",
    `${PROXY_API_BASE_URL}/api/list/movie/trending`,
  ],
  popular: ["#popular-movies-list", `${PROXY_API_BASE_URL}/api/list/movie/popular`],
  topRated: [
    "#top-rated-movies-list",
    `${PROXY_API_BASE_URL}/api/list/movie/top_rated`,
  ],
  upcoming: [
    "#upcoming-movies-list",
    `${PROXY_API_BASE_URL}/api/list/movie/upcoming`,
  ],
};

// Fetch and render movies for given endpoint
async function fetchMovies(url, containerSelector) {
  loaders.forEach((loader) => {
    showLoader(loader);
  });
  try {
    const response = await fetch(url);
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
