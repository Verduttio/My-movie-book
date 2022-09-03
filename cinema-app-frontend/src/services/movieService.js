import httpClient from "../http-common";

const getAll = () => {
    return httpClient.get('/movies');
}

const create = data => {
    return httpClient.post("/movies", data);
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

export default {getAll, create, uploadPosterImage};