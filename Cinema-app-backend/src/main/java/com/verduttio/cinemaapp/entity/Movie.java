package com.verduttio.cinemaapp.entity;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Lob;

import static javax.persistence.GenerationType.AUTO;

@Entity
public class Movie {
    @Id
    @GeneratedValue(strategy = AUTO)
    @JsonProperty("id")
    private final int id;
    @JsonProperty("title")
    private String title;
    @JsonProperty("rating")
    private double rating;
    @JsonProperty("numberOfVotes")
    private int numberOfVotes;
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

    public Movie(){
        id = 0;
        title = null;
        rating = 0;
        numberOfVotes = 0;
        releaseYear = 0;
        genre = null;
        director = null;
        posterFileName = null;
        description = null;
        note = null;
    }

    @JsonCreator(mode = JsonCreator.Mode.PROPERTIES)
    public Movie(int id, String title, double rating, int numberOfVotes, int releaseYear, String genre, String director, String posterFileName, String description) {
        this.id = id;
        this.title = title;
        this.rating = rating;
        this.numberOfVotes = numberOfVotes;
        this.releaseYear = releaseYear;
        this.genre = genre;
        this.director = director;
        this.posterFileName = posterFileName;
        this.description = description;
        this.note = null;
    }

    public int id() {return id;}
    public String title() {return title;}
    public double rating() {return rating;}
    public int numberOfVotes() {return numberOfVotes;}
    public int releaseYear() {return releaseYear;}
    public String genre() {return genre;}
    public String director() {return director;}
    public String posterFileName() {return posterFileName;}
    public String description() {return description;}
    public String note() {return note;}

    public void setTitle(String title) {this.title = title;}
    public void setRating(double rating) {this.rating = rating;}
    public void setNumberOfVotes(int numberOfVotes) {this.numberOfVotes = numberOfVotes;}
    public void setReleaseYear(int releaseYear) {this.releaseYear = releaseYear;}
    public void setGenre(String genre) {this.genre = genre;}
    public void setDirector(String director) {this.director = director;}
    public void setPosterFileName(String posterFileName) {this.posterFileName = posterFileName;}
    public void setDescription(String description) {this.description = description;}
    public void setNote(String note) {this.note = note;}

    @Override
    public String toString(){
        return "Movie{" +
                "id = " + id +
                ", title = " + title +
                ", rating = " + rating +
                ", numberOfVotes = " + numberOfVotes +
                ", releaseYear = " + releaseYear +
                ", genre = "  + genre +
                ", director = " + director +
                ", description = " + description;
    }

}
