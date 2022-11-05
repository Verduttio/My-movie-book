import httpClient from "../http-common";

const getAll = () => {
    return httpClient.get('/genres');
}


export default {getAll};
