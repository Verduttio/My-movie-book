import * as React from 'react';
import {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link, useNavigate, useParams} from "react-router-dom";
import movieService from "../services/movieService";
import "./MovieList.css";

function numberWithSpaces (x){
    return x !== undefined ? x.toLocaleString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") : x;
}

export default function MovieList() {
    const [movie, setMovie] = useState({});
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
            });
    },[id])

    const navigate = useNavigate();

    console.log("movie.numberOfVotes: ", movie.numberOfVotes);
    // console.log("numberWithSpaces(movie.numberOfVotes): ", numberWithSpaces(movie.numberOfVotes));

    const addNote = (e) => {
        e.preventDefault();

        let myNote;

        if(note==="") {
            myNote = movie.note;
        } else {
            myNote = {note};
        }

        movieService.modify(id, myNote)
            .then(response => {
                console.log('Modified movie data', response.data);
            })
            .catch(error => {
                console.log('An error occurred while modifying the movie', error)
            });
        window.location.reload();
    }

    const changeWatchStatus = (e) => {
        e.preventDefault();
        const watched = !(movie.watched);
        const data = {watched};
        console.log("watchStatus: ", watched);
        console.log("movie.watched: ", movie.watched);

        movieService.modify(id, data)
            .then(response => {
                console.log("Changed movie's watch status", response.data);
            })
            .catch(error => {
                console.log("An error occurred while changing movie's status", error);
            })
        window.location.reload();
    }

    return (
        <div className="container">
            <div id={"buttons"} style={{paddingTop: "20px", paddingBottom: "20px"}}>
                <span style={{display:"block", float:"left"}}>
                    <Link className={"btn btn-primary"} to={"/movies"}>Home page</Link>
                </span>
                <span style={{display:"block", float:"right"}}>
                    <button className={"btn btn-success"} onClick={(e) => {
                        changeWatchStatus(e);
                    }}>{movie.watched === false ? ("Mark as watched") : ("You watched it!")}</button>
                </span>
                <span style={{display:"block", float:"right", paddingRight: "20px"}}>
                    <Link className={"btn btn-warning"} to={"/movies/edit/" + movie.id}>Update</Link>
                </span>
                <span style={{display:"block", float:"right", paddingRight:"20px"}}>
                    <button className={"btn btn-danger"} onClick={() => {
                        movieService.deleteMovie(movie.id);
                        movieService.deletePosterImage(movie.posterFileName);
                        navigate("/movies");
                    }}>Delete</button>
                </span>
            </div>
            <div style={{paddingTop:"40px"}}>
                <div className={movie.watched ? ("card mb-3 border-success") : ("card mb-3 border-danger")} style={{maxWidth: "800px"}}>
                    <div className="row g-0">
                        <div className="col-md-4">
                            <img src={'http://localhost:8080/files/images/'+movie.posterFileName}
                                 className="img-fluid rounded-start"
                                 alt={movie.posterFileName}
                            />
                        </div>
                        <div className="col-md-8">
                            <div className="card-body">
                                <h5 className="card-title">Title: {movie.title}</h5>
                                <p className="card-text">Year: {movie.releaseYear}</p>
                                <p className="card-text">Genre: {movie.genre}</p>
                                <p className="card-text">Director: {movie.director}</p>
                                <p className="card-text">Year: {movie.releaseYear}</p>
                                <p className="card-text">Rating: {movie.rating}</p>
                                <p className="card-text">Votes: {numberWithSpaces(movie.numberOfVotes)}</p>
                                <p className="card-text"><small className="text-muted">{movie.description}</small>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{paddingTop: "20px", maxWidth: "800px"}}>
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">My note</h4>
                        <hr/>
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
                                        <p className="card-text">{movie.note}</p>
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
            </div>
        </div>
    );
}
