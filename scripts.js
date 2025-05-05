// Массив с API-ключами
const apiKeys = [
    "622f04e9-c4b5-4e07-8049-47fc999ec3d3",
    "4c535268-b948-411e-8f5a-1d03d35af5af",
    "b6b09dfe-4abd-4f0f-bbfb-95d2485f5f80",
    "41568fe3-e0a9-406c-8e1c-55255d7484dc",
    "82fb0c0c-1e45-489f-8be1-1ad31746f6cf",
    "0309f3ea-15bb-4c71-845e-7485749c3308",
    "0dc99e50-a7c8-46b8-a872-500a10a2c016",
    "176a6f3e-2db7-4db2-8e35-fd7e40bb4f9c",
    "41b2f43e-7df1-4368-8309-84740c37ede4",
    "ac3e5c38-cba6-4b1e-9d19-2f5b677636af",
    "08370126-6715-41ce-a29d-21525477b477",
    "9d058fe0-c170-4ba5-a2c8-12ac410796af",
    "d89a0e08-9108-4238-97a8-a35757336636",
    "54c0d5ec-f474-4be0-998a-e764041af4a9",
    "1b0eac21-0d50-42ec-a26b-9f290ecf049e",
    "dbf94b1c-9a9a-4053-bfc8-ae51bf6f501b",
    "46593805-5907-414f-8e87-19558f9b12e4",
    "eb4a8508-dd5b-43e6-8056-a5155b85003b",
    "daab64b9-e865-48e4-b80b-61f1e586c406",
    "b714e7cd-c805-4ea2-9a01-52a5adf88662",
    "e128cac9-6e94-4095-8cab-323e3f0e9b2b",
    "6ba14aae-0432-43c9-87a0-d53b8eb2b288",
    "b6528c54-448a-4456-a16d-09577067b4ed"
];

// Функция для получения случайного API-ключа
function getRandomApiKey() {
    const randomIndex = Math.floor(Math.random() * apiKeys.length);
    return apiKeys[randomIndex];
}

// Модифицированная функция для сохранения истории
function saveHistory(movieData) {
    fetch('save_history.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(movieData)
    }).then(() => showHistory());
}

// Обновленная функция для отображения истории
function showHistory() {
    fetch('get_history.php')
        .then(response => response.json())
        .then(history => {
            const historyHTML = history.map(movie => `
                <div class="movie-card" onclick="searchMovieById(${movie.id})">
                    <img src="${movie.poster}" class="movie-poster" alt="${movie.name}">
                    <div class="movie-title">${movie.name}</div>
                </div>
            `).join('');
            document.getElementById('movieHistory').innerHTML = historyHTML;
        });
}

document.addEventListener('DOMContentLoaded', showHistory);

// Новая функция для поиска по ID
async function searchMovieById(movieId) {
    const apiKey = getRandomApiKey(); // Используем случайный API-ключ
    
    try {
        const detailsResponse = await fetch(`https://kinopoiskapiunofficial.tech/api/v2.2/films/${movieId}`, {
            headers: {"X-API-KEY": apiKey}
        });
        const details = await detailsResponse.json();

        displayMovieInfo(details);
        fetchSimilarMovies(movieId);
    } catch (error) {
        console.error('Ошибка:', error);
    }
}

// Функция для отображения информации о фильме
function displayMovieInfo(details) {
    // Логотип фильма
    const logoContainer = document.getElementById('movieLogoContainer');
    const movieLogo = document.getElementById('movieLogo');
    if (details.logoUrl) {
        movieLogo.src = details.logoUrl;
        logoContainer.classList.remove('hidden');
    } else {
        logoContainer.classList.add('hidden');
    }

    // Постер и рейтинг
    document.getElementById('posterImage').src = details.posterUrl;
    const ratingContainer = document.getElementById('ratingContainer');
    ratingContainer.textContent = `★ ${details.ratingKinopoisk}`;
    ratingContainer.style.color = 
        details.ratingKinopoisk <= 3 ? 'red' :
        details.ratingKinopoisk <= 5 ? 'orange' :
        details.ratingKinopoisk <= 8 ? 'green' : 'blue';

    // Краткое описание
    document.getElementById('shortDescription').textContent = details.description || 'Описание отсутствует';

    // Фон контейнера
    const movieInfoContainer = document.querySelector('.movie-info-container');
    movieInfoContainer.style.backgroundImage = `url('${details.coverUrl}')`;

    // Плеер
    document.getElementById('movieInfo').classList.remove('hidden');
    new Kinobox(document.getElementById('playerBlock'), {
        search: { kinopoisk: details.kinopoiskId }
    }).init();

    // Сохранение в историю
    saveHistory({
        id: details.kinopoiskId,
        name: details.nameRu,
        poster: details.posterUrl
    });
}

// Обновленная функция поиска
async function searchMovie(inputTitle) {
    const movieTitle = inputTitle || document.getElementById('movieTitle').value;
    const apiKey = getRandomApiKey(); // Используем случайный API-ключ
    
    try {
        const searchResponse = await fetch(`https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=${encodeURIComponent(movieTitle)}`, {
            headers: {"X-API-KEY": apiKey}
        });
        const searchData = await searchResponse.json();

        if (searchData.films?.length > 0) {
            const filmId = searchData.films[0].filmId;
            const detailsResponse = await fetch(`https://kinopoiskapiunofficial.tech/api/v2.2/films/${filmId}`, {
                headers: {"X-API-KEY": apiKey}
            });
            const details = await detailsResponse.json();
            
            displayMovieInfo(details);
            fetchSimilarMovies(filmId);
        }
    } catch (error) {
        console.error('Ошибка:', error);
    }
}

// Обновленная функция для получения похожих фильмов
async function fetchSimilarMovies(movieId) {
    const apiKey = getRandomApiKey(); // Используем случайный API-ключ
    
    try {
        const response = await fetch(`https://kinopoiskapiunofficial.tech/api/v2.2/films/${movieId}/similars`, {
            headers: {"X-API-KEY": apiKey}
        });
        const data = await response.json();
        
        const similarMovies = document.getElementById('similarMovies');
        const similarList = document.getElementById('similarMoviesList');
        
        if (data.items?.length > 0) {
            similarList.innerHTML = data.items.slice(0, 10).map(movie => `
                <div class="movie-card" onclick="searchMovieById(${movie.filmId})">
                    <img src="${movie.posterUrlPreview}" class="movie-poster" alt="${movie.nameRu}">
                    <div class="movie-title">${movie.nameRu}</div>
                </div>
            `).join('');
            similarMovies.classList.remove('hidden');
        } else {
            similarMovies.classList.add('hidden');
        }
    } catch (error) {
        console.error('Ошибка при загрузке похожих фильмов:', error);
        document.getElementById('similarMovies').classList.add('hidden');
    }
}