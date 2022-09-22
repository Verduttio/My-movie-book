package com.verduttio.cinemaapp.service.storage;

import java.time.LocalDateTime;

public class FileNameGenerator {
    public static String generateName() {
        LocalDateTime localDateTime = LocalDateTime.now();
        String name = localDateTime.toString();
        name = name.replace(':', '_');
        name = name.replace('-', '_');
        name = name.replace('.', '_');
        return name;
    }
}
