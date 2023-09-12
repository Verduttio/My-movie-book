import * as React from 'react';
import {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import filmwebFetcher from "../../../../services/filmwebFetcher";
import imdbFetcher from "../../../../services/imdbFetcher";
import MovieDataAddFromFilmwebBox from "../../MovieDataAddFromFilmwebBox";
import MovieDataAddBox from "../../MovieDataAddBox";
import HeaderUploadMovie from "../../HeaderUploadMovie";
import {cutLinkToIMDbFormat, cutLinkToFilmwebFormat} from "../../../../functionalities/filmwebLinkCutter";
import {formatGenresToEdit} from "../../../../functionalities/GenreFormatter";
import {useNavigate} from "react-router-dom";
import AlertBox from "./AlertBox";


export default function AddMovie() {
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

    const[filmwebLink, setFilmwebLink] = useState('');

    // Fetching status
    // 0 - not started
    // 1 - fetching
    // 2 - fetched
    // 3 - error not fetched
    const[filmwebFetchingData, setFilmwebFetchingData] = useState(0);
    const[imdbFetchingData, setImdbFetchingData] = useState(0);

    const[enterMovieDataOption, setEnterMovieDataOption] = useState(0);
    // 0 - basic (user has not chosen yet)
    // 1 - fetch from filmweb
    // 2 - fill in manually

    const[posterURL, setPosterURL] = useState('');
    const navigate = useNavigate();

    const movieFetchedFilmweb = {
        titleF: title,
        releaseYearF: releaseYear,
        genresF: genres,
        directorF: director,
        filmwebRatingF: filmwebRating,
        filmwebNumberOfVotesF: filmwebNumberOfVotes,
        descriptionF: description,
        posterURLF: posterURL,
        imdbRatingF: imdbRating,
        imdbNumberOfVotesF: imdbNumberOfVotes,
    }

    const [isAlertFilmwebOpen, setIsAlertFilmwebOpen] = useState(false);
    const alertFilmwebHandleClose = () => {setIsAlertFilmwebOpen(false); navigate("/movies")};
    const [isAlertIMDbOpen, setIsAlertIMDbOpen] = useState(false);
    const alertIMDbHandleClose = () => {setIsAlertIMDbOpen(false)};

    const fetchFromFilmweb = ((e) => {
        e.preventDefault();

        setFilmwebFetchingData(1);

        const movieLink = cutLinkToFilmwebFormat(filmwebLink);

        filmwebFetcher.fetchData(movieLink)
            .then(movie => {
                if(!movie.data) {
                    console.log("We should see an alert box.");
                    setFilmwebFetchingData(3);
                    setIsAlertFilmwebOpen(true);
                } else {
                    setTitle(movie.data.title);
                    setGenres(formatGenresToEdit(movie.data.genres));
                    setReleaseYear(movie.data.releaseYear);
                    setDirector(movie.data.director);
                    setFilmwebRating(movie.data.filmwebRating);
                    setFilmwebNumberOfVotes(movie.data.filmwebNumberOfVotes);
                    setDescription(movie.data.description);
                    setPosterURL(movie.data.posterFileName);
                    setFilmwebFetchingData(2);
                }
            })
            .catch(error => {
                console.log('An error occurred while fetching data from filmweb.', error);
            })
    })



    const fetchRatingFromIMDb = ((e) => {
        e.preventDefault();

        setImdbFetchingData(1);

        const movieLink = cutLinkToIMDbFormat(filmwebLink);

        imdbFetcher.fetchRating(movieLink)
            .then(ratingInfo => {
                setImdbRating(ratingInfo.data.rating);
                setImdbNumberOfVotes(ratingInfo.data.numberOfVotes);
                setImdbFetchingData(2);
                console.log("Fetched imdb rating: ", ratingInfo.data.rating);
                console.log("Fetched imdb numberOfVotes: ", ratingInfo.data.numberOfVotes);

                if(ratingInfo.data.rating === 0 && ratingInfo.data.numberOfVotes === 0) {
                    console.log("Could not fetch rating info from IMDb, filmwebFetchingData: ", filmwebFetchingData);
                    if(filmwebFetchingData !== 3) {
                        console.log("We should see an alert box (IMDb error) only on add movie page, it will not be displayed on home page.");
                        setIsAlertIMDbOpen(true);
                    }
                }
            })
            .catch(error => {
                console.log('An error occurred while fetching imdb rating.', error);
            })
    })


    if (enterMovieDataOption === 0) {
        return (
            <div className="container d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
                <div className="card shadow p-3 mb-5 bg-white rounded">
                    <div className="card-body text-center">
                        <div className="mb-3">
                            <button className="btn btn-primary" onClick={(e) => setEnterMovieDataOption(1)}>Load data from filmweb</button>
                        </div>
                        <div>
                            <button className="btn btn-primary" onClick={(e) => setEnterMovieDataOption(2)}>Fill in data manually</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    } else if (enterMovieDataOption === 1) {
        // Fetch from filmweb
        if(filmwebFetchingData !== 2 || imdbFetchingData !== 2) {
            // User has not fetched data yet,
            // so display only link box.
            return (
                <div className="container d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
                    <AlertBox isOpen={isAlertFilmwebOpen} onClose={alertFilmwebHandleClose} content={"Could not fetch data from filmweb"} />
                    <div className="card shadow p-3 mb-5 bg-white rounded">
                        <form>
                            <div className="mb-3 text-center">
                                <input
                                    type="text"
                                    className="form-control col-4"
                                    id="movieName"
                                    value={filmwebLink}
                                    onChange={(e) => setFilmwebLink(e.target.value)}
                                    placeholder="Filmweb link"
                                />
                            </div>
                            <div className="text-center">
                                <button
                                    className="btn btn-primary"
                                    onClick={(e) => {
                                        fetchRatingFromIMDb(e);
                                        fetchFromFilmweb(e);
                                    }}
                                    disabled={filmwebFetchingData > 0 || imdbFetchingData > 0}
                                >
                                    {filmwebFetchingData === 1 && (
                                        <span>
                  <span className="spinner-border spinner-border-sm"></span>
                  <span>Fetching from filmweb...</span>
                </span>
                                    )}
                                    {imdbFetchingData === 1 && (
                                        <span>
                  <span className="spinner-border spinner-border-sm"></span>
                  <span>Fetching from imdb...</span>
                </span>
                                    )}
                                    {filmwebFetchingData === 0 && imdbFetchingData === 0 && (
                                        <span>Load data from filmweb</span>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            );
        } else {
            // User has already fetched data
            // so display all movie input fields.
            setTimeout(() => {
                // Scroll to the bottom of the page
                window.scrollTo(0, document.body.scrollHeight);
            }, 0);
            return(
                <div className="container">
                    <AlertBox isOpen={isAlertIMDbOpen} onClose={alertIMDbHandleClose} content={"Could not fetch data from IMDb"} />
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

