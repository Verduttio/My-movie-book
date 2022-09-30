import React, { useState, useRef } from "react";
import {Link, useNavigate} from 'react-router-dom';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import "./Login.css";

import AuthService from "../../../../services/authService";

const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

const Login = () => {
    let navigate = useNavigate();

    const form = useRef();
    const checkBtn = useRef();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const onChangeUsername = (e) => {
        const username = e.target.value;
        setUsername(username);
    };

    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };

    const handleLogin = (e) => {
        e.preventDefault();

        setMessage("");
        setLoading(true);

        form.current.validateAll();

        if (checkBtn.current.context._errors.length === 0) {
            AuthService.login(username, password).then(
                () => {
                    navigate("/movies");
                    window.location.reload();
                },
                (error) => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();

                    setLoading(false);
                    setMessage(resMessage);
                }
            );
        } else {
            setLoading(false);
        }
    };

    return (
        <div>
        <section className="vh-100">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-6 px-0 d-none d-sm-block">
                        <img src="https://media.gettyimages.com/photos/cinema-background-picture-id174466762?s=2048x2048"
                             className="w-100 vh-auto"
                             style={{objectFit: "cover", objectPosition: "left"}}/>
                    </div>
                    <div className="col-sm-6 text-black">
                        <div className="px-5 ms-xl-4 mt-5">
                            <span className="h1 fw-bold mb-0">My movie book</span>
                        </div>
                        <div className="d-flex align-items-center px-5 ms-xl-4 pt-5 pt-xl-5 mt-xl-n5">

                            <Form onSubmit={handleLogin} ref={form} style={{width: "23rem"}}>

                                <h3 className="fw-normal mb-3 pb-3" style={{letterSpacing: "1px"}}>Log in</h3>

                                <div className="form-outline mb-4">
                                    <Input
                                        type="text"
                                        id="form2Example18"
                                        name={"username"}
                                        value={username}
                                        onChange={onChangeUsername}
                                        validations={[required]}
                                        className="form-control form-control-lg"
                                    />
                                    <label className="form-label" htmlFor="form2Example18">Username</label>
                                </div>

                                <div className="form-outline mb-4">
                                    <Input
                                        type="password"
                                        name={"password"}
                                        value={password}
                                        onChange={onChangePassword}
                                        validations={[required]}
                                        id="form2Example28"
                                        className="form-control form-control-lg"
                                    />
                                    <label className="form-label" htmlFor="form2Example28">Password</label>
                                </div>

                                <div className="pt-1 mb-4">
                                    <button className="btn btn-info btn-lg btn-block" type="button" disabled={loading} onClick={handleLogin}>
                                        {loading && (
                                            <span className="spinner-border spinner-border-sm"></span>
                                        )}
                                        <span>Login</span>
                                    </button>
                                </div>

                                 {message && (
                                     <div className="form-group">
                                         <div className="alert alert-danger" role="alert">
                                             {message}
                                         </div>
                                     </div>
                                 )}
                                 <CheckButton style={{ display: "none" }} ref={checkBtn} />

                                <p className="small mb-5 pb-lg-2"><a className="text-muted">Forgot password?</a></p>
                                <p>Don't have an account? <Link to={"/register"} className={"link-info"}>Register here</Link></p>
                            </Form>

                        </div>

                    </div>
                </div>
            </div>
        </section>
        </div>

        // <div className={"container"}>
        //     <div className={"card justify-content-center align-items-center"}>
        //         <form>
        //             {/*Email input*/}
        //             <div className="form-outline mb-4">
        //                 <input type="email" id="form2Example1" className="form-control"/>
        //                 <label className="form-label" htmlFor="form2Example1">Email address</label>
        //             </div>
        //
        //             {/*Password input*/}
        //             <div className="form-outline mb-4">
        //                 <input type="password" id="form2Example2" className="form-control"/>
        //                 <label className="form-label" htmlFor="form2Example2">Password</label>
        //             </div>
        //
        //             {/* 2 column grid layout for inline styling*/}
        //             <div className="row mb-4">
        //                 <div className="col d-flex justify-content-center">
        //                     {/*// <!-- Checkbox -->*/}
        //                     <div className="form-check">
        //                         <input className="form-check-input" type="checkbox" value="" id="form2Example31" checked/>
        //                         <label className="form-check-label" htmlFor="form2Example31"> Remember me </label>
        //                     </div>
        //                 </div>
        //
        //                 <div className="col">
        //                     {/*// <!-- Simple link -->*/}
        //                     <a href="#!">Forgot password?</a>
        //                 </div>
        //             </div>
        //
        //             {/*// <!-- Submit button -->*/}
        //             <button type="button" className="btn btn-primary btn-block mb-4">Sign in</button>
        //
        //             {/*// <!-- Register buttons -->*/}
        //             <div className="text-center">
        //                 <p>Not a member? <a href="#!">Register</a></p>
        //                 <p>or sign up with:</p>
        //                 <button type="button" className="btn btn-link btn-floating mx-1">
        //                     <i className="fab fa-facebook-f"></i>
        //                 </button>
        //
        //                 <button type="button" className="btn btn-link btn-floating mx-1">
        //                     <i className="fab fa-google"></i>
        //                 </button>
        //
        //                 <button type="button" className="btn btn-link btn-floating mx-1">
        //                     <i className="fab fa-twitter"></i>
        //                 </button>
        //
        //                 <button type="button" className="btn btn-link btn-floating mx-1">
        //                     <i className="fab fa-github"></i>
        //                 </button>
        //             </div>
        //         </form>
        //     </div>
        // </div>

            // <div className={"row-centered"}>
            //     <div className="col-md-8 offset-md-2">
            // <div className="card" >
            //     <div style={{padding: "30px"}}>
            //         <img
            //             src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            //             alt="profile-img"
            //             className="profile-img-card"
            //         />
            //
            //         <Form onSubmit={handleLogin} ref={form}>
            //             <div className="form-group">
            //                 <label htmlFor="username">Username</label>
            //                 <Input
            //                     type="text"
            //                     className="form-control"
            //                     name="username"
            //                     value={username}
            //                     onChange={onChangeUsername}
            //                     validations={[required]}
            //                 />
            //             </div>
            //
            //             <div className="form-group">
            //                 <label htmlFor="password">Password</label>
            //                 <Input
            //                     type="password"
            //                     className="form-control"
            //                     name="password"
            //                     value={password}
            //                     onChange={onChangePassword}
            //                     validations={[required]}
            //                 />
            //             </div>
            //
            //             <div className="form-group">
            //                 <button className="btn btn-primary btn-block" disabled={loading}>
            //                     {loading && (
            //                         <span className="spinner-border spinner-border-sm"></span>
            //                     )}
            //                     <span>Login</span>
            //                 </button>
            //             </div>
            //
            //             {message && (
            //                 <div className="form-group">
            //                     <div className="alert alert-danger" role="alert">
            //                         {message}
            //                     </div>
            //                 </div>
            //             )}
            //             <CheckButton style={{ display: "none" }} ref={checkBtn} />
            //     </Form>
            //     </div>
            // </div>
            // </div>
            // </div>
    );
};

export default Login;