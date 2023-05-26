package com.verduttio.cinemaapp.repository.mongoDB;

import com.verduttio.cinemaapp.entity.Genre;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface GenreRepository extends MongoRepository<Genre, String> {
    Optional<Genre> findByName(String name);
}
