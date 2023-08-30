package com.verduttio.cinemaapp;

import com.verduttio.cinemaapp.entity.RatingInfo;
import com.verduttio.cinemaapp.service.imdbFetcher.ImdbDataFetcher;
import com.verduttio.cinemaapp.service.imdbFetcher.ImdbURLFinder;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.mockito.Mockito.when;
import static org.hamcrest.Matchers.greaterThanOrEqualTo;
import static org.hamcrest.Matchers.lessThanOrEqualTo;

public class ImdbDataFetcherTest {

    @Mock
    private ImdbURLFinder imdbURLFinder;
    private ImdbDataFetcher imdbDataFetcher;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
        imdbDataFetcher = new ImdbDataFetcher(imdbURLFinder);
    }

    @Test
    public void testFetchingRatingInfo() {
        when(imdbURLFinder.getMovieImdbURL("Most+do+Terabithii-2007-200116")).thenReturn("https://www.imdb.com/title/tt0398808/");

        RatingInfo ratingInfo = imdbDataFetcher.fetchRatingInfo("Most+do+Terabithii-2007-200116");

        assertThat(ratingInfo.getRating(), greaterThanOrEqualTo(1.0));
        assertThat(ratingInfo.getRating(), lessThanOrEqualTo(10.0));

        assertThat(ratingInfo.getNumberOfVotes(), greaterThanOrEqualTo(1));
    }
}
