package com.verduttio.cinemaapp.service;

import com.verduttio.cinemaapp.entity.Movie;
import com.verduttio.cinemaapp.service.imageHandling.ImageFetcher;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.unbescape.html.HtmlEscape;

import java.io.IOException;
import java.net.URL;
import java.net.URLConnection;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.Scanner;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class FilmwebFetcher {

    private final Logger logger = LoggerFactory.getLogger(this.getClass());
    private String movieURL;
    private String pageContent;

    public FilmwebFetcher() {
        this.movieURL = null;
        this.pageContent = null;
    }

    private void init(String movieTitle) {
        this.movieURL = "https://www.filmweb.pl/film/" + URLEncoder.encode(movieTitle, StandardCharsets.UTF_8);
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

    private String findRate(String regexResult){
        String jsonFieldRate = "\"rate\":";
        return regexResult.substring(regexResult.indexOf(jsonFieldRate)+jsonFieldRate.length(), regexResult.indexOf(","));
    }

    private String findNumberOfViews(String regexResult) {
        regexResult = regexResult.substring(regexResult.indexOf(',')+1);
        String jsonFieldRatingCount = "\"ratingCount\":";
        return regexResult.substring(regexResult.indexOf(jsonFieldRatingCount)+jsonFieldRatingCount.length(), regexResult.indexOf(","));
    }

    private String findTitle(String regexResult) {
        String previousText = ">";
        return regexResult.substring(regexResult.indexOf(previousText)+previousText.length(), regexResult.indexOf("</h1>"));
    }

    private String findReleaseYear(String regexResult) {
        return regexResult.substring(regexResult.indexOf('>')+1, regexResult.indexOf("</div>"));
    }

    private String findDescription(String regexResult) {
        return regexResult.substring(regexResult.indexOf('>')+1, regexResult.indexOf("</span>"));
    }

    private String findDirector(String regexResult) {
        String field = "title=\"";
        return regexResult.substring(regexResult.indexOf(field)+field.length(), regexResult.indexOf("itemprop")-2);
    }

    private String findGenre(String regexResult) {
        String field = "a href=\"";
        regexResult = regexResult.substring(regexResult.indexOf(field)+field.length()+1);
        regexResult = regexResult.substring(regexResult.indexOf('"')+2);
        return regexResult.substring(0, regexResult.indexOf('<'));
    }

    private String findPosterURL(String regexResult) {
        String field = "content=\"";
        return regexResult.substring(regexResult.indexOf(field)+field.length(), regexResult.length()-1);
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
        String regexResult = getRegexResult("<h1 class=\"filmCoverSection__title[^>]*>[^<]*</h1>", this.pageContent);
        String title = findTitle(regexResult);
        return HtmlEscape.unescapeHtml(title);
    }

    private int getReleaseYear() {
        String regexResult = getRegexResult("<div class=\"filmCoverSection__year\">[0-9]+</div>", this.pageContent);
        String releaseYear = findReleaseYear(regexResult);
        return Integer.parseInt(releaseYear);
    }

    private String getDescription() {
        String regexResult = getRegexResult("<span itemprop=\"description\">[^<]*</span>", this.pageContent);
        String description = findDescription(regexResult);
        return HtmlEscape.unescapeHtml(description);
    }

    private String getDirector() {
        String regexResult = getRegexResult("<a href=\"[^\"]*\" title=\"[^\"]*\" itemprop=\"director\" itemscope itemtype=\"http://schema.org/Person\">", this.pageContent);
        String director = findDirector(regexResult);
        return HtmlEscape.unescapeHtml(director);
    }

    private String getGenre() {
        String regexResult = getRegexResult("<div class=\"filmInfo__info\" itemprop=\"genre\"><span> <a href=\"[^\"]*\">[^<]*</a>", this.pageContent);
        String genre = findGenre(regexResult);
        return HtmlEscape.unescapeHtml(genre);
    }

    private String getPosterURL() {
        String regexResult = getRegexResult("<img id=\"filmPoster\" itemprop=\"image\" content=\"[^\"]*\"", this.pageContent);
        return findPosterURL(regexResult);
    }



    public Movie fetchMovie(String movieURL) {
        init(movieURL);
//        System.out.println("\n\n\n");
//        System.out.println(this.pageContent);
        Movie movie = new Movie();
        movie.setFilmwebRating(getRating());
        movie.setFilmwebNumberOfVotes(getNumberOfViews());
        movie.setTitle(getTitle());
        movie.setReleaseYear(getReleaseYear());
        movie.setDescription(getDescription());
        movie.setDirector(getDirector());
        movie.setGenre(getGenre());
        movie.setPosterFileName(getNumberOfViews() + ".jpg");
        logger.info("fetchMovie() - Fetched movie: {}", movieFetchedInfo(movie));

        // Save poster image from filmweb
        savePoster(getPosterURL(), movie.posterFileName());

        return movie;
    }

    private String movieFetchedInfo(Movie movie) {
        return "Movie {" +
                "\nid = " + movie.id() +
                ", \ntitle = " + movie.title() +
                ", \nfilmwebRating = " + movie.filmwebRating() +
                ", \nfilmwebNumberOfVotes = " + movie.filmwebNumberOfVotes() +
                ", \nreleaseYear = " + movie.releaseYear() +
                ", \ngenre = "  + movie.genre() +
                ", \ndirector = " + movie.director() +
                ", \nposterFileName = " + movie.posterFileName() +
                ", \ndescription = " + movie.description() +
                "\n}";
    }

    private void savePoster(String url, String fileName) {
        try {
            ImageFetcher.fetch(url, fileName);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

}
