$(document).ready(() => {
  $('#searchForm').on('submit', (e) => {
    let searchText = $('#searchText').val();
    getMovies(searchText);
    e.preventDefault();
  });
});

function getMovies(searchText) {
  axios.get('https://api.themoviedb.org/3/search/movie?api_key=bdc6565cd770302d9468d266d91a1ed1&query='+searchText)
    .then((response) => {
        let movies = response.data.results;
        console.log(movies);
        let output = '';
        $.each(movies, (index, movie) => {
            output += `
            <div class="film four wide">
              <a onclick=movieSelected('${movie.id}') href="#">
                <img class="trailerImg" src="http://image.tmdb.org/t/p/w185/${movie.poster_path}" alt="film">
                <span class="filmTitle"><strong>${movie.title}</strong></span><span class="filmDate">${movie.release_date}</span>
              </a>
              <p class="filmDesc comment more">${movie.overview}</p>
            </div>
            `;
        });

        $('#movies').html(output);
      })
    .catch((err) => {
      console.log(err);
    });
}


function movieSelected(id){
  sessionStorage.setItem('movieId', id);
  window.location = 'movie.html';
  return false;
}

function getMovie(){
  let movieId = sessionStorage.getItem('movieId');

  axios.get('https://api.themoviedb.org/3/movie/'+movieId+'?api_key=bdc6565cd770302d9468d266d91a1ed1')
    .then((response) => {
      console.log(response);
      let movie = response.data;

      let output =`
        <div class="row">
          <div class="col-md-4">
            <img src="http://image.tmdb.org/t/p/w185/${movie.poster_path}" class="thumbnail">
          </div>
          <div class="col-md-8">
            <h2>${movie.title}</h2>
            <ul class="list-group">
              <li class="list-group-item"><strong>Műfaj:</strong> ${movie.genres[0].name}</li>
              <li class="list-group-item"><strong>Kiadás:</strong> ${movie.release_date}</li>
              <li class="list-group-item"><strong>Értékelés:</strong> ${movie.vote_average}</li>
            </ul>
          </div>
        </div>
        <div class="row">
          <div class="well">
            <h3>Leírás</h3>
            ${movie.overview}
            <hr>
            <a href="./index.html" class="btn btn-default">Vissza</a>
          </div>
        </div>
      `;

      $('#movie').html(output);
    })
    .catch((err) => {
      console.log(err);
    });
}