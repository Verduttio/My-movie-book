package com.verduttio.cinemaapp.controller.rest;


import com.verduttio.cinemaapp.entity.Movie;
import com.verduttio.cinemaapp.entity.RatingInfo;
import com.verduttio.cinemaapp.service.filmwebFetcher.FilmwebDataFetcher;
import com.verduttio.cinemaapp.service.imdbFetcher.ImdbDataFetcher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path="/externalMovieData")
public class ExternalMovieDataController {
    private final FilmwebDataFetcher filmwebDataFetcher;
    private final ImdbDataFetcher imdbDataFetcher;

    @Autowired
    public ExternalMovieDataController(FilmwebDataFetcher filmwebDataFetcher, ImdbDataFetcher imdbDataFetcher) {
        this.filmwebDataFetcher = filmwebDataFetcher;
        this.imdbDataFetcher = imdbDataFetcher;
    }

    @CrossOrigin
    @GetMapping("/filmweb/{filmwebMovieName}")
    public Movie getFilmwebInfo(@PathVariable("filmwebMovieName") String filmwebMovieName) {
        return filmwebDataFetcher.fetchMovie(filmwebMovieName);
    }

    @CrossOrigin
    @GetMapping("/imdb/rating/{filmwebMovieName}")
    public RatingInfo getImdbRatingInfo(@PathVariable("filmwebMovieName") String filmwebMovieName) {
        return imdbDataFetcher.fetchRatingInfo(filmwebMovieName);
    }
}
