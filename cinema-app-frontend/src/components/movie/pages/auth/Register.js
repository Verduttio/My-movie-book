import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

import AuthService from "../../../../services/authService";
import {Link} from "react-router-dom";

const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

const validEmail = (value) => {
    if (!isEmail(value)) {
        return (
            <div className="alert alert-danger" role="alert">
                This is not a valid email.
            </div>
        );
    }
};

const vusername = (value) => {
    if (value.length < 3 || value.length > 20) {
        return (
            <div className="alert alert-danger" role="alert">
                The username must be between 3 and 20 characters.
            </div>
        );
    }
};

const vpassword = (value) => {
    if (value.length < 6 || value.length > 40) {
        return (
            <div className="alert alert-danger" role="alert">
                The password must be between 6 and 40 characters.
            </div>
        );
    }
};

const Register = () => {
    const form = useRef();
    const checkBtn = useRef();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");

    const onChangeUsername = (e) => {
        const username = e.target.value;
        setUsername(username);
    };

    const onChangeEmail = (e) => {
        const email = e.target.value;
        setEmail(email);
    };

    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };

    const handleRegister = (e) => {
        e.preventDefault();

        setMessage("");
        setSuccessful(false);

        form.current.validateAll();

        if (checkBtn.current.context._errors.length === 0) {
            AuthService.register(username, email, password).then(
                (response) => {
                    setMessage(response.data.message);
                    setSuccessful(true);
                },
                (error) => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();

                    setMessage(resMessage);
                    setSuccessful(false);
                }
            );
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

                                <Form onSubmit={handleRegister} ref={form} style={{width: "23rem"}}>
                                    <h3 className="fw-normal mb-3 pb-3" style={{letterSpacing: "1px"}}>Register</h3>
                                    {!successful && (
                                        <div>
                                            <div className="form-outline mb-4">
                                                <Input
                                                    type="text"
                                                    id="form2Example18"
                                                    name={"username"}
                                                    value={username}
                                                    onChange={onChangeUsername}
                                                    validations={[required, vusername]}
                                                    className="form-control form-control-lg"
                                                />
                                                <label className="form-label" htmlFor="form2Example18">Username</label>
                                            </div>

                                            <div className="form-outline mb-4">
                                                <Input
                                                    type="text"
                                                    id="form2Example18"
                                                    name={"email"}
                                                    value={email}
                                                    onChange={onChangeEmail}
                                                    validations={[required, validEmail]}
                                                    className="form-control form-control-lg"
                                                />
                                                <label className="form-label" htmlFor="form2Example18">Email</label>
                                            </div>

                                            <div className="form-outline mb-4">
                                                <Input
                                                    type="password"
                                                    name={"password"}
                                                    value={password}
                                                    onChange={onChangePassword}
                                                    validations={[required, vpassword]}
                                                    id="form2Example28"
                                                    className="form-control form-control-lg"
                                                />
                                                <label className="form-label" htmlFor="form2Example28">Password</label>
                                            </div>

                                            <div className="pt-1 mb-4">
                                                <button className="btn btn-info btn-lg btn-block" type="button" onClick={e => handleRegister(e)}>
                                                    Sign Up
                                                </button>
                                            </div>
                                        </div>
                                        )}

                                     {message && (
                                         <div className="form-group">
                                             <div
                                                 className={ successful ? "alert alert-success" : "alert alert-danger" }
                                                 role="alert"
                                             >
                                                 {message}
                                             </div>
                                             <Link className={"btn btn-primary"} to={"/login"}>Login now</Link>
                                         </div>
                                     )}
                                    <CheckButton style={{ display: "none" }} ref={checkBtn} />
                                </Form>

                            </div>

                        </div>
                    </div>
                </div>
            </section>
        </div>


        // <div className="col-md-12">
        //     <div className="card card-container">
        //         <img
        //             src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
        //             alt="profile-img"
        //             className="profile-img-card"
        //         />
        //
        //         <Form onSubmit={handleRegister} ref={form}>
        //             {!successful && (
        //                 <div>
        //                     <div className="form-group">
        //                         <label htmlFor="username">Username</label>
        //                         <Input
        //                             type="text"
        //                             className="form-control"
        //                             name="username"
        //                             value={username}
        //                             onChange={onChangeUsername}
        //                             validations={[required, vusername]}
        //                         />
        //                     </div>
        //
        //                     <div className="form-group">
        //                         <label htmlFor="email">Email</label>
        //                         <Input
        //                             type="text"
        //                             className="form-control"
        //                             name="email"
        //                             value={email}
        //                             onChange={onChangeEmail}
        //                             validations={[required, validEmail]}
        //                         />
        //                     </div>
        //
        //                     <div className="form-group">
        //                         <label htmlFor="password">Password</label>
        //                         <Input
        //                             type="password"
        //                             className="form-control"
        //                             name="password"
        //                             value={password}
        //                             onChange={onChangePassword}
        //                             validations={[required, vpassword]}
        //                         />
        //                     </div>
        //
        //                     <div className="form-group">
        //                         <button className="btn btn-primary btn-block">Sign Up</button>
        //                     </div>
        //                 </div>
        //             )}
        //
        //             {message && (
        //                 <div className="form-group">
        //                     <div
        //                         className={ successful ? "alert alert-success" : "alert alert-danger" }
        //                         role="alert"
        //                     >
        //                         {message}
        //                     </div>
        //                 </div>
        //             )}
        //             <CheckButton style={{ display: "none" }} ref={checkBtn} />
        //         </Form>
        //     </div>
        // </div>
    );
};

export default Register;