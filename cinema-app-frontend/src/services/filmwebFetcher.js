import httpClientAuth from "../http-common-secured";

const fetchData = (movieName) => {
    return httpClientAuth.get('/externalMovieData/filmweb/' + movieName);
}

export default {fetchData}