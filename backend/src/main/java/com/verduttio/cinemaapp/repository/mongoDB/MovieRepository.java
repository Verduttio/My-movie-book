package com.verduttio.cinemaapp.repository.mongoDB;

import com.verduttio.cinemaapp.entity.Movie;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

public interface MovieRepository extends MongoRepository<Movie, String> {
    Optional<Movie> findById(String movieId);

//    @Transactional
    @Query(value = "{'userId': ?0}")
    List<Movie> findByUserId(String userId);

    @Transactional
    void deleteByUserId(String userId);
}
