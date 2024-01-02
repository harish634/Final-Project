let data
let movies;
const personUrl = 'https://api.themoviedb.org/3/person/'
const apiKey = 'cc37399832696ae72d6412c05725058a';
const movieUrl = 'https://api.themoviedb.org/3/movie/';
const imageUrl = 'https://image.tmdb.org/t/p/original';

import('./moviesPlay.js')
	.then(res => {
		console.log('data imported into data constant');
		data = res;
    
  	run();
	});

function run() {
  console.log(data.movies.length);
  movies = data.hindiMovies;
  //movies = data.movies;
  addMovieSelects();
}
  

async function movieSelected() {
  const movieId = document.getElementById('movies').value;
  
  const movie = movies.find(movie => movieId === movie.tmdbId);

  const fetchArray = movie.cast.map(cm => {
                          return (
                            fetch(`${personUrl}${cm.id}?api_key=${apiKey}`)
                              .then(response => response.json())
                          )
                        });
  fetchArray.unshift(fetch(`${movieUrl}${movieId}?api_key=${apiKey}`)
                      .then(response => response.json()));

  const fetchResponse = await Promise.all(fetchArray);
  //console.log(fetchResponse);
  const movieInfo = {
    title: fetchResponse[0].title, 
    overview: fetchResponse[0].overview, 
    posterPath: fetchResponse[0].poster_path,
    cast: movie.cast.map(cm => {
      return {id: cm.id, character: cm.character, name: cm.name}
    })
  }
  for (let i = 1; i < fetchResponse.length; i++) {
    movieInfo.cast[i - 1].birthDate = fetchResponse[i].birthday;
    movieInfo.cast[i - 1].profileImage = fetchResponse[i].profile_path;
    // movieInfo.cast.push({
    //   name: fetchResponse[i].name,
    //   profileImage: fetchResponse[i].profile_path,
    //   birthDate: fetchResponse[i].birthday
    // })
  }
  console.log(movieInfo);
  populateMovieHtml(movieInfo);
}

function populateMovieHtml(movieInfo) {
  document.getElementById('title').innerHTML = movieInfo.title;
  document.getElementById('overview').innerHTML = movieInfo.overview;
  document.getElementById('moviePoster').innerHTML = `<img class="moviePoster" src='${imageUrl}${movieInfo.posterPath}' />`
  document.getElementById('castInfo').innerHTML = getCastHtml(movieInfo.cast);
}


function getCastHtml(cast) {
  let castHtml = '<div class="ui cards">'
  cast.forEach(cm => {
    castHtml+= `
      <div class="card">
        <div class="content">
          <img class="right floated mini ui image" src="${imageUrl}${cm.profileImage}">
          <div class="header">
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
    `
  })
  castHtml+= '</div>';
  
  return castHtml;
}

function addMovieSelects() {
  const select = document.getElementById('movies');

  movies.sort(sortByTitle);

  movies.forEach(movie => {
    const opt = document.createElement("option");
    opt.value = movie.tmdbId;
    opt.text = `${movie.title} (${movie.releaseDate})`;
    select.add(opt);
  });
}

function sortByTitle(a, b) {
  if (a.title < b.title) {
    return -1;
  } else if (b.title < a.title) {
    return 1;
  } else {
    return 0
  }
}

