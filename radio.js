let data;
let movies;
let movieIds;
let hindiMovies;
let selectedCastName;
let joinMovie;
let simplifiedMovies;
let combinedData;
const personUrl = 'https://api.themoviedb.org/3/person/';
const apiKey = 'cc37399832696ae72d6412c05725058a';
const movieUrl = 'https://api.themoviedb.org/3/movie/';
const imageUrl = 'https://image.tmdb.org/t/p/original';

import('./src/moviesPlay.js').then(res => {
  console.log('Data imported into data constant');
  data = res;
  console.log(data);
  run();
  displayMovies();
  var castData = data.castData;
  let joinMovie = data.movies.concat(data.hindiMovies);
  simplifiedMovies = joinMovie.map(movie => ({
    name: movie.title,
    id: movie.tmdbId
  }));
  combinedData = castData.concat(simplifiedMovies);
});

function run() {
  joinMovie = data.movies.concat(data.hindiMovies);
  movies = data.movies;
  hindiMovies = data.hindiMovies;
  const decades = getDecadesArray(joinMovie);
  populateDecadeDropdown(decades);
  
  let genresSet = new Set();
  for (let index = 0; index < joinMovie.length; index++) {
    const k = joinMovie[index].genres;
    for (let j = 0; j < k.length; j++) {
      genresSet.add(JSON.stringify(k[j]));
    }
  }
  const checkboxContainer = document.getElementById('checkboxContainer');
  function createGenreCheckbox(genre) {
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.value = genre.id;
    checkbox.id = `genre-${genre.id}`;
    checkbox.name = 'genres';

    const label = document.createElement('label');
    label.htmlFor = `genre-${genre.id}`;
    label.appendChild(document.createTextNode(genre.name));

    checkboxContainer.appendChild(checkbox);
    checkboxContainer.appendChild(label);
    checkboxContainer.appendChild(document.createElement('br'));
  }
  genresSet.forEach(genreString => {
    const genre = JSON.parse(genreString);
    createGenreCheckbox(genre);
  });

  document.querySelectorAll('input[name="category"]').forEach(radioButton => {
    radioButton.addEventListener('change', () => {
      displayMovies();
    });
  });

  document.querySelectorAll('input[name="genres"]').forEach(checkbox => {
    checkbox.addEventListener('change', () => {
      genresSelection();
      decadeSelection();
    });
  });

  document.querySelectorAll('input[name="logicalOperator"]').forEach(radioButton => {
    radioButton.addEventListener('change', () => {
      decadeSelection();
    });
  });
  
  document.getElementById('decadeDropdown').addEventListener('change', function () {
    decadeSelection();
  });
}

function displayMovies() {
  let categoryCheck = document.querySelector('input[name="category"]:checked');
  const selectedCategory = categoryCheck ? categoryCheck.value : null;
  let selectedMovies;

  if (selectedCategory === 'hindi') {
    selectedMovies = hindiMovies;
  } else if (selectedCategory === 'international') {
    selectedMovies = movies;
  } else {
    selectedMovies = hindiMovies.concat(movies);
  }

  displayMoviesInDropdown(selectedMovies);
  getMovieInformation(selectedMovies);
}

function decadeSelection() {
  const selectedDecade = document.getElementById('decadeDropdown').value;
  const selectedCategory = document.querySelector('input[name="category"]:checked') ?
    document.querySelector('input[name="category"]:checked').value :
    null;

  const selectedGenres = Array.from(document.querySelectorAll('input[name="genres"]:checked'))
    .map(checkbox => parseInt(checkbox.value));

  const logicalOperator = document.querySelector('input[name="logicalOperator"]:checked') ?
    document.querySelector('input[name="logicalOperator"]:checked').value :
    'AND';

  let filteredMovies;
  if (selectedCategory === 'hindi') {
    filteredMovies = filterMoviesByDecade(hindiMovies, selectedDecade);
  } else if (selectedCategory === 'international') {
    filteredMovies = filterMoviesByDecade(movies, selectedDecade);
  } else {
    filteredMovies = filterMoviesByDecade(joinMovie, selectedDecade);
  }
  if (selectedGenres.length > 0) {
    filteredMovies = filteredMovies.filter(movie => {
      if (logicalOperator === 'AND') {
        return selectedGenres.every(genreId =>
          movie.genres.some(movieGenre => movieGenre.id === genreId)
        );
      } else if (logicalOperator === 'OR') {
        console.log('inside or condition');
        return selectedGenres.some(genreId =>
          movie.genres.some(movieGenre => movieGenre.id === genreId)
        );
      }
    });
  }

  displayMoviesInDropdown(filteredMovies);
  getMovieInformation(filteredMovies);
}

