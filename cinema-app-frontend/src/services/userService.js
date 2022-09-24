import axios from "axios";
import authHeader from "./authHeader";

const API_URL = "http://"+process.env.REACT_APP_HOST+"/api/test/";

const getPublicContent = () => {
    return axios.get(API_URL + "all");
};

const getUserBoard = () => {
    return axios.get(API_URL + "user", { headers: authHeader() });
};


const getAdminBoard = () => {
    return axios.get(API_URL + "admin", { headers: authHeader() });
};

const UserService = {
    getPublicContent,
    getUserBoard,
    getAdminBoard,
};

export default UserService;