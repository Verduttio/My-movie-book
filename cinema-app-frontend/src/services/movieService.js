import httpClient from "../http-common";
import authHeader from "./authHeader";
import httpClientAuth from "../http-common-secured"

const getAll = () => {
    return httpClientAuth.get('/movies/user');
}

const create = data => {
    return httpClientAuth.post("/movies", data);
}

const deleteMovie = id => {
    return httpClientAuth.delete("/movies/" + id);
}

const uploadPosterImage = (image) => {
    let formData = new FormData();
    formData.append("file", image);
    return httpClient.post("/files/images", formData, {
        headers: {
            'Content-Type' : 'multipart/form-data',
            Authorization: authHeader().Authorization
        }
    });
}

const deletePosterImage = (id) => {
    return httpClientAuth.delete("/files/images/" + id);
}

const get = id => {
    return httpClientAuth.get("/movies/"+id);
}

const modify = (id, data) => {
    return httpClientAuth.patch("/movies/" + id, data);
}

export default {getAll, create, uploadPosterImage, get, deleteMovie, deletePosterImage, modify};