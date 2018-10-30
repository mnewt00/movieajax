$(document).ready(() => {
  $("#searchForm").on("submit", e => {
    let searchText = $("#searchText").val();
    getMovies(searchText);
    e.preventDefault();
  });
});

function getMovies(searchText) {
  console.log(searchText + " entered, searching...");
  axios.get("http://www.omdbapi.com/?i=tt3896198&apikey=cbb078f7&s=" + searchText)
    .then(response => {
      console.log(response);
      let movies = response.data.Search;
      let output = "";
      $.each(movies, function(index, movie) {
        output += `
             <div class="col-md-3">
    <div class="well text-center">
        <img src="${movie.Poster}" alt="${movie.Title}" style="padding-top:20px;">
        <h5>${movie.Title}</h5>
        <a onclick="movieSelected('${
          movie.imdbID
        }')" class='btn btn-primary' href="#" style="">Movie Details</a>
    </div>
</div>
             `;
      });

      $('#movies').html(output)
    })
    .catch(err => {
      console.log(err);
    });
}

function movieSelected(id) { 
    sessionStorage.setItem('movieId', id);
    window.location = 'movie.html';
    return false;
 }

 function getMovie() { 
     let movieId = sessionStorage.getItem('movieId');

     axios.get("http://www.omdbapi.com/?apikey=cbb078f7&i=" + movieId + "&tomatoes=true&plot=full")
    .then(response => {
      console.log(response);
      let movie = response.data;

      let output = `
      <div class="container" style="padding-top:10px;">
          <div class="row">
          <div class="col-md-4">
        <img src="${movie.Poster}" class="thumbnail">
    </div>
    <div class="col-md-8">
    <h2>${movie.Title}</h2>
    <ul class="list-group">
    <li class="list-group-item"><strong>Genre:</strong> ${movie.Genre}</li>
    <li class="list-group-item"><strong>Type:</strong> ${movie.Type}</li>
    <li class="list-group-item"><strong>Released:</strong> ${movie.Released}</li>
    <li class="list-group-item"><strong>Country:</strong> ${movie.Country}</li>
    <li class="list-group-item"><strong>Rated:</strong> ${movie.Rated}</li>
    <li class="list-group-item"><strong>IMDb Rating:</strong> ${movie.imdbRating}</li>
    <li class="list-group-item"><strong>Rotten Tomatoes:</strong> ${movie.tomatoRotten}</li>
    <li class="list-group-item"><strong>Run Time:</strong> ${movie.Runtime}</li>
    <li class="list-group-item"><strong>Director:</strong> ${movie.Director}</li>
    <li class="list-group-item"><strong>Writer:</strong> ${movie.Writer}</li>
    <li class="list-group-item"><strong>Actors:</strong> ${movie.Actors}</li>
    </ul>
    <br>
    </div>
          </div>
    
          
              <div class="well">
              <br>
                  <h3>Plot</h3>
                  ${movie.Plot}
                  <hr>
                  <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-outline-warning">View IMDb</a>
                  <a href="index.html"class="btn btn-outline-primary">Go back to search</a>
                  
              </div>
          </div>
      
      `;
      $('#movie').html(output);
    })
    .catch(err => {
      console.log(err);
    });
  }

// custom-padding {
//     padding-bottom: 10px;
//     padding-left: 10px;
//     padding-right: 10px;
// }