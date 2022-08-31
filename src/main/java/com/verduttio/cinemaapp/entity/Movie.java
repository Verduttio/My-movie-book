package com.verduttio.cinemaapp.entity;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import static javax.persistence.GenerationType.AUTO;

@Entity
public class Movie {
    @Id
    @GeneratedValue(strategy = AUTO)
    @JsonProperty("id")
    private final int id;
    @JsonProperty("title")
    private String title;
    @JsonProperty("releaseYear")
    private int releaseYear;
    @JsonProperty("genre")
    private String genre;
    @JsonProperty("director")
    private String director;

    public Movie(){
        id = 0;
        title = null;
        releaseYear = 0;
        genre = null;
        director = null;
    }

    @JsonCreator(mode = JsonCreator.Mode.PROPERTIES)
    public Movie(int id, String title, int releaseYear, String genre, String director) {
        this.id = id;
        this.title = title;
        this.releaseYear = releaseYear;
        this.genre = genre;
        this.director = director;
    }

    public int id() {return id;}
    public String title() {return title;}
    public int releaseYear() {return releaseYear;}
    public String genre() {return genre;}
    public String director() {return director;}

    public void setTitle(String title) {this.title = title;}
    public void setReleaseYear(int releaseYear) {this.releaseYear = releaseYear;}
    public void setGenre(String genre) {this.genre = genre;}
    public void setDirector(String director) {this.director = director;}

    @Override
    public String toString(){
        return "Movie{" +
                "id = " + id +
                ", title = " + title +
                ", releaseYear = " + releaseYear +
                ", genre = "  + genre +
                ", director = " + director;
    }

}
