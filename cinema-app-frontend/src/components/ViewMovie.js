import * as React from 'react';
import {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link, useNavigate, useParams} from "react-router-dom";
import movieService from "../services/movieService";
import "./MovieList.css";

function numberWithSpaces(x) {
    return x.toLocaleString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

export default function MovieList() {
    const [movie, setMovie] = useState([]);
    const [note, setNote] = useState("");
    const [editNote, setEditNote] = useState(false);
    const {id} = useParams();

    useEffect(()=> {
        movieService.get(id)
            .then(response => {
                console.log('Printing movie data', response.data);
                setMovie(response.data);
            })
            .catch(error => {
                console.log('An error occurred while getting the movie.', error);
            })
    },[id])

    const navigate = useNavigate();
    const myNote = {note};

    const addNote = (e) => {
        e.preventDefault();

        movieService.modify(id, myNote)
            .then(response => {
                console.log('Modified movie data', response.data);
            })
            .catch(error => {
                console.log('An error occurred while modifying the movie', error)
            });
        window.location.reload();
    }

    return (
        <div className="container">
            <div id={"buttons"} style={{paddingTop: "20px", paddingBottom: "20px"}}>
                <span style={{display:"block", float:"right"}}>
                    <Link className={"btn btn-primary"} to={"/movies"}>Home page</Link>
                </span>
                <span style={{display:"block", float:"left"}}>
                    <Link className={"btn btn-warning"} to={"/movies/edit/" + movie.id}>Update</Link>
                </span>
                <span style={{display:"block", float:"left", paddingLeft: '20px'}}>
                    <button className={"btn btn-danger"} onClick={() => {
                        movieService.deleteMovie(movie.id);
                        movieService.deletePosterImage(movie.posterFileName);
                        navigate("/movies");
                    }}>Delete</button>
                </span>
            </div>
            <div style={{paddingTop:"40px"}}>
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
                    </tr>
                    </thead>
                    <tbody>
                        <tr key={movie.id}>
                            <td>{movie.id}</td>
                            <td>{movie.title}</td>
                            <td>{movie.releaseYear}</td>
                            <td>{movie.genre}</td>
                            <td>{movie.director}</td>
                            <td>{movie.rating}</td>
                            {/*<td>{numberWithSpaces(movie.numberOfVotes)}</td>*/}
                            <td>{movie.numberOfVotes}</td>
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
                        </tr>
                    </tbody>
                </table>
            </div>
            <div>
                <h4>Description</h4>
                <h5>{movie.description}</h5>
            </div>
            <div className="form-group" style={{paddingTop: '20px'}}>
                <h4>My note</h4>
                {movie.note === null ? (
                    <form>
                        <textarea className="form-control" id="exampleFormControlTextarea3" rows="7" onChange={(e) => setNote(e.target.value)}/>
                        <span style={{display:"block", paddingTop: '20px'}}>
                            <button className={"btn btn-info"} type={"submit"} onClick={(e) => addNote(e)}>Add note</button>
                        </span>
                    </form>
                ) : (
                    <div>
                        {editNote === false ? (
                            <div>
                                <h5>{movie.note}</h5>
                                <button className={"btn btn-info"} onClick={() => setEditNote(true)}>Edit note</button>
                            </div>
                        ) : (
                            <form>
                                <textarea className="form-control" id="exampleFormControlTextarea3" rows="7" onChange={(e) => setNote(e.target.value)}>
                                    {movie.note}
                                </textarea>
                                <span style={{display:"block", paddingTop: '20px'}}>
                                    <button className={"btn btn-info"} type={"submit"} onClick={(e) => addNote(e)}>Edit note</button>
                                </span>
                            </form>
                        )}

                    </div>
                )}
            </div>

        </div>
    );
}
