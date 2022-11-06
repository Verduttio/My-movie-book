package com.verduttio.cinemaapp.service.imdbFetcher;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.net.URL;
import java.net.URLConnection;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.Scanner;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Component
public class ImdbURLFinder {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    private String getMovieTitleYear(String filmwebURL) {
        // EXAMPLE
        // filmwebURL : "Na+Zachodzie+bez+zmian-2022-430867"
        // output: "Na+Zachodzie+bez+zmian-2022"

        return filmwebURL.substring(0, filmwebURL.lastIndexOf("-"));
    }

    private String getImdbFindMovieHTMLContext(String movieTitleYear) {
        String imdbURLFind = "https://www.imdb.com/find?q=" + movieTitleYear;
        return getPageContent(imdbURLFind);
    }

    private String getFirstFoundMovieFromListHTML(String imdbFindHTMLContext) {
        return getRegexResult("<ul class=\"ipc-metadata-list.*?</ul>", imdbFindHTMLContext);
    }

    private String processMovieImdbURL(String firstFoundMovieFromListsHTML) {
        String regexResult = getRegexResult("href=\".*?\"", firstFoundMovieFromListsHTML);
        String titleEndpoint = regexResult.substring(regexResult.indexOf('"')+1, regexResult.indexOf("?")-1);
        return "https://www.imdb.com" + titleEndpoint;
    }

    public String getMovieImdbURL(String filmwebURL) {
        String movieTitleYear = getMovieTitleYear(filmwebURL);
        logger.debug("movieTitleYear: " + movieTitleYear);

        String encodedMovieTitleYear = URLEncoder.encode(movieTitleYear, StandardCharsets.UTF_8);
        logger.debug("encodedMovieTitleYear: " + encodedMovieTitleYear);

        String imdbFindMovieHTMLContext = getImdbFindMovieHTMLContext(encodedMovieTitleYear);
        logger.debug("imdbFindMovieHTMLContext: " + imdbFindMovieHTMLContext);

        String firstFoundMovieFromListsHTML = getFirstFoundMovieFromListHTML(imdbFindMovieHTMLContext);
        logger.debug("firstFoundMovieFromListsHTML: " + firstFoundMovieFromListsHTML);

        return processMovieImdbURL(firstFoundMovieFromListsHTML);
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


//    public static void main(String[] args) {
//        ImdbURLFinder imdbURLFinder = new ImdbURLFinder();
//
//        String filmwebURL = URLEncoder.encode("101+dalmatyńczyków-1996-633", StandardCharsets.UTF_8);
//        String imdbURL = imdbURLFinder.getMovieImdbURL(filmwebURL);
//        System.out.println("imdbURL: " + imdbURL);
//    }
}


