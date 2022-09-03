import * as React from 'react';
import {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Movies() {
    const [movies, setMovies] = useState([]);

    useEffect(()=> {
        fetch("http://localhost:8080/movies")
            .then(res=>res.json())
            .then((result)=>{
            setMovies(result);
        })
            .then(()=>{
                console.log("Movies received");
            })
    },[])

    return (
        <div className="container">
            <h3>List of movies</h3>
            <div>
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
