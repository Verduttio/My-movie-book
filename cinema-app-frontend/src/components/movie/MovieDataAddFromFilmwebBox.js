import * as React from "react";
import {useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import movieService from "../../services/movieService";
import UploadImage from "./UploadImage";

export default function MovieDataAddFromFilmwebBox(props) {
    const {titleF, releaseYearF, genreF, directorF, filmwebRatingF, filmwebNumberOfVotesF, descriptionF, posterURLF} = props.movie;

    const[title, setTitle] = useState(titleF.toString());
    const[filmwebRating, setFilmwebRating] = useState(filmwebRatingF.toString());
    const[filmwebNumberOfVotes, setFilmwebNumberOfVotes] = useState(filmwebNumberOfVotesF.toString());
    const[imdbRating, setImdbRating] = useState('');
    const[imdbNumberOfVotes, setImdbNumberOfVotes] = useState('');
    const[releaseYear, setReleaseYear] = useState(releaseYearF.toString());
    const[genre, setGenre] = useState(genreF.toString());
    const[director, setDirector] = useState(directorF.toString());
    const[posterImage, setPosterImage] = useState(null);
    const[posterFileName, setPosterFileName] = useState(posterURLF.toString());
    const[description, setDescription] = useState(descriptionF.toString());

    const[changePoster, setChangePoster] = useState(false);

    const navigate = useNavigate();

    if(posterImage != null) {
        movieService.uploadPosterImage(posterImage)
            .then(response => {
                console.log("Poster image uploaded successfully.", response.data);
                setChangePoster(false);
            })
            .catch(error => {
                console.log('An error occurred while uploading the image.', error);
            })
    }


    const saveMovie = (e) => {
        e.preventDefault();

        const movie = {title, releaseYear, genre, director, posterFileName, filmwebRating, filmwebNumberOfVotes, imdbRating, imdbNumberOfVotes, description};
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

    const changedImage = (changePosterVal, posterImageVal) => {
        setChangePoster(changePosterVal);
        setPosterImage(posterImageVal);
    };

    const chooseImage = (posterFileNameVal, posterImageVal) => {
        setPosterFileName(posterFileNameVal);
        setPosterImage(posterImageVal);
    }


    return(
        <div className="container">
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
                                id={"filmwebRating"}
                                value={filmwebRating}
                                onChange={(e) => setFilmwebRating(e.target.value)}
                                placeholder={"Filmweb rating"}
                            />
                        </div>
                        <div className={"mb-3"}>
                            <input
                                type={"text"}
                                className={"form-control col-4"}
                                id={"filmwebNumberOfVotes"}
                                value={filmwebNumberOfVotes}
                                onChange={(e) => setFilmwebNumberOfVotes(e.target.value)}
                                placeholder={"Filmweb number of votes"}
                            />
                        </div>
                        <div className={"mb-3"}>
                            <input
                                type={"text"}
                                className={"form-control col-4"}
                                id={"imdbRating"}
                                value={imdbRating}
                                onChange={(e) => setImdbRating(e.target.value)}
                                placeholder={"IMDb rating"}
                            />
                        </div>
                        <div className={"mb-3"}>
                            <input
                                type={"text"}
                                className={"form-control col-4"}
                                id={"imdbNumberOfVotes"}
                                value={imdbNumberOfVotes}
                                onChange={(e) => setImdbNumberOfVotes(e.target.value)}
                                placeholder={"IMDb number of votes"}
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
                        <UploadImage posterFileName={posterFileName} changedImage={changedImage} chooseImage={chooseImage} changePoster={changePoster}/>
                        <div className={"text-center"}>
                            <button className={"btn btn-primary"} onClick={(e) => saveMovie(e)}>Add movie</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
            );
}