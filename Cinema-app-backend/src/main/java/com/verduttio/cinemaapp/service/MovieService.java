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

    @Autowired
    public MovieService(MovieRepository movieRepository) {
        this.movieRepository = movieRepository;
    }

    public Movie saveMovie(Movie movie) {
        // If user upload an image and then change it before saving a movie,
        // we have unused files uploaded to files/images/temp.

        // So that firstly, we move the movie image to files/images,
        // and then we delete all files inside files/images/temp.
        FilesCleaner.clean("files/images/temp/"+movie.posterFileName(), "files/images/"+movie.posterFileName());
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
        movieRepository.deleteById(movieId);
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
        // If user upload an image and then change it before saving a movie,
        // we have unused files uploaded to files/images/temp.

        // So that firstly, we move the movie image to files/images,
        // and then we delete all files inside files/images/temp.
        FilesCleaner.clean("files/images/temp/"+movie.posterFileName(), "files/images/"+movie.posterFileName());
        return movieRepository.save(movie);
    }
}
