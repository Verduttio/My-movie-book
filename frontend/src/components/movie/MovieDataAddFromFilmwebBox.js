import * as React from "react";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import movieService from "../../services/movieService";
import UploadImage from "./UploadImage";
import InputBoxesRegisterMovie from "./InputBoxesRegisterMovie";
import AuthService from "../../services/authService";

export default function MovieDataAddFromFilmwebBox(props) {
    const {titleF, releaseYearF, genresF, directorF, filmwebRatingF, filmwebNumberOfVotesF,
            descriptionF, posterURLF, imdbRatingF, imdbNumberOfVotesF, posterFilmwebUrlF} = props.movie;

    const[title, setTitle] = useState(titleF.toString());
    const[filmwebRating, setFilmwebRating] = useState(filmwebRatingF.toString());
    const[filmwebNumberOfVotes, setFilmwebNumberOfVotes] = useState(filmwebNumberOfVotesF.toString());
    const[imdbRating, setImdbRating] = useState(imdbRatingF.toString());
    const[imdbNumberOfVotes, setImdbNumberOfVotes] = useState(imdbNumberOfVotesF.toString());
    const[releaseYear, setReleaseYear] = useState(releaseYearF.toString());
    const[genres, setGenres] = useState(genresF);
    const[director, setDirector] = useState(directorF.toString());
    const[posterImage, setPosterImage] = useState(null);
    const[posterFileName, setPosterFileName] = useState(posterURLF.toString());
    const[description, setDescription] = useState(descriptionF.toString());
    const[posterFilmwebUrl, setPosterFilmwebUrl] = useState(posterFilmwebUrlF.toString());

    const currentUser = AuthService.getCurrentUser();

    const[changePoster, setChangePoster] = useState(false);

    const navigate = useNavigate();


    const saveMovie = (e) => {
        e.preventDefault();

        let userId;
        if(currentUser === null) {
            userId = 0;
        } else {
            userId = currentUser.id;
        }

        let genresList = genres.map(function(genre){return genre.value;})

        const movie = {title, releaseYear, genres: genresList, director, posterFileName, posterFilmwebUrl, filmwebRating, filmwebNumberOfVotes, imdbRating, imdbNumberOfVotes, description, userId};
        // Create new record
        movieService.create(movie)
            .then(response => {
                console.log("Movie uploaded successfully.", response.data);
                console.log("UserId: ", userId);
                navigate('/movies');
            })
            .catch(error => {
                console.log('An error occurred while uploading the movie.', error);
            })
    };

    return(
        <div className="container">
            <div className="card">
                <div className="card-body">
                    <form>
                        <InputBoxesRegisterMovie
                            title={title} setTitle={setTitle}
                            filmwebRating={filmwebRating} setFilmwebRating={setFilmwebRating}
                            filmwebNumberOfVotes={filmwebNumberOfVotes} setFilmwebNumberOfVotes={setFilmwebNumberOfVotes}
                            imdbRating={imdbRating} setImdbRating={setImdbRating}
                            imdbNumberOfVotes={imdbNumberOfVotes} setImdbNumberOfVotes={setImdbNumberOfVotes}
                            releaseYear={releaseYear} setReleaseYear={setReleaseYear}
                            genres={genres} setGenres={setGenres}
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
                            <button className={"btn btn-primary"} onClick={(e) => saveMovie(e)}>Add movie</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
            );
}