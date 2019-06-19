'use strict';

let searchForm = document.querySelector('#search-form');
let movies = document.querySelector('#movies');

const apiSearch = (event) => {
    event.preventDefault();

    let searchText = document.querySelector('.form-control').value;
    if (searchText.length == 0) {
        movies.innerHTML = 'Введите название!';
        return;
    }
    let server = 'https://api.themoviedb.org/3/search/multi?api_key=058af9bcc056b256f8a414cbc87d4523&language=ru&query=' + searchText;
    movies.innerHTML = 'Загрузка...';

    fetch(server)
        .then(function(value) {
            if (value.status !== 200) {
                return Promise.reject();
            }
            return value.json();
        })
        .then(function(output) {
            let inner = '';

            if (output.results.length == 0) {
                inner = 'Фильмы не найдены';
            } else {
                output.results.forEach((item) => {

                    let nameItem = item.name || item.title;
                    let dateItem = item.first_air_date || item.release_date || 'нет данных';
                    let posterItem = item.poster_path ? `https://image.tmdb.org/t/p/w200/${item.poster_path}` : 'https://placekitten.com/200/300';

                    inner += `<a href="https://www.themoviedb.org/${item.media_type}/${item.id}" class="item col-12 col-sm-6 col-md-4 col-lg-3 text-center" title="${item.overview}" target="_blank">
                        <img src="${posterItem}"> <br/>
                        <b> ${nameItem} </b> <span class="badge badge-primary"> ${item.vote_average} </span> <br/>
                        Релиз: ${dateItem}
                    </a>`;

                });
            }

            movies.innerHTML = inner;
        })
        .catch(function(reason) {
            movies.innerHTML = 'Упс, что-то пошло не так!';
            console.log('error: ' + reason.status);
        })

}

searchForm.addEventListener('submit', apiSearch);
searchForm.addEventListener('change', apiSearch);


