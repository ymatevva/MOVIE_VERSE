let movies = [];

const moviesContainer = document.querySelector('.movies-container');

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

function loadWatchedMovies() {
    const storedMovies = JSON.parse(localStorage.getItem('movies')) || [];
    movies = storedMovies.filter(m => m.watched);
    renderWatchedMovies();
}

function renderWatchedMovies() {
    moviesContainer.innerHTML = '';

    movies.forEach(movie => {
        const card = document.createElement('div');
        card.className = 'movie-card';

        card.innerHTML = `
            <div class="movie-info">
                <h3>${movie.title}</h3>
                <p><strong>Director:</strong> ${movie.director}</p>
                <p><strong>Rating:</strong> ${movie.rating}</p>
                <p><strong>Duration:</strong> ${movie.duration} min</p>
                <p><strong>Release:</strong> ${movie.releaseDate}</p>
            </div>
            <div class="movie-actions">
                <span class="watched">✅</span>
                <button class="more-btn">More Info</button>
            </div>
        `;

         card.querySelector('.watched').onclick = () => {
            movie.watched = false;
            localStorage.setItem('movies', JSON.stringify(movies));
            renderFavorites();
        };

       card.querySelector('.more-btn').addEventListener('click', () => {
           localStorage.setItem('selectedMovie', JSON.stringify(movie));
           window.location.href = 'movie.html';
       });

        moviesContainer.appendChild(card);
    });
}

function updateLocalStorage(updatedMovie) {
    let allMovies = JSON.parse(localStorage.getItem('movies')) || [];
    allMovies = allMovies.map(m => m.title === updatedMovie.title ? updatedMovie : m);
    localStorage.setItem('movies', JSON.stringify(allMovies));
}

loadWatchedMovies();