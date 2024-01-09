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

const checkHttpStatus = async (url) => {
    try {
        const response = await fetch(url);

        if (response.ok) {
            // console.log(`Adres URL ${url} zwraca kod odpowiedzi HTTP 200 (OK).`);
            return true;
        } else {
            // console.error(`Adres URL ${url} zwraca inny kod odpowiedzi HTTP: ${response.status}`);
            return false;
        }
    } catch (error) {
        // console.error(`Błąd podczas sprawdzania statusu HTTP dla adresu URL ${url}: ${error.message}`);
        return false;
    }
};


export default function MovieList() {
    const [movies, setMovies] = useState([]);
    const [moviesAreFetched, setMoviesAreFetched] = useState(false);

    const userId = authService.getCurrentUser().id;

    useEffect(()=> {
        if(authService.getCurrentUser().id !== undefined) {
            console.log("authService.getCurrentUser().id: ", authService.getCurrentUser().id);
            console.log("authHeader: ", authHeader().Authorization);
            movieService.getAll()
                .then(async response => {
                    console.log('Printing the movies data', response.data);

                    const updatedMovies = await Promise.all(response.data.map(async movie => {
                        if (await checkHttpStatus('http://' + process.env.REACT_APP_HOST + '/files/images/' + userId + '/' + movie.posterFileName) === true) {
                            movie.posterFileName = 'http://' + process.env.REACT_APP_HOST + '/files/images/' + userId + '/' + movie.posterFileName;
                        } else {
                            movie.posterFileName = movie.posterFilmwebUrl;
                        }

                        return movie;
                    }));

                    console.log("updatedMovies: ", updatedMovies)
                    setMovies(updatedMovies);

                    // console.log("movies: ", movies);
                    setMoviesAreFetched(true);
                })
                .catch(error => {
                    console.log('An error occurred.', error);
                })
        }
    },[])

    return (
        <div className="container">
            <div className={"row"} style={{paddingTop: "20px", paddingBottom: "20px"}}>
                <div className={"col-10 d-flex justify-content-left"}>
                    <div className={"shadow-lg p-2 mb-2 bg-opacity-25 bg-danger rounded"}>
                        <h4>My watch list</h4>
                    </div>
                </div>
                <div className={"col-2"} style={{textAlign: "right"}}>
                    <Link to={"/movies/add"} className={"btn btn-info mb-2"}>
                        Add movie
                    </Link>
                </div>
            </div>
            {moviesAreFetched ? (
                <div>
                    <div className="row row-cols-auto row-cols-md-2">
                        {movies.map(movie => (
                            <div className={"col"}>
                                <div className="card mb-3" id={"home_list"} style={{maxWidth: "700px"}}>
                                    <div className="row g-0">
                                        <div className="col-md-4">
                                            {movie.posterFileName !== undefined ? (
                                                <img className="img-fluid rounded-start"
                                                     src={movie.posterFileName}
                                                     alt={movie.title}
                                                />
                                            ) : null}
                                        </div>
                                        <div className="col-md-8">
                                            <div className="card-body">
                                                <Link to={"/movies/" + movie.id}
                                                      className={"stretched-link text-decoration-none"}>
                                                    {movie.title}
                                                </Link>
                                                <p className="card-text">{movie.releaseYear}</p>
                                                <p className="card-text">{formatGenresToDisplay(movie.genres)}</p>
                                                <p className="card-text">{movie.filmwebRating === undefined ? ("") : (movie.filmwebRating.toFixed(1))}
                                                    <BsStarFill style={{color: "gold"}}/></p>
                                                <p className="card-text">{numberWithSpaces(movie.filmwebNumberOfVotes)}
                                                    <BsStars style={{color: "gray"}}/></p>
                                                <p className="card-text"><small
                                                    className="text-muted">{truncate(movie.description)}</small>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ): (
                <h1 style={{textAlign: "center"}}>
                    Loading your movies...
                </h1>
            )}

        </div>
    );
}
