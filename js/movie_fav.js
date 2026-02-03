const ERROR_LOADING_MOVIE = "Error occured while loading movie.";
const FILL_INFO_MESSAGE = "Please, enter comment."

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
}
else {
    titleEl.textContent = movie.title;
    directorEl.textContent = movie.director || 'Unknown';
    yearEl.textContent = movie.releaseDate ? movie.releaseDate : 'Unknown';
    ratedEl.textContent = movie.rating ? movie.rating : "Unknown";
    plotEl.textContent = 'Unknown';

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
            titleEl.textContent = movie.title;
            yearEl.textContent = movie.releaseDate;
            ratedEl.textContent = movie.rating || 'N/A';
            directorEl.textContent = movie.director || 'N/A';
            writerEl.textContent = 'N/A';
            actorsEl.textContent = 'N/A';
            genreEl.textContent = 'N/A';
            languageEl.textContent = 'N/A';
            countryEl.textContent = 'N/A';
            awardsEl.textContent = 'N/A';
            imdbRatingEl.textContent = 'N/A';
            boxOfficeEl.textContent = 'N/A';
            productionEl.textContent = 'N/A';
        }

    } catch (err) {
        posterEl.src = "assets/images/animated-rocket-traveling-to-space-free-video.jpg";
        plotEl.textContent = ERROR_LOADING_MOVIE;
    }
}

const commentsList = document.getElementById('comments-list');
const commentForm = document.getElementById('comment-form');
const commentAuthor = document.getElementById('comment-author');
const commentText = document.getElementById('comment-text');

const movieKey = movie.title.replace(/\s+/g, '_').toLowerCase();
const STORAGE_KEY = `comments_${movieKey}`;

let comments = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

function renderComments() {
    if (!commentsList) {
        return;
    }

    commentsList.innerHTML = '';

    if (comments.length === 0) {
        commentsList.innerHTML = '<li class="no-comments">No comments yet.</li>';
        return;
    }

    comments.forEach(c => {
        const li = document.createElement('li');
        li.className = 'comment-item';
        li.innerHTML = `
            <div class="comment-header">
                <strong>${c.author}</strong>
                <span class="comment-date">${c.date}</span>
            </div>
            <p class="comment-body">${c.text}</p>
        `;
        commentsList.appendChild(li);
    });
}

renderComments();

commentForm.addEventListener('submit', e => {
    e.preventDefault();

    const currUser = JSON.parse(localStorage.getItem("currentUser"));
    const author = currUser ? currUser.username : "Anonymous user";
    const text = commentText.value.trim();

    if (!text) {
        alert(FILL_INFO_MESSAGE);
        return;
    }

    if (text.length > 200) {
        return;
    }

    const newComment = {
        author,
        text,
        date: new Date().toLocaleDateString() + ' '
            + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    comments.push(newComment);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(comments));

    commentForm.reset();
    renderComments();
});