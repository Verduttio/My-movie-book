import * as React from 'react';
import {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link, useNavigate, useParams} from "react-router-dom";
import movieService from "../../../../services/movieService";
import "../main/MovieList.css";
import authService from "../../../../services/authService";
import {formatGenresToDisplay} from "../../../../functionalities/GenreFormatter";

function numberWithSpaces (x){
    return x !== undefined ? x.toLocaleString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") : x;
}

export default function MovieList() {
    const [movie, setMovie] = useState({});
    const [note, setNote] = useState("");
    const [editNote, setEditNote] = useState(false);
    const {id} = useParams();

    const [removeMovieButtonVisibility, setRemoveMovieButtonVisibility] = useState(true);


    const userId = authService.getCurrentUser().id;

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
                <span style={{display:"block", float:"right"}}>
                    <button className={"btn btn-success"} onClick={(e) => {
                        changeWatchStatus(e);
                    }}>{movie.watched === false ? ("Mark as watched") : ("You watched it!")}</button>
                </span>
                <span style={{display:"block", float:"right", paddingRight: "20px"}}>
                    <Link className={"btn btn-warning"} to={"/movies/edit/" + movie.id}>Update</Link>
                </span>
                <span style={{display:"block", float:"right", paddingRight:"20px"}}>
                    <button className={"btn btn-danger"} disabled={!removeMovieButtonVisibility} onClick={() => {
                        setRemoveMovieButtonVisibility(false);
                        movieService.deleteMovie(movie.id)
                            .then(response => {
                                navigate("/movies");
                            });
                        movieService.deletePosterImage(movie.posterFileName);
                    }}>Delete</button>
                </span>
            </div>
            <div style={{paddingTop:"40px"}}>
                <div className="row">
                    <div className="col-12 col-lg-8">
                        <div className={`card`} style={{
                            maxWidth: "800px",
                            border: `1px solid ${movie.watched ? "green" : "red"}`,
                            boxShadow: `0px 0px 10px ${movie.watched ? "green" : "red"}`
                        }}>
                            <div className="row g-0">
                                <div className="col-md-4">
                                    <img
                                        src={`http://${process.env.REACT_APP_HOST}/files/images/${userId}/${movie.posterFileName}`}
                                        alt={movie.posterFileName}
                                        className="rounded-start"
                                        style={{
                                            width: "100%", // Skalowanie zdjęcia na szerokość
                                            height: "auto", // Automatyczna wysokość
                                            objectFit: "cover", // Wypełnij całą przestrzeń
                                        }}
                                    />
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body">
                                        <div className="row mb-2">
                                            <div className="col-3">
                                                <h5 className="card-title">Title</h5>
                                            </div>
                                            <div className="col">
                                                <h5 className="card-title">{movie.title}</h5>
                                            </div>
                                        </div>
                                        <div className="row mb-2">
                                            <div className="col-3">
                                                <p className="card-text">Year</p>
                                            </div>
                                            <div className="col">
                                                <p className="card-text">{movie.releaseYear}</p>
                                            </div>
                                        </div>
                                        <div className="row mb-2">
                                            <div className="col-3">
                                                <p className="card-text">Genres</p>
                                            </div>
                                            <div className="col">
                                                <p className="card-text">{formatGenresToDisplay(movie.genres)}</p>
                                            </div>
                                        </div>
                                        <div className="row mb-2">
                                            <div className="col-3">
                                                <p className="card-text">Director</p>
                                            </div>
                                            <div className="col">
                                                <p className="card-text">{movie.director}</p>
                                            </div>
                                        </div>
                                        <div className="row mb-2">
                                            <div className="col-3">
                                                <p className="card-text">Description</p>
                                            </div>
                                            <div className="col">
                                                <p className="card-text">{movie.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-lg-4">
                        <div className="row">
                            <div className="card" style={{maxWidth: "800px"}}>
                                <div className="row bg-secondary">
                                    {/*<img src={'http://'+process.env.REACT_APP_HOST+'/files/images/public/filmweb.jpg'}*/}
                                    <img src={process.env.PUBLIC_URL + "/filmweb.jpg"}
                                         alt={"filmweb"}
                                         style={{
                                             maxHeight: "60px",
                                             width: "auto",
                                             marginLeft: "auto",
                                             marginRight: "auto",
                                             padding: "10px",
                                             borderRadius: "15px"
                                        }}
                                    />
                                </div>
                                <div className="row bg-light">
                                    <hr/>
                                    <div className="col-4">
                                        <p>Rating</p>
                                    </div>
                                    <div className="col-8">
                                        <p style={{textAlign: "right"}}>{movie.filmwebRating === undefined ? ("") : (movie.filmwebRating.toFixed(1))}</p>
                                    </div>
                                </div>
                                <div className="row bg-light">
                                    <hr/>
                                    <div className="col-4">
                                        <p>Votes</p>
                                    </div>
                                    <div className="col-8">
                                        <p style={{textAlign: "right"}}>{numberWithSpaces(movie.filmwebNumberOfVotes)}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row" style={{paddingTop: "50px"}}>
                            <div className="card" style={{maxWidth: "800px"}}>
                                <div className="row bg-secondary">
                                    <img src={process.env.PUBLIC_URL + "/imdb.png"}
                                         className="img-fluid rounded-start"
                                         alt={"imdb"}
                                         style={{maxHeight: "60px", width: "auto", marginLeft: "auto", marginRight: "auto", padding: "10px"}}
                                    />
                                </div>
                                <div className="row bg-light">
                                    <hr/>
                                    <div className="col-4">
                                        <p>Rating</p>
                                    </div>
                                    <div className="col-8">
                                        <p style={{textAlign: "right"}}>{movie.imdbRating === undefined ? ("") : (movie.imdbRating.toFixed(1))}</p>
                                    </div>
                                </div>
                                <div className="row bg-light">
                                    <hr/>
                                    <div className="col-4">
                                        <p>Votes</p>
                                    </div>
                                    <div className="col-8">
                                        <p style={{textAlign: "right"}}>{numberWithSpaces(movie.imdbNumberOfVotes)}</p>
                                    </div>
                                </div>
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
