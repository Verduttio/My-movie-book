import * as React from "react";
import {useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import movieService from "../../services/movieService";
import {useEffect} from "react";
import UploadImage from "./UploadImage";
import InputBoxesRegisterMovie from "./InputBoxesRegisterMovie";
import authService from "../../services/authService";
import {formatGenresToEdit} from "../../functionalities/GenreFormatter";

export default function MovieDataEditBox(params) {
    const[title, setTitle] = useState('');
    const[filmwebRating, setFilmwebRating] = useState('');
    const[filmwebNumberOfVotes, setFilmwebNumberOfVotes] = useState('');
    const[imdbRating, setImdbRating] = useState('');
    const[imdbNumberOfVotes, setImdbNumberOfVotes] = useState('');
    const[releaseYear, setReleaseYear] = useState('');
    const[genres, setGenres] = useState('');
    const[director, setDirector] = useState('');
    const[posterImage, setPosterImage] = useState(null);
    const[posterFileName, setPosterFileName] = useState('');
    const[description, setDescription] = useState('');

    const[changePoster, setChangePoster] = useState(false);

    const navigate = useNavigate();

    const id = params.id;

    const editMovie = (e) => {
        e.preventDefault();

        let genresList = genres.map(function(genre){return genre.value;})
        // let genresList = genres.split(",");

        const movie = {title, releaseYear, genres: genresList, director, posterFileName, filmwebRating, filmwebNumberOfVotes, imdbRating, imdbNumberOfVotes, description};
        console.log(movie);
        // Update record
        movieService.modify(id, movie)
            .then(response => {
                console.log("Movie data updated successfully.", response.data);
                navigate('/movies');
            })
            .catch(error => {
                console.log('An error occurred while updating the movie.', error);
            })
    };

    useEffect(() => {
        movieService.get(id)
            .then(movie => {
                setTitle(movie.data.title);
                setGenres(formatGenresToEdit(movie.data.genres));
                setReleaseYear(movie.data.releaseYear);
                setDirector(movie.data.director);
                setPosterFileName(movie.data.posterFileName);
                setFilmwebRating(movie.data.filmwebRating);
                setFilmwebNumberOfVotes(movie.data.filmwebNumberOfVotes);
                setImdbRating(movie.data.imdbRating);
                setImdbNumberOfVotes(movie.data.imdbNumberOfVotes);
                setDescription(movie.data.description);
            })
            .catch(error => {
                console.log('And error occurred while getting movie data.', error);
            })
    }, [id])


    return(
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
                    mode={"edit"}
                />
                <div className={"text-center"}>
                    <button className={"btn btn-primary"} onClick={(e) => editMovie(e)}>Apply changes</button>
                </div>
            </form>
        </div>
    </div>);
}