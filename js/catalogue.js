const currentUserObj = JSON.parse(localStorage.getItem("currentUser"));
const currentUsername = currentUserObj ? currentUserObj.username : null;

let movies = [];
let sortAscending = true;

const homeBtn = document.getElementById("home-btn");
const favoritesBtn = document.getElementById("favs-btn");
const watchedBtn = document.getElementById("watched-btn");
const addMovieBtn = document.getElementById("add-movie-btn");
const modal = document.getElementById("add-movie-modal");
const closeModal = document.querySelector(".close-modal");
const addMovieForm = document.getElementById("add-movie-form");
const moviesContainer = document.querySelector(".movies-container");
const sortAscBtn = document.getElementById("sort-asc-btn");
const sortDescBtn = document.getElementById("sort-desc-btn");
const submitBtn = document.getElementById("submit-btn");

homeBtn.addEventListener("click", () => { window.location.href = "main.html"; });
favoritesBtn.addEventListener("click", () => { window.location.href = "favorites.html"; });
watchedBtn.addEventListener("click", () => { window.location.href = "watched.html"; });

function getUserData(type) {
    return JSON.parse(localStorage.getItem(`${type}_${currentUsername}`)) || [];
}

function toggleUserData(type, movieTitle) {
    let data = getUserData(type);
    if (data.includes(movieTitle)) {
        data = data.filter(t => t !== movieTitle);
    } else {
        data.push(movieTitle);
    }
    localStorage.setItem(`${type}_${currentUsername}`, JSON.stringify(data));
    renderMovies();
}

function loadMovies() {
    const stored = localStorage.getItem("movies");
    if (stored) {
        movies = JSON.parse(stored);
        renderMovies();
        return;
    }

    fetch('database/movies.json')
        .then(res => {
            if (!res.ok) throw new Error('Cannot load from movies.json');
            return res.json();
        })
        .then(data => {
            movies = data;
            localStorage.setItem('movies', JSON.stringify(movies));
            renderMovies();
        })
        .catch(err => {
            alert('Error while loading movies!');
        });
}

addMovieBtn.addEventListener("click", () => { modal.style.display = 'block'; });
closeModal.addEventListener("click", () => { modal.style.display = 'none'; });
submitBtn.addEventListener("click", () => { modal.style.display = "none"; });

addMovieForm.addEventListener('submit', e => {
    e.preventDefault();
    const title = document.getElementById("new-title").value.trim();
    if (!title) return alert("Title is required!");

    if (movies.some(m => m.title.toLowerCase() === title.toLowerCase())) {
        return alert('Movie already exists in the database.');
    }

    const newMovie = {
        title,
        duration: document.getElementById("new-duration").value,
        releaseDate: document.getElementById("new-release").value,
        rating: document.getElementById("new-rating").value,
        director: document.getElementById("new-director").value
    };

    movies.push(newMovie);
    localStorage.setItem('movies', JSON.stringify(movies));
    addMovieForm.reset();
    modal.style.display = 'none';
    renderMovies();
});

sortAscBtn.addEventListener("click", () => { sortAscending = true; renderMovies(); });
sortDescBtn.addEventListener("click", () => { sortAscending = false; renderMovies(); });

function renderMovies() {
    moviesContainer.innerHTML = '';
    const userFavs = getUserData('favs');
    const userWatched = getUserData('watched');

    const sorted = [...movies].sort((a, b) =>
        sortAscending
            ? a.title.localeCompare(b.title)
            : b.title.localeCompare(a.title)
    );

    sorted.forEach(movie => {
        const isFav = userFavs.includes(movie.title);
        const isWatched = userWatched.includes(movie.title);
        const card = document.createElement("div");

        card.className = "movie-card";
        card.innerHTML = `
        <div class="movie-info">
            <h3>${movie.title}</h3>
            <p><strong>Director:</strong> ${movie.director}</p>
            <p><strong>Rating:</strong> ${movie.rating}</p>
            <p><strong>Duration:</strong> ${movie.duration} min</p>
            <p><strong>Release:</strong> ${movie.releaseDate}</p>
        </div>
        <div class="options">
            <div class="movie-icons">
                <span class="heart ${isFav ? 'favorited' : ''}">&#10084;</span>
                <span class="watched">${isWatched ? '✅' : '⬜'}</span>
            </div>
            <div class="movie-actions">
                <button class="remove-btn">Remove</button>
                <button class="more-btn">More Info</button>
            </div>
        </div>`;

        card.querySelector(".heart").onclick = () => toggleUserData('favs', movie.title);
        card.querySelector(".watched").onclick = () => toggleUserData('watched', movie.title);

        card.querySelector(".remove-btn").onclick = () => {
            movies = movies.filter(m => m.title !== movie.title);
            localStorage.setItem('movies', JSON.stringify(movies));
            renderMovies();
        };

        card.querySelector(".more-btn").onclick = () => {
            localStorage.setItem('selectedMovie', JSON.stringify(movie));
            window.location.href = isFav ? "movie_fav.html" : "movie.html";
        };

        moviesContainer.appendChild(card);
    });
}

loadMovies();

window.resetMoviesForTesting = () => {
    localStorage.removeItem("movies");
    movies = [];
    sortAscending = true;
    loadMovies();
};