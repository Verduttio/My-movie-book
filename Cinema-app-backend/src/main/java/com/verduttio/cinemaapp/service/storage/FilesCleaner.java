package com.verduttio.cinemaapp.service.storage;

import org.apache.tomcat.util.http.fileupload.FileUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.util.FileSystemUtils;

import java.io.File;
import java.io.IOException;

public class FilesCleaner {
    private final static Logger logger = LoggerFactory.getLogger(FilesCleaner.class);

    /**
     * This method moves file from one place to another,
     * and delete all files in files/images/temp.
     *
//     * @param  fileName Name of the accepted uploaded file.
     */
    public static void cleanAfterUploadImage(String uploadedFileName, String generatedFileName) {
        logger.info("cleanAfterUploadImage()");
        File file = new File("files/images/temp/" + uploadedFileName);
        file.renameTo(new File("files/images/" + generatedFileName));
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
     * @param oldFileName Name of the old image file.
//     * @param newFileName Name of the new image file.
     */
    public static void cleanAfterEditImage(String oldFileName, String uploadFileName, String generatedFileName) {
        logger.info("cleanAfterEditImage()");
        FileSystemUtils.deleteRecursively(new File("files/images/"+oldFileName));
        cleanAfterUploadImage(uploadFileName, generatedFileName);
    }

    public static void renameImage(String oldFileName, String newFileName) {
        logger.info("rename({}, {})", oldFileName, newFileName);
        File file = new File("files/images/temp/" + oldFileName);
        file.renameTo(new File("files/images/temp/" + newFileName));
    }

}