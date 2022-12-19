package com.verduttio.cinemaapp;

import com.verduttio.cinemaapp.entity.ERole;
import com.verduttio.cinemaapp.entity.Genre;
import com.verduttio.cinemaapp.entity.Role;
import com.verduttio.cinemaapp.repository.GenreRepository;
import com.verduttio.cinemaapp.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

@Component
public class DataLoader implements ApplicationRunner {
    private final GenreRepository genreRepository;
    private final RoleRepository roleRepository;

    @Autowired
    public DataLoader(GenreRepository genreRepository, RoleRepository roleRepository) {
        this.genreRepository = genreRepository;
        this.roleRepository = roleRepository;
    }


    @Override
    public void run(ApplicationArguments args) throws Exception {
        loadRoles();
        loadGenres();
    }

    private void loadRoles() {
        if(roleRepository.findByName(ERole.ROLE_USER).isEmpty()) roleRepository.save(new Role(ERole.ROLE_USER));
        if(roleRepository.findByName(ERole.ROLE_ADMIN).isEmpty()) roleRepository.save(new Role(ERole.ROLE_ADMIN));
    }

    private void loadGenres() {
        if(genreRepository.findByName("Akcja").isEmpty()) genreRepository.save(new Genre("Akcja"));
        if(genreRepository.findByName("Sci-Fi").isEmpty()) genreRepository.save(new Genre("Sci-Fi"));
        if(genreRepository.findByName("Thriller").isEmpty()) genreRepository.save(new Genre("Thriller"));
        if(genreRepository.findByName("Romans").isEmpty()) genreRepository.save(new Genre("Romans"));
        if(genreRepository.findByName("Przygodowy").isEmpty()) genreRepository.save(new Genre("Przygodowy"));
        if(genreRepository.findByName("Niemy").isEmpty()) genreRepository.save(new Genre("Niemy"));
        if(genreRepository.findByName("Melodramat").isEmpty()) genreRepository.save(new Genre("Melodramat"));
        if(genreRepository.findByName("Kryminał").isEmpty()) genreRepository.save(new Genre("Kryminał"));
        if(genreRepository.findByName("Komedia").isEmpty()) genreRepository.save(new Genre("Komedia"));
        if(genreRepository.findByName("Krótkometrażowy").isEmpty()) genreRepository.save(new Genre("Krótkometrażowy"));
        if(genreRepository.findByName("Horror").isEmpty()) genreRepository.save(new Genre("Horror"));
        if(genreRepository.findByName("Fantasy").isEmpty()) genreRepository.save(new Genre("Fantasy"));
        if(genreRepository.findByName("Familijny").isEmpty()) genreRepository.save(new Genre("Familijny"));
        if(genreRepository.findByName("Dramat").isEmpty()) genreRepository.save(new Genre("Dramat"));
        if(genreRepository.findByName("Dokumentalny").isEmpty()) genreRepository.save(new Genre("Dokumentalny"));
        if(genreRepository.findByName("Animacja").isEmpty()) genreRepository.save(new Genre("Animacja"));
        if(genreRepository.findByName("Wojenny").isEmpty()) genreRepository.save(new Genre("Wojenny"));
        if(genreRepository.findByName("Western").isEmpty()) genreRepository.save(new Genre("Western"));
        if(genreRepository.findByName("True crime").isEmpty()) genreRepository.save(new Genre("True crime"));
        if(genreRepository.findByName("Świąteczny").isEmpty()) genreRepository.save(new Genre("Świąteczny"));
        if(genreRepository.findByName("Sztuki walki").isEmpty()) genreRepository.save(new Genre("Sztuki walki"));
        if(genreRepository.findByName("Szpiegowski").isEmpty()) genreRepository.save(new Genre("Szpiegowski"));
        if(genreRepository.findByName("Surrealistyczny").isEmpty()) genreRepository.save(new Genre("Surrealistyczny"));
        if(genreRepository.findByName("Sportowy").isEmpty()) genreRepository.save(new Genre("Sportowy"));
        if(genreRepository.findByName("Sensacyjny").isEmpty()) genreRepository.save(new Genre("Sensacyjny"));
        if(genreRepository.findByName("Satyra").isEmpty()) genreRepository.save(new Genre("Satyra"));
        if(genreRepository.findByName("Religijny").isEmpty()) genreRepository.save(new Genre("Religijny"));
        if(genreRepository.findByName("Psychologiczny").isEmpty()) genreRepository.save(new Genre("Psychologiczny"));
        if(genreRepository.findByName("Przyrodniczy").isEmpty()) genreRepository.save(new Genre("Przyrodniczy"));
        if(genreRepository.findByName("Propagandowy").isEmpty()) genreRepository.save(new Genre("Propagandowy"));
        if(genreRepository.findByName("Polityczny").isEmpty()) genreRepository.save(new Genre("Polityczny"));
        if(genreRepository.findByName("Poetycki").isEmpty()) genreRepository.save(new Genre("Poetycki"));
        if(genreRepository.findByName("Obyczajowy").isEmpty()) genreRepository.save(new Genre("Obyczajowy"));
        if(genreRepository.findByName("Muzyczny").isEmpty()) genreRepository.save(new Genre("Muzyczny"));
        if(genreRepository.findByName("Musical").isEmpty()) genreRepository.save(new Genre("Musical"));
        if(genreRepository.findByName("Kostiumowy").isEmpty()) genreRepository.save(new Genre("Kostiumowy"));
        if(genreRepository.findByName("Komedia rom.").isEmpty()) genreRepository.save(new Genre("Komedia rom."));
        if(genreRepository.findByName("Komedia obycz.").isEmpty()) genreRepository.save(new Genre("Komedia obycz."));
        if(genreRepository.findByName("Komedia kryminalna").isEmpty()) genreRepository.save(new Genre("Komedia kryminalna"));
        if(genreRepository.findByName("Katastroficzny").isEmpty()) genreRepository.save(new Genre("Katastroficzny"));
        if(genreRepository.findByName("Historyczny").isEmpty()) genreRepository.save(new Genre("Historyczny"));
        if(genreRepository.findByName("Groteska filmowa").isEmpty()) genreRepository.save(new Genre("Groteska filmowa"));
        if(genreRepository.findByName("Gangsterski").isEmpty()) genreRepository.save(new Genre("Gangsterski"));
        if(genreRepository.findByName("Film-Noir").isEmpty()) genreRepository.save(new Genre("Film-Noir"));
        if(genreRepository.findByName("Fabularyzowany dok.").isEmpty()) genreRepository.save(new Genre("Fabularyzowany dok."));
        if(genreRepository.findByName("Erotyczny").isEmpty()) genreRepository.save(new Genre("Erotyczny"));
        if(genreRepository.findByName("Dreszczowiec").isEmpty()) genreRepository.save(new Genre("Dreszczowiec"));
        if(genreRepository.findByName("Dramat sądowy").isEmpty()) genreRepository.save(new Genre("Dramat sądowy"));
        if(genreRepository.findByName("Dramat obyczajowy").isEmpty()) genreRepository.save(new Genre("Dramat obyczajowy"));
        if(genreRepository.findByName("Dramat historyczny").isEmpty()) genreRepository.save(new Genre("Dramat historyczny"));
        if(genreRepository.findByName("Dokumentalizowany").isEmpty()) genreRepository.save(new Genre("Dokumentalizowany"));
        if(genreRepository.findByName("Dla młodzieży").isEmpty()) genreRepository.save(new Genre("Dla młodzieży"));
        if(genreRepository.findByName("Dla dzieci").isEmpty()) genreRepository.save(new Genre("Dla dzieci"));
        if(genreRepository.findByName("Czarna komedia").isEmpty()) genreRepository.save(new Genre("Czarna komedia"));
        if(genreRepository.findByName("Biograficzny").isEmpty()) genreRepository.save(new Genre("Biograficzny"));
        if(genreRepository.findByName("Biblijny").isEmpty()) genreRepository.save(new Genre("Biblijny"));
        if(genreRepository.findByName("Baśń").isEmpty()) genreRepository.save(new Genre("Baśń"));
        if(genreRepository.findByName("Anime").isEmpty()) genreRepository.save(new Genre("Anime"));
    }
}