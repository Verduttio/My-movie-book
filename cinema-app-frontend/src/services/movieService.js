import httpClient from "../http-common";

const getAll = () => {
    return httpClient.get('/movies');
}

const create = data => {
    return httpClient.post("/movies", data);
}

const deleteMovie = id => {
    return httpClient.delete("/movies/" + id);
}

const uploadPosterImage = image => {
    let formData = new FormData();
    formData.append("file", image);
    return httpClient.post("/files/images", formData, {
        headers: {
            'Content-Type' : 'multipart/form-data'
        }
    });
}

const deletePosterImage = id => {
    return httpClient.delete("/files/images/" + id);
}

const get = id => {
    return httpClient.get("/movies/"+id);
}

const update = data => {
    return httpClient.put("/movies", data);
}

export default {getAll, create, uploadPosterImage, get, update, deleteMovie, deletePosterImage};