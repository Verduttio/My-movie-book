import * as React from 'react';
import {useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import movieService from "../services/movieService";
import {useNavigate} from "react-router-dom";

export default function AddMovie() {
    const[title, setTitle] = useState('');
    const[releaseYear, setReleaseYear] = useState('');
    const[genre, setGenre] = useState('');
    const[director, setDirector] = useState('');
    const[posterImage, setPosterImage] = useState(null);
    const navigate = useNavigate();

    const saveMovie = (e) => {
        e.preventDefault();

        movieService.uploadPosterImage(posterImage)
            .then(response => {
                console.log("Poster image uploaded successfully.", response.data);
            })
            .catch(error => {
            console.log('An error occurred while uploading the image.', error);
        })

        const posterFileName = posterImage.name;
        const movie = {title, releaseYear, genre, director, posterFileName};
        movieService.create(movie)
            .then(response => {
                console.log("Movie uploaded successfully.", response.data);
                navigate('/');
            })
            .catch(error => {
                console.log('An error occurred while uploading the movie.', error);
            })
    }


    return <div className="container">
        <h3>Add movie</h3>
        <hr/>
        <form>
            <div className={"form-group"}>
                <input
                    type={"text"}
                    className={"form-control col-4"}
                    id={"title"}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder={"Title"}
                    />
            </div>
            <div className={"form-group"}>
                <input
                    type={"text"}
                    className={"form-control col-4"}
                    id={"releaseYear"}
                    value={releaseYear}
                    onChange={(e) => setReleaseYear(e.target.value)}
                    placeholder={"Year of release"}
                />
            </div>
            <div className={"form-group"}>
                <input
                    type={"text"}
                    className={"form-control col-4"}
                    id={"genre"}
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                    placeholder={"Genre"}
                />
            </div>
            <div className={"form-group"}>
                <input
                    type={"text"}
                    className={"form-control col-4"}
                    id={"director"}
                    value={director}
                    onChange={(e) => setDirector(e.target.value)}
                    placeholder={"Director"}
                />
            </div>
            <div>
                <input
                    type={"file"}
                    className={"form-control"}
                    id={"file"}
                    onChange={(e) => setPosterImage(e.target.files[0])}
                />
            </div>
            <div>
                <button className={"btn btn-primary"} onClick={(e) => saveMovie(e)}>Save</button>
            </div>
        </form>
        <hr/>
    </div>
}