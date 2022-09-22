package com.verduttio.cinemaapp.service.imageHandling;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.URL;

public class ImageFetcher {
    private static final Logger logger = LoggerFactory.getLogger(ImageFetcher.class);
    public static void fetch(String url, String fileName) throws IOException {
        URL imageUrl = new URL(url);

        String path = "files/images/temp/";
        String destinationFile = path + fileName;

        /********
         * Step 1
         * Create Input Stream from Url to store fetched file as stream temporarily
         ********/
        InputStream inputStream = imageUrl.openStream();

        /********
         * Step 2
         * Create Output Stream to write Imput Stream Data to a file locally
         ********/
        OutputStream outputStream = new FileOutputStream(destinationFile);

        /********
         * Step 3
         * Create Helper Variables for handling the Write process
         ********/
        byte[] byteArray = new byte[2048];   // A byte array for checking the end of data stream
        int length;   // length for data stream

        /********
         * Step 4
         * Set While loop to write data from Input Stream to file using Output Stream until the end of stream is finished and exit
         ********/
        while ((length = inputStream.read(byteArray)) != -1) {
            outputStream.write(byteArray, 0, length);   // Will write data to file byte by byte of size 2048
        }

        /********
         * Step 5
         * Close both Output Stream and Input Stream Connections
         ********/
        inputStream.close();
        outputStream.close();

        logger.info("fetch() - destinationFile: {} - SAVED", destinationFile);
    }

}
