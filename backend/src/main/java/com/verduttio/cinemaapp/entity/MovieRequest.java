package com.verduttio.cinemaapp.entity;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.Set;

public class MovieRequest {
    @JsonProperty("title")
    private String title;

    @JsonProperty("filmwebRating")
    private double filmwebRating;

    @JsonProperty("filmwebNumberOfVotes")
    private int filmwebNumberOfVotes;

    @JsonProperty("imdbRating")
    private double imdbRating;

    @JsonProperty("imdbNumberOfVotes")
    private int imdbNumberOfVotes;

    @JsonProperty("releaseYear")
    private int releaseYear;

    @JsonProperty("genres")
    private Set<String> genres;

    @JsonProperty("director")
    private String director;

    @JsonProperty("posterFileName")
    private String posterFileName;

    @JsonProperty("description")
    private String description;

//    @JsonProperty("note")
//    private String note;

//    @JsonProperty("watched")
//    private boolean watched;

    @JsonProperty("userId")
    private String userId;

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public double getFilmwebRating() {
        return filmwebRating;
    }

    public void setFilmwebRating(double filmwebRating) {
        this.filmwebRating = filmwebRating;
    }

    public int getFilmwebNumberOfVotes() {
        return filmwebNumberOfVotes;
    }

    public void setFilmwebNumberOfVotes(int filmwebNumberOfVotes) {
        this.filmwebNumberOfVotes = filmwebNumberOfVotes;
    }

    public double getImdbRating() {
        return imdbRating;
    }

    public void setImdbRating(double imdbRating) {
        this.imdbRating = imdbRating;
    }

    public int getImdbNumberOfVotes() {
        return imdbNumberOfVotes;
    }

    public void setImdbNumberOfVotes(int imdbNumberOfVotes) {
        this.imdbNumberOfVotes = imdbNumberOfVotes;
    }

    public int getReleaseYear() {
        return releaseYear;
    }

    public void setReleaseYear(int releaseYear) {
        this.releaseYear = releaseYear;
    }

    public Set<String> getGenres() {
        return genres;
    }

    public void setGenres(Set<String> genres) {
        this.genres = genres;
    }

    public String getDirector() {
        return director;
    }

    public void setDirector(String director) {
        this.director = director;
    }

    public String getPosterFileName() {
        return posterFileName;
    }

    public void setPosterFileName(String posterFileName) {
        this.posterFileName = posterFileName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public static Movie buildMovie(MovieRequest movieRequest) {
        Movie movie = new Movie();
        movie.setTitle(movieRequest.getTitle());
        movie.setFilmwebRating(movieRequest.getFilmwebRating());
        movie.setFilmwebNumberOfVotes(movieRequest.getFilmwebNumberOfVotes());
        movie.setImdbRating(movieRequest.getImdbRating());
        movie.setImdbNumberOfVotes(movieRequest.getImdbNumberOfVotes());
        movie.setReleaseYear(movieRequest.getReleaseYear());
//        movie.setGenres(movieRequest.getGenres().stream().map(genre -> {Genre genreFromRepo = }).collect(Collectors.toSet()));
        movie.setDirector(movieRequest.getDirector());
        movie.setPosterFileName(movieRequest.getPosterFileName());
        movie.setDescription(movieRequest.getDescription());
        movie.setUserId(movieRequest.getUserId());
        return movie;
    }
}
