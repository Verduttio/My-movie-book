import * as React from "react";
import {useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import movieService from "../../services/movieService";
import UploadImage from "./UploadImage";
import InputBoxesRegisterMovie from "./InputBoxesRegisterMovie";

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
                            <button className={"btn btn-primary"} onClick={(e) => saveMovie(e)}>Add movie</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
            );
}