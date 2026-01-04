const API_KEY = ''; 

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

const homeBtn = document.getElementById('home-btn');

homeBtn.addEventListener('click', () => {
    window.location.href = 'catalogue.html';
});


const movie = JSON.parse(localStorage.getItem('selectedMovie'));
if (!movie) {
    window.location.href = 'catalogue.html';
} else {
    titleEl.textContent = movie.title;
    directorEl.textContent = movie.director || 'Unknown';
    yearEl.textContent = movie.releaseDate ? movie.releaseDate.split('-')[0] : 'Unknown';
    ratedEl.textContent = 'Unknown';
    plotEl.textContent = 'Unknown';

    fetchOMDb(movie.title, yearEl.textContent);
}

async function fetchOMDb(title, year) {
    if (!API_KEY || API_KEY === '') return;

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

        } else {
            posterEl.src = "assets/images/animated-rocket-traveling-to-space-free-video.jpg";
            plotEl.textContent = 'Additional info not available.';
              titleEl.textContent = data.Title;
            yearEl.textContent = data.Year;
            ratedEl.textContent = data.Rated || 'Unknown';
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
        }

    } catch (err) {
        posterEl.src = "assets/images/animated-rocket-traveling-to-space-free-video.jpg";
        plotEl.textContent = 'Error loading movie info.';
    }
}