function genresSelection() {
  const selectedCategory = document.querySelector('input[name="category"]:checked') ?
    document.querySelector('input[name="category"]:checked').value :
    null;
  const selectedGenres = Array.from(document.querySelectorAll('input[name="genres"]:checked'))
    .map(checkbox => parseInt(checkbox.value));

  const logicalOperator = document.querySelector('input[name="logicalOperator"]:checked') ?
    document.querySelector('input[name="logicalOperator"]:checked').value :
    'AND';
  let selectedMovies;

  if (selectedCategory === 'hindi') {
    selectedMovies = hindiMovies;
  } else if (selectedCategory === 'international') {
    selectedMovies = movies;
  } else {
    selectedMovies = hindiMovies.concat(movies);
  }
  if (selectedGenres.length > 0) {
    selectedMovies = selectedMovies.filter(movie => {
      if (logicalOperator === 'AND') {
        return selectedGenres.every(genreId =>
          movie.genres.some(movieGenre => movieGenre.id === genreId)
        );
      } else if(logicalOperator === 'OR') {
        return selectedGenres.some(genreId =>
          movie.genres.some(movieGenre => movieGenre.id === genreId)
        );
      }
    });
    }  
    displayMoviesInDropdown(selectedMovies);
    getMovieInformation(selectedMovies);
}

function displayMoviesInDropdown(filteredMovies) {
  const select = document.getElementById('movieTitlesContainer');
  select.innerHTML = "";

  const defaultOption = document.createElement("option");
  defaultOption.value = 0;
  defaultOption.text = "Select A Movie";
  select.add(defaultOption);

  filteredMovies.forEach(movie => {
    const option = document.createElement("option");
    option.value = movie.tmdbId;
    option.text = `${movie.title}`;
    select.add(option);
  });

  const selectedCategory = document.querySelector('input[name="category"]:checked') ?
    document.querySelector('input[name="category"]:checked').value :
    null;
  if (selectedCategory !== '') {
    let dropdownOptions;
    if (selectedCategory === 'hindi') {
      dropdownOptions = hindiMovies;
    } else if (selectedCategory === 'international') {
      dropdownOptions = movies;
    } else {
      dropdownOptions = hindiMovies.concat(movies);
    }
    dropdownOptions.forEach(movie => {
      const option = document.createElement("option");
      option.value = movie.tmdbId;
      option.text = `${movie.title}`;
      select.add(option);
    });
  }

  $('#movieTitlesContainer').select2({
    placeholder: "Search for a movie ",
    allowClear: true,
    width: "100%",
  });
}

function getMovieInformation(selectedMovies) {
  const movieIds = selectedMovies.map(movie => movie.tmdbId);

  const fetchArray = movieIds.map(movieId => {
    return (
      fetch(`${movieUrl}${movieId}?api_key=${apiKey}`)
        .then(response => response.json())
    );
  });

  Promise.all(fetchArray)
    .then(fetchResponses => {
      const moviesInfo = fetchResponses.map((resp, index) => {
        return {
          id: resp.id,
          overview: resp.overview,
          posterPath: resp.poster_path,
          releaseDate: resp.release_date,
          runTime: resp.runtime,
          tagLine: resp.tagline,
          title: resp.title,
          genres: selectedMovies[index].genres, // Include genres from original data
        };
      });

      displayMoviesInContainer(moviesInfo);
    })
    .catch(error => console.error('Error fetching movie information:', error));
}

function displayMoviesInContainer(movies) {
  let resultContainer = '<br/><div class="ui link cards">';
  const movieCards = movies.reduce((html, movie) => {
    return html + `
      <div class="card" id="card">
        <div class="image">
        <img id='moviePicture' src='${imageUrl}${movie.posterPath}' />
        </div>
        <div class="content">
          <div class="header">${movie.title}</div>
          <div class="meta">
            <a>${movie.releaseDate}</a>
          </div>
          <div class="description">
            ${movie.overview}
          </div>
          <div class="genres">
            Genres: ${movie.genres.map(genre => genre.name).join(', ')}
          </div>
        </div>
      </div>
    `;
  }, '');

  resultContainer += `${movieCards}</div>`;
  document.getElementById('resultContainer').innerHTML = resultContainer;
}

