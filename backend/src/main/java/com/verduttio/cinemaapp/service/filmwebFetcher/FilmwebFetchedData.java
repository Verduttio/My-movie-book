package com.verduttio.cinemaapp.service.filmwebFetcher;

import java.util.Set;

public class FilmwebFetchedData {
    private int id;
    private String title;
    private double filmwebRating;
    private int filmwebNumberOfVotes;
    private int releaseYear;
    private Set<String> genres;
    private String director;
    private String posterFileName;
    private String posterFilmwebUrl;
    private String description;

    public FilmwebFetchedData(){}

    public FilmwebFetchedData(int id, String title, double filmwebRating, int filmwebNumberOfVotes,
                              int releaseYear, Set<String> genres, String director, String posterFileName,
                              String posterFilmwebUrl, String description) {
        this.id = id;
        this.title = title;
        this.filmwebRating = filmwebRating;
        this.filmwebNumberOfVotes = filmwebNumberOfVotes;
        this.releaseYear = releaseYear;
        this.genres = genres;
        this.director = director;
        this.posterFileName = posterFileName;
        this.posterFilmwebUrl = posterFilmwebUrl;
        this.description = description;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

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

    public String getPosterFilmwebUrl() {
        return posterFilmwebUrl;
    }

    public void setFilmwebNumberOfVotes(int filmwebNumberOfVotes) {
        this.filmwebNumberOfVotes = filmwebNumberOfVotes;
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

    public void setPosterFilmwebUrl(String posterFilmwebUrl) {
        this.posterFilmwebUrl = posterFilmwebUrl;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public String toString() {
        return "FilmwebFetchedData{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", filmwebRating=" + filmwebRating +
                ", filmwebNumberOfVotes=" + filmwebNumberOfVotes +
                ", releaseYear=" + releaseYear +
                ", genres=" + genres +
                ", director='" + director + '\'' +
                ", posterFileName='" + posterFileName + '\'' +
                ", posterFilmwebUrl='" + posterFilmwebUrl + '\'' +
                ", description='" + description + '\'' +
                '}';
    }
}

