package com.verduttio.cinemaapp.controller.thyme;


import com.verduttio.cinemaapp.entity.Movie;
import com.verduttio.cinemaapp.service.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping(path="/ui")
public class MovieThymeController {
    private final MovieService movieService;

    @Autowired
    public MovieThymeController(MovieService movieService){
        this.movieService = movieService;
    }

    @GetMapping("/movies")
    public String showAllMovies(Model model) {
        var allMovies = movieService.getAllMovies();
        model.addAttribute("movies", allMovies.size() > 0 ? allMovies : null);
        return "movies";
    }
}