async function movieSelected() {
  const movieId = document.getElementById('movieTitlesContainer').value;
  let movie;
  movie = data.hindiMovies.find(movie => movieId === movie.tmdbId) || data.movies.find(movie => movieId === movie.tmdbId);
  if (!movie) {
    console.error("Movie not found");
    return;
  }

  const fetchArray = movie.cast.map(cm =>
    fetch(`${personUrl}${cm.id}?api_key=${apiKey}`)
      .then(response => response.json())
  );

  fetchArray.unshift(fetch(`${movieUrl}${movieId}?api_key=${apiKey}`)
    .then(response => response.json()));

  const fetchResponse = await Promise.all(fetchArray);

  const movieInfo = {
    title: fetchResponse[0].title,
    overview: fetchResponse[0].overview,
    posterPath: fetchResponse[0].poster_path,
    cast: movie.cast.map((cm, i) => ({
      id: cm.id,
      character: cm.character,
      name: cm.name,
      birthDate: fetchResponse[i + 1].birthday,
      profileImage: fetchResponse[i + 1].profile_path,
    }))
  };

  populateMovieHtml(movieInfo);

  $('#movieModal').modal('show');
}

function populateMovieHtml(movieInfo) {
  document.getElementById('title').innerHTML = movieInfo.title;
  document.getElementById('overview').innerHTML = movieInfo.overview;
  document.getElementById('moviePoster').innerHTML = `<img class="moviePoster" src='${imageUrl}${movieInfo.posterPath}' />`;
  document.getElementById('castInfo').innerHTML = getCastHtml(movieInfo.cast);
}

function getCastHtml(cast) {
  let castHtml = '<div class="ui cards container-sm" >';
  cast.forEach(cm => {
    castHtml += `
      <div  id="castCard">
        <div class="content">
          <img class="castImages" src="${imageUrl}${cm.profileImage}">
          <div class="header" id='castName'>
            ${cm.name}
          </div>
          <div class="meta">
            ${cm.birthDate}
          </div>
          <div class="description">
            ${cm.character}
          </div>
        </div>
      </div>
    `;
  });
  castHtml += '</div>';
  return castHtml;
}

document.addEventListener('DOMContentLoaded', function () {
  var searchInput = document.getElementById('searchInput');
  var suggestionsContainer = document.getElementById('suggestionsContainer');

  searchInput.addEventListener('input', function () {
    var searchTerm = searchInput.value.toLowerCase();
    if (searchTerm.length >= 3) {
      var filteredCast = combinedData.filter(function (castMember) {
        return castMember.name.toLowerCase().includes(searchTerm);
      });
      displaySuggestions(filteredCast);
    } else {
      // Clear suggestions if the input length is less than 3
      suggestionsContainer.innerHTML = '';
    }
  });

  function displaySuggestions(suggestions) {
    suggestionsContainer.innerHTML = '';

    suggestions.forEach(function (castMember) {
      var suggestionDiv = document.createElement('div');
      suggestionDiv.classList.add('suggestion');
      suggestionDiv.textContent = castMember.name;
      suggestionDiv.addEventListener('click', function () {
        selectedCastName = castMember.name;
        searchInput.value = selectedCastName;
        suggestionsContainer.innerHTML = '';
      });
      suggestionsContainer.appendChild(suggestionDiv);
    });
  }
});

function searchMovies() {
  const searchValue = document.getElementById('searchInput').value.toLowerCase();
  const filteredEnglishMovies = data.movies.filter(movie => {
    return (
      movie.title.toLowerCase().includes(searchValue) ||
      movie.cast.some(actor => actor.name.toLowerCase().includes(searchValue))
    );
  });

  const filteredHindiMovies = data.hindiMovies.filter(movie => {
    return (
      movie.title.toLowerCase().includes(searchValue) ||
      movie.cast.some(actor => actor.name.toLowerCase().includes(searchValue))
    );
  });

  const filteredMovies = filteredHindiMovies.concat(filteredEnglishMovies);
  movieIds = filteredMovies.map(movie => movie.tmdbId);

  getMovieInformation(filteredMovies);
}

function getDecadesArray(joinMovie) {
  const decadesSet = new Set();
  joinMovie.forEach(movie => {
    const decade = getDecade(movie.releaseDate);
    decadesSet.add(decade);
  });
  return Array.from(decadesSet);
}

function populateDecadeDropdown(decades) {
  const dropdown = document.getElementById('decadeDropdown');
  decades.forEach(decade => {
    const option = document.createElement('option');
    option.value = decade;
    option.textContent = decade;
    dropdown.appendChild(option);
  });
}

function filterMoviesByDecade(joinMovie, decade) {
  return joinMovie.filter(movie => getDecade(movie.releaseDate) === decade);
}

function getDecade(releaseDate) {
  const year = new Date(releaseDate).getFullYear();
  const decade = Math.floor(year / 10) * 10;
  return `${decade}-${decade + 9}`;
}
