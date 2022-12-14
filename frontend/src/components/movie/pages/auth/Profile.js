import React from "react";
import AuthService from "../../../../services/authService";
import userService from "../../../../services/userService";
import authService from "../../../../services/authService";
import {Link, useNavigate} from "react-router-dom";

const Profile = () => {
    const currentUser = AuthService.getCurrentUser();

    const navigate = useNavigate();

    return (
        <div className="container">
            <header className="jumbotron">
                <h3>
                    <strong>{currentUser.username}</strong> Profile
                </h3>
            </header>
            <p>
                <strong>Token:</strong> {currentUser.accessToken.substring(0, 20)} ...{" "}
                {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
            </p>
            <p>
                <strong>Id:</strong> {currentUser.id}
            </p>
            <p>
                <strong>Email:</strong> {currentUser.email}
            </p>
            <strong>Authorities:</strong>
            <ul>
                {currentUser.roles &&
                    currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
            </ul>
            <Link to={"/login"}>
                <button className={"btn btn-danger"} onClick={() => {
                    userService.deleteUser(authService.getCurrentUser().id);
                    authService.logout();
                    navigate("/login");
                    window.location.reload();
                }}>Delete account</button>
            </Link>
        </div>
    );
};

export default Profile;