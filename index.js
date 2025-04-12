const apiKey = "4c4af002c1093acfdffd11b7503410c4";
const heroSection = document.getElementById("heroSection");
const exploreSection = document.getElementById("exploreSection");

// Genre mapping
const genres = {
  Horror: 27,
  Action: 28,
  Comedy: 35,
  Romance: 10749
};

async function fetchMoviesByGenre(genreId) {
  const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genreId}`;
  const res = await fetch(url);
  const data = await res.json();
  return data.results;
}

// Hero slider
async function loadHero() {
  const data = await fetchMoviesByGenre(genres.Action);
  const backgrounds = data
    .filter(m => m.backdrop_path)
    .slice(0, 5)
    .map(m => `https://image.tmdb.org/t/p/original${m.backdrop_path}`);

  let index = 0;
  function changeBackground() {
    heroSection.style.backgroundImage = `url(${backgrounds[index]})`;
    index = (index + 1) % backgrounds.length;
  }

  changeBackground();
  setInterval(changeBackground, 1500);
}

// Movie rows
async function renderExploreCategories() {
  for (const [genreName, genreId] of Object.entries(genres)) {
    const movies = await fetchMoviesByGenre(genreId);
    const block = document.createElement("div");
    block.className = "category-block";
    block.innerHTML = `<h2>${genreName}</h2><div class="movie-row"></div>`;

    const row = block.querySelector(".movie-row");

    movies.slice(0, 10).forEach(movie => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" />
        <p>${movie.title}</p>
      `;
      row.appendChild(card);
    });

    exploreSection.appendChild(block);
  }
}

loadHero();
renderExploreCategories();
