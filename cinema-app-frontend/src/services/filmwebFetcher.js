import httpClient from "../http-common";

const fetchData = (movieName) => {
    return httpClient.get('/externalMoviesPage/filmweb/' + movieName);
}

export default {fetchData}