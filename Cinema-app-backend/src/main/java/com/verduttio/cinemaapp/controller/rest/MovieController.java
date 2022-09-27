package com.verduttio.cinemaapp.controller.rest;


import com.verduttio.cinemaapp.entity.Movie;
import com.verduttio.cinemaapp.service.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

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
    public Movie saveMovie(@RequestBody Movie movie){
        return movieService.saveMovie(movie);
    }

    @GetMapping("/{id}")
    public Movie getMovie(@PathVariable("id") int movieId) {
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

    @PutMapping
    @CrossOrigin
    ////TODO: Keep an eye on it, PUT can create a new movie if it does not exist (security concern)
    public Movie updateMovie(@RequestBody Movie movie) {return movieService.updateMovie(movie);}

    @PatchMapping("/{id}")
    public Movie modifyMovie(@PathVariable("id") int movieId, @RequestBody Map<Object, Object> fields) {return movieService.modifyMovie(movieId, fields);}

    @DeleteMapping("/{id}")
    public void removeMovie(@PathVariable("id") int movieId) {movieService.removeMovie(movieId);}

}
