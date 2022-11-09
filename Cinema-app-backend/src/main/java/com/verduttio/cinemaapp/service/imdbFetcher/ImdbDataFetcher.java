package com.verduttio.cinemaapp.service.imdbFetcher;

import com.verduttio.cinemaapp.entity.RatingInfo;
import com.verduttio.cinemaapp.entity.RatingInfoNotFound;
import com.verduttio.cinemaapp.repository.GenreRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.net.URL;
import java.net.URLConnection;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.Scanner;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class ImdbDataFetcher {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());
    private String movieURL;
    private String pageContent;
    private final ImdbURLFinder imdbURLFinder;


    @Autowired
    public ImdbDataFetcher(ImdbURLFinder imdbURLFinder) {
        this.imdbURLFinder = imdbURLFinder;
    }

    private void init(String movieURL_) {
        this.movieURL = movieURL_;
        this.pageContent = getPageContent(movieURL);
    }


    private String getPageContent(String pageUrl) {
        String content = null;
        URLConnection connection = null;
        try {
            connection =  new URL(pageUrl).openConnection();
            Scanner scanner = new Scanner(connection.getInputStream());
            scanner.useDelimiter("\\Z");
            content = scanner.next();
            scanner.close();
        }catch ( Exception ex ) {
            ex.printStackTrace();
        }

        return content;
    }

    private String getRegexResult(String regex, String content) {
        Pattern pattern = Pattern.compile(regex);
        assert content != null;
        Matcher matcher = pattern.matcher(content);
        boolean found = matcher.find();

        return matcher.group();
    }


    private double getRating() {
        String regexResult = getRegexResult(" vote of .*? / 10", this.pageContent);
        logger.debug("regexResult: " + regexResult);

        String rating = findRate(regexResult);
        logger.info("rating: " + rating);

        return Double.parseDouble(rating);
    }

    private String findRate(String regexResult) {
        // EXAMPLE
        // regexResult: " vote of 7,9 / 10"

        regexResult = regexResult.substring(0, regexResult.length()-5);
        // regexResult = " vote of 7,9"

        return regexResult.substring(regexResult.length()-3);
    }

    private int getNumberOfViews() {
        String regexResult = getRegexResult("<div class=\"allText\">[^:]*:", this.pageContent);
        logger.debug("regexResult: " + regexResult);

        String numberOfViews = findNumberOfViews(regexResult);
        logger.info("numberOfViews: " + numberOfViews);

        return Integer.parseInt(numberOfViews);
    }

    private String findNumberOfViews(String regexResult) {
        StringBuilder numberOfViews = new StringBuilder();
        for(int i = 0; i < regexResult.length(); i++) {
            if(isDigit(regexResult.charAt(i))) {
                numberOfViews.append(regexResult.charAt(i));
            }
        }

        return numberOfViews.toString();
    }

    private boolean isDigit(char letter) {
        return letter >= 48 && letter <= 57;
    }

    private RatingInfo getRatingInfo(String movieURL) {
        init(movieURL  + "/ratings");

        RatingInfo ratingInfo = new RatingInfo();
        ratingInfo.setRating(getRating());
        ratingInfo.setNumberOfVotes(getNumberOfViews());

        return ratingInfo;
    }

    public RatingInfo fetchRatingInfo(String filmwebMovieName) {
        // It shouldn't be done here.
        // Better option is to catch an exception directly where it comes from (ie. ImdbURLFinder.java),
        // but this solution is much easier.

        //TODO: Catch en exception in ImdbURLFinder.java, not here!
        try {
            return getRatingInfo(imdbURLFinder.getMovieImdbURL(filmwebMovieName));
        }
        catch(Exception e) {
            logger.warn("Could not fetch rating from IMDb!");
            return new RatingInfoNotFound();
        }
    }

//    public static void main(String[] args) {
//        ImdbDataFetcher imdbDataFetcher = new ImdbDataFetcher(new ImdbURLFinder());
//        imdbDataFetcher.init("https://www.imdb.com/title/tt1016150");
//
//        System.out.println(imdbDataFetcher.pageContent);
//
//        System.out.println("rating: " + imdbDataFetcher.getRating());
//
//        System.out.println("numberOfViews: " + imdbDataFetcher.getNumberOfViews());
//
//
//    }
}
