let moviesContainer = document.querySelector('.movies-container');
const homeBtn = document.getElementById("home-btn");
const favBtn = document.getElementById("favs-btn");
const watchedBtn = document.getElementById("watched-btn");

favBtn.addEventListener("click", () => {
    window.location.href="favorites.html";
});

watchedBtn.addEventListener("click", () => {
   window.location.href="watched.html";
});

homeBtn.addEventListener("click", () => window.location.href = "catalogue.html");

let allMovies = JSON.parse(localStorage.getItem('movies')) || [];

function loadWatchedMovies() {
    const watchedMovies = allMovies.filter(m => m.watched);
    renderWatchedMovies(watchedMovies);
}

function renderWatchedMovies(watchedMovies) {
    moviesContainer.innerHTML = '';

    watchedMovies.forEach(movie => {
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
                <span class="watched ${movie.watched ? 'checked' : ''}">${movie.watched ? '✅' : '⬜'}</span>
                <button class="more-btn">More Info</button>
            </div>
        `;

        const watchedIcon = card.querySelector('.watched');
        watchedIcon.onclick = () => {
            movie.watched = !movie.watched;            
            localStorage.setItem('movies', JSON.stringify(allMovies));
            loadWatchedMovies();
        };

        card.querySelector('.more-btn').onclick = () => {
            localStorage.setItem('selectedMovie', JSON.stringify(movie));
            window.location.href = 'movie.html';
        };

        moviesContainer.appendChild(card);
    });
}

loadWatchedMovies();