import React, { useState, useEffect } from "react";
import {Routes, Route, Link, BrowserRouter} from "react-router-dom";
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
                        <nav className="navbar navbar-expand navbar-dark bg-dark">
                            <div className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <Link to={"/movies"} className="nav-link">
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
                                    <a href="/login" className="nav-link" onClick={logOut}>
                                        LogOut
                                    </a>
                                </li>
                            </div>
                        </nav>
                    ) : (
                        <div></div>
                    )}
            </div>
    );
};

export default Navbar;