window.addEventListener('load', () => {

  const appendMovies = document.querySelector('.movies');

  const baseURL = `/favorites`;

  const form = document.querySelector('form')
  form.addEventListener('submit', getMovie);

  const getFavoritesButton = document.querySelector('.getFavoritesButton');
  getFavoritesButton.addEventListener('click', getFavorites);

  function getMovie(event) {
    event.preventDefault();
    appendMovies.innerHTML = '';

    const movieSearch = document.querySelector('#search').value;
    movieSearch.value = '';
    axios.get(`http://www.omdbapi.com/?i=tt3896198&apikey=8b3db702&s=${movieSearch}`).then(response => {
      response.data.Search.forEach(movieList => {

        const title = document.createElement('h3');
        title.innerHTML = movieList.Title;
        // title.classList.add("text-center")
        appendMovies.appendChild(title);

        const poster = document.createElement('img');
        poster.src = movieList.Poster;
        // poster.classList.add("text-center")
        appendMovies.appendChild(poster);

        const favoriteButton = document.createElement('button');
        favoriteButton.innerHTML = "Favorite Movie";
        favoriteButton.setAttribute("class", "btn btn-success btn-lg favorite");
        appendMovies.appendChild(favoriteButton);

        document.querySelector('#search').value = "";

        favoriteButton.addEventListener('click', () => {
          
          axios.post(baseURL, movieList).then(response => {
            console.log(response)
          });
        })
      });
    });
  }

  function getFavorites() {

    document.querySelector('#search').value = "";

    axios.get(baseURL).then(response => {
      appendMovies.innerHTML = '';
      response.data.forEach(favoriteMovie => {

        const title = document.createElement('h3');
        title.innerHTML = favoriteMovie.Title;
        appendMovies.appendChild(title);

        const poster = document.createElement('img');
        poster.src = favoriteMovie.Poster;
        appendMovies.appendChild(poster);
      });
    });
  }

});
