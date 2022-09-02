package com.verduttio.cinemaapp.repository;

import com.verduttio.cinemaapp.entity.Movie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MovieRepository extends JpaRepository<Movie, Integer> {
    Movie findById(int movieId);
}
