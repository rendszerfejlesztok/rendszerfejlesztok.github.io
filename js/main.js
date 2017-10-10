$(document).ready(() => {
        $('#searchForm input[type=submit]').hide();

        $('#searchForm input[type=text]').keypress(function(e) {
            if(e.which == 10 || e.which == 13) {
              this.form.submit();
              $('#results').css("visibility", "visible");
              $('.downArrow').css("visibility", "visible");
              let searchText = $('#searchText').val();
              getMovies(searchText);

              $('html, body').animate({
                scrollTop: $("#movies").offset().top
              }, 2000);
            }
        });
});

function handleMissingImg(e) {
  e.src = 'res/no_photo.jpg';
}

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
                <img onerror="handleMissingImg(this)" class="trailerImg" src="http://image.tmdb.org/t/p/w185/${movie.poster_path}" alt="film">
                <span class="filmTitle"><strong>${movie.title}</strong></span><span class="filmDate">${movie.release_date}</span>
              </a>
              <p class="filmDesc">${movie.overview}</p>
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
              <li class="list-group-item"><strong>Category:</strong> ${movie.genres[0].name}</li>
              <li class="list-group-item"><strong>Date:</strong> ${movie.release_date}</li>
              <li class="list-group-item"><strong>Rating:</strong> ${movie.vote_average}</li>
            </ul>
          </div>
        </div>
        <div class="row">
          <div class="well">
            <h3>Description</h3>
            ${movie.overview}
            <hr>
            <a href="./index.html" class="btn btn-default">Back</a>
          </div>
        </div>
      `;

      $('#movie').html(output);
    })
    .catch((err) => {
      console.log(err);
    });
}