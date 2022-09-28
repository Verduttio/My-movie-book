package com.verduttio.cinemaapp.service.storage;

import java.util.UUID;

public class FileNameGenerator {
    public static String generateName() {
        return UUID.randomUUID().toString();
    }
}
