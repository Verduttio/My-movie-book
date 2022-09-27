package com.verduttio.cinemaapp.repository;

import com.verduttio.cinemaapp.entity.Movie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface MovieRepository extends JpaRepository<Movie, Integer> {
    Movie findById(int movieId);

    @Query("SELECT posterFileName from Movie WHERE id = ?1")
    String getPosterImageByMovieId(int movieId);

    @Transactional
    List<Movie> findByUserId(int userId);

    @Query("SELECT userId from Movie WHERE id = ?1")
    int getUserIdByMovieId(int movieId);
}
