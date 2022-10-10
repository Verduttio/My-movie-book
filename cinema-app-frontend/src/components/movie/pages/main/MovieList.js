import * as React from 'react';
import {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from "react-router-dom";
import movieService from "../../../../services/movieService";
import "./MovieList.css";
import authService from "../../../../services/authService";
import authHeader from "../../../../services/authHeader";
import { BsStarFill,BsStars } from "react-icons/bs";
import {AiOutlineFieldNumber} from "react-icons/ai";
import {formatGenresToDisplay} from "../../../../functionalities/GenreFormatter";

function numberWithSpaces (x){
    return x !== undefined ? x.toLocaleString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") : x;
}

const truncate = (input) =>
    input.length > 100 ? `${input.substring(0, 100)}...` : input;


export default function MovieList() {
    const [movies, setMovies] = useState([]);

    const userId = authService.getCurrentUser().id;

    useEffect(()=> {
        if(authService.getCurrentUser().id !== undefined) {
            console.log("authService.getCurrentUser().id: ", authService.getCurrentUser().id);
            console.log("authHeader: ", authHeader().Authorization);
            movieService.getAll()
                .then(response => {
                    console.log('Printing the movies data', response.data);
                    setMovies(response.data);
                })
                .catch(error => {
                    console.log('An error occurred.', error);
                })
        }
    },[])

    return (
        <div className="container">
            <div style={{paddingTop: "20px", paddingBottom: "20px"}}>
                <Link to={"/movies/add"} className={"btn btn-primary mb-2"} style={{float:"right"}}>
                    Add Movie
                </Link>
                <h3 style={{textAlign: "center"}}>My watch list</h3>
            </div>
            <div>
                <div className="row row-cols-auto row-cols-md-2">
                {movies.map(movie => (
                    <div className={"col"}>
                        <div className="card mb-3" id={"home_list"} style={{maxWidth: "700px"}}>
                            <div className="row g-0">
                                <div className="col-md-4">
                                    {movie.posterFileName !== undefined ? (
                                                                <img className="img-fluid rounded-start"
                                                                src={'http://'+process.env.REACT_APP_HOST+'/files/images/' + userId + "/" + movie.posterFileName}
                                                                alt={movie.posterFileName}
                                                                />
                                                        ) : null}
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body">
                                        <Link to={"/movies/"+movie.id} className={"stretched-link text-decoration-none"}>
                                            {movie.title}
                                        </Link>
                                        <p className="card-text">{movie.releaseYear}</p>
                                        <p className="card-text">{formatGenresToDisplay(movie.genres)}</p>
                                        <p className="card-text">{movie.filmwebRating} <BsStarFill style={{color: "gold"}}/></p>
                                        <p className="card-text">{numberWithSpaces(movie.filmwebNumberOfVotes)} <BsStars style={{color: "gray"}}/></p>
                                        <p className="card-text"><small className="text-muted">{truncate(movie.description)}</small>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                </div>
            </div>
        </div>
    );
}
