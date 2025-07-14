// Toggle mobile search bar
document.querySelector(".mobile-search-icon").addEventListener("click", () => {
  document.querySelector(".mobile-search-div").classList.toggle("active");
});

// Enable logo click to navigate to homepage
document.querySelector(".header-logo").addEventListener("click", () => {
  window.location.href = "index.html";
});
