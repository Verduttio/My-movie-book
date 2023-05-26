package com.verduttio.cinemaapp.service;

import com.verduttio.cinemaapp.entity.Genre;
import com.verduttio.cinemaapp.entity.Movie;
import com.verduttio.cinemaapp.entity.MovieRequest;
import com.verduttio.cinemaapp.repository.mongoDB.GenreRepository;
import com.verduttio.cinemaapp.repository.mongoDB.MovieRepository;
import com.verduttio.cinemaapp.security.services.UserDetailsImpl;
import com.verduttio.cinemaapp.service.storage.FileNameGenerator;
import com.verduttio.cinemaapp.service.storage.FilesCleaner;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.util.ReflectionUtils;
import org.thymeleaf.spring5.context.SpringContextUtils;

import java.lang.reflect.Field;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class MovieService {

    private final Logger logger = LoggerFactory.getLogger(this.getClass());
    private final MovieRepository movieRepository;
    private final GenreRepository genreRepository;

    @Autowired
    public MovieService(MovieRepository movieRepository, GenreRepository genreRepository) {
        this.movieRepository = movieRepository;
        this.genreRepository = genreRepository;
    }

    public Movie saveMovie(MovieRequest movieRequest) {
        Movie movie = MovieRequest.buildMovie(movieRequest);
        Set<Genre> genres = movieRequest.getGenres().stream().map(
                genre -> genreRepository.findByName(genre).get()
        ).collect(Collectors.toSet());
        movie.setGenres(genres);
        // If user upload an image and then change it before saving a movie,
        // we have unused files uploaded to files/images/userId/temp.

        // So that firstly, we move the movie image to files/images/userId,
        // and then we delete all files inside files/images/userId/temp.
        String uploadPosterFileName = movie.posterFileName();
        if(!uploadPosterFileName.equals("")) {
            movie.setPosterFileName(FileNameGenerator.generateName() + ".jpg");
            UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            String userId = userDetails.getId();
            FilesCleaner.cleanAfterUploadImage(userId, uploadPosterFileName, movie.posterFileName());
        } else {
            movie.setPosterFileName("no_poster");
        }
        Movie response = movieRepository.save(movie);
        logger.debug("saveMovie() - movie: {} - SAVED", movie);
        return response;
    }

    private UserDetailsImpl getCurrentUserDetailsImpl() {
        return (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }

    public Optional<Movie> getMovieById(String movieId) {
        // Security check
        if(getCurrentUserDetailsImpl().getId().equals(getUserIdByMovieId(movieId))) {
            return movieRepository.findById(movieId);
        } else {
            ////TODO: Make an exception and throw it here
            logger.info("Access denied! Movie with id: {} does not belong to user with id: {}. Movie owner: {}", movieId, getCurrentUserDetailsImpl().getId(), getUserIdByMovieId(movieId));
            return null;
        }
    }

    public String getUserIdByMovieId(String movieId) {
        Optional<Movie> movie = movieRepository.findById(movieId);
        return movie.get().userId();
    }

    public List<Movie> getAllMovies(){
        return movieRepository.findAll();
    }

    public void removeMovie(String movieId) {
        logger.info("removeMovie() - movieId:{}", movieId);
        if(getCurrentUserDetailsImpl().getId().equals(getUserIdByMovieId(movieId))) {
            movieRepository.deleteById(movieId);
        } else {
            ////TODO: Make an exception and throw it here
            logger.info("Access denied! Movie with id: {} does not belong to user with id: {}. Movie owner: {}", movieId, getCurrentUserDetailsImpl().getId(), getUserIdByMovieId(movieId));
        }
    }

    public void removeAllUserMovies(String userId) {
        logger.info("removeALlUserMovies() - userId:{}", userId);
        if(getCurrentUserDetailsImpl().getId().equals(userId)) {
            movieRepository.deleteByUserId(userId);
        } else {
            logger.warn("Access denied! User of Id: {}, wants to remove all movies of user of Id: {}", getCurrentUserDetailsImpl().getId(), userId);
        }
    }

    public Movie modifyMovie(String movieId, Map<Object, Object> fields) {
        if(getCurrentUserDetailsImpl().getId().equals(getUserIdByMovieId(movieId))) {
            ////TODO: Maybe some update queries would be better than loading whole movie, then changing values and uploading object.
            Movie movie = movieRepository.findById(movieId).get();
            // Map key is field name, v is value
            fields.forEach((k, v) -> {
                // Use reflection to get field k on movie and set it value v
                Field field = ReflectionUtils.findField(Movie.class, (String) k);
                assert field != null;  ////TODO: Add an exception or if clause here
                field.setAccessible(true);

                if(field.getName().equals("genres")) {
                    Set<Genre> genres = (Set<Genre>) ((List) v).stream().map(
                            genre -> genreRepository.findByName((String) genre).get()
                    ).collect(Collectors.toSet());
                    ReflectionUtils.setField(field, movie, genres);
                } else if (field.getName().equals("releaseYear") ||
                        field.getName().equals("filmwebNumberOfVotes") ||
                        field.getName().equals("imdbNumberOfVotes") ) {

                    ReflectionUtils.setField(field, movie, Integer.parseInt(String.valueOf((v))));
                }else if (field.getName().equals("filmwebRating") ||
                        field.getName().equals("imdbRating")) {
                    ReflectionUtils.setField(field, movie, Double.parseDouble(String.valueOf((v))));
                } else if (field.getName().equals("posterFileName")) {
                    String oldFileName = movie.posterFileName();
                    ReflectionUtils.setField(field, movie, v);
                    // If user upload an image and then change it before saving a movie,
                    // we have unused files uploaded to files/images/temp.

                    // So that firstly, we move the movie image to files/images,
                    // and then we delete all files inside files/images/temp.


                    String uploadFileName = movie.posterFileName();
                    if(!oldFileName.equals(uploadFileName)) {
                        movie.setPosterFileName(FileNameGenerator.generateName() + ".jpg");
                        logger.debug("updateMovie() - oldFileName: {}, newFileName:{}", oldFileName, movie.posterFileName());

                        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
                        String userId = userDetails.getId();
                        FilesCleaner.cleanAfterEditImage(userId, oldFileName, uploadFileName, movie.posterFileName());
                    }

                }
                else {
                    ReflectionUtils.setField(field, movie, v);
                }

                logger.info("modifyMovie() - movieId:{}, field: {}, newValue: {}", movieId, field.getName(), v.toString());
            });


            return movieRepository.save(movie);
        } else {
            ////TODO: Make an exception and throw it here
            logger.info("Access denied! Movie with id: {} does not belong to user with id: {}", movieId, getCurrentUserDetailsImpl().getId());
            return null;
        }
    }

    public List<Movie> getCurrentUserMovies() {
        String userId = getCurrentUserDetailsImpl().getId();
        logger.info("getCurrentUserMovies() - userId:{}", userId);
        return movieRepository.findByUserId(userId);
    }

}
