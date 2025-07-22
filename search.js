async function fetchSearchResults(searchQuery) {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${searchQuery}&include_adult=false&language=en-US&page=1`,
      options
    );

    const movies = await res.json();

    const grid = document.querySelector("#search-results-grid");

    renderMovies(movies.results, grid);
  } catch (err) {
    console.error("Fetch error:", err);
  }
}

async function init() {
  await fetchGenreMap();

  const params = new URLSearchParams(window.location.search);
  const searchQuery = params.get("query");

  document.querySelector("#searchInput").value = searchQuery;
  document.querySelector("#mobileSearchInput").value = searchQuery;

  fetchSearchResults(searchQuery);
}

document.addEventListener("DOMContentLoaded", () => {
  init();
});
