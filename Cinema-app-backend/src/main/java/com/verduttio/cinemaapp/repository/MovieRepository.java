package com.verduttio.cinemaapp.repository;

import com.verduttio.cinemaapp.entity.Movie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface MovieRepository extends JpaRepository<Movie, Integer> {
    Movie findById(int movieId);

    @Query("SELECT posterFileName from Movie WHERE id = ?1")
    String getPosterImageByMovieId(int movieId);
}
