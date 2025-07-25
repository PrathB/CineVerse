function convertMinutes(mins) {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return `${h}h ${m}m`;
}

function showLoaderOverlay() {
  document.querySelector(".loader-overlay").classList.remove("hidden");
}

function hideLoaderOverlay() {
  document.querySelector(".loader-overlay").classList.add("hidden");
}

async function fetchMovieDetails(movieId) {
  try {
    const [res1, res2] = await Promise.all([
      fetch(`${PROXY_API_BASE_URL}/api/movie/${movieId}`),
      fetch(`${PROXY_API_BASE_URL}/api/movie/${movieId}/release_dates`),
    ]);

    const movieDetails = await res1.json();
    const releaseDates = await res2.json();

    const posterPath = movieDetails.poster_path
      ? `${TMDB_IMAGE_BASE_URL}${movieDetails.poster_path}`
      : "./assets/placeholder-poster-image.jpg";

    const movieInfoSection = document.querySelector(".movie-info-section");

    movieInfoSection
      .querySelector(".poster-image")
      .setAttribute("src", posterPath);

    document.documentElement.style.setProperty(
      "--backdrop",
      `url("${TMDB_IMAGE_BASE_URL}${movieDetails.backdrop_path}")`
    );

    movieInfoSection.querySelector(".title").textContent = movieDetails.title;

    movieInfoSection.querySelector(".year").textContent = new Date(
      movieDetails.release_date
    ).getFullYear();

    movieInfoSection.querySelector(".genre-tags").textContent =
      movieDetails.genres.map((genre) => genre.name).join(" / ");

    movieInfoSection.querySelector("#runtime").textContent = convertMinutes(
      movieDetails.runtime
    );

    const usRelease = releaseDates.results.find(
      (item) => item.iso_3166_1 === "US"
    );
    let certification = "N/A";

    if (
      usRelease &&
      usRelease.release_dates.length > 0 &&
      usRelease.release_dates[0].certification
    ) {
      certification = usRelease.release_dates[0].certification;
    }

    movieInfoSection.querySelector(".pg-rating").textContent = certification;

    movieInfoSection.querySelector(".tagline").textContent =
      movieDetails.tagline;

    movieInfoSection.querySelector(".overview-div p").textContent =
      movieDetails.overview;

    const userScore = Math.floor(movieDetails.vote_average * 10);
    movieInfoSection.querySelector(".score-text").textContent = userScore;

    document.documentElement.style.setProperty("--score", `${userScore}%`);

    const additonalInfoSection = document.querySelector(
      ".additional-info-section"
    );

    additonalInfoSection.querySelector("#release-status").textContent =
      movieDetails.status;

    const releaseDate = new Date(movieDetails.release_date);
    additonalInfoSection.querySelector(
      "#release-date"
    ).textContent = `${releaseDate.getDate()} ${releaseDate.toLocaleString(
      "default",
      { month: "short" }
    )}, ${releaseDate.getFullYear()}`;

    additonalInfoSection.querySelector("#original-language").textContent =
      movieDetails.original_language;

    additonalInfoSection.querySelector("#origin-country").textContent =
      movieDetails.origin_country?.[0] || "Unknown";
    additonalInfoSection.querySelector(
      "#budget"
    ).textContent = `$${movieDetails.budget.toLocaleString()}`;
    additonalInfoSection.querySelector(
      "#revenue"
    ).textContent = `$${movieDetails.revenue.toLocaleString()}`;
  } catch (error) {
    console.error("Error in fetchMovieDetails:", error);
  }
}

async function fetchMovieCredits(movieId) {
  try {
    const res = await fetch(`${PROXY_API_BASE_URL}/api/movie/${movieId}/credits`);

    const movieCredits = await res.json();

    const director = movieCredits.crew.find(
      (person) => person.job === "Director"
    );

    const jobs = movieCredits.crew
      .filter((person) => person.name === director.name)
      .map((person) => person.job);

    document.querySelector(".movie-director h4").textContent = director.name;
    document.querySelector(".movie-director p").textContent = jobs.join(" , ");

    const cast = movieCredits.cast.slice(0, 8);

    // // Cast div structure:
    // <div class="cast-card">
    //   <img
    //     src="https://media.themoviedb.org/t/p/w276_and_h350_face/8RZLOyYGsoRe9p44q3xin9QkMHv.jpg"
    //     alt="Keanu Reeves"
    //   />
    //   <div class="cast-info">
    //     <h4>Keanu Reeves</h4>
    //     <p>John Wick</p>
    //   </div>
    // </div>

    const castList = document.querySelector("#cast-list");
    cast.forEach((actor) => {
      const castPosterPath = actor.profile_path
        ? `${TMDB_IMAGE_BASE_URL}${actor.profile_path}`
        : "./assets/placeholder-poster-image.jpg";

      const castCard = document.createElement("div");
      castCard.className = "cast-card";

      castCard.innerHTML = `
      <img
      src= "${castPosterPath}"
      alt="${actor.name}"
      loading="lazy"
      />
      <div class="cast-info">
        <h4>${actor.name}</h4>
        <p>${actor.character}</p>
      </div>
    `;

      castList.appendChild(castCard);
    });
  } catch (error) {
    console.error("Error in fetchMovieCredits:", error);
  }
}

async function fetchSimilarMovies(movieId) {
  try {
    const res = await fetch(`${PROXY_API_BASE_URL}/api/movie/${movieId}/similar`);
    const similarMoviesData = await res.json();

    const similarMovies = similarMoviesData.results.slice(0, 4);

    // // similar movie card structure:
    // <div class="similar-card">
    //   <img
    //     src="https://media.themoviedb.org/t/p/w500/vtu6H4NWnQVqEp3aanUq3hNeeot.jpg"
    //     alt="Movie Poster"
    //   />
    //   <h4 class="movie-title">Death Proof</h4>
    //   <p class="movie-year">2003</p>
    // </div>

    const similarMoviesList = document.querySelector(".similar-list");

    similarMovies.forEach((movie) => {
      const posterPath = movie.poster_path
        ? `${TMDB_IMAGE_BASE_URL}${movie.poster_path}`
        : "./assets/placeholder-poster-image.jpg";

      const releaseDate = new Date(movie.release_date);

      const movieCard = document.createElement("div");
      movieCard.className = "similar-card";

      movieCard.innerHTML = `
      <img
        src="${posterPath}"
        alt="Movie Poster"
        loading="lazy"
      />
      <h4 class="movie-title">${movie.title}</h4>
      <p class="movie-year">${releaseDate.getFullYear()}</p>
    `;

      movieCard.addEventListener("click", () => {
        window.location.href = `movie.html?id=${movie.id}`;
      });

      similarMoviesList.appendChild(movieCard);
    });
  } catch (error) {
    console.error("Error in fetchSimilarMovies:", error);
  }
}

async function initMoviePage(movieId) {
  const loader = document.querySelector(".loader");
  showLoaderOverlay();
  showLoader(loader);
  await Promise.all([
    fetchMovieDetails(movieId),
    fetchMovieCredits(movieId),
    fetchSimilarMovies(movieId),
  ]);
  hideLoader(loader);
  hideLoaderOverlay();
}

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const movieId = params.get("id");
  // Validate: check id is not null and is a number
  if (!movieId || isNaN(movieId)) {
    alert("Invalid movie ID");
    window.location.href = "index.html";
  } else {
    initMoviePage(movieId);
  }
});
