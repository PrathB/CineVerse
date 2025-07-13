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

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${TMDB_API_KEY}`,
  },
};

// Toggle mobile search bar
document.querySelector(".mobile-search-icon").addEventListener("click", () => {
  document.querySelector(".mobile-search-div").classList.toggle("active");
});

// Fetch and cache genre names
async function fetchGenreMap() {
  const response = await fetch(genreUrl, options);
  const data = await response.json();
  data.genres.forEach(({ id, name }) => {
    genreMap[id] = name;
  });
}

// Fetch and render movies for given endpoint
async function fetchMovies(url, containerSelector) {
  try {
    const response = await fetch(url, options);
    const { results } = await response.json();
    renderMovies(
      results.slice(0, 8),
      document.querySelector(containerSelector)
    );
  } catch (err) {
    console.error("Fetch error:", err);
  }
}

// Render movies into grid
function renderMovies(movies, grid) {
  grid.innerHTML = "";
  movies.forEach((movie) => {
    const title = movie.title;
    const year = movie.release_date?.split("-")[0] || "N/A";
    const poster = movie.poster_path
      ? `${TMDB_IMAGE_BASE_URL}${movie.poster_path}`
      : "https://via.placeholder.com/250x400?text=No+Image";

    const card = document.createElement("div");
    card.className = "movie-card";

    const genres = movie.genre_ids
      .slice(0, 3)
      .map((id) => `<p>${genreMap[id] || ""}</p>`)
      .join("");
    const genreHTML = `<div class="movie-genre">${genres}</div>`;

    card.innerHTML = `
      <img src="${poster}" alt="${title}" />
      <div class="movie-overlay">
        ${genreHTML}
        <div class="view-details">View Details</div>
      </div>
      <h3>${title}</h3>
      <p>${year}</p>
    `;
    grid.appendChild(card);

    const viewBtn = card.querySelector(".view-details");
    viewBtn.addEventListener("click", () => {
      window.location.href = `movie.html?id=${movie.id}`;
    });
  });
}

// Initialize the app
(async function init() {
  await fetchGenreMap();
  for (let key in endpoints) {
    const [selector, url] = endpoints[key];
    fetchMovies(url, selector);
  }
})();
