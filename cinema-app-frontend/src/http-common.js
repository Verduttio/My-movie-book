import axios from "axios";

export default axios.create({
    baseURL: process.env.REACT_APP_HTTP_PROTOCOL + '://'+ process.env.REACT_APP_HOST + '/',
    headers: {
        'Content-Type': 'application/json',

    }
});