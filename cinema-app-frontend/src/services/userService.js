import axios from "axios";
import authHeader from "./authHeader";
import httpClientAuth from "../http-common-secured";

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

const deleteUser = (userId) => {
    return httpClientAuth.delete("/user/" + userId);
}

const UserService = {
    getPublicContent,
    getUserBoard,
    getAdminBoard,
    deleteUser,
};

export default UserService;