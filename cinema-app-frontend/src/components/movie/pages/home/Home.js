import React, { useState, useEffect } from "react";
import {Routes, Route, Link, BrowserRouter} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Home.css";

import AuthService from "../../../../services/authService";

const Home = () => {
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
                <nav className="navbar navbar-expand navbar-dark bg-dark">
                    {currentUser ? (
                        <div className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link to={"/profile"} className="nav-link">
                                    {currentUser.username}
                                </Link>
                            </li>
                            <li className="nav-item">
                                <a href="/login" className="nav-link" onClick={logOut}>
                                    LogOut
                                </a>
                            </li>
                        </div>
                    ) : (
                        <div className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link to={"/login"} className="nav-link">
                                    Login
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link to={"/register"} className="nav-link">
                                    Sign Up
                                </Link>
                            </li>
                        </div>
                    )}
                </nav>

                {/*<div className="container mt-3">*/}
                {/*    <Routes>*/}
                {/*        /!*<Route path="/login" element={<Login/>} />*!/*/}
                {/*        /!*<Route path="/register" element={<Register/>} />*!/*/}
                {/*        /!*<Route path="/profile" element={<Profile/>} />*!/*/}
                {/*    </Routes>*/}
                {/*</div>*/}
            </div>
    );
};

export default Home;