function navigateToSearchPage(searchQuery) {
  if (searchQuery && searchQuery != "") {
    window.location.href = `search.html?query=${searchQuery}`;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.querySelector("#searchInput");
  const mobileSearchInput = document.querySelector("#mobileSearchInput");

  // Toggle mobile search bar
  document
    .querySelector(".mobile-search-icon")
    .addEventListener("click", () => {
      document.querySelector(".mobile-search-div").classList.toggle("active");
    });

  // Enable logo click to navigate to homepage
  document.querySelector(".header-logo").addEventListener("click", () => {
    window.location.href = "index.html";
  });
  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      navigateToSearchPage(searchInput.value);
    }
  });

  mobileSearchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      navigateToSearchPage(mobileSearchInput.value);
    }
  });

  document.querySelector("#searchBtn").addEventListener("click", () => {
    navigateToSearchPage(searchInput.value);
  });

  document.querySelector("#mobileSearchBtn").addEventListener("click", () => {
    navigateToSearchPage(mobileSearchInput.value);
  });
});
