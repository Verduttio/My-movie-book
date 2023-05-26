package com.verduttio.cinemaapp.service.imdbFetcher;

import com.verduttio.cinemaapp.entity.RatingInfo;
import com.verduttio.cinemaapp.entity.RatingInfoNotFound;
import com.verduttio.cinemaapp.repository.GenreRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
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
        logger.info("init(movieURL_: " + movieURL_);
        this.movieURL = movieURL_;
        this.pageContent = getPageContent(movieURL);
        logger.info("this.movieURL: " + this.movieURL);
    }


    private String getPageContent(String pageUrl) {
        String content = null;
        HttpURLConnection connection = null;
        try {
            connection =  (HttpURLConnection) new URL(pageUrl).openConnection();
            connection.setRequestProperty("User-Agent",
                    "Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36");
            connection.setInstanceFollowRedirects(true);
            connection.connect();
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
//        String regexResult = getRegexResult(" vote of .*? / 10", this.pageContent);
        String regexResult = getRegexResult("aggregateRating\":\\{.*?}", this.pageContent);
//        String regexResult = getRegexResult("aggregateRating\":[0-9](\\.[0-9]){0,1},", this.pageContent);
        logger.debug("regexResult: " + regexResult);

        String rating = findRate(regexResult);
        logger.info("rating: " + rating);

        return Double.parseDouble(rating);
    }

    private String findRate(String regexResult) {
        // EXAMPLE
        // regexResult: aggregateRating":{"@type":"AggregateRating","ratingCount":97973,"bestRating":10,"worstRating":1,"ratingValue":6.9}

        regexResult = regexResult.substring(regexResult.indexOf("ratingValue")+13);
        System.out.println("regexResult: " + regexResult);

        return regexResult.substring(0, regexResult.indexOf("}"));
    }

    private int getNumberOfViews() {
//        String regexResult = getRegexResult("<div class=\"allText\">[^:]*:", this.pageContent);
        String regexResult = getRegexResult("aggregateRating\":\\{.*?}", this.pageContent);
        logger.debug("regexResult: " + regexResult);

        String numberOfViews = findNumberOfViews(regexResult);
        logger.info("numberOfViews: " + numberOfViews);

        return Integer.parseInt(numberOfViews);
    }

    private String findNumberOfViews(String regexResult) {
//        StringBuilder numberOfViews = new StringBuilder();
//        for(int i = 0; i < regexResult.length(); i++) {
//            if(isDigit(regexResult.charAt(i))) {
//                numberOfViews.append(regexResult.charAt(i));
//            }
//        }
//
//        return numberOfViews.toString();

        // EXAMPLE
        // regexResult: aggregateRating":{"@type":"AggregateRating","ratingCount":97973,"bestRating":10,"worstRating":1,"ratingValue":6.9}

        regexResult = regexResult.substring(regexResult.indexOf("ratingCount")+13);
        System.out.println("regexResult: " + regexResult);

        return regexResult.substring(0, regexResult.indexOf(","));
    }

    private boolean isDigit(char letter) {
        return letter >= 48 && letter <= 57;
    }

    private RatingInfo getRatingInfo(String movieURL) {
        init(movieURL);

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

    public static String getFinalURL(String url) throws IOException {
        HttpURLConnection con = (HttpURLConnection) new URL(url).openConnection();
        con.setInstanceFollowRedirects(false);
        con.setRequestProperty("User-Agent",
                "Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36");
        con.connect();
        con.getInputStream();

        System.out.println("con.getResponseCode(): " + con.getResponseCode());

        if (con.getResponseCode() == HttpURLConnection.HTTP_MOVED_PERM || con.getResponseCode() == HttpURLConnection.HTTP_MOVED_TEMP || con.getResponseCode() == 308) {
            String redirectUrl = con.getHeaderField("Location");
            System.out.println("redirectUrl: " + redirectUrl);
            return getFinalURL(redirectUrl);
        }
        return url;
    }


    public static void main(String[] args) {
        ImdbDataFetcher imdbDataFetcher = new ImdbDataFetcher(new ImdbURLFinder());

//        String fetchedUrl = null;
//        try {
//            fetchedUrl = getFinalURL("https://www.imdb.com/title/tt0401445/");
//        } catch (IOException e) {
//            throw new RuntimeException(e);
//        }
//        System.out.println("FetchedURL is:" + fetchedUrl);

        imdbDataFetcher.init("https://www.imdb.com/title/tt0401445/");

        System.out.println("movie url: " + imdbDataFetcher.movieURL);

        System.out.println(imdbDataFetcher.pageContent);

        System.out.println("rating: " + imdbDataFetcher.getRating());

        System.out.println("numberOfViews: " + imdbDataFetcher.getNumberOfViews());


    }
}
