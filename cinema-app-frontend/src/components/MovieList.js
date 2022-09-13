import * as React from 'react';
import {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from "react-router-dom";
import movieService from "../services/movieService";
import "./MovieList.css";

function numberWithSpaces (x){
    return x !== undefined ? x.toLocaleString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") : x;
}

export default function MovieList() {
    const [movies, setMovies] = useState([]);

    useEffect(()=> {
        movieService.getAll()
            .then(response => {
                console.log('Printing the movies data', response.data);
                setMovies(response.data);
            })
            .catch(error => {
                console.log('An error occurred.', error);
            })
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
                <table className={"table table-bordered table-striped"}>
                    <thead className={"thead-dark"}>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Year</th>
                            <th>Genre</th>
                            <th>Director</th>
                            <th>Rating</th>
                            <th>Votes</th>
                            <th>Poster</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        movies.map(movie => (
                            <tr key={movie.id}>
                                <td>{movie.id}</td>
                                <td style={movie.watched ?
                                    ({color: "darkseagreen"}) : ({color: "red"})
                                }>{movie.title}</td>
                                <td>{movie.releaseYear}</td>
                                <td>{movie.genre}</td>
                                <td>{movie.director}</td>
                                <td>{movie.filmwebRating.toFixed(1)}</td>
                                <td>{numberWithSpaces(movie.filmwebNumberOfVotes)}</td>
                                <td>
                                    <img
                                        src={'http://localhost:8080/files/images/'+movie.posterFileName}
                                        alt={movie.posterFileName}
                                        style={{
                                            width: '150px',
                                            height: 'auto',
                                            display: 'block',
                                            marginLeft: 'auto',
                                            marginRight: 'auto'
                                        }}>
                                    </img>
                                </td>
                                <td>
                                    <td>
                                        <span style={{display:"block"}}>
                                            <Link className={"btn btn-info"} to={"/movies/" + movie.id}>View</Link>
                                        </span>
                                    </td>
                                </td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            </div>
        </div>
    );
}
