let movies = JSON.parse(localStorage.getItem('movies')) || [];
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


function renderFavorites() {
    moviesContainer.innerHTML = '';

    const favs = movies.filter(m => m.favorited);

    favs.forEach(movie => {
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
                <span class="heart favorited">&#10084;</span>
                <button class="more-btn">More Info</button>
            </div>
        `;

        card.querySelector('.heart').onclick = () => {
            movie.favorited = false;
            localStorage.setItem('movies', JSON.stringify(movies));
            renderFavorites();
        };

        card.querySelector('.more-btn').onclick = () => {
            localStorage.setItem('selectedMovie', JSON.stringify(movie));
            window.location.href = 'movie_fav.html';
        };

        moviesContainer.appendChild(card);
    });
}

renderFavorites();