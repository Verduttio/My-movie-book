package com.verduttio.cinemaapp.service.storage;

import java.io.File;

public class FilesInitializer {
    private static final String path = "files/images/";

    public static boolean makeSpaceForNewUser(int userId) {
        String userSpace = userId + "/temp";
        String fullPath = path + userSpace;
        return new File(fullPath).mkdirs();
    }
}
