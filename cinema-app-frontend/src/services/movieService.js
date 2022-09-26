import httpClient from "../http-common";
import authHeader from "./authHeader";
import httpClientAuth from "../http-common-secured"

const getAll = () => {
    return httpClient.get('/movies');
}

const create = data => {
    return httpClientAuth.post("/movies", data);
}

const deleteMovie = id => {
    return httpClient.delete("/movies/" + id);
}

const uploadPosterImage = (image, userId) => {
    let formData = new FormData();
    formData.append("file", image);
    return httpClient.post("/files/images/" + userId, formData, {
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

const modify = (id, data) => {
    return httpClient.patch("/movies/" + id, data);
}

export default {getAll, create, uploadPosterImage, get, update, deleteMovie, deletePosterImage, modify};