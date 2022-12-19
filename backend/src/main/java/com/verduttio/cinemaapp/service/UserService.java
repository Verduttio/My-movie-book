package com.verduttio.cinemaapp.service;

import com.verduttio.cinemaapp.entity.ERole;
import com.verduttio.cinemaapp.entity.User;
import com.verduttio.cinemaapp.entity.UserSafeData;
import com.verduttio.cinemaapp.repository.UserRepository;
import com.verduttio.cinemaapp.security.services.UserDetailsImpl;
import com.verduttio.cinemaapp.service.storage.FilesCleaner;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final MovieService movieService;

    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    public UserService(UserRepository userRepository, MovieService movieService) {
        this.userRepository = userRepository;
        this.movieService = movieService;
    }

    private UserDetailsImpl getCurrentUserDetailsImpl() {
        return (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }

    public void removeUser(int userId) {
        if((getCurrentUserDetailsImpl().getId() == userId) || isCurrentUserAdmin()) {

            userRepository.deleteById(userId);

            // And remove also all movies within this user and all poster within deleting movies

            movieService.removeAllUserMovies(userId);

            // Remove all files uploaded by user
            FilesCleaner.deleteAllUserFiles(userId);

            logger.info("User of Id: {} has deleted user of Id: {}", getCurrentUserDetailsImpl().getId(), userId);
        }
        else {
            logger.warn("Access denied! User of Id: {}, wants to remove user of Id: {}", getCurrentUserDetailsImpl().getId(), userId);
        }
    }

    private boolean isCurrentUserAdmin() {
        for(var auth : getCurrentUserDetailsImpl().getAuthorities()) {
            if(auth.getAuthority().equals("ROLE_ADMIN")) {
                return true;
            }
        }
        return false;
    }

    public List<UserSafeData> getAllUsersSafeData() {
         List<User> users = userRepository.findAll();
         return users.stream().map(user -> new UserSafeData(
                 user.getId(),
                 user.getUsername(),
                 user.getEmail(),
                 user.getRoles()
         )).toList();
    }
}
