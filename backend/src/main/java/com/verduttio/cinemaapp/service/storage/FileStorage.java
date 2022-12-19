package com.verduttio.cinemaapp.service.storage;

import com.verduttio.cinemaapp.entity.storage.StorageException;
import com.verduttio.cinemaapp.entity.storage.StorageFileNotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Component;
import org.springframework.util.FileSystemUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.stream.Stream;

@Component
public class FileStorage {

    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    public void store(MultipartFile file, Path path) {
        try {
            if (file.isEmpty()) {
                throw new StorageException("Failed to store empty file.");
            }
            Path destinationFile = path
                    .resolve(Paths.get(file.getOriginalFilename()))
                    .normalize()
                    .toAbsolutePath();
            logger.debug("store() - destinationFile: {}", destinationFile);
            if (!destinationFile.getParent().equals(path.toAbsolutePath())) {
                // This is a security check
                throw new StorageException(
                        "Cannot store file outside current directory.");
            }
            try (InputStream inputStream = file.getInputStream()) {
                Files.copy(inputStream, destinationFile, StandardCopyOption.REPLACE_EXISTING);
                logger.debug("store() - destinationFile: {} - SAVED", destinationFile);
            }
        }
        catch (IOException e) {
            throw new StorageException("Failed to store file.", e);
        }
    }
    
    public Stream<Path> loadAll(Path path) {
        try {
            return Files.walk(path, 1)
                    .filter(path_tmp -> !path_tmp.equals(path))
                    .map(path::relativize);
        }
        catch (IOException e) {
            throw new StorageException("Failed to read stored files", e);
        }

    }

    public Path load(String filename, Path path) {
        return path.resolve(filename);
    }

    public Resource loadAsResource(String filename, Path path) {
        try {
            Path file = load(filename, path);
            Resource resource = new UrlResource(file.toUri());
            if (resource.exists() || resource.isReadable()) {
                return resource;
            }
            else {
                throw new StorageFileNotFoundException(
                        "Could not read file: " + filename);

            }
        }
        catch (MalformedURLException e) {
            throw new StorageFileNotFoundException("Could not read file: " + filename, e);
        }
    }

    public void deleteAll(Path path) {
        FileSystemUtils.deleteRecursively(path.toFile());
    }
    
    public void delete(String fileName, Path path) {FileSystemUtils.deleteRecursively(load(fileName, path).toFile());}

//    public void init() {
//        try {
//            Files.createDirectories(path);
//        }
//        catch (IOException e) {
//            throw new StorageException("Could not initialize storage", e);
//        }
//    }
}
