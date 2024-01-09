package com.verduttio.cinemaapp.service.filmwebFetcher;

import com.verduttio.cinemaapp.entity.Genre;
import com.verduttio.cinemaapp.entity.Movie;
import com.verduttio.cinemaapp.repository.GenreRepository;
import com.verduttio.cinemaapp.service.imageHandling.ImageFetcher;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class FilmwebDataProvider {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());
    private final FilmwebDataFetcher filmwebDataFetcher;
    private final GenreRepository genreRepository;

    @Autowired
    public FilmwebDataProvider(GenreRepository genreRepository, FilmwebDataFetcher filmwebDataFetcher) {
        this.genreRepository = genreRepository;
        this.filmwebDataFetcher = filmwebDataFetcher;
    }

    public Movie getMovie(String movieTitle) {
        try {
            FilmwebFetchedData filmwebFetchedData = filmwebDataFetcher.fetchMovie(movieTitle);
            Movie movie = convertFilmwebFetchedDataToMovie(filmwebFetchedData);
            savePhoto(filmwebDataFetcher.getPosterURL(), filmwebFetchedData.getPosterFileName());

            return movie;
        } catch (Exception e) {
            logger.error("Could not fetch movie from filmweb: " + movieTitle);
            return null;
        }
    }

    private Set<Genre> genresStringSetToGenresClassSet(Set<String> genresStringSet) {
        return genresStringSet.stream().map(
                genre -> genreRepository.findByName(genre).get()
        ).collect(Collectors.toSet());
    }

    private Movie convertFilmwebFetchedDataToMovie(FilmwebFetchedData filmwebFetchedData) {
        Movie movie = new Movie();
        movie.setTitle(filmwebFetchedData.getTitle());
        movie.setFilmwebRating(filmwebFetchedData.getFilmwebRating());
        movie.setFilmwebNumberOfVotes(filmwebFetchedData.getFilmwebNumberOfVotes());
        movie.setReleaseYear(filmwebFetchedData.getReleaseYear());
        movie.setGenres(genresStringSetToGenresClassSet(filmwebFetchedData.getGenres()));
        movie.setPosterFilmwebUrl(filmwebFetchedData.getPosterFilmwebUrl());
        movie.setDirector(filmwebFetchedData.getDirector());
        movie.setPosterFileName(filmwebFetchedData.getPosterFileName());
        movie.setDescription(filmwebFetchedData.getDescription());
        return movie;
    }

    private void savePhoto(String photoURL, String fileName) {
        try {
            ImageFetcher.fetch(photoURL, fileName);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }


}
