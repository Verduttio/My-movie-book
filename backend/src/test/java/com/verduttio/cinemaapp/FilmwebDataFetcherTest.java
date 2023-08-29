package com.verduttio.cinemaapp;

import com.verduttio.cinemaapp.service.filmwebFetcher.FilmwebDataFetcher;
import com.verduttio.cinemaapp.service.filmwebFetcher.FilmwebFetchedData;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.greaterThanOrEqualTo;
import static org.hamcrest.Matchers.lessThanOrEqualTo;
import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
public class FilmwebDataFetcherTest {

    private FilmwebDataFetcher filmwebDataFetcher;

    @BeforeEach
    public void setUp() {
        filmwebDataFetcher = new FilmwebDataFetcher();
    }

    @Test
    public void testFetchingMovieData() {
        FilmwebFetchedData filmwebFetchedData = filmwebDataFetcher.fetchMovie("Most+do+Terabithii-2007-200116");
        assertEquals("Most do Terabithii", filmwebFetchedData.getTitle());
        assertEquals(2007, filmwebFetchedData.getReleaseYear());

        assertThat(filmwebFetchedData.getFilmwebRating(), greaterThanOrEqualTo(1.0));
        assertThat(filmwebFetchedData.getFilmwebRating(), lessThanOrEqualTo(10.0));

        assertThat(filmwebFetchedData.getFilmwebNumberOfVotes(), greaterThanOrEqualTo(1));

        assertEquals("Gabor Csupo", filmwebFetchedData.getDirector());
        assertEquals("Dramat,Fantasy,Przygodowy", String.join(",", filmwebFetchedData.getGenres()));
        assertEquals("Historia przyjaĹşni dwojga dzieci, które za leĹ›nym strumieniem tworzÄ… swój wĹ‚asny bajkowy Ĺ›wiat.",
                filmwebFetchedData.getDescription());
    }

}
