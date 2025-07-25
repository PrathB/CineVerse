async function fetchSearchResults(searchQuery) {
  const loader = document.querySelector(".loader");
  showLoader(loader);
  try {
    const res = await fetch(
      `${PROXY_API_BASE_URL}/api/search/movie?query=${searchQuery}`
    );

    const movies = await res.json();

    if (movies.results.length === 0) {
      hideLoader(loader);
      const noResults = document.querySelector(".no-results");
      noResults.style.display = "block";
      return;
    }

    const grid = document.querySelector("#search-results-grid");

    renderMovies(movies.results, grid);
  } catch (err) {
    console.error("Fetch error:", err);
  } finally {
    hideLoader(loader);
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
