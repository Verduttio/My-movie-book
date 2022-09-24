import axios from "axios";
import authHeader from "./services/authHeader";

export default axios.create({
    baseURL: 'http://'+ process.env.REACT_APP_HOST + '/',
    headers: {
        'Content-Type': 'application/json',
        Authorization: authHeader().Authorization
    }
});