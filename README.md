# 🎬 Cineverse

**Cineverse** is a fully responsive movie discovery web app built using HTML, CSS, and JavaScript, powered by [The Movie Database (TMDB)](https://www.themoviedb.org/) API. It features a secure Node.js reverse proxy server to handle API requests and keep the TMDB token hidden from the frontend.

<br>

## 🌐 Live Demo

- **Frontend (Vercel)**: [[cineverse-moviehub.vercel.app](https://cineverse-moviehub.vercel.app/)]  
- **Backend (Render)**: [[cineverse-server.onrender.com](https://cineverse-reverse-proxy.onrender.com)]

> 🔒 The frontend interacts **only** with the proxy server. TMDB credentials are never exposed to the client.

---

## 📁 Project Structure

```
CineVerse/
├── client/   # Frontend static site (HTML, CSS, JS)
│ ├── assets/
│ │ └── placeholder-poster-image.jpg   # Fallback image for missing posters
│ ├── index.html    # Homepage displaying trending, popular, top-rated, and upcoming movies
│ ├── movie.html    # Movie details page
│ ├── search.html   # Search results page
│ ├── scripts/
│ │ ├── config.js     # Stores base URLs and endpoint paths
│ │ ├── header.js     # Script for search header behavior
│ │ ├── home.js       # Handles homepage movie sections
│ │ ├── movie.js      # Handles movie details rendering
│ │ ├── search.js     # Handles search results rendering
│ │ └── tmdb-utils.js # Contains utility functions for API calls to proxy server
│ └── styles/
│ ├── base.css          # Global styles
│ ├── header.css        # Styles for the header/search bar
│ ├── movie-details.css # Styles for movie.html layout
│ └── movies.css        # Grid layout styling for movie cards
├── README.md   # Project documentation
├── server/     # Node.js reverse proxy backend
│ ├── index.js           # Main server file to start Express app
│ ├── package.json       # Node dependencies and metadata
│ ├── package-lock.json  # Exact versions of installed dependencies
│ ├── routes/
│ │ ├── genre.js        # API route for fetching genres
│ │ ├── movie-list.js   # API route for movie lists (popular, trending, etc.)
│ │ ├── movie.js        # API route for movie details
│ │ └── search.js       # API route for searching movies
│ └── utils/
│ └── tmdbClient.js   # Axios setup with retries and TMDB token handling
└── .gitignore     # Specifies files/folders to ignore in Git
```
