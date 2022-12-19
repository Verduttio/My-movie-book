import axios from "axios";
import authHeader from "./services/authHeader";

export default axios.create({
    baseURL: process.env.REACT_APP_HTTP_PROTOCOL + '://'+ process.env.REACT_APP_HOST + '/',
    headers: {
        'Content-Type': 'application/json',
        Authorization: authHeader().Authorization
    }
});