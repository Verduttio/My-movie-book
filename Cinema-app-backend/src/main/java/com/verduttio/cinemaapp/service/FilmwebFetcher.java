package com.verduttio.cinemaapp.service;

import com.verduttio.cinemaapp.entity.Movie;
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
        String previousText = ">";
        String title = regexResult.substring(regexResult.indexOf(previousText)+previousText.length(), regexResult.indexOf("</h1>"));
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

    private String findPosterURL(String regexResult) {
        String field = "content=\"";
        String posterURL = regexResult.substring(regexResult.indexOf(field)+field.length(), regexResult.length()-1);
        System.out.println("posterURL: " + posterURL);
        return posterURL;
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
//        String regexResult = getRegexResult("<script type=\"application/json\" class=\"dataSource\" data-source=\"filmTitle\">[^<]*</script>", this.pageContent);
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
        String posterURL = findPosterURL(regexResult);
        return posterURL;
    }



    public Movie fetchMovie(String movieURL) {
        init(movieURL);
        System.out.println("\n\n\n");
        System.out.println(this.pageContent);
        Movie movie = new Movie();
        movie.setFilmwebRating(getRating());
        movie.setFilmwebNumberOfVotes(getNumberOfViews());
        movie.setTitle(getTitle());
        movie.setReleaseYear(getReleaseYear());
        movie.setDescription(getDescription());
        movie.setDirector(getDirector());
        movie.setGenre(getGenre());
        movie.setPosterFileName(getNumberOfViews() + ".jpg");

        // Save poster image from filmweb
        savePoster(getPosterURL(), movie.posterFileName());

        return movie;
    }

    private void savePoster(String url, String fileName) {
        ImageFetcher imageFetcher = new ImageFetcher();
        try {
            imageFetcher.fetch(url, fileName);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

}
