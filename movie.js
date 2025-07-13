const params = new URLSearchParams(window.location.search);
const movieId = params.get("id");

// Validate: check id is not null and is a number
if (!movieId || isNaN(movieId)) {
  alert("Invalid movie ID");
  window.location.href = "index.html";
} else {
  fetchMovieDetails(movieId);
}

function fetchMovieDetails(movieId) {}
