import * as React from 'react';
import {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import movieService from "../services/movieService";
import {Link, useNavigate, useParams} from "react-router-dom";

export default function AddMovie() {
    const[title, setTitle] = useState('');
    const[rating, setRating] = useState('');
    const[numberOfVotes, setNumberOfVotes] = useState('');
    const[releaseYear, setReleaseYear] = useState('');
    const[genre, setGenre] = useState('');
    const[director, setDirector] = useState('');
    const[posterImage, setPosterImage] = useState(null);
    const[posterFileName, setPosterFileName] = useState('');
    const[description, setDescription] = useState('');

    const {id} = useParams();

    const navigate = useNavigate();

    const saveMovie = (e) => {
        e.preventDefault();

        const movie = {title, releaseYear, genre, director, posterFileName, id, rating, numberOfVotes, description};
        if(id) {
            // Update record
            movieService.update(movie)
                .then(response => {
                    console.log("Movie data updated successfully.", response.data);
                    navigate('/movies');
                })
                .catch(error => {
                    console.log('An error occurred while updating the movie.', error);
                })
        } else {
            // Create new record
            movieService.uploadPosterImage(posterImage)
                .then(response => {
                    console.log("Poster image uploaded successfully.", response.data);
                })
                .catch(error => {
                    console.log('An error occurred while uploading the image.', error);
                })


            movieService.create(movie)
                .then(response => {
                    console.log("Movie uploaded successfully.", response.data);
                    navigate('/movies');
                })
                .catch(error => {
                    console.log('An error occurred while uploading the movie.', error);
                })
        }


    }

    useEffect(() => {
        if(id) {
            movieService.get(id)
                .then(movie => {
                    setTitle(movie.data.title);
                    setGenre(movie.data.genre);
                    setReleaseYear(movie.data.releaseYear);
                    setDirector(movie.data.director);
                    setPosterFileName(movie.data.posterFileName);
                    setRating(movie.data.rating);
                    setNumberOfVotes(movie.data.numberOfVotes);
                    setDescription(movie.data.description);
            })
                .catch(error => {
                    console.log('And error occurred while getting movie data.', error);
                })
        }
    }, [id])


    return <div className="container">
        <div id={"top bar"} style={{paddingTop:"20px"}}>
            <span style={{display:"block", float:"left"}}>
                    <Link className={"btn btn-primary"} to={"/movies"}>Home page</Link>
            </span>
            <h3 style={{textAlign: "center", paddingTop: "20px"}}>Add movie</h3>
        </div>
        <div className="card">
            <div className="card-body">
                <form>
                    <div className={"mb-3"}>
                        <input
                            type={"text"}
                            className={"form-control col-4"}
                            id={"title"}
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder={"Title"}
                            />
                    </div>
                    <div className={"mb-3"}>
                        <input
                            type={"text"}
                            className={"form-control col-4"}
                            id={"releaseYear"}
                            value={releaseYear}
                            onChange={(e) => setReleaseYear(e.target.value)}
                            placeholder={"Year of release"}
                        />
                    </div>
                    <div className={"mb-3"}>
                        <input
                            type={"text"}
                            className={"form-control col-4"}
                            id={"genre"}
                            value={genre}
                            onChange={(e) => setGenre(e.target.value)}
                            placeholder={"Genre"}
                        />
                    </div>
                    <div className={"mb-3"}>
                        <input
                            type={"text"}
                            className={"form-control col-4"}
                            id={"director"}
                            value={director}
                            onChange={(e) => setDirector(e.target.value)}
                            placeholder={"Director"}
                        />
                    </div>
                    <div className={"mb-3"}>
                        <input
                            type={"text"}
                            className={"form-control col-4"}
                            id={"rating"}
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                            placeholder={"Rating"}
                        />
                    </div>
                    <div className={"mb-3"}>
                        <input
                            type={"text"}
                            className={"form-control col-4"}
                            id={"numberOfVotes"}
                            value={numberOfVotes}
                            onChange={(e) => setNumberOfVotes(e.target.value)}
                            placeholder={"Number of votes"}
                        />
                    </div>
                    <div className={"mb-3"}>
                        <input
                            type={"text"}
                            className={"form-control col-4"}
                            id={"description"}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder={"Description"}
                        />
                    </div>
                    <div className={"mb-3"}>
                        <input
                            type={"file"}
                            className={"form-control"}
                            id={"file"}
                            onChange={(e) => {
                                    setPosterImage(e.target.files[0]);
                                    setPosterFileName(e.target.files[0].name);
                                }
                            }
                        />
                    </div>
                    <div className={"text-center"}>
                        <button className={"btn btn-primary"} onClick={(e) => saveMovie(e)}>Save</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
}

