import * as React from "react";

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
              <input
                  type={"text"}
                  className={"form-control col-4"}
                  id={"genres"}
                  value={genres}
                  onChange={(e) => setGenres(e.target.value)}
                  placeholder={"Genres"}
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