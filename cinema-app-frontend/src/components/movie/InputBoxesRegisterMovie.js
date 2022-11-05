import * as React from "react";
import Select from "react-select";
import genreService from "../../services/genreService";
import {useEffect, useState} from "react";
import movieService from "../../services/movieService";

export default function InputBoxesRegisterMovie(props) {
    const {
        title, setTitle,
        filmwebRating, setFilmwebRating,
        filmwebNumberOfVotes, setFilmwebNumberOfVotes,
        imdbRating, setImdbRating,
        imdbNumberOfVotes, setImdbNumberOfVotes,
        releaseYear, setReleaseYear,
        genres, setGenres,
        director, setDirector,
        description, setDescription
    } = props;

    const [genreOptions, setGenreOptions] = useState([]);

    // const options_genres = [
    //     { value: 'chocolate', label: 'Chocolate' },
    //     { value: 'strawberry', label: 'Strawberry' },
    //     { value: 'vanilla', label: 'Vanilla' }
    // ]

    useEffect(()=> {
        genreService.getAll()
            .then(response => {
                console.log('Printing all genres', response.data);
                setGenreOptions(response.data)
            })
            .catch(error => {
                console.log('An error occurred while getting all genres.', error);
            });
    },[])

    const options_genres = genreOptions.map(function(genre){
        return {value : genre.name, label : genre.name};
    })


    return (
      <div>
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
              <Select
                  defaultValue={genres}
                  isMulti
                  name="colors"
                  options={options_genres}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  placeholder="Genres"
                  value={genres}
                  onChange={setGenres}
                  id={"genres"}
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
      </div>
    );
}