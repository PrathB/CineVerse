// Fetch and cache genre names
async function fetchGenreMap() {
  // if already cached, return
  if (localStorage.getItem("genreMap")) {
    return;
  }

  try {
    const response = await fetch(genreUrl);
    const data = await response.json();
    data.genres.forEach(({ id, name }) => {
      genreMap[id] = name;
    });

    // Store in localStorage
    localStorage.setItem("genreMap", JSON.stringify(genreMap));
  } catch (error) {
    console.error("Fetch error: ", error);
  }
}

function renderMovies(movies, grid) {
  if (!grid) return;

  movies.forEach((movie) => {
    const title = movie.title;
    const year = movie.release_date?.split("-")[0] || "N/A";
    const poster = movie.poster_path
      ? `${TMDB_IMAGE_BASE_URL}${movie.poster_path}`
      : "./assets/placeholder-poster-image.jpg";

    const card = document.createElement("div");
    card.className = "movie-card";

    const genreMap = JSON.parse(localStorage.getItem("genreMap")) || {};
    const genres = movie.genre_ids
      .slice(0, 3)
      .map((id) => `<p>${genreMap[id] || ""}</p>`)
      .join("");
    const genreHTML = `<div class="movie-genre">${genres}</div>`;

    card.innerHTML = `
      <img src="${poster}" alt="${title}" loading="lazy" />
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

function showLoader(loader) {
  if (loader) loader.style.display = "block";
}

function hideLoader(loader) {
  if (loader) loader.style.display = "none";
}
