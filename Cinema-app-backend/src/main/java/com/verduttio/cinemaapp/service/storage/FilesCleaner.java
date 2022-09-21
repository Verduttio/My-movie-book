package com.verduttio.cinemaapp.service.storage;

import org.apache.tomcat.util.http.fileupload.FileUtils;
import org.springframework.util.FileSystemUtils;

import java.io.File;
import java.io.IOException;

public class FilesCleaner {
    /**
     * This method moves file from one place to another,
     * and delete all files in files/images/temp.
     *
     * @param  fileName Name of the accepted uploaded file.
     */
    public static void cleanAfterUploadImage(String fileName) {
        File file = new File("files/images/temp/" + fileName);
        file.renameTo(new File("files/images/" + fileName));
        try {
            FileUtils.cleanDirectory(new File("files/images/temp/"));
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    /**
     * This method deletes old image file,
     * and then moves new image file from temp location
     * to the main location.
     *
     * @param  oldFileName Name of the old image file.
     * @param  newFileName Name of the new image file.
     */
    public static void cleanAfterEditImage(String oldFileName, String newFileName) {
        FileSystemUtils.deleteRecursively(new File("files/images/"+oldFileName));
        cleanAfterUploadImage(newFileName);
    }

}
