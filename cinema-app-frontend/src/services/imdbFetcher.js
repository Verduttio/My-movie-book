import httpClient from "../http-common";

const fetchRating = (filmwebMovieName) => {
    return httpClient.get('/externalMovieData/imdb/rating/' + filmwebMovieName);
}

export default {fetchRating};