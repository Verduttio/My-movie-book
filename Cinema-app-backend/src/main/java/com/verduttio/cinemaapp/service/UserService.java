package com.verduttio.cinemaapp.service;

import com.verduttio.cinemaapp.repository.UserRepository;
import com.verduttio.cinemaapp.service.storage.FilesCleaner;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final MovieService movieService;

    @Autowired
    public UserService(UserRepository userRepository, MovieService movieService) {
        this.userRepository = userRepository;
        this.movieService = movieService;
    }

    public void removeUser(int userId) {
        userRepository.deleteById(userId);

        // And remove also all movies within this user and all poster within deleting movies

        movieService.removeAllUserMovies(userId);

        // Remove all files uploaded by user
        FilesCleaner.deleteAllUserFiles(userId);
    }
}
