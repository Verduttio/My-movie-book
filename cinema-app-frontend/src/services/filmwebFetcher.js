import httpClient from "../http-common";

const fetchData = (movieName) => {
    return httpClient.get('/externalMovieData/filmweb/' + movieName);
}

export default {fetchData}