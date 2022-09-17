import * as React from 'react';
import {useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import filmwebFetcher from "../../../../services/filmwebFetcher";
import MovieDataAddFromFilmwebBox from "../../MovieDataAddFromFilmwebBox";
import MovieDataAddBox from "../../MovieDataAddBox";
import HeaderUploadMovie from "../../HeaderUploadMovie";

export default function AddMovie() {
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

    const[filmwebLink, setFilmwebLink] = useState('');
    const[filmwebFetchedData, setFilmwebFetchedData] = useState(false);

    const[enterMovieDataOption, setEnterMovieDataOption] = useState(0);
    // 0 - basic (user has not chosen yet)
    // 1 - fetch from filmweb
    // 2 - fill in manually


    const movieFetchedFilmweb = {
        titleF: title,
        releaseYearF: releaseYear,
        genreF: genre,
        directorF: director,
        filmwebRatingF: filmwebRating,
        filmwebNumberOfVotesF: filmwebNumberOfVotes,
        descriptionF: description
    }

    const fetchFromFilmweb = ((e) => {
        e.preventDefault();
        filmwebFetcher.fetchData(filmwebLink)
            .then(movie => {
                setTitle(movie.data.title);
                setGenre(movie.data.genre);
                setReleaseYear(movie.data.releaseYear);
                setDirector(movie.data.director);
                setFilmwebRating(movie.data.filmwebRating);
                setFilmwebNumberOfVotes(movie.data.filmwebNumberOfVotes);
                setDescription(movie.data.description);
                setFilmwebFetchedData(true);
            })
            .catch(error => {
                console.log('And error occurred while fetching data from filmweb.', error);
            })
    })


    if (enterMovieDataOption === 0) {
        return (
            <div className={"container"}>
                <div>
                    <div className={"text-center"} style={{padding: "30px"}}>
                        <button className={"btn btn-primary"} onClick={(e) => setEnterMovieDataOption(1)}>Load data from filmweb</button>
                    </div>
                    <div className={"text-center"}>
                        <button className={"btn btn-primary"} onClick={(e) => setEnterMovieDataOption(2)}>Fill in data manually</button>
                    </div>
                </div>
            </div>
        );
    } else if (enterMovieDataOption === 1) {
        // Fetch from filmweb
        if(!filmwebFetchedData) {
            // User has not fetched data yet,
            // so display only link box.
            return (
                <div className={"container"}>
                    <form>
                        <div className={"mb-3"}>
                            <input
                                type={"text"}
                                className={"form-control col-4"}
                                id={"movieName"}
                                value={filmwebLink}
                                onChange={(e) => setFilmwebLink(e.target.value)}
                                placeholder={"Filmweb link"}
                            />
                        </div>
                        <div className={"text-center"}>
                            <button className={"btn btn-primary"} onClick={(e) => fetchFromFilmweb(e)}>Load data from
                                filmweb
                            </button>
                        </div>
                    </form>
                </div>
            );
        } else {
            // User has already fetched data
            // so display all movie input fields.
            return(
                <div className="container">
                    <HeaderUploadMovie functionality="Add movie"/>
                    <MovieDataAddFromFilmwebBox movie={movieFetchedFilmweb}/>
                </div>
            )
        }
    } else if (enterMovieDataOption === 2) {
        // Display box to fill movie data manually.
        return (
            <div className="container">
                <HeaderUploadMovie functionality="Add movie"/>
                <MovieDataAddBox/>
            </div>
        )
    }
}

