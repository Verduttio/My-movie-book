package com.verduttio.cinemaapp.service;

import com.verduttio.cinemaapp.entity.Movie;
import com.verduttio.cinemaapp.repository.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.ReflectionUtils;

import java.lang.reflect.Field;
import java.util.List;
import java.util.Map;

@Service
public class MovieService {
    private final MovieRepository movieRepository;
    private final FileSystemStorageService fileSystemStorageService;

    @Autowired
    public MovieService(MovieRepository movieRepository, FileSystemStorageService fileSystemStorageService) {
        this.movieRepository = movieRepository;
        this.fileSystemStorageService = fileSystemStorageService;
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

    public Movie updateMovie(Movie movie) {
        // Updating with PUT method should force to send the whole movie's json.

        /// WARNING
        ////TODO: Keep an eye on this method (security concerns)
        // If the updating movie does not exist, PUT will create a new movie (we don't want it).
        // It can lead to security leaks later in future development(ex. adding authorization), because we can forget about this PUT request and creating new movie.
        // So someone not authorized could create a new movie.


        return movieRepository.save(movie);
    }

    public void removeMovie(int movieId) {
        // We shouldn't load whole movie when we need only its posterFileName.
//        var movie = movieRepository.findById(movieId);
//        var posterFileName = movie.posterFileName();
        movieRepository.deleteById(movieId);
//        fileSystemStorageService.delete(posterFileName);
    }

    public Movie modifyMovie(int movieId, Map<Object, Object> fields) {
        Movie movie = movieRepository.findById(movieId);
        // Map key is field name, v is value
        fields.forEach((k,v) -> {
            // Use reflection to get field k on movie and set it value v
            Field field = ReflectionUtils.findField(Movie.class, (String) k);
            assert field != null;  ////TODO: Add an exception or if clause here
            field.setAccessible(true);
            ReflectionUtils.setField(field, movie, v);
        });
        return movieRepository.save(movie);
    }
}
