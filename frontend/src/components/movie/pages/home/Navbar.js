import React, { useState, useEffect } from "react";
import { Routes, Route, Link, BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Navbar.css";

import AuthService from "../../../../services/authService";
import authService from "../../../../services/authService";

const Navbar = () => {
    const [currentUser, setCurrentUser] = useState(undefined);

    useEffect(() => {
        const user = AuthService.getCurrentUser();
        if (user) {
            setCurrentUser(user);
        }
    }, []);

    const logOut = () => {
        AuthService.logout();
    };

    return (
        <div>
            {currentUser ? (
                <nav className="navbar navbar-expand navbar-dark bg-dark p-0">
                    <div className="container">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link to={"/movies"} className="nav-link active">
                                    Home
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to={"/profile"} className="nav-link">
                                    {currentUser.username}
                                </Link>
                            </li>
                            {authService.isAdmin(currentUser) && (
                                <li className="nav-item">
                                    <Link to={"/adminBoard"} className="nav-link">
                                        Admin board
                                    </Link>
                                </li>
                            )}
                            <li className="nav-item">
                                <a href="/login" className="nav-link text-warning" onClick={logOut}>
                                    Logout
                                </a>
                            </li>
                        </ul>
                        <div className="navbar-item">
                            <Link to={"/movies"}>
                                <img
                                    src={process.env.PUBLIC_URL + "/nav_home.jpeg"}
                                    alt="Home page"
                                    className="navbar-logo rounded"
                                    style={{ maxWidth: "150px" }}
                                />

                            </Link>
                        </div>
                    </div>
                </nav>
            ) : (
                <div></div>
            )}
        </div>
    );
};

export default Navbar;
