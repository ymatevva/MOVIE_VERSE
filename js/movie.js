const ERROR_LOADING_MOVIE = "Error occured while loading movie.";

const API_KEY = '741ae286';

const posterEl = document.getElementById('movie-poster');
const titleEl = document.getElementById('movie-title');
const yearEl = document.getElementById('movie-year');
const ratedEl = document.getElementById('movie-rated');
const directorEl = document.getElementById('movie-director');
const writerEl = document.getElementById('movie-writer');
const actorsEl = document.getElementById('movie-actors');
const genreEl = document.getElementById('movie-genre');
const plotEl = document.getElementById('movie-plot');
const languageEl = document.getElementById('movie-language');
const countryEl = document.getElementById('movie-country');
const awardsEl = document.getElementById('movie-awards');
const imdbRatingEl = document.getElementById('movie-imdbRating');
const boxOfficeEl = document.getElementById('movie-boxoffice');
const productionEl = document.getElementById('movie-production');
const durationEl = document.getElementById("movie-duration");
const releaseDate = document.getElementById("release-date");

const homeBtn = document.getElementById("home-btn");
const favoritesBtn = document.getElementById("favs-btn");
const watchedBtn = document.getElementById("watched-btn");

homeBtn.addEventListener("click", () => {
    window.location.href = "catalogue.html";
});

favoritesBtn.addEventListener("click", () => {
    window.location.href = "favorites.html";
});

watchedBtn.addEventListener("click", () => {
    window.location.href = "watched.html";
});

const movie = JSON.parse(localStorage.getItem('selectedMovie'));

if (!movie) {
    window.location.href = 'catalogue.html';
} else {
    titleEl.textContent = movie.title;
    directorEl.textContent = movie.director || 'Unknown';
    yearEl.textContent = movie.releaseDate ? movie.releaseDate.split('-')[0] : 'Unknown';
    ratedEl.textContent = movie.rating || "Unknown";

    fetchOMDb(movie.title, yearEl.textContent);
}

async function fetchOMDb(title, year) {
    if (!API_KEY || API_KEY === '') {
        return;
    }

    try {
        const url = `https://www.omdbapi.com/?t=${encodeURIComponent(title)}&y=${year}&apikey=${API_KEY}`;
        const res = await fetch(url);
        const data = await res.json();

        if (data.Response === 'True'
            && data.Title.toLowerCase() === title.toLowerCase()
            && data.Year === year) {

            posterEl.src = (data.Poster && data.Poster !== "Unknown")
                ? data.Poster
                : "assets/images/animated-rocket-traveling-to-space-free-video.jpg";

            titleEl.textContent = data.Title;
            yearEl.textContent = data.Year;
            ratedEl.textContent = data.Rated || 'Unknown';
            durationEl.textContent = data.Runtime || "Unknown";
            releaseDate.textContent = data.Released || "Unknown";
            directorEl.textContent = data.Director || movie.director || 'Unknown';
            writerEl.textContent = data.Writer || 'Unknown';
            actorsEl.textContent = data.Actors || 'Unknown';
            genreEl.textContent = data.Genre || 'Unknown';
            plotEl.textContent = data.Plot || 'Unknown';
            languageEl.textContent = data.Language || 'Unknown';
            countryEl.textContent = data.Country || 'Unknown';
            awardsEl.textContent = data.Awards || 'Unknown';
            imdbRatingEl.textContent = data.imdbRating || 'Unknown';
            boxOfficeEl.textContent = data.BoxOffice || 'Unknown';
            productionEl.textContent = data.Production || 'Unknown';

            movie.director = data.Director;
            movie.duration = data.duration;

            const allMovies = JSON.parse(localStorage.getItem('movies')) || [];
            const index = allMovies.findIndex(m => m.title.toLowerCase() === movie.title.toLowerCase());

            if (index !== -1) {
                allMovies[index].director = data.Director;
                allMovies[index].duration = data.Runtime;
                localStorage.setItem('movies', JSON.stringify(allMovies));
            }

        } else {
            posterEl.src = "assets/images/animated-rocket-traveling-to-space-free-video.jpg";
            plotEl.textContent = 'Additional info not available.';
            titleEl.textContent = movie.title;
            yearEl.textContent = movie.releaseDate;
            ratedEl.textContent = movie.rating || 'Unknown';
            directorEl.textContent = movie.director || 'Unknown';
            writerEl.textContent = 'Unknown';
            actorsEl.textContent = 'Unknown';
            genreEl.textContent = 'Unknown';
            plotEl.textContent = 'Unknown';
            languageEl.textContent = 'Unknown';
            countryEl.textContent = 'Unknown';
            awardsEl.textContent = 'Unknown';
            imdbRatingEl.textContent = 'Unknown';
            boxOfficeEl.textContent = 'Unknown';
            productionEl.textContent = 'Unknown';
        }

    } catch (err) {
        posterEl.src = "assets/images/animated-rocket-traveling-to-space-free-video.jpg";
        plotEl.textContent = ERROR_LOADING_MOVIE;
    }
}