const currentUserObj = JSON.parse(localStorage.getItem("currentUser"));
const currentUsername = currentUserObj ? currentUserObj.username : null;

let allMovies = JSON.parse(localStorage.getItem('movies')) || [];
const moviesContainer = document.querySelector('.movies-container');

document.getElementById("home-btn").onclick = () => window.location.href = "catalogue.html";
document.getElementById("favs-btn").onclick = () => window.location.href = "favorites.html";
document.getElementById("watched-btn").onclick = () => window.location.href = "watched.html";

function getUserWatchedTitles() {
    return JSON.parse(localStorage.getItem(`watched_${currentUsername}`)) || [];
}

function renderWatched() {
    if (!moviesContainer) {
        return;
    }
    moviesContainer.innerHTML = '';

    const userWatchedTitles = getUserWatchedTitles();

    const watchedMovies = allMovies.filter(m => userWatchedTitles.includes(m.title));

    if (watchedMovies.length === 0) {
        return;
    }

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
                <span class="watched-icon">✅</span>
                <button class="more-btn">More Info</button>
            </div>
        `;

        card.querySelector('.more-btn').onclick = () => {
            localStorage.setItem('selectedMovie', JSON.stringify(movie));
            window.location.href = 'movie.html';
        };

          card.querySelector('.watched-icon').onclick = () => {
            let updatedWatched = userWatchedTitles.filter(title => title !== movie.title);
            localStorage.setItem(`watched_${currentUsername}`, JSON.stringify(updatedWatched));
            renderWatched();
        };
        
        moviesContainer.appendChild(card);
    });
}

renderWatched();