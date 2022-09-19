package com.verduttio.cinemaapp.service;

import org.apache.tomcat.util.http.fileupload.FileUtils;

import java.io.File;
import java.io.IOException;

public class FilesCleaner {
    /**
     * This method moves file from one place to another.
     *
     * @param  from  an absolute path to the file ex. files/images/temp/stardust.jpg
     * @param  to    an absolute path to the destination ex. files/images/stardust.jpg
     */
    public static void clean(String from, String to) {
        File file = new File(from);
        file.renameTo(new File(to));
        try {
            FileUtils.cleanDirectory(new File("files/images/temp/"));
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

//    public static void main(String[] args) {
//        try {
//            FileUtils.cleanDirectory(new File("files/images/temp/"));
//        } catch (IOException e) {
//            throw new RuntimeException(e);
//        }
//    }
}
