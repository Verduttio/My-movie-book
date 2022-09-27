package com.verduttio.cinemaapp.controller.rest;


import com.verduttio.cinemaapp.entity.Movie;
import com.verduttio.cinemaapp.service.FilmwebDataFetcher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path="/externalMovieData")
public class ExternalMovieDataController {
    private final FilmwebDataFetcher filmwebDataFetcher;

    @Autowired
    public ExternalMovieDataController(FilmwebDataFetcher filmwebDataFetcher) {
        this.filmwebDataFetcher = filmwebDataFetcher;
    }

    @CrossOrigin
    @GetMapping("/filmweb/{movieName}")
    public Movie getFilmwebInfo(@PathVariable("movieName") String movieName) {
        return filmwebDataFetcher.fetchMovie(movieName);
    }
}
