package com.verduttio.cinemaapp.controller.rest;


import com.verduttio.cinemaapp.entity.Movie;
import com.verduttio.cinemaapp.entity.MovieRequest;
import com.verduttio.cinemaapp.service.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping(path="/movies")
public class MovieController {
    private final MovieService movieService;

    @Autowired
    public MovieController(MovieService movieService){
        this.movieService = movieService;
    }

    @PostMapping
    @PreAuthorize("#movie.userId == authentication.principal.id")
    public Movie saveMovie(@RequestBody MovieRequest movie){
        return movieService.saveMovie(movie);
    }

    @GetMapping("/{id}")
    public Optional<Movie> getMovie(@PathVariable("id") String movieId) {
        return movieService.getMovieById(movieId);
    }

    @GetMapping("/user")
    public List<Movie> getMoviesByUserId() {
        return movieService.getCurrentUserMovies();
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public List<Movie> getAllMovies() {
        return movieService.getAllMovies();
    }

    @PatchMapping("/{id}")
    public Movie modifyMovie(@PathVariable("id") String movieId, @RequestBody Map<Object, Object> fields) {return movieService.modifyMovie(movieId, fields);}

    @DeleteMapping("/{id}")
    public void removeMovie(@PathVariable("id") String movieId) {movieService.removeMovie(movieId);}

}
