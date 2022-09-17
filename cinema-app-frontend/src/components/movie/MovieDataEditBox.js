import * as React from "react";
import {useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import movieService from "../../services/movieService";
import {useEffect} from "react";

export default function MovieDataEditBox(params) {
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

    const navigate = useNavigate();

    const id = params.id;

    const editMovie = (e) => {
        e.preventDefault();

        const movie = {title, releaseYear, genre, director, posterFileName, id, filmwebRating, filmwebNumberOfVotes, imdbRating, imdbNumberOfVotes, description};
        // Update record
        movieService.update(movie)
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
                setGenre(movie.data.genre);
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
                    <button className={"btn btn-primary"} onClick={(e) => editMovie(e)}>Apply changes</button>
                </div>
            </form>
        </div>
    </div>);
}