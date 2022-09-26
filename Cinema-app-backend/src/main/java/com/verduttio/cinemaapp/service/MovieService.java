package com.verduttio.cinemaapp.service;

import com.verduttio.cinemaapp.entity.Movie;
import com.verduttio.cinemaapp.repository.MovieRepository;
import com.verduttio.cinemaapp.security.services.UserDetailsImpl;
import com.verduttio.cinemaapp.service.storage.FileNameGenerator;
import com.verduttio.cinemaapp.service.storage.FilesCleaner;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.util.ReflectionUtils;

import java.lang.reflect.Field;
import java.util.List;
import java.util.Map;

@Service
public class MovieService {

    private final Logger logger = LoggerFactory.getLogger(this.getClass());
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
        String uploadPosterFileName = movie.posterFileName();
        movie.setPosterFileName(FileNameGenerator.generateName() + ".jpg");
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        int userId = userDetails.getId();
        FilesCleaner.cleanAfterUploadImage(userId, uploadPosterFileName, movie.posterFileName());
        Movie response = movieRepository.save(movie);
        logger.debug("saveMovie() - movie: {} - SAVED", movie);
        return response;
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


        // If user upload an image and then change it before saving a movie,
        // we have unused files uploaded to files/images/temp.

        // So that firstly, we move the movie image to files/images,
        // and then we delete all files inside files/images/temp.

        String oldFileName = movieRepository.getPosterImageByMovieId(movie.id());
        String uploadFileName = movie.posterFileName();
        movie.setPosterFileName(FileNameGenerator.generateName() + ".jpg");
        logger.debug("updateMovie() - oldFileName: {}, newFileName:{}", oldFileName, movie.posterFileName());

        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        int userId = userDetails.getId();
        FilesCleaner.cleanAfterEditImage(userId, oldFileName, uploadFileName, movie.posterFileName());

        return movieRepository.save(movie);
    }

    public void removeMovie(int movieId) {
        logger.info("removeMovie() - movieId:{}", movieId);
        movieRepository.deleteById(movieId);
    }

    public Movie modifyMovie(int movieId, Map<Object, Object> fields) {
        ////TODO: Maybe some update queries would be better than loading whole movie, then changing values and uploading object.
        Movie movie = movieRepository.findById(movieId);
        // Map key is field name, v is value
        fields.forEach((k,v) -> {
            // Use reflection to get field k on movie and set it value v
            Field field = ReflectionUtils.findField(Movie.class, (String) k);
            assert field != null;  ////TODO: Add an exception or if clause here
            field.setAccessible(true);
            ReflectionUtils.setField(field, movie, v);
            logger.info("modifyMovie() - movieId:{}, field: {}, newValue: {}", movieId, field.getName(), v.toString());
        });
        return movieRepository.save(movie);
    }
}
