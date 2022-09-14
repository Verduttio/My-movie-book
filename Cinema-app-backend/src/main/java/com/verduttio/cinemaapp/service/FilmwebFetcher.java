package com.verduttio.cinemaapp.service;

import com.verduttio.cinemaapp.entity.Movie;
import org.springframework.stereotype.Service;

import java.net.URL;
import java.net.URLConnection;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.Scanner;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class FilmwebFetcher {
    String movieURL;
    String pageContent;

    public FilmwebFetcher() {
        this.movieURL = null;
        this.pageContent = null;
    }

    private void init(String movieTitle) {
        this.movieURL = "https://www.filmweb.pl/film/" + URLEncoder.encode(movieTitle, StandardCharsets.UTF_8);
        this.pageContent = getPageContent(movieURL);
        System.out.println("init(String movieTitle) movieURL: " + this.movieURL);
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

    private String findRate(String regexResult){
        String jsonFieldRate = "\"rate\":";
        String rate = regexResult.substring(regexResult.indexOf(jsonFieldRate)+jsonFieldRate.length(), regexResult.indexOf(","));
        System.out.println("rate: " + rate);
        return rate;
    }

    private String findNumberOfViews(String regexResult) {
        regexResult = regexResult.substring(regexResult.indexOf(',')+1);
        String jsonFieldRatingCount = "\"ratingCount\":";
        String ratingCount = regexResult.substring(regexResult.indexOf(jsonFieldRatingCount)+jsonFieldRatingCount.length(), regexResult.indexOf(","));
        System.out.println("ratingCount: " + ratingCount);
        return ratingCount;
    }

    private String findTitle(String regexResult) {
        String jsonFieldTitle = "\"title\":\"";
        String title = regexResult.substring(regexResult.indexOf(jsonFieldTitle)+jsonFieldTitle.length(), regexResult.indexOf("}")-1);
        System.out.println("title: " + title);
        return title;
    }

    private String findReleaseYear(String regexResult) {
        String releaseYear = regexResult.substring(regexResult.indexOf('>')+1, regexResult.indexOf("</div>"));
        System.out.println("releaseYear: " + releaseYear);
        return releaseYear;
    }

    private String findDescription(String regexResult) {
        String description = regexResult.substring(regexResult.indexOf('>')+1, regexResult.indexOf("</span>"));
        System.out.println("description: " + description);
        return description;
    }

    private String findDirector(String regexResult) {
        String field = "title=\"";
        String director = regexResult.substring(regexResult.indexOf(field)+field.length(), regexResult.indexOf("itemprop")-2);
        System.out.println("director: " + director);
        return director;
    }

    private String findGenre(String regexResult) {
        String field = "a href=\"";
        regexResult = regexResult.substring(regexResult.indexOf(field)+field.length()+1);
        regexResult = regexResult.substring(regexResult.indexOf('"')+2);
        String genre = regexResult.substring(0, regexResult.indexOf('<'));
        System.out.println("genre: " + genre);
        return genre;
    }

    private double getRating() {
        String regexResult = getRegexResult("<script type=\"application/json\" id=\"filmDataRating\">[^<]*</script>", this.pageContent);
        String rating = findRate(regexResult);
        return Double.parseDouble(rating);
    }

    private int getNumberOfViews() {
        String regexResult = getRegexResult("<script type=\"application/json\" id=\"filmDataRating\">[^<]*</script>", this.pageContent);
        String numberOfViews = findNumberOfViews(regexResult);
        return Integer.parseInt(numberOfViews);
    }

    private String getTitle() {
        String regexResult = getRegexResult("<script type=\"application/json\" class=\"dataSource\" data-source=\"filmTitle\">[^<]*</script>", this.pageContent);
        String title = findTitle(regexResult);
        return title;
    }

    private int getReleaseYear() {
        String regexResult = getRegexResult("<div class=\"filmCoverSection__year\">[0-9]+</div>", this.pageContent);
        String releaseYear = findReleaseYear(regexResult);
        return Integer.parseInt(releaseYear);
    }

    private String getDescription() {
        String regexResult = getRegexResult("<span itemprop=\"description\">[^<]*</span>", this.pageContent);
        String description = findDescription(regexResult);
        return fixOInPolish(description);
    }

    private String getDirector() {
        String regexResult = getRegexResult("<a href=\"[^\"]*\" title=\"[^\"]*\" itemprop=\"director\" itemscope itemtype=\"http://schema.org/Person\">", this.pageContent);
        String director = findDirector(regexResult);
        return director;
    }

    private String getGenre() {
//        System.out.println("\n\n\n");
//        System.out.println(this.pageContent);
        String regexResult = getRegexResult("<div class=\"filmInfo__info\" itemprop=\"genre\"><span> <a href=\"[^\"]*\">[^<]*</a>", this.pageContent);
        String genre = findGenre(regexResult);
        return genre;
    }




    public Movie fetchMovie(String movieURL) {
        init(movieURL);
        Movie movie = new Movie();
        movie.setFilmwebRating(getRating());
        movie.setFilmwebNumberOfVotes(getNumberOfViews());
        movie.setTitle(getTitle());
        movie.setReleaseYear(getReleaseYear());
        movie.setDescription(getDescription());
        movie.setDirector(getDirector());
        movie.setGenre(getGenre());
        return movie;
    }

    private String fixOInPolish(String content) {
        return content.replace("&oacute;", "ó");
    }

}
