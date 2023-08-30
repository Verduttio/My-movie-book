package com.verduttio.cinemaapp;

import com.verduttio.cinemaapp.service.imdbFetcher.ImdbURLFinder;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
public class ImdbURLFinderTest {
    private ImdbURLFinder imdbURLFinder;

    @BeforeEach
    void setUp() {
        imdbURLFinder = new ImdbURLFinder();
    }

    @Test
    public void testFindImdbURL() {
        String imdbURL = imdbURLFinder.getMovieImdbURL("Most+do+Terabithii-2007-200116");
        assertEquals("https://www.imdb.com/title/tt0398808/", imdbURL);
    }
}
