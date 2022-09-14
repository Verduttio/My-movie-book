package com.verduttio.cinemaapp.controller.rest;


import com.verduttio.cinemaapp.entity.Movie;
import com.verduttio.cinemaapp.service.FilmwebFetcher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.URL;

@RestController
@RequestMapping(path="/externalMoviesPage")
public class ExternalMoviesPageController {
    private final FilmwebFetcher filmwebFetcher;

    @Autowired
    public ExternalMoviesPageController(FilmwebFetcher filmwebFetcher) {
        this.filmwebFetcher = filmwebFetcher;
    }

    @GetMapping("/filmweb/{movieName}")
    public Movie getFilmwebInfo(@PathVariable("movieName") String movieName) {
        return filmwebFetcher.fetchMovie(movieName);
    }
}
