import * as React from "react";
import {useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import movieService from "../../services/movieService";
import UploadImage from "./UploadImage";
import InputBoxesRegisterMovie from "./InputBoxesRegisterMovie";
import AuthService from "../../services/authService";

export default function MovieDataAddBox(params) {
    const[title, setTitle] = useState('');
    const[filmwebRating, setFilmwebRating] = useState('');
    const[filmwebNumberOfVotes, setFilmwebNumberOfVotes] = useState('');
    const[imdbRating, setImdbRating] = useState('');
    const[imdbNumberOfVotes, setImdbNumberOfVotes] = useState('');
    const[releaseYear, setReleaseYear] = useState('');
    const[genre, setGenre] = useState('');
    const[director, setDirector] = useState('');
    const[posterImage, setPosterImage] = useState(null);
    const[posterFileName, setPosterFileName] = useState('');
    const[description, setDescription] = useState('');

    const currentUser = AuthService.getCurrentUser();


    const[changePoster, setChangePoster] = useState(true);

    const navigate = useNavigate();

    const id = params.id;

    const saveMovie = (e) => {
        e.preventDefault();

        let userId;
        if(currentUser === null) {
            userId = 0;
        } else {
            userId = currentUser.id;
        }

        const movie = {title, releaseYear, genre, director, posterFileName, id, filmwebRating, filmwebNumberOfVotes, imdbRating, imdbNumberOfVotes, description, userId};
        // Create new record
        movieService.create(movie)
            .then(response => {
                console.log("Movie uploaded successfully.", response.data);
                navigate('/movies');
            })
            .catch(error => {
                console.log('An error occurred while uploading the movie.', error);
            })
    };

    return(<div className="card">
        <div className="card-body">
            <form>
                <InputBoxesRegisterMovie
                    title={title} setTitle={setTitle}
                    filmwebRating={filmwebRating} setFilmwebRating={setFilmwebRating}
                    filmwebNumberOfVotes={filmwebNumberOfVotes} setFilmwebNumberOfVotes={setFilmwebNumberOfVotes}
                    imdbRating={imdbRating} setImdbRating={setImdbRating}
                    imdbNumberOfVotes={imdbNumberOfVotes} setImdbNumberOfVotes={setImdbNumberOfVotes}
                    releaseYear={releaseYear} setReleaseYear={setReleaseYear}
                    genre={genre} setGenre={setGenre}
                    director={director} setDirector={setDirector}
                    description={description} setDescription={setDescription}
                />
                <UploadImage
                    posterFileName={posterFileName}
                    setPosterFileName={setPosterFileName}
                    changePoster={changePoster}
                    setChangePoster={setChangePoster}
                    posterImage={posterImage}
                    setPosterImage={setPosterImage}
                />
                <div className={"text-center"}>
                    <button className={"btn btn-primary"} onClick={(e) => saveMovie(e)}>Save</button>
                </div>
            </form>
        </div>
    </div>);
}