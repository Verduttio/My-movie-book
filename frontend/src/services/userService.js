import axios from "axios";
import authHeader from "./authHeader";
import httpClientAuth from "../http-common-secured";

const API_URL = "http://"+process.env.REACT_APP_HOST+"/api/test/";

const getPublicContent = () => {
    return axios.get(API_URL + "all");
};

const getAllUsersSafeData = () => {
    return httpClientAuth.get("/user");
}

const deleteUser = (userId) => {
    return httpClientAuth.delete("/user/" + userId);
}

const UserService = {
    getPublicContent,
    deleteUser,
    getAllUsersSafeData,
};

export default UserService;