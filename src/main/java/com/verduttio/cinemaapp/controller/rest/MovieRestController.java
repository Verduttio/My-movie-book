package com.verduttio.cinemaapp.controller.rest;


import com.verduttio.cinemaapp.entity.Movie;
import com.verduttio.cinemaapp.service.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path="/movies")
public class MovieRestController {
    private final MovieService movieService;

    @Autowired
    public MovieRestController(MovieService movieService){
        this.movieService = movieService;
    }

    @PostMapping
    public Movie saveMovie(@RequestBody Movie movie){
        return movieService.saveMovie(movie);
    }

    @GetMapping("/{id}")
    public Movie getMovie(@PathVariable("id") int movieId) {
        return movieService.getMovieById(movieId);
    }

    @GetMapping
    public List<Movie> getAllMovies() {
        return movieService.getAllMovies();
    }
}
