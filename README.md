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
  client/
    assets/
      placeholder-poster-image.jpg
    index.html
    movie.html
    search.html
    scripts/
      config.js
      header.js
      home.js
      movie.js
      search.js
      tmdb-utils.js
    styles/
      base.css
      header.css
      movie-details.css
      movies.css
  README.md
  server/
    index.js
    package-lock.json
    package.json
    routes/
      genre.js
      movie-list.js
      movie.js
      search.js
    utils/
      tmdbClient.js
```
