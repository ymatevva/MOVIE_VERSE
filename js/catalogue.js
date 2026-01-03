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


homeBtn.addEventListener("click", () => {
    window.location.href = "main.html";
});

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
            movies = data.map(m => ({
                ...m,
                favorited: false,
                watched: false,
                fetchedFromAPI: true
            }));
            localStorage.setItem('movies', JSON.stringify(movies));
            renderMovies();
        })
        .catch(err => {
            console.error('Error while loading movies:', err);
            alert('Error while loading movies!');
        });
}

addMovieBtn.addEventListener("click", () => {
    modal.style.display = 'block';
});

closeModal.addEventListener("click", () => {
    modal.style.display = 'none';
});

submitBtn.addEventListener("click", () => {
    modal.style.display = "none";
});


addMovieForm.addEventListener('submit', e => {
    e.preventDefault();

    const title = document.getElementById("new-title").value.trim();
    if (!title) return alert("Title required");

    if (movies.some(m => m.title.toLowerCase() === title.toLowerCase())) {
        return alert('Movie already exists');
    }

    const newMovie = {
        title,
        duration: document.getElementById("new-duration").value,
        releaseDate: document.getElementById("new-release").value,
        rating: document.getElementById("new-rating").value,
        director: document.getElementById("new-director").value,
        favorited: false,
        watched: false,
        fetchedFromAPI: false
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
    const sorted = [...movies].sort((a, b) =>
        sortAscending
            ? a.title.localeCompare(b.title)
            : b.title.localeCompare(a.title)
    );

    sorted.forEach(movie => {
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
            <div class="movie-actions">
                <span class="heart ${movie.favorited ? 'favorited' : ''}">&#10084;</span>
                <span class="watched">${movie.watched ? '✅' : '⬜'}</span>
                <button class="remove-btn">Remove</button>
                <button class="more-btn">More Info</button>
            </div>
        `;

        // TO DO : add onclick methods for buttons of cards
      
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