package com.verduttio.cinemaapp.entity;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;

import static javax.persistence.GenerationType.AUTO;

@Entity
public class Movie {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty("id")
    private final int id;
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
    @JsonProperty("genre")
    private String genre;
    @JsonProperty("director")
    private String director;
    @JsonProperty("posterFileName")
    private String posterFileName;
    @JsonProperty("description")
    @Lob
    private String description;
    @JsonProperty("note")
    @Lob
    private String note;
    @JsonProperty("watched")
    private boolean watched;

    @JsonProperty("userId")
    private int userId;

    public Movie(){
        id = 0;
        title = null;
        filmwebRating = 0;
        filmwebNumberOfVotes = 0;
        imdbRating = 0;
        imdbNumberOfVotes = 0;
        releaseYear = 0;
        genre = null;
        director = null;
        posterFileName = null;
        description = null;
        note = null;
        watched = false;
        userId = 0;
    }

    @JsonCreator(mode = JsonCreator.Mode.PROPERTIES)
    public Movie(int id, String title, double filmwebRating, int filmwebNumberOfVotes, double imdbRating, int imdbNumberOfVotes, int releaseYear, String genre, String director, String posterFileName, String description, int userId) {
        this.id = id;
        this.title = title;
        this.filmwebRating = filmwebRating;
        this.filmwebNumberOfVotes = filmwebNumberOfVotes;
        this.imdbRating = imdbRating;
        this.imdbNumberOfVotes = imdbNumberOfVotes;
        this.releaseYear = releaseYear;
        this.genre = genre;
        this.director = director;
        this.posterFileName = posterFileName;
        this.description = description;
        this.note = null;
        this.watched = false;
        this.userId = userId;
    }

    public int id() {return id;}
    public String title() {return title;}
    public double filmwebRating() {return filmwebRating;}
    public int filmwebNumberOfVotes() {return filmwebNumberOfVotes;}
    public double imdbRating() {return imdbRating;}
    public int imdbNumberOfVotes() {return imdbNumberOfVotes;}
    public int releaseYear() {return releaseYear;}
    public String genre() {return genre;}
    public String director() {return director;}
    public String posterFileName() {return posterFileName;}
    public String description() {return description;}
    public String note() {return note;}
    public boolean watched() {return watched;}
    public int userId() {return userId;}

    public void setTitle(String title) {this.title = title;}
    public void setFilmwebRating(double filmwebRating) {this.filmwebRating = filmwebRating;}
    public void setFilmwebNumberOfVotes(int filmwebNumberOfVotes) {this.filmwebNumberOfVotes = filmwebNumberOfVotes;}
    public void setImdbRating(double imdbRating) {this.imdbRating = imdbRating;}
    public void setImdbNumberOfVotes(int imdbNumberOfVotes) {this.imdbNumberOfVotes = imdbNumberOfVotes;}
    public void setReleaseYear(int releaseYear) {this.releaseYear = releaseYear;}
    public void setGenre(String genre) {this.genre = genre;}
    public void setDirector(String director) {this.director = director;}
    public void setPosterFileName(String posterFileName) {this.posterFileName = posterFileName;}
    public void setDescription(String description) {this.description = description;}
    public void setNote(String note) {this.note = note;}
    public void setWatched(boolean watched) {this.watched = watched;}
    public void setUserId(int userId) {this.userId = userId;}

    @Override
    public String toString(){
        return "Movie {" +
                "\nid = " + id +
                ", \ntitle = " + title +
                ", \nfilmwebRating = " + filmwebRating +
                ", \nfilmwebNumberOfVotes = " + filmwebNumberOfVotes +
                ", \nimdbRating = " + imdbRating +
                ", \nimdbNumberOfVotes = " + imdbNumberOfVotes +
                ", \nreleaseYear = " + releaseYear +
                ", \ngenre = "  + genre +
                ", \ndirector = " + director +
                ", \nposterFileName = " + posterFileName +
                ", \ndescription = " + description +
                ", \nnote = " + note +
                ", \nwatched = " + watched +
                "\n}";
    }

}
