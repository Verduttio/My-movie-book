package com.verduttio.cinemaapp.service;

import com.verduttio.cinemaapp.entity.Movie;
import com.verduttio.cinemaapp.repository.MovieRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MovieService {
    private final MovieRepository movieRepository;

    public MovieService(MovieRepository movieRepository) {
        this.movieRepository = movieRepository;
    }

    public Movie saveMovie(Movie movie) {
        return movieRepository.save(movie);
    }

    public Movie getMovieById(int movieId) {
        return movieRepository.findById(movieId);
    }

    public List<Movie> getAllMovies(){
        return movieRepository.findAll();
    }
}
