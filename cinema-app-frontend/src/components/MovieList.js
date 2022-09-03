import * as React from 'react';
import {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from "react-router-dom";
import movieService from "../services/movieService";

export default function MovieList() {
    const [movies, setMovies] = useState([]);

    useEffect(()=> {
        movieService.getAll()
            .then(response => {
                console.log('Printing the movies data', response.data)
                setMovies(response.data);
            })
            .catch(error => {
                console.log('An error occurred.', error);
            })
    },[])

    return (
        <div className="container">
            <h3>List of movies</h3>
            <div>
                <Link to={"/add"} className={"btn btn-primary mb-2"}>Add Movie</Link>
                <table className={"table table-bordered table-striped"}>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Year</th>
                        <th>Genre</th>
                        <th>Director</th>
                        <th>Poster</th>
                    </tr>
                    {
                        movies.map(movie => (
                            <tr key={movie.id}>
                                <td>{movie.id}</td>
                                <td>{movie.title}</td>
                                <td>{movie.releaseYear}</td>
                                <td>{movie.genre}</td>
                                <td>{movie.director}</td>
                                <img src={'http://localhost:8080/files/images/'+movie.posterFileName} alt={movie.posterFileName} style={{width: '150px', height: 'auto'}}></img>
                            </tr>
                        ))
                    }
                </table>
            </div>
        </div>
    );
}
