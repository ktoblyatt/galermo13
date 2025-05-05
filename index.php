<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Поиск фильмов</title>
    <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@100&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="styles.css"> <!-- Подключаем стили -->
</head>
<body>
    <div class="container">
        <!-- Строка поиска -->
        <div class="search-box">
            <button class="home-button" onclick="window.location.reload()">
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0,0,256,256" width="20px" height="20px" fill-rule="nonzero">
                    <g fill="#ffffff" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal">
                        <g transform="scale(5.33333,5.33333)">
                            <path d="M23.95117,4c-0.31984,0.01092 -0.62781,0.12384 -0.87891,0.32227l-14.21289,11.19727c-1.8039,1.42163 -2.85937,3.59398 -2.85937,5.89063v19.08984c0,1.36359 1.13641,2.5 2.5,2.5h10c1.36359,0 2.5,-1.13641 2.5,-2.5v-10c0,-0.29504 0.20496,-0.5 0.5,-0.5h5c0.29504,0 0.5,0.20496 0.5,0.5v10c0,1.36359 1.13641,2.5 2.5,2.5h10c1.36359,0 2.5,-1.13641 2.5,-2.5v-19.08984c0,-2.29665 -1.05548,-4.46899 -2.85937,-5.89062l-14.21289,-11.19727c-0.27738,-0.21912 -0.62324,-0.33326 -0.97656,-0.32227zM24,7.41016l13.28516,10.4668c1.0841,0.85437 1.71484,2.15385 1.71484,3.5332v18.58984h-9v-9.5c0,-1.91495 -1.58505,-3.5 -3.5,-3.5h-5c-1.91495,0 -3.5,1.58505 -3.5,3.5v9.5h-9v-18.58984c0,-1.37935 0.63074,-2.67883 1.71484,-3.5332z"></path>
                        </g>
                    </g>
                </svg>
            </button>
            <input type="text" id="movieTitle" placeholder="Введите название фильма...">
            <button class="search-button" onclick="searchMovie()">Поиск</button>
        </div>

        <!-- История просмотренных фильмов -->
        <div class="movie-section">
            <h2 class="section-title">Недавно просмотренные</h2>
                        <div class="movies-list" id="movieHistory"></div>
        </div>

        <!-- Контейнер с информацией о фильме -->
        <div id="movieInfo" class="hidden">
            <!-- Логотип фильма -->
            <div id="movieLogoContainer" class="hidden">
                <img id="movieLogo" src="" class="movie-logo">
            </div>

            <!-- Основной контейнер с информацией -->
            <div class="movie-info-container">
                <!-- Постер и рейтинг -->
                <div class="poster-container">
                    <img id="posterImage" src="" alt="Постер фильма" class="movie-poster">
                    <div id="ratingContainer" class="rating-box"></div>
                </div>

                <!-- Краткое описание -->
                <div class="description-container">
                    <p id="shortDescription" class="short-description"></p>
                </div>
            </div>

            <!-- Плеер -->
                <section class="player-section">
                    <div id="playerBlock" class="kinobox_player"></div>
                </section>
        </div>

        <!-- Похожие фильмы -->
        <div class="movie-section hidden" id="similarMovies">
            <h2 class="section-title">Похожие фильмы</h2>
            <div class="movies-list" id="similarMoviesList"></div>
        </div>
    </div>

    <script src="https://kinobox.tv/kinobox.min.js"></script>
    <script src="scripts.js"></script> <!-- Подключаем скрипты -->
</body>
</html>
