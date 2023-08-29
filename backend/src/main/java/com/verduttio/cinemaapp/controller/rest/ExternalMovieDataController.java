package com.verduttio.cinemaapp.controller.rest;


import com.verduttio.cinemaapp.entity.Movie;
import com.verduttio.cinemaapp.entity.RatingInfo;
import com.verduttio.cinemaapp.service.filmwebFetcher.FilmwebDataProvider;
import com.verduttio.cinemaapp.service.imdbFetcher.ImdbDataFetcher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path="/externalMovieData")
public class ExternalMovieDataController {
    private final FilmwebDataProvider filmwebDataProvider;
    private final ImdbDataFetcher imdbDataFetcher;

    @Autowired
    public ExternalMovieDataController(FilmwebDataProvider filmwebDataProvider, ImdbDataFetcher imdbDataFetcher) {
        this.filmwebDataProvider = filmwebDataProvider;
        this.imdbDataFetcher = imdbDataFetcher;
    }

    @CrossOrigin
    @GetMapping("/filmweb/{filmwebMovieName}")
    public Movie getFilmwebInfo(@PathVariable("filmwebMovieName") String filmwebMovieName) {
        return filmwebDataProvider.getMovie(filmwebMovieName);
    }

    @CrossOrigin
    @GetMapping("/imdb/rating/{filmwebMovieName}")
    public RatingInfo getImdbRatingInfo(@PathVariable("filmwebMovieName") String filmwebMovieName) {
        return imdbDataFetcher.fetchRatingInfo(filmwebMovieName);
    }
}
